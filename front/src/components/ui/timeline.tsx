import React from "react";

interface TimelineStep {
    year: number;
    description: string;
}

const timelineData: TimelineStep[] = [
    { year: 2024, description: "The beginning of something great." },
    { year: 2025, description: "Progress continues." },
    { year: 2026, description: "Halfway through the journey." },
    { year: 2027, description: "Achievements pile up." },
    { year: 2028, description: "Nearing the finish line." },
    { year: 2029, description: "The final year of success." },
];

export const Timeline = () => {
    return (
        <div className="overflow-x-auto py-10">
            <div className="flex gap-12 min-w-[600px] items-center justify-center px-6">
                {timelineData.map((step, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="relative flex items-center justify-center">
                            <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold">
                                {step.year}
                            </div>
                            {index < timelineData.length - 1 && (
                                <div className="absolute left-1/2 top-1/2 w-24 h-1 bg-gray-300 -translate-x-1/2"></div>
                            )}
                        </div>
                        <p className="text-center mt-4 text-sm">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
