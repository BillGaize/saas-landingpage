export interface LocalizedLine {
  es: string
  en: string
}

export interface ExperienceItem {
  org: string
  role: string
  roleEn: string
  dates: string
  datesEn: string
}

export interface PortfolioProject {
  slug: string
  title: string
  titleEn: string
  summary: string
  summaryEn: string
  href?: string
}

export const experience: ExperienceItem[] = [
  {
    org: 'Yango Delivery',
    role: 'Product Manager B2B International',
    roleEn: 'Product Manager, B2B International',
    dates: 'Octubre 2025 a la fecha',
    datesEn: 'October 2025 to present'
  },
  {
    org: 'Yango Delivery',
    role: 'Product Manager C2C LATAM',
    roleEn: 'Product Manager, C2C LATAM',
    dates: 'Enero a septiembre 2025',
    datesEn: 'January to September 2025'
  },
  {
    org: 'Yango Delivery',
    role: 'Product Manager de integraciones',
    roleEn: 'Product Manager, Integrations',
    dates: '2023 a enero 2025',
    datesEn: '2023 to January 2025'
  },
  {
    org: 'Haciendola.com',
    role: 'Junior Product Manager, Technical Solutions',
    roleEn: 'Junior Product Manager, Technical Solutions',
    dates: '2023',
    datesEn: '2023'
  }
]

export const impactCopy: LocalizedLine = {
  es: "Entre julio y noviembre de 2025, las tarifas lentas en C2C LATAM llegaron a más de 70.000 envíos y más de USD 165.000 de Gross Booking. El lanzamiento C2C en Venezuela llegó a 7.000 envíos y USD 25.000 de Gross Booking. La activación temprana B2B llegó a más de 2.500 envíos y USD 15.000 de Gross Booking. El onboarding de partners pasó de unos 4 meses a cerca de 1 mes. Los lanzamientos fueron en Perú, Bolivia, Colombia, Ghana, Côte d'Ivoire y Zambia.",
  en: "From July to November 2025, slow fares in C2C LATAM reached 70K+ deliveries and USD 165K+ Gross Booking. The C2C launch in Venezuela reached 7K deliveries and USD 25K Gross Booking. Early B2B activation reached 2,500+ deliveries and USD 15K Gross Booking. Partner onboarding went from about 4 months to about 1 month. Launches ran in Peru, Bolivia, Colombia, Ghana, Côte d'Ivoire, and Zambia."
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'yango-b2b-cargo-shopify',
    title: 'App de Shopify para Yango B2B Cargo',
    titleEn: 'Shopify app for Yango B2B Cargo',
    summary:
      'Aplicación de Shopify para la operación B2B Cargo de Yango.',
    summaryEn:
      'Shopify app built for Yango B2B Cargo operations.'
  },
  {
    slug: 'hoycerca',
    title: 'HoyCerca',
    titleEn: 'HoyCerca',
    summary:
      'Aplicación PWA map-first en hoycerca.billgaize.com, operada en Oracle Cloud, con Google OAuth, perfiles, moderación y publicación.',
    summaryEn:
      'Map-first PWA at hoycerca.billgaize.com, operated on Oracle Cloud, with Google OAuth, profiles, moderation, and publishing.',
    href: 'https://hoycerca.billgaize.com'
  },
  {
    slug: 'partner-onboarding',
    title: 'Herramientas de onboarding de partners',
    titleEn: 'Partner onboarding tooling',
    summary:
      'Herramientas y playbooks de onboarding. El tiempo pasó de unos 4 meses a cerca de 1 mes.',
    summaryEn:
      'Onboarding tools and playbooks. The cycle went from about 4 months to about 1 month.'
  },
  {
    slug: 'ai-product-harness',
    title: 'Harness interno de producto con IA',
    titleEn: 'Internal AI product harness',
    summary:
      'Herramienta interna del equipo de producto para discovery, métricas y operación.',
    summaryEn:
      'Internal product-team tool for discovery, metrics, and operations.'
  }
]

