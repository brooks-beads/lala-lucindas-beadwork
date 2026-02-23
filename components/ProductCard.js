import Link from 'next/link'
import Image from 'next/image'

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      {/* Image */}
      <div className="product-img-wrap aspect-[3/4] w-full mb-3 relative overflow-hidden">
        {product.photo ? (
          <Image
            src={product.photo}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        ) : (
          <div className={`${product.placeholderClass} w-full h-full`} style={{ minHeight: '200px' }} />
        )}
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-earth-50 text-earth-800 text-[10px] tracking-widest uppercase px-2 py-1">
            New
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-earth-50/60 flex items-center justify-center">
            <span className="text-xs tracking-widest uppercase text-earth-600">Sold Out</span>
          </div>
        )}
      </div>

      {/* Product info */}
      <div>
        <p className="text-xs tracking-widest uppercase text-earth-500 mb-1">{product.category}</p>
        <h3 className="text-[15px] font-light tracking-wide text-earth-900 group-hover:text-clay transition-colors leading-snug">
          {product.name}
        </h3>
        <p className="text-sm text-earth-500 tracking-wide mt-1 mb-1.5">{product.tagline}</p>
        <p className="text-sm tracking-wide text-earth-800">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  )
}
