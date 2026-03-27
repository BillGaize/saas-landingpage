import { cookies } from 'next/headers'

export default function Page() {
  const lang =
    cookies().get('site-lang')?.value === 'en' ? 'en' : 'es'

  const copy =
    lang === 'en'
      ? {
          legal: 'Legal',
          title: 'Privacy Policy',
          updated: 'Last updated: March 27, 2026',
          intro1:
            'This site collects only minimal data required to operate and improve the portfolio experience. Information is not sold.',
          intro2:
            'Data may include anonymous usage, browser metadata, and contact details you voluntarily share through email or scheduling links.',
          usageTitle: 'How information is used',
          usage1:
            'To respond to collaboration inquiries and requests.',
          usage2:
            'To analyze site performance and improve UX.',
          usage3:
            'To maintain security and reliability of the website.',
          thirdPartyTitle: 'Third-party services',
          thirdPartyText:
            'This site may use trusted external services (for example analytics, scheduling, and hosting). Each provider handles data according to its own policy.',
          contactTitle: 'Contact',
          contactText: 'For privacy inquiries, write to:'
        }
      : {
          legal: 'Legal',
          title: 'Politica de privacidad',
          updated:
            'Ultima actualizacion: 27 de marzo de 2026',
          intro1:
            'Este sitio recopila datos minimos necesarios para operar y mejorar la experiencia del portafolio. La informacion no se vende.',
          intro2:
            'Los datos pueden incluir uso anonimo del sitio, metadatos del navegador y datos de contacto que compartas voluntariamente por correo o enlaces de agenda.',
          usageTitle: 'Como se usa la informacion',
          usage1:
            'Responder consultas y solicitudes de colaboracion.',
          usage2:
            'Analizar rendimiento del sitio y mejorar UX.',
          usage3:
            'Mantener seguridad y confiabilidad del sitio.',
          thirdPartyTitle: 'Servicios de terceros',
          thirdPartyText:
            'Este sitio puede usar servicios externos confiables (por ejemplo analytics, agendamiento y hosting). Cada proveedor maneja datos segun su propia politica.',
          contactTitle: 'Contacto',
          contactText:
            'Para consultas de privacidad, escribe a:'
        }

  return (
    <article className="space-y-8 pb-14 pt-6 sm:pt-10">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-[0.24em] text-subtle">
          {copy.legal}
        </p>
        <h1 className="section-title">{copy.title}</h1>
        <p className="text-base text-subtle">
          {copy.updated}
        </p>
      </header>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <p>{copy.intro1}</p>
        <p>{copy.intro2}</p>
      </section>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <h2 className="text-2xl font-semibold text-black">
          {copy.usageTitle}
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>{copy.usage1}</li>
          <li>{copy.usage2}</li>
          <li>{copy.usage3}</li>
        </ul>
      </section>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <h2 className="text-2xl font-semibold text-black">
          {copy.thirdPartyTitle}
        </h2>
        <p>{copy.thirdPartyText}</p>
      </section>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <h2 className="text-2xl font-semibold text-black">
          {copy.contactTitle}
        </h2>
        <p>
          {copy.contactText}
          <a
            href="mailto:me@billgaize.com"
            className="ml-1 underline"
          >
            me@billgaize.com
          </a>
        </p>
      </section>
    </article>
  )
}
