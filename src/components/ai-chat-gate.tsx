"use client";

import dynamic from "next/dynamic";

// Chat com IA oculto: a chave Gemini (NEXT_PUBLIC_GEMINI_API_KEY) foi exposta no
// bundle client-side e o projeto Google foi suspenso por uso abusivo de terceiros.
// Só reative com uma chave nova, restrita, servida por route handler server-side.
// Reativação futura: NEXT_PUBLIC_ENABLE_AI_CHAT=true
const WhatsAppModal = dynamic(() => import("@/components/whatsapp-modal"), {
    ssr: false,
});

export const AiChatGate = () => {
    if (process.env.NEXT_PUBLIC_ENABLE_AI_CHAT !== "true") return null;
    return <WhatsAppModal />;
};
