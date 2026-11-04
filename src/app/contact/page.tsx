import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import {
  profileFacts,
  coreServices
} from '@/lib/profile-data'

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contacta a Bill Gaize, product manager de integraciones B2B, remoto desde Santiago de Chile.',
  alternates: {
    canonical: '/contact'
  }
}

export default async function ContactPage() {
  const lang =
    (await cookies()).get('site-lang')?.value === 'en'
      ? 'en'
      : 'es'

  const copy =
    lang === 'en'
      ? {
          title: 'Contact',
          intro:
            'Open to product manager, project manager, and integrations roles, ideally remote, based in Santiago, Chile. I also take focused consulting on B2B onboarding and partner APIs.',
          schedule: 'Book a call',
          linkedin: 'LinkedIn profile',
          responseTime:
            'I usually reply within 24 business hours.',
          commonRequests: 'What I can help with'
        }
      : {
          title: 'Contacto',
          intro:
            'Estoy abierto a roles de product manager, project manager o integraciones, idealmente remotos, con base en Santiago de Chile. También hago consultoría puntual de onboarding B2B e integraciones API.',
          schedule: 'Agendar una llamada',
          linkedin: 'Perfil de LinkedIn',
          responseTime:
            'Respondo normalmente dentro de 24 horas hábiles.',
          commonRequests: '¿En qué suelo ayudar?'
        }

  return (
    <div className="max-w-3xl space-y-10 pb-14 pt-6 sm:pt-10">
      <section className="space-y-4">
        <h1 className="section-title">{copy.title}</h1>
        <p className="body-lg">{copy.intro}</p>
      </section>

      <section className="space-y-3 border-t border-line pt-6 text-lg leading-8">
        <p>{profileFacts.location}</p>
        <p>
          <a
            data-attr="contact-email"
            href={`mailto:${profileFacts.contactEmail}`}
            className="text-clay underline"
          >
            {profileFacts.contactEmail}
          </a>
        </p>
        <p>
          <a
            data-attr="contact-calendly"
            href={profileFacts.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="text-clay underline"
          >
            {copy.schedule}
          </a>
        </p>
        <p>
          <a
            href={profileFacts.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-clay underline"
          >
            {copy.linkedin}
          </a>
        </p>
        <p className="text-base text-zinc-700">
          {copy.responseTime}
        </p>
      </section>

      <section className="space-y-3 border-t border-line pt-6">
        <h2 className="text-2xl">{copy.commonRequests}</h2>
        <ul className="space-y-2 text-lg leading-8">
          {coreServices.map((service) => (
            <li key={service.es}>
              {lang === 'en' ? service.en : service.es}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
