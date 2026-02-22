'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { useCart } from '@/components/CartProvider'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart()

  if (cart.length === 0) {
    return (
      <div className="max-w-screen-md mx-auto px-6 py-24 text-center">
        <p className="text-earth-400 text-xs tracking-widest uppercase mb-6">Your cart</p>
        <h1 className="text-3xl font-light tracking-wide text-earth-900 mb-4">Your cart is empty</h1>
        <p className="text-sm text-earth-500 font-light mb-10">
          Nothing here yet — go find something you love.
        </p>
        <Link href="/#shop" className="btn-primary">Shop the Collection</Link>
      </div>
    )
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-10">
        <p className="section-label mb-1">Your selections</p>
        <h1 className="section-title">
          Your Cart <span className="text-earth-400 text-base">({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-0 divide-y divide-earth-200 border-t border-earth-200">
          {cart.map((item) => (
            <div key={item.id} className="py-8 flex gap-6">
              {/* Image */}
              <Link href={`/products/${item.slug}`} className="shrink-0">
                <div className={`${item.placeholderClass} w-24 h-28 md:w-32 md:h-40`} />
              </Link>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] tracking-widest uppercase text-earth-500 mb-1">{item.category}</p>
                    <Link href={`/products/${item.slug}`}>
                      <h3 className="text-sm font-light tracking-wide text-earth-900 hover:text-clay transition-colors leading-snug">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-earth-400 tracking-wide mt-0.5">{item.tagline}</p>
                  </div>
                  <p className="text-sm font-light tracking-wide text-earth-800 shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  {/* Qty */}
                  <div className="flex items-center border border-earth-300">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-earth-600 hover:bg-earth-100 transition-colors text-base"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-xs text-earth-800 font-light">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-earth-600 hover:bg-earth-100 transition-colors text-base"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-earth-400 hover:text-clay tracking-wide underline underline-offset-2 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-earth-50 border border-earth-200 p-8 sticky top-24">
            <h2 className="text-xs tracking-widest uppercase text-earth-600 mb-6">Order Summary</h2>

            <div className="space-y-3 text-sm pb-6 border-b border-earth-200">
              <div className="flex justify-between text-earth-700 font-light">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-earth-500 text-xs tracking-wide">
                <span>Shipping</span>
                <span>{cartTotal >= 75 ? 'Free' : 'Calculated at checkout'}</span>
              </div>
              {cartTotal >= 75 && (
                <p className="text-sage text-xs tracking-wide">✓ You qualify for free shipping</p>
              )}
            </div>

            <div className="flex justify-between pt-5 mb-7">
              <span className="text-sm font-light tracking-wide text-earth-900">Estimated Total</span>
              <span className="text-sm font-light tracking-wide text-earth-900">${cartTotal.toFixed(2)}</span>
            </div>

            <Link href="/checkout" className="btn-primary block text-center w-full">
              Proceed to Checkout
            </Link>

            <Link href="/#shop" className="block text-center text-xs tracking-widest uppercase text-earth-500 hover:text-earth-800 mt-5 transition-colors">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
