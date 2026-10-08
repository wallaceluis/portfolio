"use client";
import React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { SectionHeader } from "./ui/section-header";
import {
    Atom,
    Smartphone,
    Zap,
    AppWindow,
    Palette,
    RefreshCw,
    Shapes,
    Server,
    Flame,
    Boxes,
    Rocket,
    Sparkles,
    Globe,
    Cloud,
    Workflow,
    Database,
    Layers,
    Bot,
    Brain,
    Mic,
    MessageSquare,
    Terminal,
    GitBranch,
    Box,
    Network,
    Wrench,
    FileCode,
    Braces,
} from "lucide-react";


type Tech = { name: string; icon: LucideIcon; detail?: string };
// title = chave de tradução em techStack.*
type Category = { title: string; icon: LucideIcon; items: Tech[] };

const languages: Category = {
    title: "languages",
    icon: Braces,
    items: [
        { name: "TypeScript", icon: FileCode },
        { name: "JavaScript", icon: Braces },
        { name: "SQL", icon: Database },
        { name: "Python", icon: Terminal },
    ],
};

const frontendMobile: Category = {
    title: "frontend",
    icon: AppWindow,
    items: [
        { name: "React", icon: Atom },
        { name: "React Native", icon: Smartphone, detail: "bare workflow · iOS/Android" },
        { name: "Vite", icon: Zap },
        { name: "Next.js", icon: AppWindow },
        { name: "Tailwind CSS", icon: Palette },
        { name: "TanStack Query", icon: RefreshCw },
        { name: "Fabric.js", icon: Shapes },
    ],
};

const backendApis: Category = {
    title: "backend",
    icon: Server,
    items: [
        { name: "Node.js", icon: Server },
        { name: "Bun", icon: Flame },
        { name: "Nest.js", icon: Boxes },
        { name: "Fastify", icon: Rocket },
        { name: "Hono", icon: Sparkles },
        { name: "REST", icon: Globe },
        { name: "Serverless Framework", icon: Cloud },
        { name: "GraphQL", icon: Network },
    ],
};

const infraCloudAi: Category = {
    title: "infra",
    icon: Cloud,
    items: [
        { name: "AWS", icon: Cloud },
        { name: "GCP", icon: Globe },
        { name: "Backblaze B2", icon: Database },
        { name: "Terraform", icon: Layers },
        { name: "Docker", icon: Box },
        { name: "CI/CD", icon: GitBranch },
        { name: "OpenAI API", icon: Bot },
        { name: "Gemini", icon: Brain },
        { name: "ElevenLabs", icon: Mic },
        { name: "OpenRouter", icon: Workflow },
        { name: "Cursor", icon: Terminal },
        { name: "Claude Code", icon: Sparkles },
        { name: "MCPs", icon: Wrench },
        { name: "Make", icon: Workflow },
        { name: "n8n", icon: MessageSquare },
    ],
};

const devCategories: Category[] = [languages, frontendMobile, backendApis, infraCloudAi];

export const TechStack = () => {
    const { t } = useLanguage();
    return (
        <section id="tech-stack" aria-labelledby="tech-stack-heading" className="py-20 md:py-28 bg-neutral-950 relative overflow-hidden scroll-mt-24">
            <div className="absolute top-0 inset-x-0 h-24 md:h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" aria-hidden="true" />
            <div className="relative max-w-6xl mx-auto px-4">
                <SectionHeader
                    id="tech-stack-heading"
                    index="01"
                    label={t("nav.stack")}
                    title={t("techStack.title")}
                    subtitle={t("techStack.subtitle")}
                    icon={Layers}
                />

                <div className="rounded-3xl border border-white/10 bg-neutral-900/40 divide-y divide-white/10 overflow-hidden">
                    {devCategories.map((cat, catIdx) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ delay: catIdx * 0.08, duration: 0.4 }}
                            className="grid md:grid-cols-[15rem_1fr] gap-4 md:gap-8 p-6 md:p-8 hover:bg-white/[0.02] transition-colors"
                        >
                            <div className="flex md:flex-col items-center md:items-start gap-3">
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
                                    <cat.icon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                <div>
                                    <h3 className="text-base md:text-lg font-semibold text-white leading-snug">
                                        {t(`techStack.${cat.title}`)}
                                    </h3>
                                    <p className="text-xs text-neutral-500 font-mono">
                                        {String(cat.items.length).padStart(2, "0")} {t("techStack.count")}
                                    </p>
                                </div>
                            </div>
                            <ul className="flex flex-wrap content-start gap-2" aria-label={t(`techStack.${cat.title}`)}>
                                {cat.items.map((tech) => (
                                    <li
                                        key={tech.name}
                                        title={tech.detail ?? tech.name}
                                        className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 hover:border-blue-500/50 hover:bg-neutral-800 hover:-translate-y-0.5 transition-all duration-300 max-w-full"
                                    >
                                        <tech.icon className="w-4 h-4 shrink-0 text-blue-400 group-hover:text-blue-300 transition-colors" aria-hidden="true" />
                                        <span className="text-xs md:text-sm font-medium text-neutral-300 group-hover:text-white transition-colors break-words">
                                            {tech.name}
                                            {tech.detail && (
                                                <span className="ml-1.5 text-[10px] text-neutral-500">{tech.detail}</span>
                                            )}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
