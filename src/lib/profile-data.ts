export interface PortfolioProject {
  slug: string
  title: string
  summary: string
  impact: string
  role: string
  scope: string
  stack: string[]
  href?: string
}

export interface SelectedImpactItem {
  stat: string
  label: string
  labelEn: string
}

export const profileFacts = {
  name: 'Bill Gaize',
  role: 'Product Manager · B2B Platforms & API Integrations · International Markets (LATAM/Africa) · Remote (Chile)',
  roleEn:
    'Product Manager · B2B Platforms & API Integrations · International Markets (LATAM/Africa) · Remote (Chile)',
  bio: 'Ownership end-to-end del funnel B2B: onboarding, contratos, integraciones API con partners, configs por pais y diagnosis en produccion. Foco en activacion medible, no en slideware.',
  bioEn:
    'End-to-end ownership of the B2B funnel: onboarding, contracts, partner API integrations, country configs, and production diagnosis. Focused on measurable activation, not slideware.',
  // Employment status — keep explicit so the chatbot never invents "left Yango".
  employer: 'Yango Delivery (Yandex)',
  employerStatus: 'current',
  employerNote:
    'Bill sigue trabajando en Yango Delivery (Yandex) como Product Manager de B2B Delivery International (LATAM/Africa/Asia). No dejo Yango: el portafolio personal es paralelo a su rol full-time.',
  employerNoteEn:
    'Bill still works at Yango Delivery (Yandex) as Product Manager for B2B Delivery International (LATAM/Africa/Asia). He did not leave Yango: the personal portfolio runs in parallel with his full-time role.',
  age: 29,
  languages: ['Espanol', 'Ingles'],
  aiExpertise:
    'Fluido en herramientas de IA, diseno de workflows con modelos y enfoques RAG para casos reales de negocio.',
  // Geo-explicit for SEO + chatbot grounding
  location:
    'Santiago de Chile, Region Metropolitana (originario de Venezuela)',
  city: 'Santiago',
  region: 'Region Metropolitana',
  country: 'Chile',
  origin: 'Venezuela',
  servesRegions: [
    'Chile',
    'Region Metropolitana',
    'Latinoamerica',
    'Africa',
    'Venezuela',
    'Global (remoto)'
  ],
  contactEmail: 'me@billgaize.com',
  calendly: 'https://calendly.com/me--52uo/30min',
  linkedin: 'https://www.linkedin.com/in/billgaize/',
  github: 'https://github.com/BillGaize',
  valueProposition:
    'Product Manager de plataformas B2B e integraciones API en mercados internacionales (LATAM/Africa), con operating system de IA para discovery, metricas y diagnosis.'
}

export const coreServices = [
  'Product management B2B: onboarding → first order',
  'Integraciones API con partners (REST, webhooks, playbooks)',
  'Configs por pais y diagnosis en produccion',
  'Operating system con IA (discovery, metricas, ops)',
  'Shopify / e-commerce project management',
  'AI App Rescue para apps Lovable, Bolt, v0 y Next.js'
]

export const selectedImpact: SelectedImpactItem[] = [
  {
    stat: '70K+',
    label:
      'deliveries escalados en tarifario C2C / USD 165K+ gross booking',
    labelEn:
      'deliveries scaled on C2C tariff products / USD 165K+ gross booking'
  },
  {
    stat: '6+',
    label:
      'lanzamientos de mercado en LATAM y Africa (3 continentes)',
    labelEn:
      'market launches across LATAM and Africa (3 continents)'
  },
  {
    stat: '~4x',
    label:
      'mas rapido el onboarding de partners con tooling API y playbooks',
    labelEn:
      'faster partner onboarding with API tooling and playbooks'
  },
  {
    stat: 'AI',
    label:
      'harness operativo: discovery, metricas y diagnosis de producto',
    labelEn:
      'operating harness: discovery, metrics, and product diagnosis'
  }
]

