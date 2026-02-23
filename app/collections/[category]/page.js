import { notFound } from 'next/navigation'
import { getProductsByCategory, categories } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'

export const revalidate = 60

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({ params }) {
  const cat = categories.find((c) => c.slug === params.category)
  if (!cat) return { title: 'Not Found' }
  return {
    title: `${cat.name} — Lala Lucinda's Beadwork`,
    description: `Handmade ${cat.name.toLowerCase()} by Lala Lucinda. Each piece hand-beaded on Pit River ancestral territory in Northern California.`,
  }
}

export default async function CollectionPage({ params }) {
  const cat = categories.find((c) => c.slug === params.category)
  if (!cat) notFound()

  const items = await getProductsByCategory(params.category)

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-earth-400 tracking-wide mb-10">
        <Link href="/" className="hover:text-earth-700 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/#shop" className="hover:text-earth-700 transition-colors">Collections</Link>
        <span>/</span>
        <span className="text-earth-600">{cat.name}</span>
      </nav>

      {/* Collection header */}
      <div className="mb-14">
        <p className="section-label mb-2">Collection</p>
        <h1 className="text-4xl font-light tracking-wide text-earth-900 mb-3">{cat.name}</h1>
        <p className="text-earth-500 text-sm tracking-wide">
          {items.length} {items.length === 1 ? 'piece' : 'pieces'} — all handmade
        </p>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-28 text-center">
          <p className="text-earth-400 text-sm tracking-wide">No pieces in this collection yet — check back soon.</p>
        </div>
      )}

      <div className="mt-20 pt-10 border-t border-earth-200 text-center">
        <Link href="/#shop" className="nav-link text-sm">← All Collections</Link>
      </div>
    </div>
  )
}
