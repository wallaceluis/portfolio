"use client";
import { useState } from "react";
import { DualModeToggle } from "@/components/dual-mode-toggle";
import { Hero } from "@/components/hero";
import { Experience } from "@/components/experience";
import { TechStack } from "@/components/tech-stack";
import { Footer } from "@/components/footer";

export default function Home() {
    const [mode, setMode] = useState<"developer" | "data-analyst">("developer");

    return (
        <main className="min-h-screen bg-black text-white selection:bg-neutral-700 selection:text-white">
            <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
                <div className="pointer-events-auto">
                    <DualModeToggle mode={mode} setMode={setMode} />
                </div>
            </div>

            <Hero mode={mode} />
            <Experience mode={mode} />
            <TechStack mode={mode} />
            <Footer />
        </main>
    );
}
