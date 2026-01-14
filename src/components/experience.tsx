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

import { useLanguage } from "@/contexts/language-context";

export const Experience = ({ mode }: { mode: "developer" | "data-analyst" }) => {
    const { t } = useLanguage();

    const devItems = [
        {
            title: t('experience.dev.recruitment.title'),
            description: t('experience.dev.recruitment.desc'),
            header: <div className="w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-slate-800 border border-white/10" />,
            icon: <Terminal className="h-4 w-4 text-neutral-500" />,
            className: "md:col-span-2",
        },
        {
            title: t('experience.dev.openai.title'),
            description: t('experience.dev.openai.desc'),
            header: <div className="w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-950 to-indigo-900 border border-white/10" />,
            icon: <Bot className="h-4 w-4 text-neutral-500" />,
            className: "md:col-span-1",
        },
        {
            title: t('experience.dev.backend.title'),
            description: t('experience.dev.backend.desc'),
            header: <div className="w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-violet-950 to-purple-900 border border-white/10" />,
            icon: <Code2 className="h-4 w-4 text-neutral-500" />,
            className: "md:col-span-1",
        },
        {
            title: t('experience.dev.frontend.title'),
            description: t('experience.dev.frontend.desc'),
            header: <div className="w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-cyan-950 to-blue-900 border border-white/10" />,
            icon: <Terminal className="h-4 w-4 text-neutral-500" />,
            className: "md:col-span-2",
        }
    ];

    const dataItems = [
        {
            title: t('experience.data.vivo.title'),
            description: t('experience.data.vivo.desc'),
            header: <div className="w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-emerald-950 to-green-900 border border-white/10" />,
            icon: <LayoutDashboard className="h-4 w-4 text-neutral-500" />,
            className: "md:col-span-2",
        },
        {
            title: t('experience.data.sla.title'),
            description: t('experience.data.sla.desc'),
            header: <div className="w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-teal-950 to-cyan-900 border border-white/10" />,
            icon: <PieChart className="h-4 w-4 text-neutral-500" />,
            className: "md:col-span-1",
        },
        {
            title: t('experience.data.marketing.title'),
            description: t('experience.data.marketing.desc'),
            header: <div className="w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-orange-950 to-red-900 border border-white/10" />,
            icon: <TrendingUp className="h-4 w-4 text-neutral-500" />,
            className: "md:col-span-1",
        },
        {
            title: t('experience.data.processing.title'),
            description: t('experience.data.processing.desc'),
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
                    {t('experience.sectionTitle')}
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
