"use client";

import React from "react";
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
        <Timeline>
            {items.map((item) => {
                return (
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
                );
            })}
        </Timeline>
    );
};
