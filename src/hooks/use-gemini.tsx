"use client";

import { useState, useCallback } from "react";
import { useLanguage } from "@/contexts/language-context";

export interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

const getQuotaUsage = () => {
  if (typeof window === "undefined") return 0;

  const today = new Date().toISOString().split("T")[0];
  const stored = localStorage.getItem("gemini_quota");

  let stats = { date: today, count: 0 };
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.date === today) {
        stats = parsed;
      }
    } catch {
      // ignore invalid storage
    }
  }
  return stats.count;
};

const incrementQuotaUsage = () => {
  if (typeof window === "undefined") return;

  const today = new Date().toISOString().split("T")[0];
  const currentCount = getQuotaUsage();
  localStorage.setItem(
    "gemini_quota",
    JSON.stringify({
      date: today,
      count: currentCount + 1,
    })
  );
};

export function useGeminiChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();

  const sendMessage = useCallback(
    async (text: string) => {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: messages.map((m) => ({ role: m.role, text: m.text })),
            text,
            language,
          }),
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        if (!data.text) {
          throw new Error("Empty response");
        }

        incrementQuotaUsage();

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "model",
            text: data.text,
            timestamp: new Date(),
          },
        ]);
      } catch {
        const errorMessage =
          "Cota diária da assistente excedida. Entre em contato diretamente pelo WhatsApp: (19) 98257-1877";

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "model",
            text: errorMessage,
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, language]
  );

  return { messages, isLoading, sendMessage };
}
