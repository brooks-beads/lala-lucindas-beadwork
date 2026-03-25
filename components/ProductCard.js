import Link from 'next/link'
import Image from 'next/image'

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      {/* Image */}
      <div className="product-img-wrap aspect-square w-full mb-3 relative overflow-hidden bg-cream">
        {product.photo ? (
          <Image
            src={product.photo}
            alt={product.name}
            fill
            unoptimized
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        ) : (
          <div className={`${product.placeholderClass} w-full h-full`} style={{ minHeight: '200px' }} />
        )}
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-midnight text-gold text-[10px] tracking-widest uppercase px-2 py-1 font-light">
            New
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-cream/70 flex items-center justify-center">
            <span className="text-xs tracking-widest uppercase text-slate">Sold Out</span>
          </div>
        )}
      </div>

      {/* Product info */}
      <div>
        <p className="text-xs tracking-widest uppercase text-gold font-light mb-1">{product.category}</p>
        <h3 className="font-lora text-[15px] font-normal tracking-wide text-midnight group-hover:text-gold transition-colors leading-snug">
          {product.name}
        </h3>
        <p className="text-sm tracking-wide text-slate font-light">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  )
}
