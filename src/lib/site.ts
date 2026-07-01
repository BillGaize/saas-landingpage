export const siteConfig = {
  name: 'Bill Gaize',
  url: 'https://www.billgaize.com',
  // Positioning-forward description (product + operations + AI + delivery), geo-targeted.
  description:
    'Bill Gaize — Product Manager y Project Manager de tecnologia en Santiago de Chile (Region Metropolitana), con raices en Venezuela y experiencia en toda Latinoamerica. Especialista en product development, delivery y logistica, integraciones Shopify/API y automatizacion con IA.',
  descriptionEn:
    'Bill Gaize — Product Manager and technology Project Manager based in Santiago, Chile (Región Metropolitana), originally from Venezuela, working across Latin America. Expert in product development, delivery and logistics operations, Shopify/API integrations, and AI automation.',
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
  jobTitle: 'Product Manager & Project Manager',
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
