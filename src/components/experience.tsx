"use client";
import React from "react";
import {
    Smartphone,
    Palette,
    Bot,
    Network,
    Users,
    Share2,
} from "lucide-react";
import { motion } from "framer-motion";

import { useLanguage } from "@/contexts/language-context";
import { SectionBackground } from "./ui/section-background";

/* ------------------------------------------------------------------ */
/*  Destaques Técnicos & Impacto — conteúdo trilíngue                  */
/*  Tags são keywords universais (iguais em pt/en/es) para ATS/parsers */
/* ------------------------------------------------------------------ */

type Highlight = {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    metric?: string;
    tags: string[];
};

const HIGHLIGHTS_I18N: Record<"pt" | "en" | "es", { sectionTitle: string; subtitle: string; items: Omit<Highlight, "icon">[] }> = {
    pt: {
        sectionTitle: "Destaques Técnicos & Impacto",
        subtitle: "Soluções em produção com arquitetura escalável, métricas reais e foco em IA.",
        items: [
            {
                id: "mobile-ai",
                title: "App Mobile com IA Conversacional",
                description:
                    "Desenvolvimento e manutenção de aplicação nativa (iOS/Android) com foco em geração de media via IA conversacional, escalada para mais de 2.000 utilizadores ativos.",
                metric: "2.000+ utilizadores ativos",
                tags: ["React Native", "iOS", "Android", "IA Conversacional", "Firebase", "WebSockets"],
            },
            {
                id: "studio",
                title: "Estúdio Gráfico em Browser",
                description:
                    "Criação de um estúdio avançado de edição para geração de encartes, cartazes e vídeos diretamente no browser, suportando exportação complexa e manipulação de objetos em tempo real.",
                tags: ["Fabric.js", "React", "Vite", "Node-Canvas", "FFMPEG"],
            },
            {
                id: "genai",
                title: "Ecossistema de IAs Generativas",
                description:
                    "Integração intensiva de múltiplos modelos fundacionais para processamento e geração inteligente de texto, áudio e vídeo em plataformas de produção de conteúdo.",
                tags: ["OpenAI API", "Gemini Live", "ElevenLabs", "Veo", "Hugging Face"],
            },
            {
                id: "b2b-apis",
                title: "Desenvolvimento e Documentação de APIs B2B",
                description:
                    "Construção de APIs REST escaláveis para consumo por parceiros externos, incluindo a elaboração de documentação técnica detalhada para garantir integrações fluidas e seguras.",
                tags: ["Node.js", "REST API", "Swagger/OpenAPI", "Integração de Sistemas", "Arquitetura de Software"],
            },
            {
                id: "recruitment",
                title: "Plataforma de Recrutamento e Seleção",
                description:
                    "Liderança técnica na arquitetura e desenvolvimento full stack de um sistema colaborativo de recrutamento, otimizando o fluxo de gestão de candidatos.",
                tags: ["Nest.js", "Next.js", "TypeScript", "PostgreSQL"],
            },
            {
                id: "social",
                title: "Automação e Integração Multiplataforma",
                description:
                    "Desenvolvimento de soluções SaaS para automação de postagens e gestão de conteúdo B2B, integrando com APIs de redes sociais e mensageria para escalabilidade de comunicação.",
                tags: ["LinkedIn API", "Meta API", "WhatsApp Oficial", "OAuth"],
            },
        ],
    },
    en: {
        sectionTitle: "Technical Highlights & Impact",
        subtitle: "Production solutions with scalable architecture, real metrics and AI focus.",
        items: [
            {
                id: "mobile-ai",
                title: "Mobile App with Conversational AI",
                description:
                    "Development and maintenance of a native application (iOS/Android) focused on media generation via conversational AI, scaled to over 2,000 active users.",
                metric: "2,000+ active users",
                tags: ["React Native", "iOS", "Android", "IA Conversacional", "Firebase", "WebSockets"],
            },
            {
                id: "studio",
                title: "In-Browser Graphic Studio",
                description:
                    "Creation of an advanced editing studio for generating flyers, posters and videos directly in the browser, supporting complex export and real-time object manipulation.",
                tags: ["Fabric.js", "React", "Vite", "Node-Canvas", "FFMPEG"],
            },
            {
                id: "genai",
                title: "Generative AI Ecosystem",
                description:
                    "Intensive integration of multiple foundation models for intelligent processing and generation of text, audio and video on content production platforms.",
                tags: ["OpenAI API", "Gemini Live", "ElevenLabs", "Veo", "Hugging Face"],
            },
            {
                id: "b2b-apis",
                title: "B2B API Development & Documentation",
                description:
                    "Building scalable REST APIs for consumption by external partners, including detailed technical documentation to ensure smooth and secure integrations.",
                tags: ["Node.js", "REST API", "Swagger/OpenAPI", "Integração de Sistemas", "Arquitetura de Software"],
            },
            {
                id: "recruitment",
                title: "Recruitment & Selection Platform",
                description:
                    "Technical leadership in the architecture and full stack development of a collaborative recruitment system, optimizing candidate management flow.",
                tags: ["Nest.js", "Next.js", "TypeScript", "PostgreSQL"],
            },
            {
                id: "social",
                title: "Multi-Platform Automation & Integration",
                description:
                    "Development of SaaS solutions for post automation and B2B content management, integrating with social media and messaging APIs for communication scalability.",
                tags: ["LinkedIn API", "Meta API", "WhatsApp Oficial", "OAuth"],
            },
        ],
    },
    es: {
        sectionTitle: "Aspectos Técnicos Destacados & Impacto",
        subtitle: "Soluciones en producción con arquitectura escalable, métricas reales y enfoque en IA.",
        items: [
            {
                id: "mobile-ai",
                title: "App Móvil con IA Conversacional",
                description:
                    "Desarrollo y mantenimiento de aplicación nativa (iOS/Android) enfocada en generación de medios vía IA conversacional, escalada a más de 2.000 usuarios activos.",
                metric: "2.000+ usuarios activos",
                tags: ["React Native", "iOS", "Android", "IA Conversacional", "Firebase", "WebSockets"],
            },
            {
                id: "studio",
                title: "Estudio Gráfico en el Navegador",
                description:
                    "Creación de un estudio avanzado de edición para generación de folletos, carteles y vídeos directamente en el navegador, con exportación compleja y manipulación de objetos en tiempo real.",
                tags: ["Fabric.js", "React", "Vite", "Node-Canvas", "FFMPEG"],
            },
            {
                id: "genai",
                title: "Ecosistema de IAs Generativas",
                description:
                    "Integración intensiva de múltiples modelos fundacionales para procesamiento y generación inteligente de texto, audio y vídeo en plataformas de producción de contenido.",
                tags: ["OpenAI API", "Gemini Live", "ElevenLabs", "Veo", "Hugging Face"],
            },
            {
                id: "b2b-apis",
                title: "Desarrollo y Documentación de APIs B2B",
                description:
                    "Construcción de APIs REST escalables para consumo por socios externos, incluyendo documentación técnica detallada para integraciones fluidas y seguras.",
                tags: ["Node.js", "REST API", "Swagger/OpenAPI", "Integração de Sistemas", "Arquitetura de Software"],
            },
            {
                id: "recruitment",
                title: "Plataforma de Reclutamiento y Selección",
                description:
                    "Liderazgo técnico en la arquitectura y desarrollo full stack de un sistema colaborativo de reclutamiento, optimizando el flujo de gestión de candidatos.",
                tags: ["Nest.js", "Next.js", "TypeScript", "PostgreSQL"],
            },
            {
                id: "social",
                title: "Automatización e Integración Multiplataforma",
                description:
                    "Desarrollo de soluciones SaaS para automatización de publicaciones y gestión de contenido B2B, integrando APIs de redes sociales y mensajería para escalabilidad de la comunicación.",
                tags: ["LinkedIn API", "Meta API", "WhatsApp Oficial", "OAuth"],
            },
        ],
    },
};

