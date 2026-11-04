import { siteConfig, seoKeywords } from '@/lib/site'
import {
  profileFacts,
  coreServices
} from '@/lib/profile-data'

/**
 * Structured data (JSON-LD) for maximum SEO + AEO/GEO surface.
 * Renders Person, WebSite, ProfilePage, FAQPage and BreadcrumbList
 * so Google can treat Bill Gaize as a knowledge-graph entity and
 * surface him for product management / delivery / product development
 * queries across Chile (RM/Santiago), Venezuela, and Latin America.
 */
export function StructuredData() {
  const person = {
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: profileFacts.name,
    url: siteConfig.url,
    email: `mailto:${profileFacts.contactEmail}`,
    image: `${siteConfig.url}/opengraph-image.png`,
    jobTitle: siteConfig.jobTitle,
    description: siteConfig.description,
    sameAs: siteConfig.sameAs,
    knowsLanguage: ['es', 'en'],
    knowsAbout: seoKeywords,
    nationality: { '@type': 'Country', name: 'Venezuela' },
    homeLocation: {
      '@type': 'Place',
      name: siteConfig.geo.placename,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Santiago',
        addressRegion: 'Región Metropolitana',
        addressCountry: 'CL'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: siteConfig.geo.lat,
        longitude: siteConfig.geo.lng
      }
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Yango Delivery'
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Universidad de Carabobo',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'VE'
      }
    },
    makesOffer: coreServices.map((service) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: service.es }
    })),
    areaServed: [
      { '@type': 'Country', name: 'Chile' },
      { '@type': 'Country', name: 'Venezuela' },
      {
        '@type': 'AdministrativeArea',
        name: 'Región Metropolitana de Santiago'
      },
      { '@type': 'Place', name: 'Latin America' }
    ]
  }

  const website = {
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: `${profileFacts.name} | Portafolio`,
    description: siteConfig.description,
    inLanguage: ['es', 'en'],
    publisher: { '@id': `${siteConfig.url}/#person` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/insights?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }

  const profilePage = {
    '@type': 'ProfilePage',
    '@id': `${siteConfig.url}/#profilepage`,
    url: siteConfig.url,
    name: 'Bill Gaize | Product manager de integraciones B2B',
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    about: { '@id': `${siteConfig.url}/#person` },
    inLanguage: 'es'
  }

  const faq = {
    '@type': 'FAQPage',
    '@id': `${siteConfig.url}/#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Quién es Bill Gaize?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bill Gaize es product manager de integraciones B2B en Yango Delivery (Yandex), remoto desde Santiago de Chile. Llevó el onboarding de partners de unos 4 meses a cerca de 1 mes, con lanzamientos en América Latina y África.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Bill Gaize trabaja como Product Manager en Chile?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Sí. Bill Gaize trabaja como product manager remoto desde Santiago de Chile, con lanzamientos en Perú, Bolivia, Colombia, Ghana, Côte d'Ivoire y Zambia."
        }
      },
      {
        '@type': 'Question',
        name: 'Is Bill Gaize a product manager for delivery and logistics products?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Bill Gaize is a product manager for B2B integrations at Yango Delivery (Yandex), remote from Santiago, Chile, with launches in Peru, Bolivia, Colombia, Ghana, Côte d'Ivoire, and Zambia."
        }
      },
      {
        '@type': 'Question',
        name: '¿Cómo contactar a Bill Gaize?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Puedes escribir a ${profileFacts.contactEmail} o agendar una llamada en ${profileFacts.calendly}.`
        }
      }
    ]
  }

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${siteConfig.url}/#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: siteConfig.url
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Proyectos',
        item: `${siteConfig.url}/projects`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Insights',
        item: `${siteConfig.url}/insights`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Contacto',
        item: `${siteConfig.url}/contact`
      }
    ]
  }

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      person,
      website,
      profilePage,
      faq,
      breadcrumb
    ]
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph)
      }}
    />
  )
}
