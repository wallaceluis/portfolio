"use client";
import { Hero } from "@/components/hero";
import { Experience } from "@/components/experience";
import { TechStack } from "@/components/tech-stack";
import { Timeline } from "@/components/timeline";
import { About } from "@/components/about";
import { Footer } from "@/components/footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-neutral-700 selection:text-white">
            <Hero />
            <TechStack />
            <Experience />
            <Timeline />
            <About />
            <Footer />
        </main>
    );
}
