"use client";
import React from "react";
import { motion } from "framer-motion";
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


type Tech = { name: string; icon: any; detail?: string };
type Category = { title: string; items: Tech[] };

const languages: Category = {
    title: "Linguagens",
    items: [
        { name: "TypeScript", icon: FileCode },
        { name: "JavaScript", icon: Braces },
        { name: "SQL", icon: Database },
        { name: "Python", icon: Terminal },
    ],
};

const frontendMobile: Category = {
    title: "Frontend & Mobile",
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
    title: "Backend & APIs",
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
    title: "Infraestrutura, Cloud & IA",
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
    return (
        <section className="py-20 bg-neutral-900 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-24 md:h-32 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none" aria-hidden="true" />
            <div className="relative max-w-7xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white text-center">
                    Tech Stack
                </h2>
                <p className="text-neutral-400 text-center text-sm md:text-base mb-12 max-w-2xl mx-auto">
                    Ecossistema Full Stack — das linguagens base ao cloud e IA.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {devCategories.map((cat, catIdx) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIdx * 0.1 }}
                            className="rounded-2xl bg-neutral-950 border border-neutral-800 p-6 flex flex-col"
                        >
                            <h3 className="text-lg font-semibold text-white mb-1">
                                <span className="text-blue-500">▸ </span>
                                {cat.title}
                            </h3>
                            <p className="text-xs text-neutral-500 mb-5">
                                {cat.items.length} tecnologias
                            </p>
                            <div className="flex flex-wrap gap-2.5">
                                {cat.items.map((tech) => (
                                    <div
                                        key={tech.name}
                                        title={tech.detail ?? tech.name}
                                        className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-blue-500/50 hover:bg-neutral-800 transition-colors duration-300 max-w-full"
                                    >
                                        <tech.icon className="w-4 h-4 shrink-0 text-blue-400 group-hover:text-blue-300 transition-colors" />
                                        <div className="flex flex-col leading-tight min-w-0">
                                            <span className="text-xs md:text-sm font-medium text-neutral-300 group-hover:text-white transition-colors break-words">
                                                {tech.name}
                                            </span>
                                            {tech.detail && (
                                                <span className="text-[10px] text-neutral-500 break-words">
                                                    {tech.detail}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
