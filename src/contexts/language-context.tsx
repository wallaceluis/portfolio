"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'en' | 'es';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    pt: {
        greeting: "Olá! Sou a assistente virtual do Wallace. Como posso ajudar?",
        placeholder: "Digite uma mensagem...",
        listening: "Ouvindo...",
        send: "Enviar",
        videoCall: "Chamada de Vídeo",
        online: "Online",
        typing: "Digitando...",
        audioError: "Erro no áudio. Digite sua mensagem.",
        hero: {
            description: "Construindo o futuro com código e dados. Morando em Campinas-SP, transformando ideias em soluções escaláveis."
        },
        footer: {
            title: "Vamos construir algo incrível juntos",
            rights: "Todos os direitos reservados."
        },
        experience: {
            sectionTitle: "Experiência",
            dev: {
                recruitment: {
                    title: "Ecossistema de Recrutamento",
                    desc: "Construí uma plataforma completa de recrutamento usando Nest.js e Next.js, lidando com milhares de aplicações diárias."
                },
                openai: {
                    title: "Integrações Inteligentes OpenAI",
                    desc: "Engenharia de triagem automática de currículos e chatbots assistentes para o Grupo Multi360."
                },
                coinstracker: {
                    title: "Coins Tracker",
                    desc: "Desenvolvi um sistema que ao consumir a API da coinscap faz conversões e calcula o valor de moedas em tempo real."
                },
                frontend: {
                    title: "Arquitetura Frontend Moderna",
                    desc: "Expertise em React, Tailwind CSS e Framer Motion para interfaces genéricas altamente interativas."
                }
            },
            data: {
                vivo: {
                    title: "Telefônica VIVO Analytics",
                    desc: "Liderei o desenvolvimento de ferramentas de análise de Market Share, impulsionando a tomada de decisão estratégica em setores regionais."
                },
                sla: {
                    title: "Dashboards de Monitoramento SLA",
                    desc: "Projetei dashboards Power BI em tempo real para rastrear Acordos de Nível de Serviço e KPIs operacionais."
                },
                marketing: {
                    title: "Inteligência de Marketing",
                    desc: "Implementei relatórios no Looker Studio para analisar desempenho de campanhas e ROI."
                },
                processing: {
                    title: "Processamento de Dados Avançado",
                    desc: "Utilizei Python e SQL para transformação de dados complexa e pipelines ETL."
                }
            }
        },
        timeline: {
            sectionTitle: "Trajetória Profissional",
            sectionSubtitleDev: "Construindo soluções escaláveis e integrando Inteligência Artificial.",
            sectionSubtitleData: "Transformando grandes volumes de dados em decisões estratégicas.",
            multi360: {
                period: "04/2025 - Atual",
                company: "Grupo Multi360",
                dev: {
                    title: "Especialista em IA & Dev Full Stack",
                    desc: "Liderança técnica no projeto MultiOne Talents. Desenvolvimento de APIs com Nest.js, interfaces com Next.js e integração de LLMs (OpenAI) para fluxos de atendimento automatizados."
                },
                data: {
                    title: "Especialista em IA & Assistente de Dados",
                    desc: "Criação de dashboards estratégicos para controle de SLA e marketing. Análise de performance utilizando SQL, Power BI e Looker Studio, além de automações com Python e Make."
                }
            },
            vivo: {
                period: "08/2024 - 02/2025",
                company: "Telefônica Brasil (VIVO)",
                dev: {
                    title: "Estagiário de Automação e Dados",
                    desc: "Desenvolvimento de scripts em Python e SQL para automação de processos internos e suporte à infraestrutura de dados."
                },
                data: {
                    title: "Estagiário em Análise de Dados",
                    desc: "Análise de grandes volumes de dados corporativos, market share e vendas. Desenvolvimento de dashboards no Power BI para suporte à tomada de decisão da diretoria."
                }
            },
            education: {
                period: "01/2024 - 06/2026",
                institution: "UNICESUMAR",
                title: "Análise e Desenvolvimento de Sistemas",
                desc: "Foco em engenharia de software, estruturas de dados e desenvolvimento de aplicações modernas."
            }
        }
    },
    en: {
        greeting: "Hello! I'm Wallace's virtual assistant. How can I help you?",
        placeholder: "Type a message...",
        listening: "Listening...",
        send: "Send",
        videoCall: "Video Call",
        online: "Online",
        typing: "Typing...",
        audioError: "Audio error. Please type.",
        hero: {
            description: "Building the future with code and data. Based in Campinas-SP, transforming ideas into scalable solutions."
        },
        footer: {
            title: "Let's build something amazing together",
            rights: "All rights reserved."
        },
        experience: {
            sectionTitle: "Experience",
            dev: {
                recruitment: {
                    title: "Recruitment Ecosystem",
                    desc: "Built a comprehensive recruitment platform using Nest.js and Next.js, handling thousands of daily applications."
                },
                openai: {
                    title: "OpenAI Smart Integrations",
                    desc: "Engineered automated resume screening and chatbot assistants for Grupo Multi360."
                },
                coinstracker: {
                    title: "Coins Tracker",
                    desc: "Developed a system that consumes the coinscap API to make conversions and calculate the value of coins in real time."
                },
                frontend: {
                    title: "Modern Frontend Architecture",
                    desc: "Expertise in React, Tailwind CSS, and Framer Motion for highly interactive generic UIs."
                }
            },
            data: {
                vivo: {
                    title: "Telefônica VIVO Analytics",
                    desc: "Led the development of Market Share analysis tools, driving strategic decision making in regional sectors."
                },
                sla: {
                    title: "SLA Monitoring Dashboards",
                    desc: "Designed real-time Power BI dashboards to track Service Level Agreements and operational KPIs."
                },
                marketing: {
                    title: "Marketing Intelligence",
                    desc: "Implemented Looker Studio reports to analyze campaign performance and ROI."
                },
                processing: {
                    title: "Advanced Data Processing",
                    desc: "Utilized Python and SQL for complex data transformation and ETL pipelines."
                }
            }
        },
        timeline: {
            sectionTitle: "Professional Trajectory",
            sectionSubtitleDev: "Building scalable solutions and integrating Artificial Intelligence.",
            sectionSubtitleData: "Transforming large volumes of data into strategic decisions.",
            multi360: {
                period: "04/2025 - Present",
                company: "Multi360 Group",
                dev: {
                    title: "AI Specialist & Full Stack Dev",
                    desc: "Technical leadership on the MultiOne Talents project. API development with Nest.js, interfaces with Next.js, and LLM (OpenAI) integration for automated service flows."
                },
                data: {
                    title: "AI Specialist & Data Assistant",
                    desc: "Creation of strategic dashboards for SLA and marketing control. Performance analysis using SQL, Power BI, and Looker Studio, along with automation via Python and Make."
                }
            },
            vivo: {
                period: "08/2024 - 02/2025",
                company: "Telefônica Brasil (VIVO)",
                dev: {
                    title: "Automation and Data Intern",
                    desc: "Development of Python and SQL scripts for internal process automation and data infrastructure support."
                },
                data: {
                    title: "Data Analysis Intern",
                    desc: "Development of strategic dashboards for the board of directors. Analysis of sales, market share, and large corporate data volumes."
                }
            },
            education: {
                period: "01/2024 - 06/2026",
                institution: "UNICESUMAR",
                title: "Analysis and Systems Development",
                desc: "Focus on software engineering foundations, data structures, and modern application development."
            }
        }
    },
    es: {
        greeting: "¡Hola! Soy la asistente virtual de Wallace. ¿Cómo puedo ayudarte?",
        placeholder: "Escribe un mensaje...",
        listening: "Escuchando...",
        send: "Enviar",
        videoCall: "Videollamada",
        online: "En línea",
        typing: "Escribiendo...",
        audioError: "Error de audio. Por favor escriba.",
        hero: {
            description: "Construyendo el futuro con código y datos. Con sede en Campinas-SP, transformando ideas en soluciones escalables."
        },
        footer: {
            title: "Construyamos algo increíble juntos",
            rights: "Todos los derechos reservados."
        },
        experience: {
            sectionTitle: "Experiencia",
            dev: {
                recruitment: {
                    title: "Ecosistema de Reclutamiento",
                    desc: "Construí una plataforma integral de reclutamiento usando Nest.js y Next.js, manejando miles de aplicaciones diarias."
                },
                openai: {
                    title: "Integraciones Inteligentes OpenAI",
                    desc: "Ingeniería de filtrado automático de currículums y chatbots asistentes para el Grupo Multi360."
                },
                coinstracker: {
                    title: "Coins Tracker",
                    desc: "Desarrollé un sistema que consume la coinscap API para hacer conversiones y calcular el valor de monedas en tiempo real."
                },
                frontend: {
                    title: "Arquitectura Frontend Moderna",
                    desc: "Experiencia en React, Tailwind CSS y Framer Motion para interfaces genéricas altamente interactivas."
                }
            },
            data: {
                vivo: {
                    title: "Telefônica VIVO Analytics",
                    desc: "Lideré el desarrollo de herramientas de análisis de Market Share, impulsando la toma de decisiones estratégicas en sectores regionales."
                },
                sla: {
                    title: "Tableros de Monitoreo SLA",
                    desc: "Diseñé tableros de Power BI en tiempo real para rastrear Acuerdos de Nivel de Servicio y KPIs operativos."
                },
                marketing: {
                    title: "Inteligencia de Marketing",
                    desc: "Implementé informes en Looker Studio para analizar el rendimiento de campañas y el ROI."
                },
                processing: {
                    title: "Procesamiento de Datos Avanzado",
                    desc: "Utilicé Python y SQL para transformación de datos compleja y tuberías ETL."
                }
            }
        },
        timeline: {
            sectionTitle: "Trayectoria Profesional",
            sectionSubtitleDev: "Construyendo soluciones escalables e integrando Inteligencia Artificial.",
            sectionSubtitleData: "Transformando grandes volúmenes de datos en decisiones estratégicas.",
            multi360: {
                period: "04/2025 - Actualidad",
                company: "Grupo Multi360",
                dev: {
                    title: "Especialista en IA & Dev Full Stack",
                    desc: "Liderazgo técnico en el proyecto MultiOne Talents. Desarrollo de APIs con Nest.js, interfaces con Next.js e integración de LLMs (OpenAI) para flujos de atención automatizados."
                },
                data: {
                    title: "Especialista en IA & Asistente de Datos",
                    desc: "Creación de tableros estratégicos para control de SLA y marketing. Análisis de rendimiento utilizando SQL, Power BI y Looker Studio, además de automatizaciones con Python y Make."
                }
            },
            vivo: {
                period: "08/2024 - 02/2025",
                company: "Telefônica Brasil (VIVO)",
                dev: {
                    title: "Pasante de Automatización y Datos",
                    desc: "Desarrollo de scripts en Python y SQL para la automatización de procesos internos y soporte a la infraestructura de datos."
                },
                data: {
                    title: "Pasante de Análisis de Datos",
                    desc: "Desarrollo de tableros estratégicos para la dirección. Análisis de ventas, cuota de mercado y grandes volúmenes de datos corporativos."
                }
            },
            education: {
                period: "01/2024 - 06/2026",
                institution: "UNICESUMAR",
                title: "Análisis y Desarrollo de Sistemas",
                desc: "Enfoque en ingeniería de software, estructuras de datos y desarrollo de aplicaciones modernas."
            }
        }
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('pt');

    const t = (key: string) => {
        const keys = key.split('.');
        let value: any = translations[language];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key;
            }
        }

        return typeof value === 'string' ? value : key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