export const profileFacts = {
  name: 'Bill Gaize',
  role: 'Product Manager de integraciones B2B en Yango Delivery (Yandex)',
  roleEn:
    'Product Manager for B2B integrations at Yango Delivery (Yandex)',
  bio: 'Llevé el onboarding de partners de ~4 meses a ~1 mes.',
  bioEn:
    'I took partner onboarding from about 4 months to about 1 month.',
  employer: 'Yango Delivery (Yandex)',
  employerStatus: 'current',
  employerNote:
    'Bill trabaja hoy en Yango Delivery (Yandex) como Product Manager B2B International (octubre 2025 a la fecha), remoto desde Santiago de Chile. Antes, en Yango, fue Product Manager C2C LATAM (enero a septiembre 2025) y Product Manager de integraciones (2023 a enero 2025). En 2023 fue Junior Product Manager, Technical Solutions, en Haciendola.com.',
  employerNoteEn:
    'Bill currently works at Yango Delivery (Yandex) as Product Manager, B2B International (October 2025 to present), remote from Santiago, Chile. Earlier at Yango he was Product Manager, C2C LATAM (January to September 2025) and Product Manager, Integrations (2023 to January 2025). In 2023 he was Junior Product Manager, Technical Solutions, at Haciendola.com.',
  yangoExperience: `
Yango Delivery (Yandex), remoto desde Santiago de Chile.
- Product Manager B2B International, octubre 2025 a la fecha.
- Product Manager C2C LATAM, enero a septiembre 2025.
- Product Manager de integraciones, 2023 a enero 2025.
Haciendola.com: Junior Product Manager, Technical Solutions, 2023.

Hechos:
- Tarifas lentas en C2C LATAM, julio a noviembre 2025: más de 70.000 envíos y más de USD 165.000 de Gross Booking.
- Lanzamiento C2C en Venezuela: 7.000 envíos y USD 25.000 de Gross Booking.
- Activación temprana B2B: más de 2.500 envíos y USD 15.000 de Gross Booking.
- Onboarding de partners: de unos 4 meses a cerca de 1 mes.
- Lanzamientos en Perú, Bolivia, Colombia, Ghana, Côte d'Ivoire y Zambia.

Proyectos: app de Shopify para Yango B2B Cargo; HoyCerca (https://hoycerca.billgaize.com); herramientas de onboarding de partners; harness interno de producto con IA.
`.trim(),
  age: 29,
  languages: ['Español', 'Inglés'],
  aiExpertise:
    'Usa herramientas de IA en el trabajo de producto, incluidos flujos con modelos y enfoques RAG cuando el caso de negocio lo pide.',
  location:
    'Santiago de Chile, Región Metropolitana (originario de Venezuela)',
  city: 'Santiago',
  region: 'Región Metropolitana',
  country: 'Chile',
  origin: 'Venezuela',
  servesRegions: [
    'Chile',
    'Región Metropolitana',
    'Latinoamérica',
    'África',
    'Venezuela'
  ],
  contactEmail: 'me@billgaize.com',
  calendly: 'https://calendly.com/me--52uo/30min',
  linkedin: 'https://www.linkedin.com/in/billgaize/',
  github: 'https://github.com/BillGaize',
  valueProposition:
    'Product manager de integraciones B2B en Yango Delivery (Yandex), remoto desde Santiago de Chile. Llevé el onboarding de partners de unos 4 meses a cerca de 1 mes.'
}

export const coreServices: LocalizedLine[] = [
  {
    es: 'Gestión de producto B2B, del onboarding a la primera orden',
    en: 'B2B product management, from onboarding to the first order'
  },
  {
    es: 'Integraciones API con partners (REST, webhooks y playbooks)',
    en: 'Partner API integrations (REST, webhooks, and playbooks)'
  },
  {
    es: 'Configuración por país y diagnóstico en producción',
    en: 'Country configuration and production diagnosis'
  },
  {
    es: 'Gestión de proyectos Shopify y comercio electrónico',
    en: 'Shopify and e-commerce project management'
  },
  {
    es: 'Rescate de aplicaciones hechas con IA (Lovable, Bolt, v0 y Next.js)',
    en: 'Rescue of AI-built apps (Lovable, Bolt, v0, and Next.js)'
  }
]

