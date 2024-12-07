// timeline-layout.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button"; // Zakładając, że masz już komponent Button
import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineTitle,
    TimelineIcon,
    TimelineDescription,
    TimelineContent,
    TimelineTime,
} from "@/components/timeline/timeline";
import { TimelineElement } from "@/app/data";

interface TimelineLayoutProps {
    items: TimelineElement[];
}

export const TimelineLayout = ({ items }: TimelineLayoutProps) => {
    return (
        <div className="flex flex-col items-center">
            <Timeline>
                {items.map((item) => (
                    <TimelineItem key={item.id}>
                        {items.indexOf(item) < items.length - 1 && <TimelineConnector />}
                        <TimelineHeader>
                            <TimelineTime>{item.date}</TimelineTime>
                            <TimelineIcon />
                            <TimelineTitle>{item.title}</TimelineTitle>
                        </TimelineHeader>
                        <TimelineContent>
                            <TimelineDescription>{item.description}</TimelineDescription>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>

            {/* Przycisk w prawym dolnym rogu */}
            <Button
                size={"lg"}
                onClick={() => {
                    window.location.href = "/recipient";
                }}
                className="mt-8"
            >
                Your family's history
            </Button>
        </div>
    );
};
