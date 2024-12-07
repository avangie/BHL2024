"use client";

import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center p-4 bg-background md:px-24 gap-4">
            <Header />

            {/* Placeholder na przyszły komponent */}
            <div className="flex justify-center items-center w-full h-[60vh] border-dashed border-2 border-gray-400 mt-8">
                <p className="text-center text-lg text-gray-600">Future Component Placeholder</p>
            </div>

            <Button
                size={"lg"}
                onClick={() => {
                    window.location.href = "/timeline";
                }}
                className="mt-8" 
            >
                World's history
            </Button>
        </main>
    );
}
