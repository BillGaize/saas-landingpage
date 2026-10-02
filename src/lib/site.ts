export const siteConfig = {
  name: 'Bill Gaize',
  url: 'https://www.billgaize.com',
  // Positioning-forward description (product + operations + AI + delivery), geo-targeted.
  description:
    'Bill Gaize — Product Manager de plataformas B2B e integraciones API en mercados internacionales (LATAM/Africa), remoto desde Santiago de Chile. Onboarding, contracts, partner APIs, configs por pais y diagnosis en produccion.',
  descriptionEn:
    'Bill Gaize — Product Manager for B2B platforms and API integrations across international markets (LATAM/Africa), remote from Santiago, Chile. Onboarding, contracts, partner APIs, country configs, and production diagnosis.',
  locale: 'es_CL',
  localeAlternate: 'en_US',
  // Geo signals
  geo: {
    country: 'CL',
    region: 'CL-RM',
    placename: 'Santiago, Región Metropolitana, Chile',
    lat: -33.4489,
    lng: -70.6693
  },
  jobTitle: 'Product Manager · B2B Platforms & API Integrations',
  sameAs: [
    'https://www.linkedin.com/in/billgaize/',
    'https://github.com/BillGaize'
  ],
  email: 'me@billgaize.com',
  calendly: 'https://calendly.com/me--52uo/30min'
}

// Master keyword set — ES + EN, geo-targeted (Chile / RM / Santiago / Venezuela / LATAM).
// Used in <meta keywords>, JSON-LD knowsAbout, and llms.txt.
export const seoKeywords: string[] = [
  // Pitch A — B2B integrations
  'B2B Product Manager',
  'API Integrations Product Manager',
  'Integrations Platform PM',
  'Product Manager LATAM',
  'Product Manager Africa',
  'B2B onboarding funnel',
  'Partner API integrations',
  // Core role — Spanish
  'Product Manager Chile',
  'Product Manager Santiago',
  'Product Manager Santiago de Chile',
  'Product Manager Region Metropolitana',
  'Gerente de Producto Chile',
  'Gerente de Producto Santiago',
  'Gerente de Producto Venezuela',
  'Gente de producto Chile',
  'Gente de producto Venezuela',
  'Project Manager Chile',
  'Project Manager Santiago',
  'Jefe de Proyecto Chile',
  'Desarrollo de producto Chile',
  'Desarrollo de producto Santiago',
  'Product development Chile',
  // Delivery / logistics — Spanish
  'Product Manager delivery',
  'Product Manager logistica',
  'Product Manager aplicaciones de delivery',
  'Especialista en delivery Chile',
  'Gestion de proyectos logistica Latinoamerica',
  'Integraciones logisticas last mile',
  'Aplicacion de delivery Chile',
  // E-commerce / Shopify — Spanish
  'Shopify Chile',
  'Experto Shopify Santiago',
  'Integraciones API Shopify',
  'Migracion Shopify Chile',
  // AI — Spanish
  'Automatizacion con IA Chile',
  'Consultor de IA Latinoamerica',
  'Agentes de IA para negocios',
  'RAG implementacion Chile',
  // Core role — English
  'Product Manager Chile',
  'Product Manager Santiago Chile',
  'Product Manager Latin America',
  'Product Manager Venezuela',
  'Product Development Manager Chile',
  'Project Manager Latin America',
  'Delivery product manager',
  'Logistics product manager LATAM',
  'Delivery app product manager',
  // E-commerce / AI — English
  'Shopify integration developer Chile',
  'Shopify expert Santiago',
  'AI automation consultant Chile',
  'AI automation consultant Latin America',
  'AI agents for business workflows',
  'RAG implementation Latin America',
  'Full stack developer Next.js Chile',
  // Name / entity
  'Bill Gaize',
  'Bill Gaize Product Manager',
  'Bill Gaize Chile',
  'Bill Gaize Venezuela'
]
