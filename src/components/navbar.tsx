"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Layers, Sparkles, FolderGit2, Route, UserRound } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import LanguageSelector from "@/components/language-selector";

const WHATSAPP_URL =
    "https://wa.me/5519982571877?text=Ol%C3%A1%20Wallace!%20Vi%20seu%20portf%C3%B3lio%20e%20quero%20conversar.";

export const Navbar = () => {
    const { t } = useLanguage();
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState<string | null>(null);

    // Destaca o link da secção que está no centro do ecrã
    useEffect(() => {
        const ids = ["tech-stack", "impacto", "projetos", "trajetoria", "sobre"];
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
            },
            { rootMargin: "-45% 0px -50% 0px" }
        );
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) io.observe(el);
        });
        const top = document.getElementById("top");
        const ioTop = new IntersectionObserver(([e]) => e.isIntersecting && setActive(null), { rootMargin: "-45% 0px -50% 0px" });
        if (top) ioTop.observe(top);
        return () => {
            io.disconnect();
            ioTop.disconnect();
        };
    }, []);

    const links = [
        { href: "#tech-stack", label: t("nav.stack"), icon: Layers },
        { href: "#impacto", label: t("nav.impacto"), icon: Sparkles },
        { href: "#projetos", label: t("nav.projetos"), icon: FolderGit2 },
        { href: "#trajetoria", label: t("nav.trajetoria"), icon: Route },
        { href: "#sobre", label: t("nav.sobre"), icon: UserRound },
    ];

    return (
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
            <nav
                aria-label="Primary"
                className="bg-neutral-950/70 backdrop-blur-xl border border-white/10 shadow-2xl shadow-blue-900/20 rounded-full px-2 py-2 flex items-center justify-between transition-all duration-300"
            >
                <Link
                    href="#top"
                    aria-label="Voltar ao topo"
                    onClick={() => setOpen(false)}
                    className="block w-9 h-9 shrink-0 ml-1 rounded-[9px] hover:brightness-125 transition-[filter]"
                >
                    {/* Mesmo desenho de src/app/icon.svg: W em degradê + cursor de terminal */}
                    <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
                        <defs>
                            <linearGradient id="nav-logo-grad" x1="0" y1="1" x2="1" y2="0">
                                <stop offset="0" stopColor="#22d3ee" />
                                <stop offset=".55" stopColor="#6366f1" />
                                <stop offset="1" stopColor="#a855f7" />
                            </linearGradient>
                        </defs>
                        <rect width="100" height="100" rx="24" fill="#0b1120" />
                        <rect x="1.5" y="1.5" width="97" height="97" rx="22.5" fill="none" stroke="#1e293b" strokeWidth="3" />
                        <path d="M16 30 L27 64 L38 42 L49 64 L60 30" fill="none" stroke="url(#nav-logo-grad)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="66" y="58" width="20" height="9" rx="2" fill="#f8fafc" />
                    </svg>
                </Link>

                {/* Desktop / tablet */}
                <div className="hidden md:flex items-center gap-1">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            aria-current={active === link.href ? "location" : undefined}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                                active === link.href
                                    ? "text-white bg-white/10"
                                    : "text-neutral-400 hover:text-white hover:bg-white/10"
                            }`}
                        >
                            <link.icon className="w-3.5 h-3.5" aria-hidden="true" />
                            {link.label}
                        </a>
                    ))}
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white transition-all duration-300 whitespace-nowrap"
                    >
                        {t("hero.ctaWhatsapp")}
                    </a>
                    <LanguageSelector bare />
                </div>

                {/* Mobile */}
                <div className="flex md:hidden items-center gap-1">
                    <LanguageSelector bare />
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        aria-expanded={open}
                        aria-label={open ? t("nav.menuClose") : t("nav.menuOpen")}
                        className="p-2.5 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                    >
                        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </nav>

            {/* Mobile dropdown */}
            {open && (
                <div className="md:hidden mt-2 rounded-3xl bg-neutral-950/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-blue-900/20 p-2 flex flex-col gap-1">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-300"
                        >
                            <link.icon className="w-4 h-4 text-neutral-500" aria-hidden="true" />
                            {link.label}
                        </a>
                    ))}
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex justify-center px-4 py-3 text-sm font-medium rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white transition-all duration-300"
                    >
                        {t("hero.ctaWhatsapp")}
                    </a>
                </div>
            )}
        </header>
    );
};
