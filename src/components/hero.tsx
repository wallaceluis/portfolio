"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Meteors } from "./ui/meteors";
import { useLanguage } from "@/contexts/language-context";

// WebGL pesado (three + postprocessing) fora do bundle inicial:
// carrega em chunk separado após a hidratação, sem bloquear o first paint.
const HeroBackground = dynamic(
    () => import("./hero-background").then((m) => m.HeroBackground),
    { ssr: false }
);

const WHATSAPP_URL =
    "https://wa.me/5519982571877?text=Ol%C3%A1%20Wallace!%20Vi%20seu%20portf%C3%B3lio%20e%20quero%20conversar.";

const SOCIALS = [
    { href: "https://github.com/wallaceluis", label: "GitHub", icon: Github },
    { href: "https://linkedin.com/in/wallaceluis", label: "LinkedIn", icon: Linkedin },
    { href: "mailto:contato@wallaceluis.com.br", label: "Email", icon: Mail },
];

const FOCUS_TAGS = ["TypeScript", "React · React Native", "Node.js · Nest.js", "AWS · Docker", "IA Generativa"];

/**
 * O fundo WebGL só compensa em desktop: em mobile/baixa potência (ou com
 * "reduzir movimento") fica o gradiente CSS, sem descarregar three.js.
 */
const useWebGLBackground = () => {
    const [enabled, setEnabled] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
        const lowPower = (navigator.hardwareConcurrency ?? 8) <= 2;
        if (!mq.matches || lowPower) return;
        // Espera o browser ficar ocioso para não competir com a hidratação
        const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
        const id = ric(() => setEnabled(true));
        return () => (window.cancelIdleCallback ?? window.clearTimeout)(id);
    }, []);
    return enabled;
};

export const Hero = () => {
    const { t } = useLanguage();
    const webgl = useWebGLBackground();

    return (
        <div id="top" className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pt-32 pb-24 bg-slate-950 scroll-mt-24">
            <div className="absolute inset-0 w-full h-full z-0" aria-hidden="true">
                {/* Fallback/base: gradientes CSS (sempre presentes, custo zero) */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-black" />
                <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] max-w-[120vw] rounded-full bg-blue-600/20 blur-3xl" />
                <div className="absolute right-[-10rem] bottom-[-6rem] w-[28rem] h-[28rem] rounded-full bg-purple-600/15 blur-3xl" />
                {webgl && <HeroBackground mode="developer" />}
                <div className="absolute inset-0 bg-black/40 z-[1]" />
            </div>

            <div className="absolute inset-0 w-full h-full bg-grid z-[2] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" aria-hidden="true" />
            <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-[3]" aria-hidden="true" />

            <div className="absolute inset-0 overflow-hidden z-[4] pointer-events-none" aria-hidden="true">
                <Meteors number={12} />
            </div>

            <div className="hero-in relative z-10 mx-auto mb-6 group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-600 opacity-60 blur-md group-hover:opacity-90 transition-opacity duration-500" aria-hidden="true" />
                <div className="relative w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-slate-950 overflow-hidden">
                    <Image
                        src="/foto-perfil.jpg"
                        alt="Foto do Wallace Luis"
                        fill
                        sizes="160px"
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <h1 className="hero-in text-5xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-sans tracking-tight mb-4 [animation-delay:80ms]">
                    Wallace Luis
                </h1>

                <p className="hero-in text-xl md:text-3xl font-medium tracking-wide text-balance bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 [animation-delay:160ms]">
                    {t("hero.roleDev")}
                </p>

                <p className="hero-in mt-6 mb-6 text-neutral-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed text-pretty [animation-delay:240ms]">
                    {t("hero.description")}
                </p>

                <ul className="hero-in flex flex-wrap justify-center gap-2 mb-8 [animation-delay:300ms]" aria-label="Stack principal">
                    {FOCUS_TAGS.map((tag) => (
                        <li
                            key={tag}
                            className="text-[11px] md:text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 backdrop-blur-sm"
                        >
                            {tag}
                        </li>
                    ))}
                </ul>

                {/* Resumo textual para ATS/leitores de ecrã: cargo + stack principal */}
                <p className="sr-only">
                    Desenvolvedor Full Stack Pleno — TypeScript, JavaScript, React, React Native,
                    Next.js, Node.js, Nest.js, PostgreSQL, REST APIs, microsserviços, AWS, Docker,
                    Terraform, IA generativa, OpenAI, automação. Contato: contato@wallaceluis.com.br.
                </p>

                <div className="hero-in flex flex-col sm:flex-row items-center justify-center gap-3 [animation-delay:360ms]">
                    <a
                        href="#impacto"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 hover:brightness-110 shadow-[0_0_20px_rgba(59,130,246,0.4),0_0_40px_rgba(168,85,247,0.25)] transition-all"
                    >
                        {t("hero.ctaHighlights")}
                    </a>
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold text-white border border-white/20 bg-white/[0.02] backdrop-blur-sm hover:bg-white/10 transition-colors"
                    >
                        {t("hero.ctaWhatsapp")}
                    </a>
                </div>

                <div className="hero-in mt-8 flex items-center justify-center gap-3 [animation-delay:420ms]">
                    {SOCIALS.map(({ href, label, icon: Icon }) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="p-2.5 rounded-full text-neutral-400 border border-white/10 bg-white/[0.02] hover:text-white hover:border-white/30 transition-colors"
                        >
                            <Icon className="w-4 h-4" aria-hidden="true" />
                        </a>
                    ))}
                </div>
            </div>

            <a
                href="#tech-stack"
                aria-label="Rolar para baixo"
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 p-2 text-neutral-500 hover:text-white transition-colors motion-safe:animate-bounce"
            >
                <ArrowDown className="w-5 h-5" aria-hidden="true" />
            </a>
        </div>
    );
};
