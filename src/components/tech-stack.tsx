"use client";
import React from "react";
import { motion } from "framer-motion";
import {
    Atom,
    AppWindow,
    Server,
    Database,
    FileCode,
    Binary,
    BarChart4,
    AreaChart,
    Code,
    Layers,
    Cpu
} from "lucide-react";

export const TechStack = ({ mode }: { mode: "developer" | "data-analyst" }) => {
    const devStack = [
        { name: "React", icon: Atom },
        { name: "Next.js", icon: AppWindow },
        { name: "Nest.js", icon: Server },
        { name: "Prisma", icon: Database },
        { name: "TypeScript", icon: FileCode },
        { name: "Docker", icon: Layers },
    ];

    const dataStack = [
        { name: "Python", icon: Code },
        { name: "SQL", icon: Database },
        { name: "Power BI", icon: BarChart4 },
        { name: "Looker Studio", icon: AreaChart },
        { name: "Machine Learning", icon: Cpu },
        { name: "Strategic Analysis", icon: Binary },
    ];

    const stack = mode === 'developer' ? devStack : dataStack;

    return (
        <section className="py-20 bg-black border-t border-neutral-900">
            <div className="max-w-5xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
                    Tech Stack
                </h2>

                <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                    {stack.map((tech, idx) => (
                        <motion.div
                            key={tech.name + mode} // Key changes on mode to trigger animation
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex flex-col items-center gap-3 group"
                        >
                            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 group-hover:border-neutral-600 group-hover:bg-neutral-800 transition-colors duration-300">
                                <tech.icon className={`w-8 h-8 md:w-12 md:h-12 ${mode === 'developer' ? 'text-blue-400 group-hover:text-blue-300' : 'text-emerald-400 group-hover:text-emerald-300'} transition-colors duration-300`} />
                            </div>
                            <span className="text-sm md:text-base font-medium text-neutral-400 group-hover:text-white transition-colors">
                                {tech.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
