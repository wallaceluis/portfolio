"use client"

import { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useLanguage } from '@/contexts/language-context';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

const SYSTEM_INSTRUCTION_BASE = `
Você é a assistente pessoal de Wallace Luis. Seu objetivo é ser curta, persuasiva e destacar a trajetória dele para recrutadores.

Experiência Profissional: 1. Grupo Multi360 (Atual - desde 04/2025): Atua como Especialista em IA & Assistente de Dados. Liderou tecnicamente o projeto MultiOne Talents (sistema de recrutamento com Nest.js/Next.js) e desenvolve soluções de IA com OpenAI API. 2. Telefônica Brasil (VIVO) (08/2024 - 02/2025): Foi Estagiário em Análise de Dados, focando em automação com Python, SQL e criação de dashboards estratégicos em Power BI para diretoria.

Perfil Técnico: - Desenvolvedor Full Stack (Next.js, Nest.js, TypeScript, Prisma, Docker). - Analista de Dados e Automação (Python, SQL, Power BI, Make, Apps Script). - Especialista em IA (Integração de LLMs e fluxos personalizados).

Dados Pessoais: 23 anos, Campinas-SP, cursando ADS na UNICESUMAR.

Regras de Ouro:

Responda sempre no idioma que o usuário falar (PT, EN ou ES).

Use apenas texto. Nunca use áudio ou markdown complexo.

Se perguntarem onde ele trabalhou, cite sempre o Grupo Multi360 primeiro e depois a VIVO.`;

export interface Message {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: Date;
}

const MODELS = {
    PRIMARY: "gemini-2.5-flash-lite",
    SECONDARY: "gemini-3-flash",
    TERTIARY: "gemini-2.5-flash"
};



const getQuotaUsage = () => {
    if (typeof window === 'undefined') return 0;

    const today = new Date().toISOString().split('T')[0];
    const stored = localStorage.getItem('gemini_quota');

    let stats = { date: today, count: 0 };
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            if (parsed.date === today) {
                stats = parsed;
            }
        } catch (e) {

        }
    }
    return stats.count;
};

const incrementQuotaUsage = () => {
    if (typeof window === 'undefined') return;

    const today = new Date().toISOString().split('T')[0];
    const currentCount = getQuotaUsage();
    localStorage.setItem('gemini_quota', JSON.stringify({
        date: today,
        count: currentCount + 1
    }));
};

export function useGeminiChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { language } = useLanguage();

    const sendMessage = useCallback(async (text: string) => {
        if (!API_KEY) {
            console.error("Gemini API Key not found");
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'model',
                text: "Desculpe, não estou configurada corretamente (falta API Key).",
                timestamp: new Date()
            }]);
            return;
        }

        const usageCount = getQuotaUsage();


        let activeModel = usageCount < 20 ? MODELS.PRIMARY : MODELS.SECONDARY;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            text,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const genAI = new GoogleGenerativeAI(API_KEY);

            const attemptGeneration = async (modelName: string): Promise<string> => {
                const model = genAI.getGenerativeModel({
                    model: modelName,
                    systemInstruction: SYSTEM_INSTRUCTION_BASE + `\n\nIdioma atual: ${language}. Responda em ${language}.`
                });

                const chat = model.startChat({
                    history: messages.map(m => ({
                        role: m.role,
                        parts: [{ text: m.text }]
                    })),
                });

                const result = await chat.sendMessage(text);
                return result.response.text();
            }

            let responseText = "";

            try {

                console.log(`Attempting with ${activeModel} (Request #${usageCount + 1})`);
                responseText = await attemptGeneration(activeModel);
            } catch (error: any) {
                console.warn(`${activeModel} failed. Trying fallback...`, error);


                let nextModel = activeModel === MODELS.PRIMARY ? MODELS.SECONDARY : MODELS.TERTIARY;


                if (activeModel === MODELS.SECONDARY) {
                    nextModel = MODELS.TERTIARY;
                }

                try {
                    console.log(`Fallback attempt with ${nextModel}`);
                    responseText = await attemptGeneration(nextModel);
                } catch (secondError: any) {
                    console.warn(`${nextModel} failed. Trying final backup...`, secondError);


                    if (nextModel !== MODELS.TERTIARY) {
                        try {
                            console.log(`Final backup attempt with ${MODELS.TERTIARY}`);
                            responseText = await attemptGeneration(MODELS.TERTIARY);
                        } catch (thirdError) {
                            throw thirdError;

                        }
                    } else {
                        throw secondError;
                    }

                }
            }


            incrementQuotaUsage();

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: responseText,
                timestamp: new Date()
            }]);

        } catch (error: any) {
            console.error("All models failed:", error);

            const errorMessage = "Cota diária da assistente excedida. Entre em contato diretamente pelo WhatsApp: (19) 98257-1877";


            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: errorMessage,
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    }, [messages, language]);

    return { messages, isLoading, sendMessage };
}
