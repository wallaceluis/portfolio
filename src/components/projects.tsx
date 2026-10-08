"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, FolderGit2, Github } from "lucide-react";

import { useLanguage } from "@/contexts/language-context";
import { SectionHeader } from "./ui/section-header";

/* ------------------------------------------------------------------ */
/*  Projetos open source — dados estáticos (sem chamada à API do       */
/*  GitHub em runtime). Tags são keywords iguais nos 3 idiomas.        */
/* ------------------------------------------------------------------ */

type Lang = "pt" | "en" | "es";
type Text = Record<Lang, string>;

type Project = {
    repo: string;
    name: string;
    kind: Text;
    description: Text;
    tags: string[];
    /** Print em /public, exibido em 16:9 com object-cover */
    image?: string;
};

const GITHUB = "https://github.com/wallaceluis";

const FEATURED: Project[] = [
    {
        repo: "english-writing-assistant",
        name: "English Assist",
        kind: { pt: "App desktop · IA", en: "Desktop app · AI", es: "App de escritorio · IA" },
        description: {
            pt: "Assistente de escrita que vive na bandeja do Windows: selecione um texto em qualquer programa, aperte um atalho global e receba a versão em inglês nativo, corrigida ou lida em voz alta. Funciona com vários provedores de IA.",
            en: "Writing assistant that lives in the Windows tray: select text in any app, press a global shortcut and get it in native English, grammar-fixed or read aloud. Works with several AI providers.",
            es: "Asistente de escritura que vive en la bandeja de Windows: selecciona un texto en cualquier programa, pulsa un atajo global y obtén la versión en inglés nativo, corregida o leída en voz alta. Funciona con varios proveedores de IA.",
        },
        tags: ["Electron", "React", "TypeScript", "OpenAI SDK", "Gemini TTS"],
        image: "/projects/english-assist.webp",
    },
    {
        repo: "coins-tracker",
        name: "Coins Tracker",
        kind: { pt: "Web app", en: "Web app", es: "Web app" },
        description: {
            pt: "Painel de criptomoedas em tempo real com conversor para moedas fiduciárias (BRL, USD, EUR, GBP, JPY), tema claro/escuro e i18n em três idiomas.",
            en: "Real-time crypto dashboard with a converter to fiat currencies (BRL, USD, EUR, GBP, JPY), light/dark theme and i18n in three languages.",
            es: "Panel de criptomonedas en tiempo real con conversor a monedas fiduciarias (BRL, USD, EUR, GBP, JPY), tema claro/oscuro e i18n en tres idiomas.",
        },
        tags: ["Vue 3", "TypeScript", "Pinia", "Tailwind CSS", "Vitest"],
        image: "/projects/coins-tracker.webp",
    },
];

