import type { Metadata } from 'next'
import {
  profileFacts,
  coreServices
} from '@/lib/profile-data'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Bill Gaize for full-stack development, Shopify integrations, and AI workflow projects.',
  alternates: {
    canonical: '/contact'
  }
}

export default function ContactPage() {
  return (
    <div className="space-y-10 pb-14 pt-6 sm:pt-10">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.24em] text-subtle">
          Contact
        </p>
        <h1 className="section-title">
          Let us build something solid
        </h1>
        <p className="body-lg max-w-3xl">
          If you need a product partner who can move from
          architecture to delivery, I am open to freelance,
          consulting, and long-term roles.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="notion-card space-y-3">
          <h2 className="text-2xl font-semibold">
            Reach me directly
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
            Book a slot
          </a>
        </article>

        <article className="notion-card space-y-3">
          <h2 className="text-2xl font-semibold">
            Also find me on
          </h2>
          <a
            href={profileFacts.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-xl border border-line px-4 py-2.5
              text-sm font-medium"
          >
            LinkedIn profile
          </a>
          <p className="text-base text-zinc-700">
            I usually reply within 24 hours on business
            days.
          </p>
        </article>
      </section>

      <section className="notion-card space-y-3">
        <h2 className="text-2xl font-semibold">
          Most common requests
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
