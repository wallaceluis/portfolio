import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/language-context";
import WhatsAppModal from "@/components/whatsapp-modal";
import LanguageSelector from "@/components/language-selector";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallace Luis | Desenvolvedor Full Stack Pleno",
  description: "Portfólio de Wallace Luis - Desenvolvedor Full Stack Pleno especializado em aplicações web, APIs, microsserviços e integrações com IA.",
  icons: {
    icon: "/icon.svg",
  },
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