const PROJECTS: Project[] = [
    {
        repo: "Talents-MultiOne",
        name: "Talents MultiOne",
        kind: { pt: "Full stack · equipe de 3", en: "Full stack · team of 3", es: "Full stack · equipo de 3" },
        description: {
            pt: "Sistema de recrutamento com gestão de empresas, vagas, candidatos e relatórios, autenticação JWT e perfis de acesso. Deploy com Docker, Nginx e GitHub Actions.",
            en: "Recruitment system managing companies, openings, candidates and reports, with JWT auth and access roles. Deployed with Docker, Nginx and GitHub Actions.",
            es: "Sistema de reclutamiento con gestión de empresas, vacantes, candidatos e informes, autenticación JWT y perfiles de acceso. Deploy con Docker, Nginx y GitHub Actions.",
        },
        tags: ["Nest.js", "Next.js", "Prisma", "PostgreSQL", "Docker"],
    },
    {
        repo: "hackernews-mcp-server",
        name: "Hacker News MCP Server",
        kind: { pt: "MCP Server", en: "MCP Server", es: "MCP Server" },
        description: {
            pt: "Servidor Model Context Protocol que deixa Claude, Cursor e outros assistentes lerem o Hacker News, com saída estruturada e validação de parâmetros.",
            en: "Model Context Protocol server that lets Claude, Cursor and other assistants read Hacker News, with structured output and parameter validation.",
            es: "Servidor Model Context Protocol que permite a Claude, Cursor y otros asistentes leer Hacker News, con salida estructurada y validación de parámetros.",
        },
        tags: ["MCP", "TypeScript", "Zod", "Node.js"],
    },
    {
        repo: "ai-pr-cli",
        name: "ai-pr-cli",
        kind: { pt: "CLI · IA", en: "CLI · AI", es: "CLI · IA" },
        description: {
            pt: "Gera descrições de Pull Request a partir do git diff com OpenAI ou OpenRouter. Filtra ruído (lockfiles, minificados) e corta diffs grandes por arquivo para caber no contexto.",
            en: "Generates Pull Request descriptions from your git diff with OpenAI or OpenRouter. Filters noise (lockfiles, minified files) and trims large diffs per file to fit the context window.",
            es: "Genera descripciones de Pull Request a partir del git diff con OpenAI u OpenRouter. Filtra ruido (lockfiles, minificados) y recorta diffs grandes por archivo para caber en el contexto.",
        },
        tags: ["Node.js", "TypeScript", "OpenAI", "OpenRouter", "Git"],
    },
    {
        repo: "webhook-relayer",
        name: "webhook-relayer",
        kind: { pt: "Backend · Filas", en: "Backend · Queues", es: "Backend · Colas" },
        description: {
            pt: "Recebe webhooks, responde 202 na hora e entrega via fila com retry e backoff exponencial. Verificação HMAC, idempotência e workers escaláveis.",
            en: "Receives webhooks, answers 202 right away and delivers them through a queue with retries and exponential backoff. HMAC verification, idempotency and scalable workers.",
            es: "Recibe webhooks, responde 202 al instante y los entrega mediante una cola con reintentos y backoff exponencial. Verificación HMAC, idempotencia y workers escalables.",
        },
        tags: ["Bun", "Hono", "BullMQ", "Redis", "Docker"],
    },
    {
        repo: "redis-sliding-window",
        name: "redis-sliding-window",
        kind: { pt: "Biblioteca", en: "Library", es: "Librería" },
        description: {
            pt: "Rate limiting distribuído com o algoritmo Sliding Window Log em Redis: decisão atômica em um script Lua, um round trip por requisição e plugin pronto para Fastify.",
            en: "Distributed rate limiting with the Sliding Window Log algorithm on Redis: atomic decision in a Lua script, one round trip per request and a ready-made Fastify plugin.",
            es: "Rate limiting distribuido con el algoritmo Sliding Window Log en Redis: decisión atómica en un script Lua, un round trip por petición y plugin listo para Fastify.",
        },
        tags: ["Redis", "Lua", "Fastify", "TypeScript", "Jest"],
    },
    {
        repo: "stale-branch-cleaner",
        name: "Stale Branch Cleaner",
        kind: { pt: "GitHub Action", en: "GitHub Action", es: "GitHub Action" },
        description: {
            pt: "Action que apaga branches inativas e sem PR aberto. Segura por padrão: dry-run, respeita branches protegidas e limita quantas apaga por execução.",
            en: "Action that deletes inactive branches with no open PR. Safe by default: dry-run, respects protected branches and caps deletions per run.",
            es: "Action que elimina ramas inactivas y sin PR abierto. Segura por defecto: dry-run, respeta ramas protegidas y limita cuántas borra por ejecución.",
        },
        tags: ["GitHub Actions", "TypeScript", "CI/CD"],
    },
];

