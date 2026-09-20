import Link from "next/link";
import { Github, Linkedin, Mail, Instagram, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export const Footer = () => {
    const { t } = useLanguage();
    return (
        <footer className="py-12 bg-neutral-950 relative z-20 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-16 md:h-24 bg-gradient-to-b from-black to-transparent pointer-events-none" aria-hidden="true" />
            <div className="relative max-w-7xl mx-auto px-4 flex flex-col items-center gap-6">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-500">
                    {t('footer.title')}
                </h2>

                <div className="flex gap-6 mt-4">
                    <Link
                        href="https://github.com/wallaceluis"
                        target="_blank"
                        className="p-3 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:border-neutral-600 transition-all text-white"
                    >
                        <Github className="w-5 h-5" />
                    </Link>
                    <Link
                        href="https://linkedin.com/in/wallaceluis"
                        target="_blank"
                        className="p-3 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:border-neutral-600 transition-all text-white"
                    >
                        <Linkedin className="w-5 h-5" />
                    </Link>
                    <Link
                        href="mailto:contato@wallaceluis.com.br"

                        aria-label="Email"
                        className="p-3 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:border-neutral-600 transition-all text-white"
                    >
                        <Mail className="w-5 h-5" />
                    </Link>
                    <Link
                        href="https://wa.me/5519982571877?text=Ol%C3%A1%20Wallace!%20Vi%20seu%20portf%C3%B3lio%20e%20quero%20conversar."
                        target="_blank"
                        aria-label="WhatsApp"
                        className="p-3 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-[#25D366] hover:border-[#25D366] transition-all text-white"
                    >
                        <MessageCircle className="w-5 h-5" />
                    </Link>
                    <Link
                        href="https://instagram.com/wallaceluis_"
                        target="_blank"
                        aria-label="Instagram"
                        className="p-3 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:border-neutral-600 transition-all text-white"
                    >
                        <Instagram className="w-5 h-5" />
                    </Link>
                </div>

                <div className="flex flex-col items-center gap-1 text-neutral-500 mt-4 text-sm">
                    <Link
                        href="https://wa.me/5519982571877"
                        target="_blank"
                        className="hover:text-white transition-colors"
                    >
                        (19) 98257-1877
                    </Link>
                    <Link
                        href="https://instagram.com/wallaceluis_"
                        target="_blank"
                        className="hover:text-white transition-colors"
                    >
                        @wallaceluis_
                    </Link>
                    <Link
                        href="mailto:contato@wallaceluis.com.br"
                        className="hover:text-white transition-colors"
                    >
                        contato@wallaceluis.com.br
                    </Link>
                </div>

                <p className="text-sm text-neutral-600 mt-8">
                    © {new Date().getFullYear()} Wallace Luis. {t('footer.rights')}
                </p>
            </div>
        </footer>
    );
};
