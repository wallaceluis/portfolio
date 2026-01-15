"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DualModeToggleProps {
    mode: "developer" | "data-analyst";
    setMode: (mode: "developer" | "data-analyst") => void;
}

export const DualModeToggle = ({ mode, setMode }: DualModeToggleProps) => {
    return (
        <div className="flex items-center justify-center">
            <div className="relative grid grid-cols-2 w-fit items-center rounded-full bg-neutral-900 border border-white/10 p-1.5 shadow-2xl backdrop-blur-md">
                <button
                    onClick={() => setMode("developer")}
                    className={cn(
                        "relative z-10 flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold transition-colors duration-300",
                        mode === "developer" ? "text-white" : "text-neutral-400 hover:text-neutral-200"
                    )}
                >
                    <Code2 className="w-4 h-4" />
                    <span>Dev & IA</span>
                </button>
                <button
                    onClick={() => setMode("data-analyst")}
                    className={cn(
                        "relative z-10 flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold transition-colors duration-300",
                        mode === "data-analyst" ? "text-white" : "text-neutral-400 hover:text-neutral-200"
                    )}
                >
                    <BarChart3 className="w-4 h-4" />
                    <span>Data & BI</span>
                </button>

                <motion.div
                    className={cn(
                        "absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-full shadow-lg z-0",
                        mode === 'developer' ? "bg-gradient-to-r from-blue-600 to-cyan-500" : "bg-gradient-to-r from-emerald-500 to-green-600"
                    )}
                    animate={{
                        x: mode === 'developer' ? '0%' : '100%',
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            </div>
        </div>

    );
};
