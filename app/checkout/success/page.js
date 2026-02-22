import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="max-w-screen-sm mx-auto px-6 py-28 text-center">
      <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-8">
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>

      <p className="section-label text-center mb-3">Order confirmed</p>
      <h1 className="text-3xl font-light tracking-wide text-earth-900 mb-4">
        Thank you so much.
      </h1>
      <p className="text-sm text-earth-600 font-light leading-relaxed mb-3">
        Your order is confirmed and I&apos;ll get to work on it right away. Expect a shipping
        confirmation email within 3–5 business days.
      </p>
      <p className="text-sm text-earth-500 font-light leading-relaxed mb-12">
        — Lucinda
      </p>

      <Link href="/" className="btn-primary">Back to Shop</Link>
    </div>
  )
}
