import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'
import { getProducts, categories } from '@/lib/products'

export const revalidate = 60

export default async function HomePage() {
  const allProducts = await getProducts()
  const featured = allProducts.filter((p) => p.featured).length > 0
    ? allProducts.filter((p) => p.featured)
    : allProducts.slice(0, 6)

  return (
    <>
      {/* ── HERO — Mt Shasta landscape ───────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-end pb-20 px-8 md:px-16 overflow-hidden">

        {/* Mt Shasta real photo */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-shasta.jpg"
            alt="Mt Shasta"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
        <div className="absolute inset-0 opacity-[0.07]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="beads" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="3" fill="#e8d5b0" />
                <circle cx="0"  cy="0"  r="2" fill="#e8d5b0" />
                <circle cx="40" cy="0"  r="2" fill="#e8d5b0" />
                <circle cx="0"  cy="40" r="2" fill="#e8d5b0" />
                <circle cx="40" cy="40" r="2" fill="#e8d5b0" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#beads)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-screen-xl w-full mx-auto">
          <p className="text-earth-300 text-sm tracking-[0.3em] uppercase mb-4">Pit River Nation · Northern California</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-wide leading-none mb-6 uppercase">
            Made by<br />
            <span className="text-sand">hand,</span><br />
            worn with<br />
            soul.
          </h1>
          <p className="text-earth-200 text-base tracking-wide mb-10 max-w-sm font-light leading-relaxed">
            Every piece is strung, stitched, and finished by one pair of hands — mine.
            No shortcuts, no machines, no two exactly alike.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="#shop" className="btn-ghost">Shop the Collection</Link>
            <Link href="#about" className="btn-primary bg-sand text-earth-900 border-sand hover:bg-earth-100 hover:border-earth-100">
              My Story
            </Link>
          </div>
        </div>
      </section>

      {/* ── SHOP THE COLLECTION ──────────────────────────────────────── */}
      <section id="shop" className="py-20 px-6 md:px-12 max-w-screen-xl mx-auto">
        <p className="section-label text-center mb-2">Browse by category</p>
        <h2 className="section-title text-center mb-12">Shop the Collection</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/collections/${cat.slug}`} className="group relative aspect-square overflow-hidden">
              <div className={`${cat.placeholderClass} w-full h-full product-img-wrap`} />
              <div className="absolute inset-0 bg-gradient-to-t from-earth-900/70 via-earth-900/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white text-xs tracking-[0.25em] uppercase mb-1 opacity-80">Shop</p>
                <h3 className="text-white text-lg font-light tracking-wide group-hover:text-sand transition-colors">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── EDITORIAL BANNER ─────────────────────────────────────────── */}
      <section className="hero-secondary py-28 px-8 md:px-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="beads2" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="2"   fill="#e8d5b0" />
                <circle cx="0"  cy="0"  r="1.5" fill="#e8d5b0" />
                <circle cx="30" cy="0"  r="1.5" fill="#e8d5b0" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#beads2)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto">
          <p className="text-sage text-sm tracking-[0.3em] uppercase mb-3">New arrivals</p>
          <h2 className="text-4xl md:text-6xl font-light text-white tracking-wide uppercase mb-6">
            Necklaces<br /><span className="text-sage">New Arrivals</span>
          </h2>
          <Link href="/collections/necklaces" className="btn-ghost">Shop Now</Link>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────── */}
      <section id="featured" className="py-20 px-6 md:px-12 max-w-screen-xl mx-auto">
        <p className="section-label text-center mb-2">Handpicked favorites</p>
        <h2 className="section-title text-center mb-12">Shop New Arrivals</h2>
        {featured.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {featured.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <p className="text-center text-earth-400 text-sm py-16">New pieces coming soon — check back shortly.</p>
        )}
      </section>

      {/* ── ALL PRODUCTS ─────────────────────────────────────────────── */}
      <section id="all-products" className="py-10 px-6 md:px-12 max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="section-label mb-1">Everything in the studio</p>
            <h2 className="section-title">All Pieces</h2>
          </div>
          <p className="text-sm tracking-wide text-earth-500">{allProducts.length} pieces</p>
        </div>
        {allProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {allProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <p className="text-center text-earth-400 text-sm py-16">Products loading — please check back shortly.</p>
        )}
      </section>

      {/* ── ABOUT SECTION ────────────────────────────────────────────── */}
      <section id="about" className="py-24 px-6 md:px-12 bg-earth-100">
        <div className="max-w-screen-lg mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/5] relative overflow-hidden">
            <Image
              src="/images/lucinda-portrait.jpg"
              alt="Lucinda in her studio"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="section-label mb-3">The maker</p>
            <h2 className="text-3xl font-light tracking-wide text-earth-900 mb-6">About Lala Lucinda</h2>
            <div className="space-y-4 text-earth-700 text-[15px] leading-relaxed font-light">
              <p>
                I was eight years old when my grandmother and my mother introduced me to beading.
                They became my teachers then and I fell in love with it right away. They both guided
                me on what to make and how to make it. The rest I figured out slowly, over time.
              </p>
              <p>
                I am an enrolled citizen of the Hewisedawi Band of the Pit River Tribe, and I grew
                up in the shadow of Mt. Shasta in Northern California.
              </p>
              <p>
                All of my pieces are unique, and I do not replicate any of them, not even in color.
                I name my pieces after things I notice — weather, land, and the color of a certain
                morning, afternoon or evening.
              </p>
              <p>
                When you buy from me, you&apos;re buying something I held in my hands for hours.
                I want my customers to feel special knowing they own a one-of-a-kind Lala Lucinda&apos;s
                creation. I make everything myself, start to finish.
              </p>
            </div>
            <div className="mt-8">
              <Link href="#shop" className="btn-primary">Shop My Work</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CRAFT STRIP ──────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-earth-50 border-t border-earth-200">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: '◇', title: 'Handmade',         sub: 'Every piece made by hand in my studio' },
            { icon: '◈', title: 'One of a Kind',    sub: 'No two pieces are exactly alike' },
            { icon: '◉', title: 'Quality Materials', sub: 'Miyuki & Czech seed beads, sterling silver' },
            { icon: '◎', title: 'Ships in 3–5 Days', sub: 'Carefully packed, free over $75' },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center">
              <span className="text-2xl text-earth-500 mb-3">{item.icon}</span>
              <h3 className="text-sm tracking-widest uppercase text-earth-800 mb-2">{item.title}</h3>
              <p className="text-sm text-earth-500 leading-relaxed">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
