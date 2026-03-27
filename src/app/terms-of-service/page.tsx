export default function Page() {
  return (
    <article className="space-y-8 pb-14 pt-6 sm:pt-10">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-[0.24em] text-subtle">
          Legal
        </p>
        <h1 className="section-title">Terms of Service</h1>
        <p className="text-base text-subtle">
          Last updated: March 27, 2026
        </p>
      </header>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <p>
          By using this portfolio website, you agree to
          these terms. If you do not agree, please do not
          use the website.
        </p>
      </section>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <h2 className="text-2xl font-semibold text-black">
          Use of content
        </h2>
        <p>
          All original content and project descriptions are
          provided for informational purposes. Reuse or
          reproduction should include clear attribution
          unless otherwise stated.
        </p>
      </section>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <h2 className="text-2xl font-semibold text-black">
          External links
        </h2>
        <p>
          This website may include links to third-party
          services. Those services are governed by their own
          terms and privacy policies.
        </p>
      </section>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <h2 className="text-2xl font-semibold text-black">
          Liability
        </h2>
        <p>
          The portfolio is provided &quot;as is&quot;
          without warranties of any kind. To the extent
          permitted by law, no liability is assumed for
          direct or indirect damages resulting from use of
          this site.
        </p>
      </section>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <h2 className="text-2xl font-semibold text-black">
          Contact
        </h2>
        <p>
          For legal questions, email:
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
