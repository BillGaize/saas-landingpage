export interface PortfolioProject {
  slug: string
  title: string
  summary: string
  impact: string
  stack: string[]
  href?: string
}

export const profileFacts = {
  name: 'Bill Gaize',
  role: 'Desarrollador Full Stack MERN',
  bio: 'Construyo productos web utiles, integraciones para Shopify y flujos asistidos por IA, con una base fuerte en Ciencias de Laboratorio Clinico.',
  location: 'Remoto, abierto a colaborar globalmente',
  contactEmail: 'me@billgaize.com',
  calendly: 'https://calendly.com/me--52uo/30min',
  linkedin: 'https://www.linkedin.com/in/billgaize/',
  valueProposition:
    'Combino pensamiento de producto, ejecucion tecnica y enfoque operativo para entregar software mantenible con impacto real.'
}

export const coreServices = [
  'Desarrollo full stack de productos web',
  'Integraciones y automatizacion para Shopify',
  'Herramientas internas y workflows operativos',
  'Arquitectura de APIs e integraciones de terceros',
  'Contenido tecnico y educacion para developers'
]

export const profileHighlights = [
  'Experiencia combinando e-commerce, integraciones y automatizacion operativa.',
  'Fuerte orientacion a claridad de producto, performance y mantenibilidad.',
  'Comunicacion tecnica clara para equipos mixtos: negocio, producto y desarrollo.',
  'Background en ciencias medicas para decisiones guiadas por evidencia y proceso.'
]

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'shopify-ops-suite',
    title: 'Suite Operativa para Shopify',
    summary:
      'Dashboard operativo para centralizar pedidos, estado de fulfillment y flujos de soporte.',
    impact:
      'Reduccion del 42% en tiempo de gestion manual de pedidos gracias a automatizacion y orquestacion de APIs.',
    stack: [
      'Next.js',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'Shopify API'
    ]
  },
  {
    slug: 'clinical-insights-pipeline',
    title: 'Pipeline de Analitica Clinica',
    summary:
      'Pipeline de datos y UI analitica para transformar eventos de laboratorio en metricas listas para reportes.',
    impact:
      'Mejora en precision de reportes y reduccion de demoras de dias a actualizaciones cercanas a tiempo real.',
    stack: ['Python', 'FastAPI', 'React', 'D3.js', 'Docker']
  },
  {
    slug: 'content-workbench-ai',
    title: 'Content Workbench con IA',
    summary:
      'Asistente editorial para redactar, refinar y publicar contenido tecnico largo con control de tono.',
    impact:
      'Flujos editoriales mas rapidos manteniendo voz consistente y estructura SEO clara.',
    stack: [
      'OpenAI API',
      'Next.js',
      'Tailwind CSS',
      'Redis',
      'Vercel'
    ]
  },
  {
    slug: 'portfolio-redesign-system',
    title: 'Sistema de Rediseno de Portafolio',
    summary:
      'Arquitectura de portafolio minimalista inspirada en Notion, enfocada en legibilidad y narrativa profesional.',
    impact:
      'Narrativa mas clara para reclutadores y clientes, con mayor consistencia de UX entre paginas.',
    stack: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS'
    ]
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
      'Bill es un Desarrollador Full Stack MERN con base en Ciencias de Laboratorio Clinico. Combina profundidad tecnica y pensamiento orientado a procesos para construir software confiable.'
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
      'Puede ayudarte con productos full stack, integraciones Shopify, herramientas internas, arquitectura de APIs y flujos asistidos por IA para equipos que necesitan resultados concretos.'
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
  }
]
