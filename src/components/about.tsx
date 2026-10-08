"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Heart, UserRound } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { SectionBackground } from "./ui/section-background";
import { SectionHeader } from "./ui/section-header";

export const About = () => {
    const { t } = useLanguage();

    const cards = [
        {
            id: "technical",
            icon: <Cpu className="h-5 w-5" aria-hidden="true" />,
            text: t("about.p1"),
            accent: "blue" as const,
        },
        {
            id: "personal",
            icon: <Heart className="h-5 w-5" aria-hidden="true" />,
            text: t("about.p2"),
            accent: "purple" as const,
        },
    ];

    return (
        <section
            id="sobre"
            aria-labelledby="about-heading"
            className="relative py-20 md:py-28 bg-black overflow-hidden scroll-mt-24"
        >
            {/* Profundidade: glows + grelha subtil, como no hero */}
            <SectionBackground />
            <div className="absolute top-0 inset-x-0 h-24 md:h-32 bg-gradient-to-b from-neutral-950 to-transparent pointer-events-none" aria-hidden="true" />

            <div className="relative max-w-5xl mx-auto px-4">
                <SectionHeader
                    id="about-heading"
                    index="04"
                    label={t("nav.sobre")}
                    title={t("about.title")}
                    icon={UserRound}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list">
                    {cards.map((card, idx) => (
                        <motion.article
                            key={card.id}
                            role="listitem"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.45 }}
                            className={`group relative flex flex-col rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/10 p-6 md:p-8 shadow-2xl transition-colors ${
                                card.accent === "blue"
                                    ? "hover:border-blue-500/40"
                                    : "hover:border-purple-500/40"
                            }`}
                        >
                            <div
                                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${
                                    card.accent === "blue"
                                        ? "from-blue-500"
                                        : "from-purple-500"
                                } to-transparent`}
                            />
                            <div className="relative z-10 flex flex-col h-full">
                                <span
                                    className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border mb-5 shrink-0 ${
                                        card.accent === "blue"
                                            ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                                            : "bg-purple-500/10 border-purple-500/20 text-purple-400"
                                    }`}
                                >
                                    {card.icon}
                                </span>
                                <p className="text-neutral-400 text-sm leading-relaxed text-pretty">
                                    {card.text}
                                </p>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};
