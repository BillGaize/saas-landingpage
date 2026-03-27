export default function Page() {
  return (
    <article className="space-y-8 pb-14 pt-6 sm:pt-10">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-[0.24em] text-subtle">
          Legal
        </p>
        <h1 className="section-title">Politica de privacidad</h1>
        <p className="text-base text-subtle">
          Ultima actualizacion: 27 de marzo de 2026
        </p>
      </header>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <p>
          Este sitio recopila datos minimos necesarios para
          operar y mejorar la experiencia del portafolio.
          La informacion no se vende.
        </p>
        <p>
          Los datos pueden incluir uso anonimo del sitio,
          metadatos del navegador y datos de contacto que
          compartas voluntariamente por correo o enlaces de
          agenda.
        </p>
      </section>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <h2 className="text-2xl font-semibold text-black">
          Como se usa la informacion
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Responder consultas y solicitudes de colaboracion.
          </li>
          <li>
            Analizar rendimiento del sitio y mejorar UX.
          </li>
          <li>Mantener seguridad y confiabilidad del sitio.</li>
        </ul>
      </section>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <h2 className="text-2xl font-semibold text-black">
          Servicios de terceros
        </h2>
        <p>
          Este sitio puede usar servicios externos
          confiables (por ejemplo analytics, agendamiento y
          hosting). Cada proveedor maneja datos segun su
          propia politica.
        </p>
      </section>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <h2 className="text-2xl font-semibold text-black">
          Contacto
        </h2>
        <p>
          Para consultas de privacidad, escribe a:
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
