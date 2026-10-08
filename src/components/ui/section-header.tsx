import React from "react";
import type { LucideIcon } from "lucide-react";

/**
 * Cabeçalho padrão das secções: pill numerada (espelha a navbar) + h2 + subtítulo.
 * Sem animação de entrada: o título fica visível no HTML do SSR (crawlers/LCP).
 */
export const SectionHeader = ({
    id,
    index,
    label,
    title,
    subtitle,
    icon: Icon,
}: {
    id: string;
    index: string;
    label: string;
    title: string;
    subtitle?: string;
    icon: LucideIcon;
}) => (
    <div className="text-center mb-10 md:mb-12">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-blue-300 mb-4">
            <span className="font-mono text-neutral-500">{index}</span>
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {label}
        </span>
        <h2
            id={id}
            className="text-3xl md:text-5xl font-bold tracking-tight leading-tight pb-1 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 text-balance"
        >
            {title}
        </h2>
        {subtitle && (
            <p className="text-neutral-400 mt-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed text-pretty">
                {subtitle}
            </p>
        )}
    </div>
);
