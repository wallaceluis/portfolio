"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
import { ImageCarousel } from "./image-carousel";

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
        title: string;
        description: string;
        images: string[];
        siteUrl?: string;
        githubUrl?: string;
    } | null;
    carouselClassName?: string;
}

export const ProjectModal = ({ isOpen, onClose, project, carouselClassName }: ProjectModalProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen || !project || !mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:max-w-3xl h-full md:h-auto z-[101] p-4 md:p-0"
                    >
                        <div className="bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl h-full md:max-h-[85vh] flex flex-col">
                            <div className="relative w-full aspect-video md:aspect-[2/1] bg-neutral-800">
                                <ImageCarousel images={project.images} alt={project.title} className={carouselClassName} interval={5000} />
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-colors z-20"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar">
                                <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                                <p className="text-neutral-300 leading-relaxed mb-8">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    {project.siteUrl && (
                                        <a
                                            href={project.siteUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Visitar Site
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white border border-white/10 rounded-lg font-medium transition-colors"
                                        >
                                            <Github className="w-4 h-4" />
                                            Ver Repositório
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};
