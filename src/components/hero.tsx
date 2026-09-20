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
        <div className="relative w-full min-h-[42rem] h-auto flex flex-col items-center justify-center overflow-hidden transition-colors duration-500 pt-10 pb-16 bg-slate-950">

            <div className="absolute inset-0 w-full h-full z-0">
                <HeroBackground mode="developer" />

                <div className="absolute inset-0 bg-black/40 z-[1]" />
            </div>

            <div className="absolute inset-0 w-full h-full bg-grid-white/[0.03] z-[2]" />
            <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-[3]" />


            <div className="relative z-10 mx-auto w-42 h-42 mb-4 mt-8 rounded-full border-4 border-white/10 overflow-hidden shadow-2xl">
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
