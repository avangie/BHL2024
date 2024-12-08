import { useEffect, useState } from "react";
import { TimelineLayout } from "@/components/timeline/timeline-layout";
import Header from "@/components/Header";

export default function TimelinePage() {
    const [timelineData, setTimelineData] = useState<TimelineElement[]>([]);

    useEffect(() => {
        const storedData = localStorage.getItem("timelineData");
        if (storedData) {
            const parsedData: TimelineElement[] = JSON.parse(storedData);
            setTimelineData(parsedData); // ustaw dane w stanie
        }
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center p-4 bg-background md:px-24 gap-4">
            <div className="max-w-5xl w-full items-center justify-between flex">
                <Header />
            </div>
            <div className="w-fit">
                <TimelineLayout items={timelineData} />
            </div>
        </main>
    );
}

export interface TimelineElement {
    id: number;
    title: string;
    time: string;
    message: string;
}
