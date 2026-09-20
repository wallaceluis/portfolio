import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/language-context";
import WhatsAppModal from "@/components/whatsapp-modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://wallaceluis.com.br"),
  title: {
    default: "Wallace Luis | Desenvolvedor Full Stack Pleno",
    template: "%s | Wallace Luis",
  },
  description:
    "Portfólio de Wallace Luis, Desenvolvedor Full Stack Pleno: TypeScript, React, React Native, Node.js, Nest.js, Next.js, microsserviços, AWS, Docker e integração de IA generativa (OpenAI, Gemini). Apps em produção com 2.000+ utilizadores.",
  keywords: [
    "Desenvolvedor Full Stack",
    "Full Stack Developer",
    "TypeScript",
    "React",
    "React Native",
    "Node.js",
    "Nest.js",
    "Next.js",
    "PostgreSQL",
    "Microsserviços",
    "AWS",
    "Docker",
    "Inteligência Artificial",
    "OpenAI",
    "Portfólio",
    "Wallace Luis",
  ],
  authors: [{ name: "Wallace Luis", url: "https://wallaceluis.com.br" }],
  creator: "Wallace Luis",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Wallace Luis | Desenvolvedor Full Stack Pleno",
    description:
      "Full Stack Pleno: TypeScript, React, React Native, Node.js, microsserviços, cloud e IA generativa. Soluções em produção com impacto real.",
    url: "/",
    siteName: "Wallace Luis — Portfólio",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/foto-perfil.jpg",
        width: 800,
        height: 800,
        alt: "Foto de Wallace Luis, Desenvolvedor Full Stack Pleno",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wallace Luis | Desenvolvedor Full Stack Pleno",
    description:
      "Full Stack Pleno: TypeScript, React, React Native, Node.js, microsserviços, cloud e IA generativa.",
    images: ["/foto-perfil.jpg"],
  },
  icons: {
    icon: "/icon.svg",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Wallace Luis",
  jobTitle: "Mid-Level Full Stack Developer",
  description:
    "Desenvolvedor Full Stack Pleno especializado em TypeScript, React, React Native, Node.js, microsserviços e IA generativa.",
  url: "https://wallaceluis.com.br",
  email: "mailto:contato@wallaceluis.com.br",
  telephone: "+55-19-98257-1877",
  alumniOf: { "@type": "CollegeOrUniversity", name: "UNICESUMAR" },
  worksFor: { "@type": "Organization", name: "ds.marketing" },
  sameAs: [
    "https://github.com/wallaceluis",
    "https://linkedin.com/in/wallaceluis",
    "https://instagram.com/wallaceluis_",
  ],
  knowsAbout: [
    "TypeScript",
    "JavaScript",
    "React",
    "React Native",
    "Next.js",
    "Node.js",
    "Nest.js",
    "PostgreSQL",
    "REST API",
    "Microservices",
    "AWS",
    "Docker",
    "Terraform",
    "Generative AI",
    "OpenAI API",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <LanguageProvider>
          {children}
          <WhatsAppModal />
        </LanguageProvider>
      </body>
    </html>
  );
}
