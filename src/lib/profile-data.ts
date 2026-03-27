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

export const profileFacts = {
  name: 'Bill Gaize',
  role: 'Project Manager y Product Manager orientado a tecnologia',
  bio: 'Lidero proyectos digitales, integraciones y productos con foco en ejecucion clara, negocio y experiencia de usuario. Soy Bioanalista de la Universidad de Carabobo (Venezuela), lo que me da un enfoque analitico y de procesos para resolver problemas complejos.',
  age: 29,
  languages: ['Espanol', 'Ingles'],
  aiExpertise:
    'Fluido en herramientas de IA, diseno de workflows con modelos y enfoques RAG para casos reales de negocio.',
  location: 'Remoto, abierto a colaborar globalmente',
  contactEmail: 'me@billgaize.com',
  calendly: 'https://calendly.com/me--52uo/30min',
  linkedin: 'https://www.linkedin.com/in/billgaize/',
  valueProposition:
    'Combino estrategia de producto, gestion de proyectos y ejecucion operativa para lanzar soluciones con impacto real.'
}

export const coreServices = [
  'Gestion de proyectos e-commerce en Shopify',
  'Migraciones de tiendas y optimizacion de conversion',
  'Integraciones API de logistica para last mile y middle mile',
  'Product management para lanzamiento de features',
  'Estrategia de procesos y operacion apoyada con IA'
]

export const profileHighlights = [
  'Experiencia liderando proyectos Shopify desde discovery hasta handoff y capacitacion.',
  'Coordinacion entre negocio, diseno UX/UI y desarrollo para lograr ejecucion alineada a vision del cliente.',
  'Liderazgo de integraciones B2B multinacionales para operaciones de delivery con APIs complejas.',
  'Background en salud para tomar decisiones guiadas por evidencia, proceso y mejora continua.'
]

export const portfolioProjects: PortfolioProject[] = [
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
    stack: ['Shopify', 'E-commerce Operations', 'UX/UI Coordination'],
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
    stack: ['Shopify', 'E-commerce Operations', 'Stakeholder Management'],
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
    stack: ['Shopify', 'WooCommerce Migration', 'Process Management'],
    href: 'https://thebluelab.cl/'
  },
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
    stack: ['API Integrations', 'Logistics Tech', 'B2B Operations'],
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
    href: 'https://apps.apple.com/us/app/yango-taxi-food-delivery/'
  }
]

export const quickAnswers = [
  {
    id: 'background',
    keywords: [
      'quien',
      'eres',
      'who',
      'background',
      'about',
      'experience',
      'bio'
    ],
    answer:
      'Bill es Project Manager y Product Manager en tecnologia con experiencia en Shopify e integraciones logisticas. Es Bioanalista de la Universidad de Carabobo, lo que aporta un enfoque de proceso y evidencia al trabajo digital.'
  },
  {
    id: 'services',
    keywords: [
      'service',
      'offer',
      'help',
      'work',
      'hire',
      'servicio',
      'servicios',
      'trabajo',
      'ayuda',
      'ofreces'
    ],
    answer:
      'Puede ayudarte con gestion de proyectos Shopify, migraciones de tiendas, integraciones API para operaciones logisticas y desarrollo de flujos de producto apoyados con IA.'
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
    keywords: ['edad', 'age', 'cuantos anos', 'how old'],
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
      'espanol',
      'english',
      'ai',
      'ia',
      'rag',
      'modelo',
      'modelos'
    ],
    answer:
      'Bill habla ingles y espanol, y es fluido en herramientas de IA, implementacion de modelos y enfoques RAG aplicados a casos de negocio.'
  }
]
