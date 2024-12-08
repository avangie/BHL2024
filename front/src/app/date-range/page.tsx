"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const formSchema = z.object({
    dateFrom: z.string().nonempty("This field is required"),
    dateTo: z.string().optional(),
    tags: z.string().nonempty("Add at least one tag"),
    resultsLimit: z
        .number()
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
            resultsLimit: 10,
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log("Form data:", data);
        alert("Form submitted! Check console for details.");
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 max-w-3xl mx-auto py-10"
            >
                <Header />
                <h1 className="text-2xl font-bold text-muted-foreground">Summarise your last few years</h1>
                <FormField
                    control={form.control}
                    name="dateFrom"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date From</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dateTo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date To</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="e.g., Poland, Warsaw, elections"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="resultsLimit"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Number of Results</FormLabel>
                            <FormControl>
                                <Input type="number" min={1} max={100} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
