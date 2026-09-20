"use client";

import React from "react";

/**
 * Fundo decorativo partilhado: grelha subtil + glows + vinheta,
 * a mesma linguagem do hero. O conteúdo da secção pinta por cima.
 */
export const SectionBackground = ({
    glowA = "bg-blue-600/20",
    glowB = "bg-cyan-500/20",
    glowC = "bg-purple-600/20",
    vignette = "bg-black",
}: {
    glowA?: string;
    glowB?: string;
    glowC?: string;
    /** Cor da vinheta — deve acompanhar o bg da secção para não o esconder */
    vignette?: string;
}) => (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-white/[0.03]" />
        <div
            className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full blur-3xl ${glowA}`}
        />
        <div
            className={`absolute -bottom-40 -left-24 w-[28rem] h-[28rem] rounded-full blur-3xl ${glowB}`}
        />
        <div
            className={`absolute top-1/4 -right-24 w-[26rem] h-[26rem] rounded-full blur-3xl ${glowC}`}
        />
        <div className={`absolute inset-0 ${vignette} [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]`} />
    </div>
);
