export default function Page() {
  return (
    <article className="space-y-8 pb-14 pt-6 sm:pt-10">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-[0.24em] text-subtle">
          Legal
        </p>
        <h1 className="section-title">
          Terminos de servicio
        </h1>
        <p className="text-base text-subtle">
          Ultima actualizacion: 27 de marzo de 2026
        </p>
      </header>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <p>
          Al usar este portafolio, aceptas estos terminos.
          Si no estas de acuerdo, por favor no utilices el
          sitio.
        </p>
      </section>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <h2 className="text-2xl font-semibold text-black">
          Uso del contenido
        </h2>
        <p>
          Todo el contenido original y descripciones de
          proyectos se entrega con fines informativos. Su
          reutilizacion debe incluir atribucion clara, salvo
          que se indique lo contrario.
        </p>
      </section>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <h2 className="text-2xl font-semibold text-black">
          Enlaces externos
        </h2>
        <p>
          Este sitio puede incluir enlaces a servicios de
          terceros. Esos servicios se rigen por sus propios
          terminos y politicas de privacidad.
        </p>
      </section>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <h2 className="text-2xl font-semibold text-black">
          Responsabilidad
        </h2>
        <p>
          Este portafolio se entrega &quot;tal cual&quot;,
          sin garantias de ningun tipo. En la medida
          permitida por la ley, no se asume responsabilidad
          por danos directos o indirectos derivados del uso
          del sitio.
        </p>
      </section>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <h2 className="text-2xl font-semibold text-black">
          Contacto
        </h2>
        <p>
          Para consultas legales, escribe a:
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
