"use client";
import React from "react";
import Image from "next/image";
import { Meteors } from "./ui/meteors";
import { HeroBackground } from "./hero-background";
import { motion } from "framer-motion";


import { useLanguage } from "@/contexts/language-context";

export const Hero = () => {
    const { t } = useLanguage();
    return (
        <div id="top" className="relative w-full min-h-[42rem] h-auto flex flex-col items-center justify-center overflow-hidden transition-colors duration-500 pt-32 pb-16 bg-slate-950 scroll-mt-24">

            <div className="absolute inset-0 w-full h-full z-0">
                <HeroBackground mode="developer" />

                <div className="absolute inset-0 bg-black/40 z-[1]" />
            </div>

            <div className="absolute inset-0 w-full h-full bg-grid-white/[0.03] z-[2]" />
            <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-[3]" />


            <div className="relative z-10 mx-auto w-42 h-42 mb-4 mt-8 rounded-full border-4 border-white/10 overflow-hidden shadow-2xl hover:scale-105 hover:border-cyan-500/40 hover:shadow-[0_0_60px_rgba(56,189,248,0.35),0_0_100px_rgba(168,85,247,0.3)] transition-all duration-500">
                <Image
                    src="/foto-perfil.jpg"
                    alt="Foto do Wallace Luis"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-sans tracking-tight mb-6"
                >
                    Wallace Luis
                </motion.h1>

                <div className="min-h-[3rem] flex items-center justify-center overflow-hidden px-2">
                    <motion.p
                        initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="text-xl md:text-3xl font-medium tracking-wide text-center text-balance text-blue-400"
                    >
                        {t('hero.roleDev')}
                    </motion.p>
                </div>

                <p className="mt-6 mb-8 text-neutral-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed text-pretty">
                    {t('hero.description')}
                </p>

                {/* Resumo textual para ATS/leitores de ecrã: cargo + stack principal */}
                <p className="sr-only">
                    Desenvolvedor Full Stack Pleno — TypeScript, JavaScript, React, React Native,
                    Next.js, Node.js, Nest.js, PostgreSQL, REST APIs, microsserviços, AWS, Docker,
                    Terraform, IA generativa, OpenAI, automação. Contato: contato@wallaceluis.com.br.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="#impacto"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 shadow-[0_0_20px_rgba(59,130,246,0.4),0_0_40px_rgba(168,85,247,0.25)] transition-all"
                    >
                        {t('hero.ctaHighlights')}
                    </a>
                    <a
                        href="https://wa.me/5519982571877?text=Ol%C3%A1%20Wallace!%20Vi%20seu%20portf%C3%B3lio%20e%20quero%20conversar."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold text-white border border-white/20 hover:bg-white/5 transition-colors"
                    >
                        {t('hero.ctaWhatsapp')}
                    </a>
                </div>
            </div>

            <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden z-[4]">

                <Meteors number={20} />
            </div>

            <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden z-[4]">

                <Meteors number={20} />
            </div>

            <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden z-[4] rotate-180 opacity-70">

                <Meteors number={15} />
            </div>

            <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden z-[4] rotate-180 opacity-70">

                <Meteors number={15} />
            </div>
        </div>
    );
};
