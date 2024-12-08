"use client";

import { JSX, SVGProps, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";

const formSchema = z.object({
    authorField: z.string(),
    recipientField: z.string(),
    titleField: z.string(),
    messageField: z.string(),
    fileInput: z.string().optional(),
});

export default function SenderForm() {
    const [files, setFiles] = useState<File[]>([]);
    const [popupMessage, setPopupMessage] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            authorField: "",
            recipientField: "",
            titleField: "",
            messageField: "",
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        }
    };

    async function onSubmit(values: {
        authorField: any;
        recipientField: any;
        titleField: any;
        messageField: any;
    }) {
        try {
            const payload = {
                id: "id",
                author: values.authorField,
                recipient: values.recipientField,
                title: values.titleField,
                message: values.messageField,
                time: new Date().toISOString().split("T")[0],
                file: files.length > 0 ? await convertToBase64(files[0]) : "",
            };

            const response = await fetch("http://127.0.0.1:8000/upload", {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setPopupMessage("Form submitted successfully!");
                form.reset();
                setTimeout(() => setPopupMessage(null), 3000);
            } else {
                throw new Error("Failed to submit the form.");
            }
        } catch (error) {
            console.error("Form submission error", error);
            setPopupMessage("Failed to submit the form. Please try again.");
            setTimeout(() => setPopupMessage(null), 3000);
        }
    }

    async function convertToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 max-w-3xl mx-auto py-10"
            >
                <Header />
                <FormField
                    control={form.control}
                    name="authorField"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Author</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="recipientField"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Recipient</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="titleField"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Type the title of your message here..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="messageField"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Type your message here..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Card>
                    <CardContent className="p-6 space-y-4">
                        <div className="rounded-lg flex flex-col gap-1 p-6 items-center">
                            <FileIcon className="w-12 h-12" />
                            <span className="text-sm font-medium text-gray-500">
                                Drag and drop a file or click to browse
                            </span>
                            <span className="text-xs text-gray-500">
                                PDF, image, video, or audio
                            </span>
                        </div>
                        <div className="space-y-2 text-sm">
                            <Label htmlFor="file" className="text-sm font-medium">
                                File
                            </Label>
                            <Input
                                id="file"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                            />
                        </div>
                        {files.length > 0 && (
                            <ul className="mt-2 text-sm text-gray-500">
                                {files.map((file, index) => (
                                    <li key={index}>{file.name}</li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>

                <Button type="submit">Submit</Button>

                {/* Popup */}
                {popupMessage && (
                    <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg">
                        {popupMessage}
                    </div>
                )}
            </form>
        </Form>
    );
}

function FileIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        </svg>
    );
}
