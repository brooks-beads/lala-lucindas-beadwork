'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { useCart } from '@/components/CartProvider'
import Link from 'next/link'

export default function CheckoutPage() {
  const { cart, cartTotal, cartCount, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleCheckout(e) {
    e.preventDefault()
    if (cart.length === 0) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            slug: item.slug,
          })),
        }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Checkout failed')

      // Redirect to Stripe Checkout
      window.location.href = data.url
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-screen-md mx-auto px-6 py-24 text-center">
        <p className="text-earth-400 text-xs tracking-widest uppercase mb-6">Checkout</p>
        <h1 className="text-3xl font-light tracking-wide text-earth-900 mb-4">Nothing to check out</h1>
        <p className="text-sm text-earth-500 font-light mb-10">Add some pieces to your cart first.</p>
        <Link href="/#shop" className="btn-primary">Shop the Collection</Link>
      </div>
    )
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-10">
        <p className="section-label mb-1">Almost there</p>
        <h1 className="section-title">Checkout</h1>
      </div>

      <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
        {/* Checkout form side */}
        <div className="lg:col-span-3">
          <form onSubmit={handleCheckout} className="space-y-10">

            {/* Contact */}
            <div>
              <h2 className="text-xs tracking-widest uppercase text-earth-600 mb-5 pb-3 border-b border-earth-200">
                Contact
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs tracking-wide uppercase text-earth-500 mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full border border-earth-300 px-4 py-3 text-sm text-earth-800 font-light outline-none focus:border-earth-600 transition-colors bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div>
              <h2 className="text-xs tracking-widest uppercase text-earth-600 mb-5 pb-3 border-b border-earth-200">
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs tracking-wide uppercase text-earth-500 mb-1.5">First Name</label>
                    <input type="text" required className="w-full border border-earth-300 px-4 py-3 text-sm text-earth-800 font-light outline-none focus:border-earth-600 transition-colors bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wide uppercase text-earth-500 mb-1.5">Last Name</label>
                    <input type="text" required className="w-full border border-earth-300 px-4 py-3 text-sm text-earth-800 font-light outline-none focus:border-earth-600 transition-colors bg-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-wide uppercase text-earth-500 mb-1.5">Address</label>
                  <input type="text" required className="w-full border border-earth-300 px-4 py-3 text-sm text-earth-800 font-light outline-none focus:border-earth-600 transition-colors bg-white" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs tracking-wide uppercase text-earth-500 mb-1.5">City</label>
                    <input type="text" required className="w-full border border-earth-300 px-4 py-3 text-sm text-earth-800 font-light outline-none focus:border-earth-600 transition-colors bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wide uppercase text-earth-500 mb-1.5">ZIP</label>
                    <input type="text" required className="w-full border border-earth-300 px-4 py-3 text-sm text-earth-800 font-light outline-none focus:border-earth-600 transition-colors bg-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-wide uppercase text-earth-500 mb-1.5">State</label>
                  <input type="text" required className="w-full border border-earth-300 px-4 py-3 text-sm text-earth-800 font-light outline-none focus:border-earth-600 transition-colors bg-white" />
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 font-light">
                {error}
              </div>
            )}

            {/* Note about Stripe */}
            <div className="bg-earth-50 border border-earth-200 px-5 py-4 text-xs text-earth-600 leading-relaxed tracking-wide">
              <strong className="font-medium tracking-widest uppercase text-earth-700 block mb-1">Secure Payment via Stripe</strong>
              Clicking &ldquo;Pay Now&rdquo; will redirect you to Stripe&apos;s secure checkout page where you&apos;ll
              enter your payment details. Your card information never touches our servers.
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 text-xs tracking-widest uppercase transition-all ${
                loading
                  ? 'bg-earth-400 text-earth-200 cursor-not-allowed'
                  : 'bg-earth-800 text-earth-50 hover:bg-earth-900'
              }`}
            >
              {loading ? 'Redirecting to Stripe…' : `Pay $${cartTotal.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-2">
          <div className="bg-earth-50 border border-earth-200 p-7 sticky top-24">
            <h2 className="text-xs tracking-widest uppercase text-earth-600 mb-6">
              Your Order ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </h2>

            <div className="space-y-4 pb-6 border-b border-earth-200">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className={`${item.placeholderClass} w-14 h-14 shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-light text-earth-800 leading-snug">{item.name}</p>
                    <p className="text-xs text-earth-500 tracking-wide">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-xs text-earth-800 font-light shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-5 space-y-2">
              <div className="flex justify-between text-sm font-light text-earth-700">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-earth-500 tracking-wide">
                <span>Shipping</span>
                <span>{cartTotal >= 75 ? 'Free' : 'Calculated at checkout'}</span>
              </div>
            </div>

            <div className="flex justify-between pt-5 mt-3 border-t border-earth-200 text-sm font-light tracking-wide text-earth-900">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
