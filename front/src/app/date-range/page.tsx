"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const formSchema = z.object({
    dateFrom: z.string().nonempty("This field is required"),
    dateTo: z.string().optional(),
    tags: z.string().nonempty("Add at least one tag"),
    resultsLimit: z
        .string()
        .min(1, "Minimum 1 result")
        .max(100, "Maximum 100 results"),
});

export default function FormPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            dateFrom: "",
            dateTo: "",
            tags: "",
            resultsLimit: "10",
        },
    });


    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const resultsLimit = parseInt(data.resultsLimit.toString(), 10);

        const tags = data.tags.split(",").map((tag) => tag.trim());
        const queryParams = new URLSearchParams({
            from_time: data.dateFrom,
            get_top: resultsLimit.toString(),
        });

        tags.forEach((tag) => {
            queryParams.append("tags", tag);
        });

        const url = `http://127.0.0.1:8000/data?${queryParams.toString()}`;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "accept": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();

            // Zapisz dane do localStorage
            localStorage.setItem("timelineData", JSON.stringify(responseData));

            // Redirect to /timeline
            window.location.href = "/timeline";
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
                <Header />
                <h1 className="text-2xl font-bold text-muted-foreground">Summarise your last few years</h1>
                <FormField control={form.control} name="dateFrom" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Date From</FormLabel>
                        <FormControl>
                            <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="dateTo" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Date To</FormLabel>
                        <FormControl>
                            <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="tags" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="e.g., Poland, USA" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="resultsLimit" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Number of Results</FormLabel>
                        <FormControl>
                            <Input type="number" min={1} max={100} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
