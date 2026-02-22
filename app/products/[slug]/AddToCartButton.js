'use client'

import { useState } from 'react'
import { useCart } from '@/components/CartProvider'
import Link from 'next/link'

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const [qty, setQty] = useState(1)

  function handleAdd() {
    if (!product.inStock) return
    addToCart(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div className="space-y-4">
      {/* Quantity selector */}
      <div className="flex items-center gap-4">
        <span className="text-xs tracking-widest uppercase text-earth-500">Qty</span>
        <div className="flex items-center border border-earth-300">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-9 h-9 flex items-center justify-center text-earth-600 hover:bg-earth-100 transition-colors text-lg leading-none"
          >
            −
          </button>
          <span className="w-10 text-center text-sm text-earth-800 font-light">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-9 h-9 flex items-center justify-center text-earth-600 hover:bg-earth-100 transition-colors text-lg leading-none"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to cart / sold out */}
      {product.inStock ? (
        <button
          onClick={handleAdd}
          className={`w-full py-3.5 text-xs tracking-widest uppercase transition-all duration-300 ${
            added
              ? 'bg-sage text-white border border-sage'
              : 'bg-earth-800 text-earth-50 hover:bg-earth-900'
          }`}
        >
          {added ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
      ) : (
        <button
          disabled
          className="w-full py-3.5 text-xs tracking-widest uppercase bg-earth-200 text-earth-400 cursor-not-allowed"
        >
          Sold Out
        </button>
      )}

      {added && (
        <Link
          href="/cart"
          className="block text-center text-xs tracking-widest uppercase text-earth-600 hover:text-earth-900 underline underline-offset-4 transition-colors"
        >
          View Cart →
        </Link>
      )}
    </div>
  )
}
