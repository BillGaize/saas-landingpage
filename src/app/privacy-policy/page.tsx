export default function Page() {
  return (
    <article className="space-y-8 pb-14 pt-6 sm:pt-10">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-[0.24em] text-subtle">
          Legal
        </p>
        <h1 className="section-title">Privacy Policy</h1>
        <p className="text-base text-subtle">Last updated: March 27, 2026</p>
      </header>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <p>
          This website collects limited data required to
          operate and improve the portfolio experience.
          Information is never sold.
        </p>
        <p>
          Data may include anonymized usage information,
          browser metadata, and contact details you
          voluntarily provide through email or scheduling
          links.
        </p>
      </section>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <h2 className="text-2xl font-semibold text-black">How information is used</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Respond to inquiries and collaboration requests.</li>
          <li>Understand site performance and improve UX.</li>
          <li>Maintain site security and reliability.</li>
        </ul>
      </section>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <h2 className="text-2xl font-semibold text-black">Third-party services</h2>
        <p>
          This site may use trusted external services (for
          example analytics, scheduling, and hosting). Each
          provider handles data according to its own policy.
        </p>
      </section>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <h2 className="text-2xl font-semibold text-black">Contact</h2>
        <p>
          For privacy-related questions, email:
          <a href="mailto:me@billgaize.com" className="ml-1 underline">
            me@billgaize.com
          </a>
        </p>
      </section>
    </article>
  )
}
