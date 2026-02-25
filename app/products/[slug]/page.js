import { notFound } from 'next/navigation'
import { getProductBySlug, getProducts } from '@/lib/products'
import AddToCartButton from './AddToCartButton'
import ProductGallery from './ProductGallery'
import Link from 'next/link'

export const revalidate = 60

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const product = await getProductBySlug(params.slug)
  if (!product) return { title: 'Not Found' }
  return {
    title: `${product.name} — Lala Lucinda's Beadwork`,
    description: (product.description || product.tagline || '').slice(0, 155),
  }
}

export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug)
  if (!product) notFound()

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-earth-400 tracking-wide mb-10">
        <Link href="/" className="hover:text-earth-700 transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/collections/${product.categorySlug}`} className="hover:text-earth-700 transition-colors">{product.category}</Link>
        <span>/</span>
        <span className="text-earth-600">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        {/* Product image */}
        <ProductGallery
          photos={product.photos}
          name={product.name}
          placeholderClass={product.placeholderClass}
        />

        {/* Product details */}
        <div>
          <p className="section-label mb-2">{product.category}</p>
          <h1 className="text-3xl md:text-4xl font-light tracking-wide text-earth-900 leading-snug mb-2">
            {product.name}
          </h1>
          {product.tagline && (
            <p className="text-earth-500 text-base tracking-wide italic mb-6">{product.tagline}</p>
          )}

          <p className="text-2xl font-light tracking-wide text-earth-800 mb-8">
            ${product.price.toFixed(2)}
          </p>

          {/* Stock status */}
          {product.inStock ? (
            <div className="flex items-center gap-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-sage inline-block" />
              <span className="text-xs tracking-widest uppercase text-sage">In Stock</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-clay inline-block" />
              <span className="text-xs tracking-widest uppercase text-clay">Sold Out</span>
            </div>
          )}

          {/* Add to cart */}
          <AddToCartButton product={product} />

          {/* Description */}
          {product.description && (
            <div className="mt-10 pt-10 border-t border-earth-200">
              <h2 className="text-sm tracking-widest uppercase text-earth-500 mb-4">About this piece</h2>
              <p className="text-[15px] leading-relaxed text-earth-700 font-light">{product.description}</p>
            </div>
          )}

          {/* SKU */}
          {product.sku && (
            <div className="mt-8 pt-8 border-t border-earth-200">
              <p className="text-xs tracking-widest uppercase text-earth-400">SKU: {product.sku}</p>
            </div>
          )}

          {/* Care note */}
          <div className="mt-8 pt-8 border-t border-earth-200">
            <p className="text-sm tracking-wide text-earth-500 leading-relaxed">
              <span className="uppercase tracking-widest">Care: </span>
              Keep away from water and perfume. Store in the pouch provided. Seed beads are durable
              but the thread that holds them is not invincible — treat gently.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
