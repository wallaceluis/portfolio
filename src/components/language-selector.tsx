"use client"

import React from 'react';
import { useLanguage } from '@/contexts/language-context';
import { motion } from 'framer-motion';

export default function LanguageSelector() {
    const { language, setLanguage } = useLanguage();

    const flags = {
        pt: "🇧🇷",
        en: "🇺🇸",
        es: "🇪🇸"
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-4 right-4 z-50 bg-black/50 backdrop-blur-md p-1.5 rounded-full border border-white/20 flex gap-1"
        >
            {(['pt', 'en', 'es'] as const).map((lang) => (
                <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1 rounded-full text-base transition-all ${language === lang
                        ? 'bg-white/20 shadow-lg scale-110'
                        : 'hover:bg-white/10 opacity-70 hover:opacity-100 hover:scale-110'
                        }`}
                    title={lang.toUpperCase()}
                >
                    {flags[lang]}
                </button>
            ))}
        </motion.div>
    );
}
