"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, ExternalLink, FolderGit2, Github, Lock } from "lucide-react";

import { useLanguage } from "@/contexts/language-context";
import { SectionHeader } from "./ui/section-header";

/* ------------------------------------------------------------------ */
/*  Projetos — dados estáticos (sem chamada à API do GitHub em         */
/*  runtime). Tags são keywords iguais nos 3 idiomas.                  */
/* ------------------------------------------------------------------ */

type Lang = "pt" | "en" | "es";
type Text = Record<Lang, string>;

type Project = {
    /** Repositório público no GitHub; ausente quando o código é privado */
    repo?: string;
    /** Chave estável do card (usa o repo quando existe) */
    id: string;
    /** Nome de exibição: fixo, ou traduzido quando o nome do repositório não diz o que o projeto faz */
    name: string | Text;
    kind: Text;
    description: Text;
    tags: string[];
    /** Print em /public, exibido em 16:9 com object-cover */
    image?: string;
    /** Versão no ar para testar */
    live?: string;
};

const GITHUB = "https://github.com/wallaceluis";

/* Projetos com print. Os VISIBLE primeiros aparecem sempre; o resto, ao expandir. */
const VISIBLE = 6;

const FEATURED: Project[] = [
    {
        id: "querolicita",
        name: "QueroLicita",
        kind: { pt: "Produto SaaS · Full stack", en: "SaaS product · Full stack", es: "Producto SaaS · Full stack" },
        description: {
            pt: "Licitações abertas do Brasil inteiro num só lugar: coleta automática do PNCP, filtros por estado e segmento, resumo do edital com IA e alertas por e-mail. Conta com login por link e plano Pro pago com Pix ou cartão.",
            en: "Open public tenders from all over Brazil in one place: automated collection from the national PNCP portal, filters by state and segment, AI summaries of each notice and email alerts. Passwordless login and a Pro plan paid by Pix or card.",
            es: "Licitaciones abiertas de todo Brasil en un solo lugar: recolección automática del portal PNCP, filtros por estado y segmento, resumen del pliego con IA y alertas por correo. Login por enlace y plan Pro pagado con Pix o tarjeta.",
        },
        tags: ["Next.js", "TypeScript", "PostgreSQL", "IA", "Resend", "GitHub Actions"],
        image: "/projects/querolicita.webp",
    },
    {
        id: "site-rapido",
        name: "Site Rápido",
        kind: { pt: "Produto · IA + painel de leads", en: "Product · AI + lead dashboard", es: "Producto · IA + panel de leads" },
        description: {
            pt: "Cria a landing page de um negócio local em minutos: encontra empresas sem site no Google Maps, usa fotos e avaliações reais, tira a paleta de cores da logo e escreve os textos com IA. Um painel acompanha cada contato até o fechamento.",
            en: "Builds a landing page for a local business in minutes: finds companies with no website on Google Maps, uses their real photos and reviews, pulls the color palette from the logo and writes the copy with AI. A dashboard tracks each lead until the deal closes.",
            es: "Crea la landing page de un negocio local en minutos: encuentra empresas sin sitio en Google Maps, usa fotos y reseñas reales, saca la paleta de colores del logo y escribe los textos con IA. Un panel sigue cada contacto hasta el cierre.",
        },
        tags: ["Next.js", "Upstash Redis", "Gemini", "Claude API", "Google Places API"],
        image: "/projects/site-rapido.webp",
    },
    {
        repo: "agendai",
        id: "agendai",
        name: "Agendaí",
        kind: { pt: "SaaS · Agendamento online", en: "SaaS · Online booking", es: "SaaS · Reservas online" },
        description: {
            pt: "Agendamento online para salões, barbearias e manicures: página pública de horários, painel do dono com a agenda do dia, confirmação pelo WhatsApp e assinatura mensal pelo Mercado Pago. CI com lint, testes e build.",
            en: "Online booking for salons, barbershops and nail studios: a public booking page, an owner dashboard with the day's schedule, WhatsApp confirmations and a monthly subscription through Mercado Pago. CI runs lint, tests and build.",
            es: "Reservas online para salones, barberías y manicuras: página pública de horarios, panel del dueño con la agenda del día, confirmación por WhatsApp y suscripción mensual con Mercado Pago. CI con lint, tests y build.",
        },
        tags: ["Next.js", "Prisma", "PostgreSQL", "Mercado Pago", "GitHub Actions"],
        image: "/projects/agendai.webp",
    },
    {
        repo: "posta-ai",
        id: "posta-ai",
        name: "Posta Aí",
        kind: { pt: "Micro-SaaS · IA", en: "Micro-SaaS · AI", es: "Micro-SaaS · IA" },
        description: {
            pt: "Monta a semana de posts de um pequeno negócio para Instagram e WhatsApp, com legenda, hashtags do bairro, horário e ideia de foto para cada dia. Saída da IA validada com Zod, assinatura pelo Stripe e cookie assinado com HMAC no lugar de banco.",
            en: "Plans a small business's week of Instagram and WhatsApp posts, with caption, local hashtags, time slot and a photo idea for each day. AI output validated with Zod, Stripe subscriptions and an HMAC-signed cookie instead of a database.",
            es: "Arma la semana de posts de un pequeño negocio para Instagram y WhatsApp, con texto, hashtags del barrio, horario e idea de foto para cada día. Salida de la IA validada con Zod, suscripción con Stripe y cookie firmada con HMAC en lugar de base de datos.",
        },
        tags: ["Next.js", "Claude API", "Zod", "Stripe", "Tailwind"],
        image: "/projects/posta-ai.webp",
    },
    {
        repo: "stack-rush",
        id: "stack-rush",
        name: "Stack Rush",
        kind: { pt: "Jogo · Web + Android", en: "Game · Web + Android", es: "Juego · Web + Android" },
        description: {
            pt: "Jogo casual de empilhar blocos que roda no navegador e vira app Android numa WebView Kotlin, com anúncios AdMob e compra para remover anúncios. APK e AAB gerados no GitHub Actions; a versão web está no ar para jogar.",
            en: "Casual block-stacking game that runs in the browser and ships as an Android app in a Kotlin WebView, with AdMob ads and an in-app purchase to remove them. APK and AAB built on GitHub Actions; the web version is live to play.",
            es: "Juego casual de apilar bloques que corre en el navegador y se convierte en app Android en una WebView Kotlin, con anuncios AdMob y compra para quitarlos. APK y AAB generados en GitHub Actions; la versión web está online para jugar.",
        },
        tags: ["HTML5 Canvas", "Kotlin", "AdMob", "Play Billing", "GitHub Actions"],
        image: "/projects/stack-rush.webp",
        live: "https://wallaceluis.github.io/stack-rush/",
    },
    {
        repo: "english-writing-assistant",
        id: "english-writing-assistant",
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
        id: "coins-tracker",
        name: "Market Tracker",
        kind: { pt: "Full stack · Vue 3 + serverless", en: "Full stack · Vue 3 + serverless", es: "Full stack · Vue 3 + serverless" },
        description: {
            pt: "Cripto e ações da B3 com gráficos e conversor, mais alertas de preço por e-mail para qualquer pessoa: confirmação por link, disparo único com rearme e cron a cada 15 min. API serverless na Vercel, Postgres, Resend e testes de integração no CI.",
            en: "Crypto and Brazilian stocks with charts and a converter, plus email price alerts for anyone: link confirmation, fire-once with re-arm and a 15-min cron. Serverless API on Vercel, Postgres, Resend and integration tests in CI.",
            es: "Cripto y acciones de la B3 con gráficos y conversor, más alertas de precio por correo para cualquiera: confirmación por enlace, disparo único con rearme y cron cada 15 min. API serverless en Vercel, Postgres, Resend y tests de integración en CI.",
        },
        tags: ["Vue 3", "TypeScript", "Vercel Functions", "PostgreSQL", "Resend", "GitHub Actions"],
        image: "/projects/coins-tracker.webp",
    },
    {
        repo: "Talents-MultiOne",
        id: "Talents-MultiOne",
        name: "Talents",
        kind: { pt: "Full stack · equipe de 3", en: "Full stack · team of 3", es: "Full stack · equipo de 3" },
        description: {
            pt: "Sistema de recrutamento com gestão de empresas, vagas, candidatos e relatórios, autenticação JWT e perfis de acesso. CI com migrations e seed em Postgres real e teste de login na API; Docker e Nginx para deploy.",
            en: "Recruitment system managing companies, openings, candidates and reports, with JWT auth and access roles. CI runs migrations and seed on a real Postgres plus an API login smoke test; Docker and Nginx for deploy.",
            es: "Sistema de reclutamiento con gestión de empresas, vacantes, candidatos e informes, autenticación JWT y perfiles de acceso. CI con migrations y seed en Postgres real y test de login en la API; Docker y Nginx para deploy.",
        },
        tags: ["Nest.js", "Next.js", "Prisma", "PostgreSQL", "Docker", "GitHub Actions"],
        image: "/projects/talents.webp",
    },
];

