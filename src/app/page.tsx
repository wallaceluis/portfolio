"use client";
import { MotionConfig } from "framer-motion";
import { Hero } from "@/components/hero";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { TechStack } from "@/components/tech-stack";
import { Timeline } from "@/components/timeline";
import { About } from "@/components/about";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function Home() {
    return (
        // reducedMotion="user": respeita "reduzir movimento" do sistema em todas as animações
        <MotionConfig reducedMotion="user">
            <main className="min-h-screen bg-black text-white selection:bg-blue-500/40 selection:text-white">
                <Navbar />
                <Hero />
                <TechStack />
                <Experience />
                <Projects />
                <Timeline />
                <About />
                <Footer />
            </main>
        </MotionConfig>
    );
}
