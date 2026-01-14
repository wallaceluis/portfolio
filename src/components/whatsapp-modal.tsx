"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, X, Video, Phone, MessageCircle, AlertCircle, Keyboard } from 'lucide-react';
import { useGeminiChat } from '@/hooks/use-gemini';
import { useLanguage } from '@/contexts/language-context';

export default function WhatsAppModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [tempError, setTempError] = useState<string | null>(null);
    const [isAudioSupported, setIsAudioSupported] = useState(false);
    const { messages, isLoading, sendMessage } = useGeminiChat();
    const { t, language } = useLanguage();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);
    const retryCountRef = useRef(0);

    // Audio Support Check on Mount
    useEffect(() => {
        // 1. Check Secure Context (HTTPS or localhost)
        const isSecure = typeof window !== 'undefined' &&
            (window.location.protocol === 'https:' || window.location.hostname === 'localhost');

        // 2. Check Browser Support
        const hasSpeechApi = typeof window !== 'undefined' &&
            ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

        if (isSecure && hasSpeechApi) {
            setIsAudioSupported(true);
        } else {
            if (!isSecure) console.warn("Audio disabled: Insecure context (not HTTPS/localhost)");
            setIsAudioSupported(false);
        }
    }, []);

    const handleSpeechError = (event: any) => {
        console.error("Speech Error Details:", event.error, event.message);
        setIsListening(false);

        if (event.error === 'network') {
            if (retryCountRef.current < 1) {
                console.log("Attempting retry due to network error...");
                retryCountRef.current += 1;
                setTimeout(() => startListening(), 500);
                return; // Don't show error yet
            }
            setTempError(t('audioError'));
            setTimeout(() => setTempError(null), 3000);
        } else if (event.error === 'not-allowed') {
            setTempError("Microfone bloqueado.");
            setTimeout(() => setTempError(null), 3000);
            setIsAudioSupported(false); // Disable mic if permission denied
        } else {
            setTempError("Erro no áudio.");
            setTimeout(() => setTempError(null), 2000);
        }
    };

    const startListening = () => {
        if (!isAudioSupported) {
            setTempError("Áudio não disponível.");
            setTimeout(() => setTempError(null), 2000);
            return;
        }

        setTempError(null);
        try {
            // @ts-ignore
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognitionRef.current = recognition;

            // Critical: Set Lang BEFORE start
            recognition.lang = language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : 'pt-BR';
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onstart = () => {
                setIsListening(true);
                retryCountRef.current = 0; // Reset retry on success start
            };

            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInputText(transcript);
                setIsListening(false);
            };

            recognition.onerror = handleSpeechError;

            recognition.onend = () => {
                setIsListening(false);
            };

            recognition.start();

        } catch (e) {
            console.error("Failed to initialize recognition", e);
            setIsListening(false);
            setTempError("Falha ao iniciar áudio.");
            setTimeout(() => setTempError(null), 2000);
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    }

    const handleSend = () => {
        if (inputText.trim()) {
            sendMessage(inputText);
            setInputText('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="fixed bottom-6 right-6 z-50 pointer-events-auto"
                    >
                        <button
                            onClick={() => setIsOpen(true)}
                            className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors relative"
                            aria-label="Open Chat"
                        >
                            <MessageCircle size={32} />
                            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 w-full md:w-[380px] h-full md:h-[600px] flex flex-col shadow-2xl overflow-hidden font-sans pointer-events-auto rounded-none md:rounded-2xl border border-gray-100"
                    >
                        {/* Smartphone Frame Wrapper (simulated for desktop) */}
                        <div className="relative w-full h-full bg-[#E5DDD5] flex flex-col">

                            {/* Header */}
                            <div className="bg-[#075E54] p-3 flex items-center justify-between text-white shadow-md z-10">
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setIsOpen(false)} className="md:hidden">
                                        <X size={24} />
                                    </button>
                                    <div className="flex items-center gap-2">
                                        <div className="relative">
                                            {/* Avatar Placeholder */}
                                            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                                                {/* Replace with actual image later */}
                                                <div className="w-full h-full flex items-center justify-center bg-teal-800 font-bold">WL</div>
                                            </div>
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#075E54] rounded-full"></div>
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="font-semibold text-sm">Wallace Luis</h3>
                                            <span className="text-[10px] opacity-80 truncate w-32">
                                                {isLoading ? (
                                                    <span className="flex items-center gap-1">
                                                        {t('typing')}
                                                    </span>
                                                ) : t('online')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    {/* Video Simulation */}
                                    <div className="relative group cursor-pointer">
                                        <Video size={20} className={isLoading ? "animate-pulse text-green-300" : ""} />
                                        {isLoading && (
                                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                                        )}
                                    </div>
                                    <Phone size={20} />
                                    <div className="hidden md:block">
                                        <button onClick={() => setIsOpen(false)}>
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Chat Body */}
                            <div
                                className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat"
                            >
                                {/* Initial Greeting */}
                                <div className="self-center bg-[#DCF8C6] shadow-sm rounded-lg py-1 px-3 mb-4 text-xs text-gray-500">
                                    {new Date().toLocaleDateString()}
                                </div>

                                <div className="self-start max-w-[80%] bg-white rounded-tr-lg rounded-bl-lg rounded-br-lg shadow-sm p-3 text-sm text-gray-800 relative">
                                    {t('greeting')}
                                    <span className="text-[10px] text-gray-400 block text-right mt-1">
                                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>

                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`max-w-[80%] p-3 text-sm shadow-sm relative ${msg.role === 'user'
                                                ? 'self-end bg-[#DCF8C6] rounded-tl-lg rounded-bl-lg rounded-br-lg text-gray-800' // WhatsApp Green User
                                                : 'self-start bg-white rounded-tr-lg rounded-bl-lg rounded-br-lg text-gray-800' // White AI
                                            }`}
                                    >
                                        {msg.text}
                                        <span className="text-[10px] text-gray-400 block text-right mt-1">
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="self-start max-w-[80%] bg-white rounded-tr-lg rounded-bl-lg rounded-br-lg shadow-sm p-3 text-sm text-gray-800 relative">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-2 bg-[#F0F0F0] flex flex-col gap-1 z-10">
                                {/* Error Toast inside chat */}
                                <AnimatePresence>
                                    {tempError && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-md self-center mb-1 flex items-center gap-1"
                                        >
                                            <AlertCircle size={12} />
                                            {tempError}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="flex items-end gap-2 w-full">
                                    <div className="flex-1 bg-white rounded-2xl flex items-center px-4 py-2 shadow-sm">
                                        <input
                                            type="text"
                                            value={inputText}
                                            onChange={(e) => setInputText(e.target.value)}
                                            onKeyDown={handleKeyPress}
                                            placeholder={isListening ? t('listening') : t('placeholder')}
                                            className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                                        />
                                    </div>

                                    {/* Send / Mic Button */}
                                    {inputText.trim() ? (
                                        <button
                                            onClick={handleSend}
                                            className="p-3 rounded-full text-white shadow-md transition-all duration-200 flex items-center justify-center bg-[#075E54] hover:bg-[#128C7E]"
                                        >
                                            <Send size={20} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={isListening ? stopListening : startListening}
                                            disabled={!isAudioSupported}
                                            className={`p-3 rounded-full text-white shadow-md transition-all duration-200 flex items-center justify-center ${!isAudioSupported
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : isListening
                                                        ? "bg-red-500 animate-pulse"
                                                        : "bg-[#075E54]"
                                                }`}
                                        >
                                            {!isAudioSupported ? <Keyboard size={20} /> : <Mic size={20} />}
                                        </button>
                                    )}
                                </div>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
