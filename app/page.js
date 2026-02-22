import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { products, categories, getFeaturedProducts } from '@/lib/products'

export default function HomePage() {
  const featured = getFeaturedProducts()

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative hero-primary min-h-[92vh] flex items-end pb-20 px-8 md:px-16 overflow-hidden">
        {/* Decorative bead pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="beads" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="3" fill="#e8d5b0" />
                <circle cx="0" cy="0" r="2" fill="#e8d5b0" />
                <circle cx="40" cy="0" r="2" fill="#e8d5b0" />
                <circle cx="0" cy="40" r="2" fill="#e8d5b0" />
                <circle cx="40" cy="40" r="2" fill="#e8d5b0" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#beads)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-screen-xl w-full mx-auto">
          <p className="text-earth-400 text-xs tracking-[0.3em] uppercase mb-4">Handmade · New Mexico</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-wide leading-none mb-6 uppercase">
            Made by<br />
            <span className="text-sand">hand,</span><br />
            worn with<br />
            soul.
          </h1>
          <p className="text-earth-300 text-sm tracking-wide mb-10 max-w-sm font-light leading-relaxed">
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

      {/* ── SHOP THE COLLECTION (category grid, like Pendleton) ──────── */}
      <section id="shop" className="py-20 px-6 md:px-12 max-w-screen-xl mx-auto">
        <p className="section-label text-center mb-2">Browse by category</p>
        <h2 className="section-title text-center mb-12">Shop the Collection</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`#${cat.slug}`}
              className="group relative aspect-square overflow-hidden"
            >
              <div className={`${cat.placeholderClass} w-full h-full product-img-wrap`} />
              <div className="absolute inset-0 bg-gradient-to-t from-earth-900/70 via-earth-900/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white text-xs tracking-[0.25em] uppercase mb-1 opacity-80">Shop</p>
                <h3 className="text-white text-lg font-light tracking-wide group-hover:text-sand transition-colors">
                  {cat.name}
                </h3>
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
                <circle cx="15" cy="15" r="2" fill="#e8d5b0" />
                <circle cx="0" cy="0" r="1.5" fill="#e8d5b0" />
                <circle cx="30" cy="0" r="1.5" fill="#e8d5b0" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#beads2)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto">
          <p className="text-sage text-xs tracking-[0.3em] uppercase mb-3">New arrivals</p>
          <h2 className="text-4xl md:text-6xl font-light text-white tracking-wide uppercase mb-6">
            Necklaces<br /><span className="text-sage">New Arrivals</span>
          </h2>
          <Link href="#necklaces" className="btn-ghost">Shop Now</Link>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────── */}
      <section id="featured" className="py-20 px-6 md:px-12 max-w-screen-xl mx-auto">
        <p className="section-label text-center mb-2">Handpicked favorites</p>
        <h2 className="section-title text-center mb-12">Shop New Arrivals</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── ALL PRODUCTS ─────────────────────────────────────────────── */}
      <section id="all-products" className="py-10 px-6 md:px-12 max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="section-label mb-1">Everything in the studio</p>
            <h2 className="section-title">All Pieces</h2>
          </div>
          <p className="text-xs tracking-wide text-earth-500">{products.length} pieces</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── ABOUT SECTION ────────────────────────────────────────────── */}
      <section id="about" className="py-24 px-6 md:px-12 bg-earth-100">
        <div className="max-w-screen-lg mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Placeholder portrait */}
          <div className="aspect-[4/5] placeholder-earth relative overflow-hidden">
            <div className="absolute inset-0 flex items-end p-8">
              <p className="text-earth-100 text-xs tracking-widest uppercase opacity-60">Lucinda in her studio, 2024</p>
            </div>
          </div>

          <div>
            <p className="section-label mb-3">The maker</p>
            <h2 className="text-3xl font-light tracking-wide text-earth-900 mb-6">About Lucinda</h2>
            <div className="space-y-4 text-earth-700 text-sm leading-relaxed font-light">
              <p>
                I&apos;ve been beading since I was eleven years old, when my grandmother sat me down
                at her kitchen table with a needle, a spool of thread, and a jar of tiny glass beads.
                She didn&apos;t say much — just showed me the first stitch. The rest I figured out slowly,
                over decades.
              </p>
              <p>
                My studio is in the high desert of New Mexico. I work early in the morning, before it
                gets hot, with strong coffee and good light. I make everything myself, start to finish.
                I don&apos;t have employees or a production line. When you buy from me, you&apos;re buying
                something I held in my hands for hours.
              </p>
              <p>
                I name my pieces after things I notice — weather, land, the color of a certain afternoon.
                I hope you feel that when you wear them.
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
            { icon: '◇', title: 'Handmade', sub: 'Every piece made by hand in my studio' },
            { icon: '◈', title: 'One of a Kind', sub: 'No two pieces are exactly alike' },
            { icon: '◉', title: 'Quality Materials', sub: 'Miyuki & Czech seed beads, sterling silver' },
            { icon: '◎', title: 'Ships in 3–5 Days', sub: 'Carefully packed, free over $75' },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center">
              <span className="text-2xl text-earth-500 mb-3">{item.icon}</span>
              <h3 className="text-xs tracking-widest uppercase text-earth-800 mb-2">{item.title}</h3>
              <p className="text-xs text-earth-500 leading-relaxed">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
