import { Github, Linkedin, Mail, Instagram, MessageCircle, ArrowUp } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const WHATSAPP_URL =
    "https://wa.me/5519982571877?text=Ol%C3%A1%20Wallace!%20Vi%20seu%20portf%C3%B3lio%20e%20quero%20conversar.";

const SOCIALS = [
    { href: "https://github.com/wallaceluis", label: "GitHub", icon: Github },
    { href: "https://linkedin.com/in/wallaceluis", label: "LinkedIn", icon: Linkedin },
    { href: "https://instagram.com/wallaceluis_", label: "Instagram", icon: Instagram },
    { href: "mailto:contato@wallaceluis.com.br", label: "Email", icon: Mail },
];

export const Footer = () => {
    const { t } = useLanguage();
    return (
        <footer id="contato" className="pt-8 pb-10 bg-black relative z-20 overflow-hidden">
            <div className="relative max-w-5xl mx-auto px-4">
                {/* CTA final */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-950/60 via-neutral-950 to-purple-950/40 px-6 py-12 md:py-16 text-center">
                    <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" aria-hidden="true" />
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[30rem] h-[30rem] max-w-full rounded-full bg-blue-600/20 blur-3xl" aria-hidden="true" />

                    <div className="relative">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 text-balance">
                            {t("footer.title")}
                        </h2>

                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                            <a
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-[#25D366]/90 hover:bg-[#25D366] shadow-[0_0_24px_rgba(37,211,102,0.35)] transition-colors"
                            >
                                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                                {t("hero.ctaWhatsapp")}
                            </a>
                            <a
                                href="mailto:contato@wallaceluis.com.br"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors"
                            >
                                <Mail className="w-4 h-4" aria-hidden="true" />
                                contato@wallaceluis.com.br
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
                    <p className="text-sm text-neutral-500">
                        © {new Date().getFullYear()} Wallace Luis. {t("footer.rights")}
                    </p>

                    <div className="flex items-center gap-2">
                        {SOCIALS.map(({ href, label, icon: Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target={href.startsWith("http") ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                            >
                                <Icon className="w-4 h-4" aria-hidden="true" />
                            </a>
                        ))}
                        <a
                            href="#top"
                            aria-label="Voltar ao topo"
                            className="ml-2 p-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                        >
                            <ArrowUp className="w-4 h-4" aria-hidden="true" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