/* Demais projetos: cards compactos, sem print */
const PROJECTS: Project[] = [
    {
        repo: "hackernews-mcp-server",
        id: "hackernews-mcp-server",
        name: { pt: "Hacker News para assistentes de IA", en: "Hacker News for AI assistants", es: "Hacker News para asistentes de IA" },
        kind: { pt: "MCP Server", en: "MCP Server", es: "MCP Server" },
        description: {
            pt: "Servidor Model Context Protocol que deixa Claude, Cursor e outros assistentes lerem o Hacker News, com saída estruturada, validação de parâmetros e testes ponta a ponta pelo próprio protocolo MCP.",
            en: "Model Context Protocol server that lets Claude, Cursor and other assistants read Hacker News, with structured output, parameter validation and end-to-end tests through the MCP protocol itself.",
            es: "Servidor Model Context Protocol que permite a Claude, Cursor y otros asistentes leer Hacker News, con salida estructurada, validación de parámetros y tests de extremo a extremo por el propio protocolo MCP.",
        },
        tags: ["MCP", "TypeScript", "Zod", "Node.js"],
    },
    {
        repo: "ai-pr-cli",
        id: "ai-pr-cli",
        name: { pt: "Descrição de PR gerada por IA", en: "AI-written pull request descriptions", es: "Descripción de PR generada por IA" },
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
        id: "webhook-relayer",
        name: { pt: "Retransmissor de webhooks com fila", en: "Queued webhook relay", es: "Retransmisor de webhooks con cola" },
        kind: { pt: "Backend · Filas", en: "Backend · Queues", es: "Backend · Colas" },
        description: {
            pt: "Recebe webhooks, responde 202 na hora e entrega via fila com retry e backoff exponencial. Verificação HMAC, idempotência e workers escaláveis, com teste ponta a ponta em Redis real no CI.",
            en: "Receives webhooks, answers 202 right away and delivers them through a queue with retries and exponential backoff. HMAC verification, idempotency and scalable workers, with an end-to-end test on real Redis in CI.",
            es: "Recibe webhooks, responde 202 al instante y los entrega mediante una cola con reintentos y backoff exponencial. Verificación HMAC, idempotencia y workers escalables, con test de extremo a extremo en Redis real en CI.",
        },
        tags: ["Bun", "Hono", "BullMQ", "Redis", "Docker"],
    },
];

