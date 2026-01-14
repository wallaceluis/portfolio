"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Code, BarChart, GraduationCap, Briefcase, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export const Timeline = ({ mode }: { mode: "developer" | "data-analyst" }) => {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    const timelineData = [
        {
            id: "multi360",
            icon: mode === 'developer' ? <Code className="w-6 h-6" /> : <BarChart className="w-6 h-6" />,
            color: mode === 'developer' ? "bg-blue-500" : "bg-emerald-500",
            textClass: mode === 'developer' ? "text-blue-400" : "text-emerald-400",
            borderClass: mode === 'developer' ? "border-blue-500/20" : "border-emerald-500/20",
            content: {
                period: t("timeline.multi360.period"),
                company: t("timeline.multi360.company"),
                title: mode === 'developer' ? t("timeline.multi360.dev.title") : t("timeline.multi360.data.title"),
                desc: mode === 'developer' ? t("timeline.multi360.dev.desc") : t("timeline.multi360.data.desc"),
            }
        },
        {
            id: "vivo",
            icon: mode === 'developer' ? <Code className="w-6 h-6" /> : <BarChart className="w-6 h-6" />,
            color: mode === 'developer' ? "bg-blue-500" : "bg-emerald-500",
            textClass: mode === 'developer' ? "text-blue-400" : "text-emerald-400",
            borderClass: mode === 'developer' ? "border-blue-500/20" : "border-emerald-500/20",
            content: {
                period: t("timeline.vivo.period"),
                company: t("timeline.vivo.company"),
                title: mode === 'developer' ? t("timeline.vivo.dev.title") : t("timeline.vivo.data.title"),
                desc: mode === 'developer' ? t("timeline.vivo.dev.desc") : t("timeline.vivo.data.desc"),
            }
        },
        {
            id: "education",
            icon: <GraduationCap className="w-6 h-6" />,
            color: "bg-purple-500",
            textClass: "text-purple-400",
            borderClass: "border-purple-500/20",
            content: {
                period: t("timeline.education.period"),
                company: t("timeline.education.institution"),
                title: t("timeline.education.title"),
                desc: t("timeline.education.desc"),
            }
        }
    ];

    return (
        <section
            className="w-full bg-neutral-950 font-sans md:px-10 py-20 relative overflow-hidden"
            ref={containerRef}
        >
            {/* Section Title */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto px-4 mb-16 text-center"
            >
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500">
                    {t('timeline.sectionTitle')}
                </h2>
                <p className="text-neutral-400 mt-4 max-w-2xl mx-auto text-sm md:text-base">
                    {mode === 'developer'
                        ? t('timeline.sectionSubtitleDev')
                        : t('timeline.sectionSubtitleData')}
                </p>
            </motion.div>

            <div className="max-w-4xl mx-auto relative px-4">
                {/* Vertical Line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neutral-800 via-neutral-700 to-transparent ml-[-1px] md:ml-[0px]">
                    <motion.div
                        style={{ height: heightTransform, opacity: opacityTransform }}
                        className={`absolute top-0 left-0 w-full bg-gradient-to-b from-transparent ${mode === 'developer' ? 'via-blue-500' : 'via-emerald-500'} to-transparent`}
                    />
                </div>

                {timelineData.map((item, index) => (
                    <TimelineItem key={index} item={item} index={index} mode={mode} />
                ))}
            </div>
        </section>
    );
};

const TimelineItem = ({ item, index, mode }: { item: any, index: number, mode: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div
            ref={ref}
            className={`flex flex-col md:flex-row gap-8 mb-20 relative ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
        >
            {/* Pulsing Dot */}
            <div className="absolute left-8 md:left-1/2 top-0 transform -translate-x-1/2 flex items-center justify-center z-10 w-8 h-8 rounded-full bg-neutral-950 border border-neutral-800 shadow-xl">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                    className={`w-3 h-3 rounded-full ${item.color} shadow-[0_0_10px_2px_rgba(255,255,255,0.2)]`}
                />
            </div>

            {/* Date/Period (Mobile: Top, Desktop: Side) */}
            <div className={`w-full md:w-1/2 flex ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"} pl-16 md:pl-0 md:pr-12 md:text-right ${index % 2 === 0 ? "md:pr-0 md:pl-12 md:text-left" : ""}`}>
                <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col gap-1 md:items-end justify-center"
                >
                    <div className="flex items-center gap-2 text-neutral-400 text-sm font-mono">
                        <Calendar size={14} />
                        {item.content.period}
                    </div>
                </motion.div>
            </div>

            {/* Content Card */}
            <div className={`w-full md:w-1/2 flex ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"} pl-16 md:pl-0`}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className={`relative w-full p-6 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border ${item.borderClass} hover:border-opacity-50 transition-colors shadow-2xl group`}
                >
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-r ${item.color.replace('bg-', 'from-')} to-transparent`} />

                    <div className="relative z-10">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium mb-4 ${item.textClass}`}>
                            {item.icon}
                            {item.content.company}
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                            {item.content.title}
                        </h3>

                        <p className="text-neutral-400 text-sm leading-relaxed">
                            {item.content.desc}
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}