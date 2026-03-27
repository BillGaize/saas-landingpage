import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import {
  profileFacts,
  coreServices
} from '@/lib/profile-data'

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contacta a Bill Gaize para proyectos de desarrollo full stack, integraciones Shopify y flujos con IA.',
  alternates: {
    canonical: '/contact'
  }
}

export default function ContactPage() {
  const lang =
    cookies().get('site-lang')?.value === 'en' ? 'en' : 'es'

  const copy =
    lang === 'en'
      ? {
          label: 'Contact',
          title: 'Let us build something solid',
          intro:
            'If you need a partner who moves from planning to execution, I am open to freelance, consulting, and long-term collaboration.',
          directContact: 'Direct contact',
          schedule: 'Book a call',
          alsoFind: 'You can also find me on',
          linkedin: 'LinkedIn profile',
          responseTime:
            'I usually reply within 24 business hours.',
          commonRequests: 'Most common requests'
        }
      : {
          label: 'Contacto',
          title: 'Construyamos algo solido',
          intro:
            'Si necesitas un partner tecnico que pase de arquitectura a entrega, estoy abierto a freelance, consultoria y colaboraciones de largo plazo.',
          directContact: 'Contacto directo',
          schedule: 'Agendar una llamada',
          alsoFind: 'Tambien puedes encontrarme en',
          linkedin: 'Perfil de LinkedIn',
          responseTime:
            'Respondo normalmente dentro de 24 horas habiles.',
          commonRequests: 'Solicitudes mas comunes'
        }

  return (
    <div className="space-y-10 pb-14 pt-6 sm:pt-10">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.24em] text-subtle">
          {copy.label}
        </p>
        <h1 className="section-title">{copy.title}</h1>
        <p className="body-lg max-w-3xl">{copy.intro}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="notion-card space-y-3">
          <h2 className="text-2xl font-semibold">
            {copy.directContact}
          </h2>
          <p className="text-base text-zinc-700">
            {profileFacts.location}
          </p>
          <a
            href={`mailto:${profileFacts.contactEmail}`}
            className="inline-block rounded-xl bg-black px-4 py-2.5 text-sm
              font-medium text-white"
          >
            {profileFacts.contactEmail}
          </a>
          <a
            href={profileFacts.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-xl border border-line px-4 py-2.5
              text-sm font-medium"
          >
            {copy.schedule}
          </a>
        </article>

        <article className="notion-card space-y-3">
          <h2 className="text-2xl font-semibold">
            {copy.alsoFind}
          </h2>
          <a
            href={profileFacts.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-xl border border-line px-4 py-2.5
              text-sm font-medium"
          >
            {copy.linkedin}
          </a>
          <p className="text-base text-zinc-700">
            {copy.responseTime}
          </p>
        </article>
      </section>

      <section className="notion-card space-y-3">
        <h2 className="text-2xl font-semibold">
          {copy.commonRequests}
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {coreServices.map((service) => (
            <li
              key={service}
              className="rounded-xl border border-line bg-zinc-50 px-3 py-2 text-sm"
            >
              {service}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