const ICONS: Record<string, React.ReactNode> = {
    "mobile-ai": <Smartphone className="h-5 w-5" aria-hidden="true" />,
    studio: <Palette className="h-5 w-5" aria-hidden="true" />,
    genai: <Bot className="h-5 w-5" aria-hidden="true" />,
    "b2b-apis": <Network className="h-5 w-5" aria-hidden="true" />,
    recruitment: <Users className="h-5 w-5" aria-hidden="true" />,
    social: <Share2 className="h-5 w-5" aria-hidden="true" />,
};

export const Experience = () => {
    const { language } = useLanguage();
    const lang = (["pt", "en", "es"].includes(language) ? language : "pt") as "pt" | "en" | "es";

    const content = HIGHLIGHTS_I18N[lang];
    const highlights: Highlight[] = content.items.map((item) => ({
        ...item,
        icon: ICONS[item.id],
    }));

    return (
        <section aria-labelledby="highlights-heading" className="py-20 bg-black relative z-20 overflow-hidden">
            <SectionBackground />
            <div className="absolute top-0 inset-x-0 h-24 md:h-32 bg-gradient-to-b from-neutral-900 to-transparent pointer-events-none" aria-hidden="true" />
            <div className="relative max-w-7xl mx-auto px-4">
                <h2
                    id="highlights-heading"
                    className="text-3xl md:text-4xl font-bold mb-4 text-white text-center text-balance"
                >
                    {content.sectionTitle}
                </h2>
                <p className="text-neutral-400 max-w-2xl mx-auto text-center text-sm md:text-base mb-12 leading-relaxed">
                    {content.subtitle}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
                    {highlights.map((item, idx) => (
                        <motion.article
                            key={item.id}
                            role="listitem"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: (idx % 3) * 0.1, duration: 0.45 }}
                            className="relative flex flex-col rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/10 hover:border-blue-500/40 transition-colors p-6 shadow-2xl"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
                                    {item.icon}
                                </span>
                                {item.metric && (
                                    <span className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 whitespace-nowrap">
                                        {item.metric}
                                    </span>
                                )}
                            </div>

                            <h3 className="text-lg md:text-xl font-bold text-white mb-2 text-balance leading-snug">
                                {item.title}
                            </h3>

                            <p className="text-neutral-400 text-sm leading-relaxed mb-5 flex-1">
                                {item.description}
                            </p>

                            <ul aria-label={`Tecnologias: ${item.title}`} className="flex flex-wrap gap-2 mt-auto">
                                {item.tags.map((tag) => (
                                    <li
                                        key={tag}
                                        className="text-[11px] md:text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:border-blue-500/40 hover:text-white transition-colors whitespace-nowrap"
                                    >
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};
