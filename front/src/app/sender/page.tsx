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

const formSchema = z.object({
    authorField: z.string(),
    recipientField: z.string(),
    titleField: z.string(),
    messageField: z.string(),
    fileInput: z.string().optional(),
});

export default function SenderForm() {
    const [file, setFile] = useState<File | null>(null);
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
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            const validExtensions = ["image/jpeg", "image/png"];
            if (validExtensions.includes(selectedFile.type)) {
                setFile(selectedFile);
            } else {
                alert("Only .jpg, .jpeg, and .png files are allowed.");
                e.target.value = "";
            }
        }
    };


    const handleFileRemove = () => {
        setFile(null);
        const fileInput = document.getElementById("file") as HTMLInputElement;
        if (fileInput) {
            fileInput.value = "";
        }
    };

    async function onSubmit(values: {
        authorField: string;
        recipientField: string;
        titleField: string;
        messageField: string;
    }) {
        try {
            const formData = new FormData();
            formData.append("author", values.authorField);
            formData.append("recipient", values.recipientField);
            formData.append("title", values.titleField);
            formData.append("message", values.messageField);
            if (file) {
                formData.append("file", file);
            }

            const response = await fetch("http://127.0.0.1:8000/upload", {
                method: "POST",
                body: formData,
            });


            if (response.ok) {
                setPopupMessage("Form submitted successfully!");
                form.reset();
                setFile(null);
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

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-3xl bg-black/40 backdrop-blur-xl p-8 rounded-lg border border-white/10">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
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
                                </div>
                                <div className="space-y-2 text-sm">
                                    <Label htmlFor="file" className="text-sm font-medium">
                                        File
                                    </Label>
                                    <Input
                                        id="file"
                                        type="file"
                                        accept=".jpg,.jpeg,.png"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                {file && (
                                    <div className="mt-2 text-sm text-gray-500 flex items-center">
                                        <span>{file.name}</span>
                                        <button
                                            type="button"
                                            onClick={handleFileRemove}
                                            className="ml-2 text-red-500 mt-1.4"
                                        >
                                            X
                                        </button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Button type="submit">Submit</Button>

                        {popupMessage && (
                            <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg">
                                {popupMessage}
                            </div>
                        )}
                    </form>
                </Form>
            </div>
        </div>
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
