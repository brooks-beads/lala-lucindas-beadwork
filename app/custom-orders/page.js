import { fetchTable } from '@/lib/airtable'
import Image from 'next/image'
import CustomOrderForm from './CustomOrderForm'

export const revalidate = 300

export const metadata = {
  title: 'Custom Orders — Lala Lucinda\'s Beadwork',
  description:
    'Commission a one-of-a-kind beadwork piece made just for you by Lala Lucinda, an enrolled citizen of the Hewisedawi Band of the Pit River Tribe.',
}

async function getCustomOrderGallery() {
  try {
    const records = await fetchTable('Products', {
      filter: `{Category} = "Custom Order"`,
    })
    return records
      .filter((r) => r.fields?.Photo?.length > 0)
      .map((r) => ({
        id: r.id,
        name: r.fields.Name || '',
        photo: r.fields.Photo[0]?.url || '',
      }))
  } catch {
    return []
  }
}

export default async function CustomOrdersPage() {
  const gallery = await getCustomOrderGallery()

  return (
    <main className="bg-offwhite min-h-screen">

      {/* Hero */}
      <section className="bg-midnight py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="section-label mb-4">Custom Orders</p>
          <h1 className="font-lora text-4xl md:text-5xl font-normal tracking-wide text-cream leading-tight mb-6">
            Made for you,<br />start to finish.
          </h1>
          <div className="w-12 h-px bg-gold mx-auto mb-6" />
          <p className="text-smoke font-light leading-relaxed text-base md:text-lg">
            While every Lala Lucinda&apos;s piece is already one of a kind, I can specialize in
            custom orders made specifically to your wants. Many like to give these as gifts — for
            graduations, birthdays, holidays, Mother&apos;s Day. Others just want their very own
            piece that exists nowhere else in the world. Either way, let me know how I can make
            something special for you or someone you love.
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="section-label mb-3">Start Here</p>
          <h2 className="section-title mb-2">Tell me what you&apos;re envisioning</h2>
          <p className="text-smoke font-light text-sm mb-10 leading-relaxed">
            Fill out as much or as little as you know. We&apos;ll figure out the rest together.
          </p>
          <CustomOrderForm />
        </div>
      </section>

      {/* Policy notes */}
      <section className="bg-cream border-t border-b border-cream py-14 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="section-label mb-6">A couple things to know</p>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <span className="text-gold mt-1 shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <p className="text-slate font-light text-sm leading-relaxed">
                <span className="font-normal text-midnight">All custom orders require 50% down, 50% upon completion.</span>{' '}
                Because these are made especially for one person, by hand, I need to know we&apos;re
                both committed before I pick up the needle.
              </p>
            </li>
            <li className="flex gap-4">
              <span className="text-gold mt-1 shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <p className="text-slate font-light text-sm leading-relaxed">
                <span className="font-normal text-midnight">No returns or refunds on custom pieces —</span>{' '}
                but I will make absolutely sure, by phone, email, or whatever works for you, that
                before I start a single bead we both agree on a piece you&apos;re genuinely excited
                about. I don&apos;t start until you&apos;re excited.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-6 bg-offwhite">
        <div className="max-w-2xl mx-auto">
          <p className="section-label mb-8 text-center">What people say</p>
          <blockquote className="relative border-l-2 border-gold pl-8">
            <svg
              className="absolute -top-3 -left-1 w-6 h-6 text-gold opacity-60"
              fill="currentColor"
              viewBox="0 0 32 32"
            >
              <path d="M10 8C5.6 8 2 11.6 2 16v8h8v-8H6c0-2.2 1.8-4 4-4V8zm14 0c-4.4 0-8 3.6-8 8v8h8v-8h-4c0-2.2 1.8-4 4-4V8z" />
            </svg>
            <p className="font-lora text-midnight text-base md:text-lg font-normal leading-relaxed italic">
              My daughter loves them. Thank you so much. For a girl on a reunification journey
              after 5 generations removed these mean a lot to her because she often feels too white.
              She said the moment she saw them that they reminded her of the moment she was sharing
              her lineage with the chairman of the tribe and he said if you are from them you belong
              to us and hugged her. Every time she wears your art she will be living in that moment.
              She&apos;s already asked if we can make a ribbon skirt and shawl to match them. Thank
              you so much!
            </p>
            <footer className="mt-6">
              <p className="text-xs tracking-widest uppercase text-smoke">— Custom order customer</p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-midnight py-16 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Previous Custom Work</p>
            <h2 className="font-lora text-3xl font-normal tracking-wide text-cream">
              A few things I&apos;ve made for people
            </h2>
          </div>

          {gallery.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((item) => (
                <div key={item.id} className="aspect-square relative overflow-hidden group">
                  <Image
                    src={item.photo}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {item.name && (
                    <div className="absolute inset-0 bg-midnight/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-cream text-xs tracking-wide font-light">{item.name}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-smoke font-light text-sm leading-relaxed max-w-md mx-auto">
                Gallery coming soon — in the meantime, browse the{' '}
                <a href="/#shop" className="underline text-gold hover:text-gold-light transition-colors">
                  shop
                </a>{' '}
                to get a feel for what I can do.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6 text-center bg-offwhite">
        <p className="text-smoke font-light text-sm mb-2">Ready to get started?</p>
        <h3 className="font-lora text-2xl font-normal tracking-wide text-midnight mb-6">
          Scroll up and fill out the form — I&apos;ll take it from there.
        </h3>
        <a href="#top" className="btn-secondary inline-block px-8 py-3">
          Back to top
        </a>
      </section>

    </main>
  )
}
