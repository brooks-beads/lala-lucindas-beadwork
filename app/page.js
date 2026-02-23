import Link from 'next/link'
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

        {/* Mt Shasta SVG landscape background */}
        {/* To use a real photo: drop hero-shasta.jpg into /public/images/ and replace this div with:
            <Image src="/images/hero-shasta.jpg" fill style={{objectFit:'cover'}} alt="Mt Shasta" priority /> */}
        <div className="absolute inset-0">
          <svg
            preserveAspectRatio="xMidYMax slice"
            viewBox="0 0 1440 900"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#1e2d4a" />
                <stop offset="35%"  stopColor="#3d6494" />
                <stop offset="60%"  stopColor="#7baac4" />
                <stop offset="75%"  stopColor="#a8c4d8" />
              </linearGradient>
              <linearGradient id="peak" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"  stopColor="#d8cfc4" />
                <stop offset="50%" stopColor="#a89880" />
                <stop offset="100%" stopColor="#7a6a58" />
              </linearGradient>
              <linearGradient id="shastina" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"  stopColor="#c4bab0" />
                <stop offset="100%" stopColor="#6a5a4a" />
              </linearGradient>
            </defs>
            <rect width="1440" height="900" fill="url(#sky)" />
            <path d="M0 560 Q120 500 280 530 Q400 510 520 540 L520 900 L0 900 Z" fill="#4a6a84" opacity="0.4" />
            <path d="M920 540 Q1080 510 1200 530 Q1340 515 1440 545 L1440 900 L920 900 Z" fill="#4a6a84" opacity="0.4" />
            <path d="M420 680 L600 330 L760 680 Z" fill="url(#shastina)" opacity="0.88" />
            <path d="M568 400 L600 330 L632 400 L620 415 L600 395 L580 415 Z" fill="#f0ece4" opacity="0.92" />
            <path d="M580 720 L820 120 L1060 720 Z" fill="url(#peak)" />
            <path d="M768 230 L820 120 L872 230 L855 250 L838 228 L820 248 L802 228 L785 250 Z" fill="#f5f1ea" opacity="0.96" />
            <path d="M730 370 Q750 355 770 368 Q760 380 748 390 Z" fill="#f0ece4" opacity="0.7" />
            <path d="M870 380 Q888 362 905 375 Q895 388 880 398 Z" fill="#f0ece4" opacity="0.65" />
            <path d="M0 720 Q180 695 360 708 Q540 695 720 702 Q900 692 1080 705 Q1260 695 1440 708 L1440 900 L0 900 Z" fill="#2d4a2d" />
            <path d="M0 775 Q200 758 400 768 Q600 755 800 765 Q1000 755 1200 768 Q1350 760 1440 768 L1440 900 L0 900 Z" fill="#1a3020" />
            {[60,160,280,440,600,760,900,1050,1200,1340].map((x, i) => (
              <polygon key={i} points={`${x},${770-(i%3)*12} ${x-18},820 ${x+18},820`} fill="#0f2015" opacity="0.8" />
            ))}
          </svg>
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
          <div className="aspect-[4/5] placeholder-earth relative overflow-hidden">
            <div className="absolute inset-0 flex items-end p-8">
              <p className="text-earth-100 text-xs tracking-widest uppercase opacity-60">Lucinda in her studio, 2024</p>
            </div>
          </div>
          <div>
            <p className="section-label mb-3">The maker</p>
            <h2 className="text-3xl font-light tracking-wide text-earth-900 mb-6">About Lucinda</h2>
            <div className="space-y-4 text-earth-700 text-[15px] leading-relaxed font-light">
              <p>
                I&apos;ve been beading since I was eleven years old, when my grandmother sat me down
                at her kitchen table with a needle, a spool of thread, and a jar of tiny glass beads.
                She didn&apos;t say much — just showed me the first stitch. The rest I figured out slowly,
                over decades.
              </p>
              <p>
                I&apos;m a member of the Pit River Tribe, and I grew up in the shadow of Mt. Shasta in
                Northern California. My studio is there still — I work in the early morning, before the
                rest of the world wakes up, with strong coffee and good light. I make everything myself,
                start to finish. When you buy from me, you&apos;re buying something I held in my hands
                for hours.
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
