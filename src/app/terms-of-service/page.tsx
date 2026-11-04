import { cookies } from 'next/headers'

export default async function Page() {
  const lang =
    (await cookies()).get('site-lang')?.value === 'en'
      ? 'en'
      : 'es'

  const copy =
    lang === 'en'
      ? {
          legal: 'Legal',
          title: 'Terms of Service',
          updated: 'Last updated: March 27, 2026',
          intro:
            'By using this portfolio, you agree to these terms. If you do not agree, please do not use this website.',
          useTitle: 'Use of content',
          useText:
            'All original content and project descriptions are provided for informational purposes. Reuse should include clear attribution unless otherwise stated.',
          linksTitle: 'External links',
          linksText:
            'This site may include links to third-party services. Those services are governed by their own terms and privacy policies.',
          liabilityTitle: 'Liability',
          liabilityText:
            'This portfolio is provided "as is" without warranties of any kind. To the extent permitted by law, no responsibility is assumed for direct or indirect damages resulting from use of the site.',
          contactTitle: 'Contact',
          contactText: 'For legal inquiries, write to:'
        }
      : {
          legal: 'Legal',
          title: 'Términos de servicio',
          updated:
            'Última actualización: 27 de marzo de 2026',
          intro:
            'Al usar este portafolio, aceptas estos términos. Si no estás de acuerdo, no utilices el sitio.',
          useTitle: 'Uso del contenido',
          useText:
            'El contenido original y las descripciones de proyectos se entregan con fines informativos. Si lo reutilizas, incluye una atribución clara, salvo que se indique lo contrario.',
          linksTitle: 'Enlaces externos',
          linksText:
            'Este sitio puede incluir enlaces a servicios de terceros. Esos servicios se rigen por sus propios términos y políticas de privacidad.',
          liabilityTitle: 'Responsabilidad',
          liabilityText:
            'Este portafolio se entrega tal cual, sin garantías de ningún tipo. En la medida permitida por la ley, no se asume responsabilidad por daños directos o indirectos derivados del uso del sitio.',
          contactTitle: 'Contacto',
          contactText: 'Para consultas legales, escribe a:'
        }

  return (
    <article className="space-y-8 pb-14 pt-6 sm:pt-10">
      <header className="space-y-4">
        <h1 className="section-title">{copy.title}</h1>
        <p className="text-base text-subtle">
          {copy.updated}
        </p>
      </header>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <p>{copy.intro}</p>
      </section>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <h2 className="text-2xl font-semibold text-black">
          {copy.useTitle}
        </h2>
        <p>{copy.useText}</p>
      </section>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <h2 className="text-2xl font-semibold text-black">
          {copy.linksTitle}
        </h2>
        <p>{copy.linksText}</p>
      </section>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <h2 className="text-2xl font-semibold text-black">
          {copy.liabilityTitle}
        </h2>
        <p>{copy.liabilityText}</p>
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
