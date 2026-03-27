import type { Metadata } from 'next'
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
  return (
    <div className="space-y-10 pb-14 pt-6 sm:pt-10">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.24em] text-subtle">
          Contacto
        </p>
        <h1 className="section-title">
          Construyamos algo solido
        </h1>
        <p className="body-lg max-w-3xl">
          Si necesitas un partner tecnico que pase de
          arquitectura a entrega, estoy abierto a freelance,
          consultoria y colaboraciones de largo plazo.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="notion-card space-y-3">
          <h2 className="text-2xl font-semibold">
            Contacto directo
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
            Agendar una llamada
          </a>
        </article>

        <article className="notion-card space-y-3">
          <h2 className="text-2xl font-semibold">
            Tambien puedes encontrarme en
          </h2>
          <a
            href={profileFacts.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-xl border border-line px-4 py-2.5
              text-sm font-medium"
          >
            Perfil de LinkedIn
          </a>
          <p className="text-base text-zinc-700">
            Respondo normalmente dentro de 24 horas habiles.
          </p>
        </article>
      </section>

      <section className="notion-card space-y-3">
        <h2 className="text-2xl font-semibold">
          Solicitudes mas comunes
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
