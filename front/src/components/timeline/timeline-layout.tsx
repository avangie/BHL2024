// timeline-layout.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
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
                            <TimelineTime>{item.time}</TimelineTime>
                            <TimelineIcon />
                            <TimelineTitle>{item.title}</TimelineTitle>
                        </TimelineHeader>
                        <TimelineContent>
                            <TimelineDescription>{item.message}</TimelineDescription>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>

            <Button
                size={"lg"}
                onClick={() => {
                    window.location.href = "/recipient";
                }}
                className="mt-8"
            >
                Your family&apos;s history
            </Button>
        </div>
    );
};