export const profileHighlights = [
  'Product Manager B2B International en Yango Delivery desde octubre 2025.',
  'Onboarding de partners de unos 4 meses a cerca de 1 mes.',
  "Lanzamientos en Perú, Bolivia, Colombia, Ghana, Côte d'Ivoire y Zambia.",
  'Tarifas lentas C2C LATAM (julio a noviembre 2025): más de 70.000 envíos y más de USD 165.000 de Gross Booking.'
]

export const quickAnswers = [
  {
    id: 'employer-yango',
    keywords: [
      'dejaste',
      'dejó',
      'dejo yango',
      'left yango',
      'no trabajas',
      'ya no trabaj',
      'quit yango',
      'resigned',
      'employer',
      'empleador',
      'donde trabajas',
      'dónde trabajas',
      'where do you work',
      'current role',
      'rol actual',
      'sigues en yango',
      'still at yango',
      'trabajas en yango',
      'yango',
      'yandex'
    ],
    answer:
      'Hoy Bill trabaja en Yango Delivery (Yandex) como Product Manager B2B International, desde octubre 2025, remoto desde Santiago. Antes fue PM C2C LATAM (enero a septiembre 2025) y PM de integraciones (2023 a enero 2025). En 2023 fue Junior PM, Technical Solutions, en Haciendola.com.'
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
      "Bill es product manager de integraciones B2B en Yango Delivery (Yandex), remoto desde Santiago de Chile. Llevó el onboarding de partners de unos 4 meses a cerca de 1 mes. Los lanzamientos que cuenta son Perú, Bolivia, Colombia, Ghana, Côte d'Ivoire y Zambia."
  },
  {
    id: 'results',
    keywords: [
      'resultado',
      'resultados',
      'impact',
      'impacto',
      'deliveries',
      'envios',
      'envíos',
      'gross',
      'booking',
      'venezuela',
      'onboarding',
      '4 meses',
      '165',
      '70'
    ],
    answer:
      'Tarifas lentas en C2C LATAM, julio a noviembre 2025: más de 70.000 envíos y más de USD 165.000 de Gross Booking. Lanzamiento C2C en Venezuela: 7.000 envíos y USD 25.000 de Gross Booking. Activación temprana B2B: más de 2.500 envíos y USD 15.000 de Gross Booking. Onboarding de partners: de unos 4 meses a cerca de 1 mes.'
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
      'how can you help',
      'disponible',
      'available'
    ],
    answer:
      'Puede ayudar con gestión de producto B2B, integraciones API con partners, configuración por país, diagnóstico en producción, proyectos Shopify y rescate de aplicaciones hechas con IA. El correo es me@billgaize.com.'
  },
  {
    id: 'contact',
    keywords: [
      'contacto',
      'correo',
      'email',
      'reunion',
      'reunión',
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
    answer: 'Bill tiene 29 años.'
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
      'Bill es bioanalista de la Universidad de Carabobo, en Venezuela.'
  },
  {
    id: 'languages-ai',
    keywords: [
      'idioma',
      'idiomas',
      'ingles',
      'inglés',
      'español',
      'espanol',
      'english',
      'rag',
      'modelo de ia',
      'modelos de ia'
    ],
    answer:
      'Bill habla español e inglés. En el trabajo de producto usa herramientas de IA, incluidos modelos y enfoques RAG cuando hacen falta.'
  },
  {
    id: 'projects',
    keywords: [
      'proyecto',
      'proyectos',
      'hoycerca',
      'shopify',
      'cargo',
      'harness'
    ],
    answer:
      'Proyectos publicados: app de Shopify para Yango B2B Cargo, HoyCerca (hoycerca.billgaize.com), herramientas de onboarding de partners y un harness interno de producto con IA.'
  }
]
