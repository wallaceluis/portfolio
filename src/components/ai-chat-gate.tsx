"use client";

import dynamic from "next/dynamic";

const WhatsAppModal = dynamic(() => import("@/components/whatsapp-modal"), {
    ssr: false,
});

export const AiChatGate = () => {
    if (process.env.NEXT_PUBLIC_ENABLE_AI_CHAT !== "true") return null;
    return <WhatsAppModal />;
};
