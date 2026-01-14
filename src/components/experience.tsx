"use client";
import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
    Terminal,
    Bot,
    LayoutDashboard,
    TrendingUp,
    Database,
    Code2,
    PieChart
} from "lucide-react";
import { motion } from "framer-motion";

export const Experience = ({ mode }: { mode: "developer" | "data-analyst" }) => {
    const devItems = [
        {
            title: "Recruitment Ecosystem",
            description: "Built a comprehensive recruitment platform using Nest.js and Next.js, handling thousands of daily applications.",
            header: <div className="w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-slate-800 border border-white/10" />,
            icon: <Terminal className="h-4 w-4 text-neutral-500" />,
            className: "md:col-span-2",
        },
        {
            title: "OpenAI Smart Integrations",
            description: "Engineered automated resume screening and chatbot assistants for Grupo Multi360.",
            header: <div className="w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-950 to-indigo-900 border border-white/10" />,
            icon: <Bot className="h-4 w-4 text-neutral-500" />,
            className: "md:col-span-1",
        },
        {
            title: "Scalable Backend Systems",
            description: "Developed microservices architecture using Prisma ORM and Docker for high availability.",
            header: <div className="w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-violet-950 to-purple-900 border border-white/10" />,
            icon: <Code2 className="h-4 w-4 text-neutral-500" />,
            className: "md:col-span-1",
        },
        {
            title: "Modern Frontend Architecture",
            description: "Expertise in React, Tailwind CSS, and Framer Motion for highly interactive generic UIs.",
            header: <div className="w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-cyan-950 to-blue-900 border border-white/10" />,
            icon: <Terminal className="h-4 w-4 text-neutral-500" />,
            className: "md:col-span-2",
        }
    ];

    const dataItems = [
        {
            title: "Telefônica VIVO Analytics",
            description: "Led the development of Market Share analysis tools, driving strategic decision making in regional sectors.",
            header: <div className="w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-emerald-950 to-green-900 border border-white/10" />,
            icon: <LayoutDashboard className="h-4 w-4 text-neutral-500" />,
            className: "md:col-span-2",
        },
        {
            title: "SLA Monitoring Dashboards",
            description: "Designed real-time Power BI dashboards to track Service Level Agreements and operational KPIs.",
            header: <div className="w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-teal-950 to-cyan-900 border border-white/10" />,
            icon: <PieChart className="h-4 w-4 text-neutral-500" />,
            className: "md:col-span-1",
        },
        {
            title: "Marketing Intelligence",
            description: "Implemented Looker Studio reports to analyze campaign performance and ROI.",
            header: <div className="w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-orange-950 to-red-900 border border-white/10" />,
            icon: <TrendingUp className="h-4 w-4 text-neutral-500" />,
            className: "md:col-span-1",
        },
        {
            title: "Advanced Data Processing",
            description: "Utilized Python and SQL for complex data transformation and ETL pipelines.",
            header: <div className="w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-slate-900 to-gray-800 border border-white/10" />,
            icon: <Database className="h-4 w-4 text-neutral-500" />,
            className: "md:col-span-2",
        },
    ];

    const items = mode === 'developer' ? devItems : dataItems;

    return (
        <section className="py-20 bg-neutral-950 relative z-20">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
                    <span className={mode === 'developer' ? "text-blue-500" : "text-emerald-500"}>
                        {mode === 'developer' ? "Dev" : "Data"}
                    </span>{" "}
                    Experience
                </h2>
                <BentoGrid>
                    {items.map((item, i) => (
                        <BentoGridItem
                            key={mode + i}
                            title={item.title}
                            description={item.description}
                            header={item.header}
                            icon={item.icon}
                            className={item.className}
                        />
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
};
