"use client";

import { GridScan } from "./GridScan";

interface HeroBackgroundProps {
    mode: "developer" | "data-analyst";
}

export const HeroBackground = ({ mode }: HeroBackgroundProps) => {
    // Colors configuration
    // Developer: Blue (Tailwind blue-600 lines, blue-400 scan)
    // Data Analyst: Green (Tailwind emerald-600 lines, emerald-400 scan)
    const linesColor = mode === 'developer' ? "#2563eb" : "#059669";
    const scanColor = mode === 'developer' ? "#60a5fa" : "#34d399";

    return (
        <div className="relative w-full h-full">
            <GridScan
                className="opacity-60"
                linesColor={linesColor}
                scanColor={scanColor}
            />
            {/* Gradient Mask for smooth bottom fading */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `linear-gradient(to bottom, transparent 70%, ${mode === 'developer' ? '#020617' : '#09090b'} 100%)`
                }}
            />
        </div>
    );
};
