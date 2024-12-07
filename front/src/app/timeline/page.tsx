import React from "react";
import { Timeline } from "@/components/ui/timeline";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Timeline 2024 - 2029</h1>
      <Timeline />
    </main>
  );
}
