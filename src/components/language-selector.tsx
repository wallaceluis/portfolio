"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function LanguageSelector() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'pt', name: 'Português', flag: '🇧🇷' },
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'es', name: 'Español', flag: '🇪🇸' }
    ] as const;

    const currentLang = languages.find(l => l.code === language) || languages[0];

    return (
        <div className="absolute top-4 right-4 md:fixed md:top-6 md:right-6 z-50">
            <div className="relative">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 bg-neutral-900/80 backdrop-blur-md border border-white/10 px-3 py-2 rounded-full shadow-lg hover:bg-neutral-800 transition-colors"
                >
                    <Globe className="w-4 h-4 text-neutral-400" />
                    <span className="text-sm font-medium hidden md:block">{currentLang.name}</span>
                    <span className="text-sm font-medium md:hidden">{currentLang.code.toUpperCase()}</span>
                    <ChevronDown className={cn("w-3 h-3 text-neutral-400 transition-transform", isOpen && "rotate-180")} />
                </motion.button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2 w-40 bg-neutral-900/90 backdrop-blur-md border border-white/10 rounded-xl shadow-xl overflow-hidden py-1"
                        >
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code as any);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "w-full px-4 py-2.5 flex items-center gap-3 text-sm hover:bg-white/10 transition-colors text-left",
                                        language === lang.code ? "text-white bg-white/5" : "text-neutral-400 hover:text-white"
                                    )}
                                >
                                    <span className="text-lg">{lang.flag}</span>
                                    <span className="flex-1">{lang.name}</span>
                                    {language === lang.code && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
