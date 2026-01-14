import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/language-context";
import WhatsAppModal from "@/components/whatsapp-modal";
import LanguageSelector from "@/components/language-selector";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallace Luis | Full Stack Developer & Data Analyst",
  description: "Portfólio de Wallace Luis - Especialista em Desenvolvimento Full Stack e Análise de Dados.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <LanguageProvider>
          {children}
          <LanguageSelector />
          <WhatsAppModal />
        </LanguageProvider>
      </body>
    </html>
  );
}
