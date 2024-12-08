"use client";

import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Postcard from "@/components/postcard/Postcard";

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center p-4 bg-background md:px-24 gap-4">
            <Header />

            <Postcard />

            <Button
                size={"lg"}
                onClick={() => {
                    window.location.href = "/date-range";
                }}
                className="mt-8"
            >
                World's history
            </Button>
        </main>
    );
}
