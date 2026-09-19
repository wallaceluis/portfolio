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
            roleDev: "Desenvolvedor Full Stack Pleno",
            roleData: "Analista de Dados & Especialista em BI",
            description: "Desenvolvedor Full Stack com experiência em aplicações web, APIs e integrações. Forte atuação no ecossistema JavaScript/TypeScript, com experiência no gerenciamento de monorepos, arquitetura de microsserviços e infraestrutura multi-cloud. Atuação no desenvolvimento e manutenção de produtos escaláveis, integrando IA conversacional, APIs de comunicação multicanal e processamento assíncrono. Produtividade acelerada pelo uso contínuo de ferramentas de desenvolvimento assistido por IA (Cursor, Claude Code, Codex e integrações MCP)."
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
            dsmarketing: {
                period: "01/2026 - Atual",
                company: "ds.marketing",
                dev: {
                    title: "Desenvolvedor Full Stack Pleno",
                    desc: "Manutenção de APIs e ecossistema distribuído em microsserviços e monorepo (Nx, pnpm) com Node.js e Bun. Criação de estúdio para geração de encartes com Fabric.js. App mobile nativo (React Native bare) com IA conversacional. Integração de IA para texto, áudio e vídeo (OpenAI, Gemini Live, ElevenLabs). Mensageria e ads (WhatsApp, Meta API). Infra Cloud/DevOps (AWS, GCP, Terraform)."
                },
                data: {
                    title: "Desenvolvedor Full Stack Pleno",
                    desc: "Manutenção de APIs e ecossistema distribuído em microsserviços e monorepo (Nx, pnpm). Backend com Node.js e Bun, mensageria (WhatsApp, Meta API) e infra Cloud (AWS, GCP, Terraform), além de integrações de IA para texto, áudio e vídeo."
                }
            },
            multi360: {
                period: "04/2025 - 01/2026",
                company: "Grupo Multi360",
                dev: {
                    title: "Especialista em Desenvolvimento de IA e Automação",
                    desc: "Desenvolvimento full stack com React.js, Next.js, TypeScript e Nest.js. Liderança técnica no sistema de recrutamento. Soluções de IA com OpenAI API, automações com Python e Make e gerenciamento de servidores Ubuntu/Docker."
                },
                data: {
                    title: "Especialista em Desenvolvimento de IA e Automação",
                    desc: "Criação de dashboards estratégicos para controle de SLA e marketing. Análise de performance com SQL, Power BI e Looker Studio, além de automações com Python e Make e gestão de servidores Ubuntu/Docker."
                }
            },
            vivo: {
                period: "08/2024 - 02/2025",
                company: "Telefônica Brasil (VIVO)",
                dev: {
                    title: "Estagiário em Análise de Dados",
                    desc: "Automação de análises e processos utilizando Python e SQL. Desenvolvimento de dashboards usando Power BI."
                },
                data: {
                    title: "Estagiário em Análise de Dados",
                    desc: "Automação de análises e processos utilizando Python e SQL. Desenvolvimento de dashboards usando Power BI para suporte à tomada de decisão."
                }
            },
            education: {
                period: "Previsão de conclusão: 08/2027",
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
            roleDev: "Mid-Level Full Stack Developer",
            roleData: "Data Analyst & BI Specialist",
            description: "Full Stack Developer with experience in web applications, APIs and integrations. Strong background in the JavaScript/TypeScript ecosystem, managing monorepos, microservices architecture and multi-cloud infrastructure. Development and maintenance of scalable products, integrating conversational AI, multichannel communication APIs and async processing. Productivity boosted by continuous use of AI-assisted development tools (Cursor, Claude Code, Codex and MCP integrations)."
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
            dsmarketing: {
                period: "01/2026 - Present",
                company: "ds.marketing",
                dev: {
                    title: "Mid-Level Full Stack Developer",
                    desc: "Maintenance of APIs and distributed microservices ecosystem in a monorepo (Nx, pnpm) with Node.js and Bun. Flyer-studio builder with Fabric.js. Native mobile app (React Native bare) with conversational AI. AI integrations for text, audio and video (OpenAI, Gemini Live, ElevenLabs). Messaging and ads (WhatsApp, Meta API). Cloud/DevOps infra (AWS, GCP, Terraform)."
                },
                data: {
                    title: "Mid-Level Full Stack Developer",
                    desc: "Maintenance of APIs and distributed microservices in a monorepo (Nx, pnpm). Backend with Node.js and Bun, messaging (WhatsApp, Meta API) and Cloud infra (AWS, GCP, Terraform), plus AI integrations for text, audio and video."
                }
            },
            multi360: {
                period: "04/2025 - 01/2026",
                company: "Multi360 Group",
                dev: {
                    title: "AI Development & Automation Specialist",
                    desc: "Full stack development with React.js, Next.js, TypeScript and Nest.js. Technical leadership on the recruitment system. AI solutions with OpenAI API, automations with Python and Make, and Ubuntu/Docker server management."
                },
                data: {
                    title: "AI Development & Automation Specialist",
                    desc: "Creation of strategic dashboards for SLA and marketing control. Performance analysis using SQL, Power BI and Looker Studio, along with automation via Python and Make and Ubuntu/Docker management."
                }
            },
            vivo: {
                period: "08/2024 - 02/2025",
                company: "Telefônica Brasil (VIVO)",
                dev: {
                    title: "Data Analysis Intern",
                    desc: "Automation of analyses and processes using Python and SQL. Dashboard development with Power BI."
                },
                data: {
                    title: "Data Analysis Intern",
                    desc: "Automation of analyses and processes using Python and SQL. Power BI dashboard development to support decision-making."
                }
            },
            education: {
                period: "Expected graduation: 08/2027",
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
            roleDev: "Desarrollador Full Stack Pleno",
            roleData: "Analista de Datos & Especialista en BI",
            description: "Desarrollador Full Stack con experiencia en aplicaciones web, APIs e integraciones. Sólida actuación en el ecosistema JavaScript/TypeScript, con experiencia en gestión de monorepos, arquitectura de microservicios e infraestructura multi-cloud. Desarrollo y mantenimiento de productos escalables, integrando IA conversacional, APIs de comunicación multicanal y procesamiento asíncrono. Productividad acelerada por el uso continuo de herramientas de desarrollo asistido por IA (Cursor, Claude Code, Codex e integraciones MCP)."
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
            dsmarketing: {
                period: "01/2026 - Actualidad",
                company: "ds.marketing",
                dev: {
                    title: "Desarrollador Full Stack Pleno",
                    desc: "Mantenimiento de APIs y ecosistema distribuido de microservicios en monorepo (Nx, pnpm) con Node.js y Bun. Estudio para generación de folletos con Fabric.js. App móvil nativa (React Native bare) con IA conversacional. Integración de IA para texto, audio y video (OpenAI, Gemini Live, ElevenLabs). Mensajería y ads (WhatsApp, Meta API). Infra Cloud/DevOps (AWS, GCP, Terraform)."
                },
                data: {
                    title: "Desarrollador Full Stack Pleno",
                    desc: "Mantenimiento de APIs y microservicios en monorepo (Nx, pnpm). Backend con Node.js y Bun, mensajería (WhatsApp, Meta API) e infra Cloud (AWS, GCP, Terraform), además de integraciones de IA."
                }
            },
            multi360: {
                period: "04/2025 - 01/2026",
                company: "Grupo Multi360",
                dev: {
                    title: "Especialista en Desarrollo de IA y Automatización",
                    desc: "Desarrollo full stack con React.js, Next.js, TypeScript y Nest.js. Liderazgo técnico en el sistema de reclutamiento. Soluciones de IA con OpenAI API, automatizaciones con Python y Make y gestión de servidores Ubuntu/Docker."
                },
                data: {
                    title: "Especialista en Desarrollo de IA y Automatización",
                    desc: "Creación de tableros estratégicos para control de SLA y marketing. Análisis de rendimiento con SQL, Power BI y Looker Studio, además de automatizaciones con Python y Make."
                }
            },
            vivo: {
                period: "08/2024 - 02/2025",
                company: "Telefônica Brasil (VIVO)",
                dev: {
                    title: "Pasante de Análisis de Datos",
                    desc: "Automatización de análisis y procesos con Python y SQL. Desarrollo de tableros en Power BI."
                },
                data: {
                    title: "Pasante de Análisis de Datos",
                    desc: "Automatización de análisis y procesos con Python y SQL. Desarrollo de tableros en Power BI para apoyo a la toma de decisiones."
                }
            },
            education: {
                period: "Previsión de conclusión: 08/2027",
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