export const profileHighlights = [
  'Ownership del funnel B2B Delivery: registro, contratos, top-up y primera orden exitosa.',
  'Integraciones API multi-pais con partners en LATAM y Africa (REST, webhooks, playbooks).',
  'Configs por pais y diagnosis en produccion con GMs regionales e ingenieria de plataforma.',
  'AI-native operating system para discovery, metricas y ops (adopcion en el equipo de producto).'
]

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'yango-b2b-integrations',
    title: 'Yango Delivery - Integraciones B2B Multi-pais',
    summary:
      'Liderazgo de integraciones API con empresas en Peru, Bolivia, Chile, Dubai, Costa de Marfil y Zambia para incluir Yango en flujos de last mile y middle mile.',
    impact:
      'Aceleracion de despliegues de integracion y estandarizacion operativa en diferentes mercados.',
    role: 'Lead Project Manager',
    scope:
      'Coordinacion de equipos regionales, habilitacion tecnica con partners y seguimiento del cumplimiento de flujos operativos.',
    stack: [
      'API Integrations',
      'Logistics Tech',
      'B2B Operations'
    ],
    href: 'https://delivery.yango.com'
  },
  {
    slug: 'yango-c2c-app-latam',
    title: 'Yango C2C App - Product Management LATAM',
    summary:
      'Trabajo como Product Manager para Latinoamerica en la app de Yango, apoyando el lanzamiento de funcionalidades orientadas a eficiencia de envios.',
    impact:
      'Lanzamiento de features como tarifas lentas para batching de multiples pedidos, reduciendo costo de envios y aumentando NIGB.',
    role: 'Product Manager LATAM',
    scope:
      'Definicion y priorizacion de features, coordinacion con equipos cross-funcionales y seguimiento de impacto de negocio.',
    stack: [
      'Product Strategy',
      'Marketplace Logistics',
      'Data-informed Prioritization'
    ],
    href: 'https://apps.apple.com/us/app/yango-taxi-food-delivery/id1437157286'
  },
  {
    slug: 'nup-shopify-build',
    title: 'NUP Chile - Construccion en Shopify',
    summary:
      'Primera tienda lanzada en Shopify para nup.cl. Se construyo la experiencia completa de e-commerce alineada a la vision del cliente.',
    impact:
      'Lanzamiento exitoso de tienda y operacion comercial con entrenamiento al cliente para autogestion.',
    role: 'Project Manager',
    scope:
      'Traduccion de vision del cliente al equipo de diseno/desarrollo, coordinacion de entregables, instalacion de apps y onboarding del cliente.',
    stack: [
      'Shopify',
      'E-commerce Operations',
      'UX/UI Coordination'
    ],
    href: 'https://nup.cl'
  },
  {
    slug: 'murphfitness-shopify-build',
    title: 'Murph Fitness - Ecommerce en Shopify',
    summary:
      'Implementacion de tienda Shopify para murphfitness.cl siguiendo metodologia de discovery, diseno y ejecucion operativa.',
    impact:
      'Entrega de una experiencia de compra estable y preparada para escalar en catalogo y operaciones.',
    role: 'Project Manager',
    scope:
      'Coordinacion end-to-end del proyecto, alineacion con stakeholders y soporte en decisiones de apps y procesos.',
    stack: [
      'Shopify',
      'E-commerce Operations',
      'Stakeholder Management'
    ],
    href: 'https://murphfitness.cl'
  },
  {
    slug: 'thebluelab-woocommerce-to-shopify',
    title: 'The Blue Lab - Migracion WooCommerce a Shopify',
    summary:
      'Migracion completa de tienda desde WooCommerce hacia Shopify para mejorar operacion, mantenimiento y velocidad de ejecucion comercial.',
    impact:
      'Transicion ordenada hacia Shopify con menor friccion operativa y base mas escalable para crecimiento.',
    role: 'Project Manager',
    scope:
      'Planificacion de migracion, coordinacion tecnica y funcional, y acompanamiento al equipo en la ejecucion del cambio de plataforma.',
    stack: [
      'Shopify',
      'WooCommerce Migration',
      'Process Management'
    ],
    href: 'https://thebluelab.cl/'
  }
]

export const quickAnswers = [
  {
    id: 'employer-yango',
    keywords: [
      'yango',
      'yandex',
      'dejaste',
      'dejó',
      'dejo',
      'left yango',
      'no trabajas',
      'ya no trabaj',
      'quit',
      'resigned',
      'employer',
      'empleador',
      'donde trabajas',
      'where do you work',
      'current role',
      'rol actual'
    ],
    answer:
      'Bill sigue en Yango Delivery (Yandex) como Product Manager de B2B Delivery International (LATAM/Africa/Asia). No dejo la empresa: este sitio es su portafolio personal en paralelo al rol full-time. Lidera integraciones API, onboarding B2B y configs por pais.'
  },
  {
    id: 'background',
    keywords: [
      'quien es bill',
      'quién es bill',
      'who is bill',
      'quien eres',
      'quién eres',
      'about bill',
      'background',
      'experiencia',
      'experience',
      'bio'
    ],
    answer:
      'Bill es Product Manager de plataformas B2B e integraciones API en mercados internacionales (LATAM/Africa), remoto desde Santiago de Chile. Hoy trabaja en Yango Delivery (Yandex). Ownership del funnel onboarding → first order, configs por pais y diagnosis en produccion.'
  },
  {
    id: 'services',
    keywords: [
      'service',
      'offer',
      'hire',
      'servicio',
      'servicios',
      'ofreces',
      'contratar',
      'puedes ayudar',
      'how can you help'
    ],
    answer:
      'Puede ayudarte con product management B2B, integraciones API con partners, configs por pais, diagnosis en produccion y un operating system con IA. Shopify y AI App Rescue son secundarios.'
  },
  {
    id: 'contact',
    keywords: [
      'contacto',
      'correo',
      'email',
      'reunion',
      'agendar',
      'contact',
      'book',
      'call',
      'meeting'
    ],
    answer:
      'Puedes escribir a me@billgaize.com o agendar una llamada en calendly.com/me--52uo/30min.'
  },
  {
    id: 'age',
    keywords: [
      'edad',
      'age',
      'cuantos anos',
      'cuántos años',
      'how old'
    ],
    answer: 'Bill tiene 29 anos.'
  },
  {
    id: 'health-background',
    keywords: [
      'salud',
      'health',
      'bioanalista',
      'universidad de carabobo',
      'background salud'
    ],
    answer:
      'Bill es Bioanalista de la Universidad de Carabobo en Venezuela. Ese background en salud le permite aplicar pensamiento analitico, rigor de proceso y enfoque en evidencia al desarrollo de proyectos digitales.'
  },
  {
    id: 'languages-ai',
    keywords: [
      'idioma',
      'idiomas',
      'ingles',
      'español',
      'espanol',
      'english',
      'rag',
      'modelo de ia',
      'modelos de ia'
    ],
    answer:
      'Bill habla ingles y espanol, y es fluido en herramientas de IA, implementacion de modelos y enfoques RAG aplicados a casos de negocio.'
  }
]
