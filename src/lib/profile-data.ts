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
  // Employment — current through late Dec 2026, then phase-out exit.
  employer: 'Yango Delivery (Yandex)',
  employerStatus: 'current_until_late_dec_2026',
  employerEnd: 'late December 2026',
  employerNote:
    'Bill sigue hoy en Yango Delivery (Yandex) como Product Manager de B2B Delivery International (LATAM/Africa/Asia), remoto desde Santiago. Su rol se esta phaseando out por la transicion Delivery → Yango B2B Taxi; a partir de fines de diciembre 2026 ya no estara en Yango. El portafolio personal (billgaize.com) es paralelo al rol full-time y tambien sirve para oportunidades post-phase-out.',
  employerNoteEn:
    'Bill currently still works at Yango Delivery (Yandex) as Product Manager for B2B Delivery International (LATAM/Africa/Asia), remote from Santiago. His role is being phased out in the Delivery → Yango B2B Taxi transition; from late December 2026 he will no longer be at Yango. The personal portfolio (billgaize.com) runs in parallel with the full-time role and also supports post-phase-out opportunities.',
  yangoExperience: `
Yango / Yandex Delivery — B2B Delivery International (current through late Dec 2026):
- Role: Product Manager, B2B Delivery Platform Solutions; reports to Tien (TM); remote Chile GMT-4.
- Scope: end-to-end B2B Delivery outside Russia/CIS — client acquisition through API integration to active ops.
- Markets: Peru, Bolivia, Colombia, Ghana, plus expansions with regional GMs (also worked integrations involving Chile, Dubai/UAE, Cote d'Ivoire, Zambia).
- Funnel ownership: registration → contract → top-up → first successful order; finds friction and runs experiments.
- API integrations with partners (REST, webhooks, playbooks); technical intake, docs, launch monitoring to BAU.
- Country configs (payment methods, self-registration, offer/card flags), tariff/zone enablement with platform eng.
- Production diagnosis for B2B clients (pickup codes, sync failures, payment flow bugs) with GMs and platform.
- AI tooling adoption for the product team (discovery, metrics, ops harness).
- Secondary Shopify / e-commerce PM work and AI App Rescue are personal/parallel, not Yango core scope.
- Out of scope at Yango: Russia/CIS NDD, Taxi ride-hailing product, C2C product, payments gateway build, pricing.
- Transition: role phase-out as Delivery moves toward Yango B2B Taxi; exit window late December 2026.
`.trim(),
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
    'Product Manager de plataformas B2B e integraciones API en mercados internacionales (LATAM/Africa), con operating system de IA para discovery, metricas y diagnosis. Abierto a roles nuevos tras el phase-out de Yango a fines de 2026.'
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
      'Ownership de integraciones API B2B con empresas en Peru, Bolivia, Colombia, Ghana, Chile, Dubai, Costa de Marfil y Zambia para meter Yango Delivery en flujos last-mile y middle-mile (REST, webhooks, playbooks, handoff a BAU).',
    impact:
      'Onboarding de partners ~4x mas rapido con tooling API y playbooks; estandarizacion operativa multi-mercado y menos friccion en el camino a primera orden.',
    role: 'Product Manager / Lead Project Manager — B2B Delivery International',
    scope:
      'Intake tecnico, documentacion, coordinacion con GMs regionales y platform eng, configs por pais, monitoreo de launch y diagnosis en produccion hasta Business-as-Usual.',
    stack: [
      'API Integrations',
      'Logistics Tech',
      'B2B Operations',
      'Country Configs'
    ],
    href: 'https://delivery.yango.com'
  },
  {
    slug: 'yango-c2c-app-latam',
    title: 'Yango C2C App - Product Management LATAM',
    summary:
      'Product Manager LATAM en la app Yango apoyando features de eficiencia de envios (incl. tarifas lentas / batching) en el producto C2C.',
    impact:
      '70K+ deliveries escalados en tarifario C2C / USD 165K+ gross booking; features orientadas a bajar costo de envio y subir NIGB.',
    role: 'Product Manager LATAM',
    scope:
      'Definicion y priorizacion de features, coordinacion cross-funcional y seguimiento de impacto de negocio.',
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
      'rol actual',
      'phase out',
      'phase-out',
      'phaseout',
      'diciembre',
      'december',
      'saliste',
      'leaving'
    ],
    answer:
      'Hoy Bill sigue en Yango Delivery (Yandex) como PM de B2B Delivery International (LATAM/Africa/Asia). Su rol se esta phaseando out por la transicion Delivery → Yango B2B Taxi; a fines de diciembre 2026 deja Yango. Hasta entonces lidera funnel onboarding→first order, integraciones API multi-pais y configs/diagnosis en produccion. Este sitio es portafolio personal y canal para roles nuevos.'
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
      'Bill es Product Manager de plataformas B2B e integraciones API en mercados internacionales (LATAM/Africa), remoto desde Santiago de Chile. Hoy trabaja en Yango Delivery (Yandex) hasta fines de dic 2026 (phase-out del rol). Ownership del funnel onboarding → first order, configs por pais y diagnosis en produccion.'
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
      'Puede ayudarte con product management B2B, integraciones API con partners, configs por pais, diagnosis en produccion y un operating system con IA. Shopify y AI App Rescue son secundarios. Abierto a conversaciones de roles/proyectos de cara al phase-out de Yango a fines de 2026.'
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
