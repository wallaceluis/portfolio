"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface ImageCarouselProps {
    images: string[];
    alt?: string;
    className?: string;
    interval?: number;
}

export const ImageCarousel = ({ images, alt = "Carousel Image", className, interval = 5000 }: ImageCarouselProps) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, interval);
        return () => clearInterval(timer);
    }, [images.length, interval, current]);

    const next = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrent((prev) => (prev + 1) % images.length);
    };

    const prev = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className={cn("relative w-full h-full min-h-[6rem] rounded-xl overflow-hidden bg-gradient-to-br from-violet-950 to-purple-900 border border-white/10 group", className)}>
            <AnimatePresence mode="popLayout">
                <motion.img
                    key={images[current]}
                    src={images[current]}
                    alt={alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                />
            </AnimatePresence>

            <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-20"
            >
                <ChevronLeft className="w-4 h-4" />
            </button>
            <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-20"
            >
                <ChevronRight className="w-4 h-4" />
            </button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                {images.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${current === idx ? "bg-white" : "bg-white/40"}`}
                    />
                ))}
            </div>
        </div>
    );
};
