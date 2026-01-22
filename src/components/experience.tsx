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
import { useState } from "react";
import { ProjectModal } from "./ui/project-modal";

import { useLanguage } from "@/contexts/language-context";
import { div, img } from "framer-motion/client";
import { ImageCarousel } from "./ui/image-carousel";
import coinstrackerLight from "@/assets/images/coinstracker-light.png";
import coinstrackerDark from "@/assets/images/coinstracker-dark.png";

export const Experience = ({ mode }: { mode: "developer" | "data-analyst" }) => {
    const { t } = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<any>(null);

    const handleProjectClick = (project: any) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const devItems = [
        {
            title: t('experience.dev.recruitment.title'),
            description: t('experience.dev.recruitment.desc'),
            header: <div className="w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-slate-800 border border-white/10" />,
            icon: <Terminal className="h-4 w-4 text-neutral-500" />,
            className: "md:col-span-2",
            onClick: () => handleProjectClick({
                title: t('experience.dev.recruitment.title'),
                description: t('experience.dev.recruitment.desc'),
                images: ["https://placehold.co/800x400/0f172a/cbd5e1?text=Recruitment+Platform"],
                siteUrl: "https://coins-tracker-taupe.vercel.app/",
                githubUrl: "https://github.com/wallaceluis/coins-tracker"
            })
        },
        {
            title: t('experience.dev.openai.title'),
            description: t('experience.dev.openai.desc'),
            header: <div className="w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-950 to-indigo-900 border border-white/10" />,
            icon: <Bot className="h-4 w-4 text-neutral-500" />,
            className: "md:col-span-1",
            onClick: () => handleProjectClick({
                title: t('experience.dev.openai.title'),
                description: t('experience.dev.openai.desc'),
                images: ["https://placehold.co/800x400/1e1b4b/e0e7ff?text=OpenAI+Integration"],
                siteUrl: "https://coins-tracker-taupe.vercel.app/",
                githubUrl: "https://github.com/wallaceluis/coins-tracker"
            })
        },
        {
            title: t('experience.dev.coinstracker.title'),
            description: t('experience.dev.coinstracker.desc'),
            header: <ImageCarousel images={[coinstrackerDark.src, coinstrackerLight.src]} alt="Coins Tracker" />,
            icon: <Code2 className="h-5 w-5 text-neutral-500" />,
            className: "md:col-span-1",
            onClick: () => handleProjectClick({
                title: t('experience.dev.coinstracker.title'),
                description: t('experience.dev.coinstracker.desc'),
                images: [coinstrackerDark.src, coinstrackerLight.src],
                siteUrl: "https://coins-tracker-taupe.vercel.app/",
                githubUrl: "https://github.com/wallaceluis/coins-tracker"
            })
        },
        {
            title: t('experience.dev.frontend.title'),
            description: t('experience.dev.frontend.desc'),
            header: <div className="w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-cyan-950 to-blue-900 border border-white/10" />,
            icon: <Terminal className="h-4 w-4 text-neutral-500" />,
            className: "md:col-span-2",
            onClick: () => handleProjectClick({
                title: t('experience.dev.frontend.title'),
                description: t('experience.dev.frontend.desc'),
                images: ["https://placehold.co/800x400/083344/cffafe?text=Frontend+Architecture"],
                siteUrl: "https://coins-tracker-taupe.vercel.app/",
                githubUrl: "https://github.com/wallaceluis/coins-tracker"
            })
        }
    ];

    const dataItems = [
        {
            title: t('experience.data.vivo.title'),
            description: t('experience.data.vivo.desc'),
            header: <div className="w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-emerald-950 to-green-900 border border-white/10" />,
            icon: <LayoutDashboard className="h-4 w-4 text-neutral-500" />,
            className: "md:col-span-2",
            onClick: () => handleProjectClick({
                title: t('experience.data.vivo.title'),
                description: t('experience.data.vivo.desc'),
                images: ["https://placehold.co/800x400/022c22/d1fae5?text=Vivo+Analytics"],
                siteUrl: "https://coins-tracker-taupe.vercel.app/",
                githubUrl: "https://github.com/wallaceluis/coins-tracker"
            })
        },
        {
            title: t('experience.data.sla.title'),
            description: t('experience.data.sla.desc'),
            header: <div className="w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-teal-950 to-cyan-900 border border-white/10" />,
            icon: <PieChart className="h-4 w-4 text-neutral-500" />,
            className: "md:col-span-1",
            onClick: () => handleProjectClick({
                title: t('experience.data.sla.title'),
                description: t('experience.data.sla.desc'),
                images: ["https://placehold.co/800x400/134e4a/ccfbf1?text=SLA+Dashboards"],
                siteUrl: "https://coins-tracker-taupe.vercel.app/",
                githubUrl: "https://github.com/wallaceluis/coins-tracker"
            })
        },
        {
            title: t('experience.data.marketing.title'),
            description: t('experience.data.marketing.desc'),
            header: <div className="w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-orange-950 to-red-900 border border-white/10" />,
            icon: <TrendingUp className="h-4 w-4 text-neutral-500" />,
            className: "md:col-span-1",
            onClick: () => handleProjectClick({
                title: t('experience.data.marketing.title'),
                description: t('experience.data.marketing.desc'),
                images: ["https://placehold.co/800x400/451a03/ffedd5?text=Marketing+Intelligence"],
                siteUrl: "https://coins-tracker-taupe.vercel.app/",
                githubUrl: "https://github.com/wallaceluis/coins-tracker"
            })
        },
        {
            title: t('experience.data.processing.title'),
            description: t('experience.data.processing.desc'),
            header: <div className="w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-slate-900 to-gray-800 border border-white/10" />,
            icon: <Database className="h-4 w-4 text-neutral-500" />,
            className: "md:col-span-2",
            onClick: () => handleProjectClick({
                title: t('experience.data.processing.title'),
                description: t('experience.data.processing.desc'),
                images: ["https://placehold.co/800x400/0f172a/f1f5f9?text=Data+Processing"],
                siteUrl: "https://coins-tracker-taupe.vercel.app/",
                githubUrl: "https://github.com/wallaceluis/coins-tracker"
            })
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
                            onClick={(item as any).onClick}
                        />
                    ))}
                </BentoGrid>
            </div>
            <ProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                project={selectedProject}
                carouselClassName="bg-neutral-900 border-none"
            />
        </section>
    );
};