const UI: Record<Lang, { title: string; subtitle: string; code: string; live: string; private: string; more: string; less: string; all: string }> = {
    pt: {
        title: "Projetos",
        subtitle: "Produtos que construí de ponta a ponta e ferramentas open source no GitHub.",
        code: "Ver código",
        live: "Ver online",
        private: "Código privado",
        more: "Ver mais projetos",
        less: "Mostrar menos",
        all: "Ver todos no GitHub",
    },
    en: {
        title: "Projects",
        subtitle: "Products I built end to end and open source tools on GitHub.",
        code: "View code",
        live: "Try it live",
        private: "Private code",
        more: "Show more projects",
        less: "Show less",
        all: "See all on GitHub",
    },
    es: {
        title: "Proyectos",
        subtitle: "Productos que construí de punta a punta y herramientas open source en GitHub.",
        code: "Ver código",
        live: "Ver online",
        private: "Código privado",
        more: "Ver más proyectos",
        less: "Mostrar menos",
        all: "Ver todos en GitHub",
    },
};

const nameOf = (p: Project, lang: Lang) => (typeof p.name === "string" ? p.name : p.name[lang]);

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
    const [expanded, setExpanded] = useState(false);
    const hiddenCount = FEATURED.length - VISIBLE + PROJECTS.length;

    const renderFeatured = (p: Project, idx: number) => {
        const href = p.live ?? (p.repo ? `${GITHUB}/${p.repo}` : undefined);
        return (
            <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: (idx % 3) * 0.1, duration: 0.45 }}
                className={`group relative flex flex-col rounded-2xl overflow-hidden bg-neutral-900/60 border border-white/10 shadow-2xl transition-[border-color,transform] duration-300 ${href ? "hover:border-blue-500/40 hover:-translate-y-1 focus-within:border-blue-500/40" : ""}`}
            >
                {p.image && (
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10 bg-black">
                        <Image
                            src={p.image}
                            alt={`Screenshot ${nameOf(p, lang)}`}
                            fill
                            sizes="(min-width: 1024px) 600px, 100vw"
                            className={`object-cover object-top transition-transform duration-500 ${href ? "group-hover:scale-[1.03]" : ""}`}
                        />
                        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-neutral-950/80 to-transparent" aria-hidden="true" />
                    </div>
                )}
                <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center justify-between gap-3 mb-2">
                        <span className="text-xs font-medium text-blue-300">{p.kind[lang]}</span>
                        {href ? (
                            <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" aria-hidden="true" />
                        ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] text-neutral-500">
                                <Lock className="w-3 h-3" aria-hidden="true" />
                                {ui.private}
                            </span>
                        )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                        {href ? (
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                            >
                                {nameOf(p, lang)}
                                <span className="sr-only"> ({p.live ? ui.live : ui.code})</span>
                            </a>
                        ) : (
                            nameOf(p, lang)
                        )}
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-5">{p.description[lang]}</p>
                    <Tags tags={p.tags} label={`Tecnologias: ${nameOf(p, lang)}`} />
                    {p.live && p.repo && (
                        <div className="relative z-10 flex flex-wrap gap-4 mt-5 text-sm font-medium">
                            <span className="inline-flex items-center gap-1.5 text-blue-300">
                                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                                {ui.live}
                            </span>
                            <a
                                href={`${GITHUB}/${p.repo}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
                            >
                                <Github className="w-4 h-4" aria-hidden="true" />
                                {ui.code}
                            </a>
                        </div>
                    )}
                </div>
            </motion.article>
        );
    };

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

                {/* Destaques com print. O link principal cobre o card inteiro (after:inset-0);
                    "Ver código" fica por cima quando o projeto também tem versão no ar. */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {FEATURED.slice(0, VISIBLE).map(renderFeatured)}
                </div>

                {/* Recolhido por padrão; fica no HTML (hidden) para buscadores lerem todos os projetos */}
                <div id="projetos-extra" hidden={!expanded} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {FEATURED.slice(VISIBLE).map(renderFeatured)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {PROJECTS.map((p, idx) => (
                            <motion.a
                                key={p.id}
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
                                <h3 className="text-lg font-bold text-white tracking-tight leading-snug">{nameOf(p, lang)}</h3>
                                <p className="font-mono text-xs text-neutral-500 mt-1 mb-2">{p.repo}</p>
                                <p className="text-neutral-400 text-sm leading-relaxed mb-5">{p.description[lang]}</p>
                                <Tags tags={p.tags} label={`Tecnologias: ${nameOf(p, lang)}`} />
                                <span className="sr-only">{ui.code}</span>
                            </motion.a>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
                    <button
                        type="button"
                        onClick={() => {
                            if (expanded) document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" });
                            setExpanded(!expanded);
                        }}
                        aria-expanded={expanded}
                        aria-controls="projetos-extra"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-sm font-medium text-white hover:bg-white/10 hover:border-blue-500/40 transition-colors"
                    >
                        {expanded ? ui.less : `${ui.more} (${hiddenCount})`}
                        <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
                    </button>
                    <a
                        href={`${GITHUB}?tab=repositories`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-neutral-400 hover:text-white transition-colors"
                    >
                        <Github className="w-4 h-4" aria-hidden="true" />
                        {ui.all}
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                </div>
            </div>
        </section>
    );
};