const UI: Record<Lang, { title: string; subtitle: string; code: string; all: string }> = {
    pt: {
        title: "Projetos Open Source",
        subtitle: "Código aberto no GitHub: de ferramentas com IA a infraestrutura de backend.",
        code: "Ver código",
        all: "Ver todos no GitHub",
    },
    en: {
        title: "Open Source Projects",
        subtitle: "Open code on GitHub: from AI tools to backend infrastructure.",
        code: "View code",
        all: "See all on GitHub",
    },
    es: {
        title: "Proyectos Open Source",
        subtitle: "Código abierto en GitHub: de herramientas con IA a infraestructura de backend.",
        code: "Ver código",
        all: "Ver todos en GitHub",
    },
};

const Tags = ({ tags, label }: { tags: string[]; label: string }) => (
    <ul aria-label={label} className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag) => (
            <li
                key={tag}
                className="text-[11px] md:text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 whitespace-nowrap"
            >
                {tag}
            </li>
        ))}
    </ul>
);

export const Projects = () => {
    const { language, t } = useLanguage();
    const lang = (["pt", "en", "es"].includes(language) ? language : "pt") as Lang;
    const ui = UI[lang];

    return (
        <section id="projetos" aria-labelledby="projects-heading" className="py-16 md:py-20 bg-neutral-950 relative overflow-hidden scroll-mt-24">
            <div className="absolute top-0 inset-x-0 h-24 md:h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" aria-hidden="true" />
            <div className="relative max-w-7xl mx-auto px-4">
                <SectionHeader
                    id="projects-heading"
                    index="03"
                    label={t("nav.projetos")}
                    title={ui.title}
                    subtitle={ui.subtitle}
                    icon={FolderGit2}
                />

                {/* Destaques com print */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {FEATURED.map((p, idx) => (
                        <motion.a
                            key={p.repo}
                            href={`${GITHUB}/${p.repo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: idx * 0.1, duration: 0.45 }}
                            className="group relative flex flex-col rounded-2xl overflow-hidden bg-neutral-900/60 border border-white/10 hover:border-blue-500/40 hover:-translate-y-1 transition-[border-color,transform] duration-300 shadow-2xl"
                        >
                            {p.image && (
                                <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10 bg-black">
                                    <Image
                                        src={p.image}
                                        alt={`Screenshot ${p.name}`}
                                        fill
                                        sizes="(min-width: 1024px) 600px, 100vw"
                                        className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-neutral-950/80 to-transparent" aria-hidden="true" />
                                </div>
                            )}
                            <div className="flex flex-col flex-1 p-6">
                                <div className="flex items-center justify-between gap-3 mb-2">
                                    <span className="text-xs font-medium text-blue-300">{p.kind[lang]}</span>
                                    <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" aria-hidden="true" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
                                <p className="text-neutral-400 text-sm leading-relaxed mb-5">{p.description[lang]}</p>
                                <Tags tags={p.tags} label={`Tecnologias: ${p.name}`} />
                            </div>
                        </motion.a>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PROJECTS.map((p, idx) => (
                        <motion.a
                            key={p.repo}
                            href={`${GITHUB}/${p.repo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: (idx % 3) * 0.08, duration: 0.45 }}
                            className="group relative flex flex-col rounded-2xl bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 border border-white/10 hover:border-blue-500/40 hover:-translate-y-1 transition-[border-color,transform] duration-300 p-6"
                        >
                            <div className="flex items-center justify-between gap-3 mb-3">
                                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-300">
                                    <Github className="w-3.5 h-3.5" aria-hidden="true" />
                                    {p.kind[lang]}
                                </span>
                                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" aria-hidden="true" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{p.name}</h3>
                            <p className="text-neutral-400 text-sm leading-relaxed mb-5">{p.description[lang]}</p>
                            <Tags tags={p.tags} label={`Tecnologias: ${p.name}`} />
                            <span className="sr-only">{ui.code}</span>
                        </motion.a>
                    ))}
                </div>

                <div className="flex justify-center mt-10">
                    <a
                        href={`${GITHUB}?tab=repositories`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-neutral-300 border border-white/15 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        <Github className="w-4 h-4" aria-hidden="true" />
                        {ui.all}
                    </a>
                </div>
            </div>
        </section>
    );
};
