import Link from "next/link";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export const Footer = () => {
    const { t } = useLanguage();
    return (
        <footer className="py-12 bg-neutral-950 border-t border-white/10 relative z-20">
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-500">
                    {t('footer.title')}
                </h3>

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
                        href="mailto:contact@wallaceluis.com" // Placeholder or usage of phone
                        className="p-3 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:border-neutral-600 transition-all text-white"
                    >
                        <Mail className="w-5 h-5" />
                    </Link>
                </div>

                <div className="flex items-center gap-2 text-neutral-500 mt-4">
                    <Phone className="w-4 h-4" />
                    <span>(19) 98257-1877</span>
                </div>

                <p className="text-sm text-neutral-600 mt-8">
                    © {new Date().getFullYear()} Wallace Luis. {t('footer.rights')}
                </p>
            </div>
        </footer>
    );
};
