import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

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

const MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  "gemini-2.0-flash",
];

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY not configured on server" },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const { messages = [], text = "", language = "pt" } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey });

    for (const modelName of MODELS) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: [
            ...messages.map((m: { role: string; text: string }) => ({
              role: m.role === "model" ? ("model" as const) : ("user" as const),
              parts: [{ text: String(m.text || "") }],
            })),
            { role: "user" as const, parts: [{ text }] },
          ],
          config: {
            systemInstruction:
              SYSTEM_INSTRUCTION_BASE +
              `\n\nIdioma atual: ${language}. Responda em ${language}.`,
            maxOutputTokens: 200,
            temperature: 0.7,
          },
        });

        if (response.text) {
          return NextResponse.json({ text: response.text });
        }
      } catch {
        // Fallback para o próximo modelo
      }
    }

    return NextResponse.json(
      { error: "All models failed" },
      { status: 502 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
