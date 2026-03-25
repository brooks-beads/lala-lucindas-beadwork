'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'

  async function handleSubscribe(e) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <footer className="bg-midnight text-smoke mt-24 border-t border-gold/20">
      {/* Email signup band */}
      <div className="border-b border-gold/15 py-12 px-6">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs tracking-widest uppercase text-gold font-light mb-1">Stay in touch</p>
            <h3 className="font-lora text-lg font-normal tracking-wide text-cream">Sign up for new pieces & studio notes</h3>
          </div>
          {status === 'success' ? (
            <p className="text-gold text-sm tracking-wide font-light">You&apos;re in — stay tuned for updates from Lucinda directly to your inbox. ✨</p>
          ) : (
            <form className="flex gap-0 w-full md:w-auto" onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="bg-midnight border border-smoke/40 text-cream placeholder-smoke px-4 py-2.5 text-xs tracking-wide flex-1 md:w-64 outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-gold hover:bg-gold-light text-midnight px-5 py-2.5 text-xs tracking-widest uppercase transition-colors border border-gold disabled:opacity-60 font-normal"
              >
                {status === 'loading' ? '...' : 'Join'}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-xs tracking-wide">Something went wrong — please try again.</p>
          )}
        </div>
      </div>

      {/* Main footer columns */}
      <div className="py-14 px-6">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-lora text-xl font-normal tracking-wide text-cream leading-none mb-1">Lala Lucinda&apos;s</p>
            <p className="text-[9px] tracking-[0.25em] uppercase text-gold font-light leading-none mb-4">Indigenous Handmade Beadwork</p>
            <p className="text-smoke text-xs leading-relaxed font-light">
              Pit River tribal heritage, carried forward in every bead. Made by Lala Lucinda, enrolled citizen of the Hewisedawi Band.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-gold font-light mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Necklaces',   slug: 'necklaces' },
                { name: 'Bracelets',   slug: 'bracelets' },
                { name: 'Earrings',    slug: 'earrings' },
                { name: 'Rings',       slug: 'rings' },
                { name: 'Hair Pieces', slug: 'hair-pieces' },
                { name: 'Apparel',     slug: 'apparel' },
              ].map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/collections/${cat.slug}`} className="text-smoke text-xs hover:text-gold transition-colors tracking-wide">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-gold font-light mb-4">Info</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About Lucinda', href: '/#about' },
                { label: 'Custom Orders', href: '/custom-orders' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-smoke text-xs hover:text-gold transition-colors tracking-wide">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-gold font-light mb-4">Follow</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/lalalucindas22/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-smoke hover:text-gold transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://www.facebook.com/people/Lala-Lucindas/100083317692077/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-smoke hover:text-gold transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold/10 py-5 px-6">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-smoke text-xs tracking-wide">
          <p>&copy; {new Date().getFullYear()} Lala Lucinda&apos;s · Hewisedawi Band of the Pit River Tribe · All rights reserved</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-gold transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-gold transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
