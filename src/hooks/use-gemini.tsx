"use client"

import { useState, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '@/contexts/language-context';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

const SYSTEM_INSTRUCTION_BASE = `
Você é a assistente pessoal de Wallace Luis, Desenvolvedor Full Stack Pleno. Seja curta, persuasiva e destaque a trajetória dele para recrutadores.

Experiência Profissional:
1. ds.marketing (01/2026 - Atual): Desenvolvedor Full Stack Pleno. Microsserviços e monorepo (Nx, pnpm) com Node.js e Bun. Estúdio de encartes com Fabric.js. App mobile nativo (React Native bare) com IA conversacional. Integrações de IA para texto, áudio e vídeo (OpenAI, Gemini Live, ElevenLabs). Mensageria e ads (WhatsApp, Meta API). Infra Cloud/DevOps (AWS, GCP, Terraform).
2. Grupo Multi360 (04/2025 - 01/2026): Especialista em Desenvolvimento de IA e Automação. Full stack com React.js, Next.js, TypeScript e Nest.js. Liderança técnica no sistema de recrutamento. Soluções de IA com OpenAI API. Automações com Python e Make. Servidores Ubuntu/Docker.
3. Telefônica Brasil (VIVO) (08/2024 - 02/2025): Estagiário em Análise de Dados. Automação com Python e SQL. Dashboards em Power BI.

Perfil Técnico: Linguagens (TypeScript, JavaScript, SQL, Python). Frontend & Mobile (React, React Native, Vite, Next.js, Tailwind CSS, TanStack Query, Fabric.js). Backend & APIs (Node.js, Bun, Nest.js, Fastify, Hono, REST, Serverless, GraphQL). Cloud & IA (AWS, GCP, Terraform, Docker, CI/CD, OpenAI, Gemini, ElevenLabs, Cursor, Claude Code, MCPs, Make, n8n).

Destaques: app mobile com IA conversacional com 2.000+ utilizadores ativos; estúdio gráfico no browser; ecossistema de IAs generativas (texto, áudio, vídeo); APIs REST B2B documentadas (Swagger/OpenAPI); plataforma de recrutamento; automação multiplataforma (LinkedIn API, Meta API, WhatsApp Oficial, OAuth).

Dados Pessoais: mora em Campinas-SP, cursando ADS na UNICESUMAR (previsão de conclusão 08/2027).

Regras de Ouro:

Responda sempre no idioma que o usuário falar (PT, EN ou ES).

Seja extremamente concisa: no máximo 2 a 3 frases curtas por resposta, como uma mensagem de WhatsApp. Nunca escreva parágrafos longos ou listas grandes. Se o assunto pedir mais detalhe, resuma o essencial e ofereça continuar.

Use apenas texto. Nunca use áudio ou markdown complexo.

Se perguntarem onde ele trabalhou, cite a ds.marketing (atual) primeiro, depois o Grupo Multi360 e a VIVO.`;

export interface Message {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: Date;
}

const MODELS = {
    PRIMARY: "gemini-2.5-flash-lite",
    SECONDARY: "gemini-2.5-flash",
    TERTIARY: "gemini-2.0-flash"
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
            const ai = new GoogleGenAI({ apiKey: API_KEY });

            const attemptGeneration = async (modelName: string): Promise<string> => {
                const response = await ai.models.generateContent({
                    model: modelName,
                    contents: [
                        ...messages.map(m => ({
                            role: m.role as "user" | "model",
                            parts: [{ text: m.text }]
                        })),
                        { role: "user" as const, parts: [{ text }] },
                    ],
                    config: {
                        systemInstruction: SYSTEM_INSTRUCTION_BASE + `\n\nIdioma atual: ${language}. Responda em ${language}.`,
                        maxOutputTokens: 200,
                        temperature: 0.7
                    }
                });

                const out = response.text;
                if (!out) throw new Error("Empty response from model");
                return out;
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
