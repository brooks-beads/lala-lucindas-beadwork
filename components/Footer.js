'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-earth-900 text-earth-200 mt-24">
      {/* Email signup band */}
      <div className="border-b border-earth-700 py-12 px-6">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs tracking-widest uppercase text-earth-400 mb-1">Stay in touch</p>
            <h3 className="text-lg font-light tracking-wide text-earth-50">Sign up for new pieces & studio notes</h3>
          </div>
          <form className="flex gap-0 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="bg-earth-800 border border-earth-600 text-earth-100 placeholder-earth-500 px-4 py-2.5 text-xs tracking-wide flex-1 md:w-64 outline-none focus:border-earth-400 transition-colors"
            />
            <button
              type="submit"
              className="bg-earth-600 hover:bg-earth-500 text-earth-50 px-5 py-2.5 text-xs tracking-widest uppercase transition-colors border border-earth-600"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Main footer columns */}
      <div className="py-14 px-6">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-xs tracking-[0.25em] uppercase text-earth-500 leading-none mb-1">Lala</p>
            <p className="text-lg font-light tracking-[0.15em] uppercase text-earth-100 leading-none">Lucinda&apos;s</p>
            <p className="text-xs tracking-[0.3em] uppercase text-earth-500 leading-none mt-1 mb-4">Beadwork</p>
            <p className="text-earth-400 text-xs leading-relaxed">
              Handmade jewelry and art, one bead at a time. Made in Northern California.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-earth-400 mb-4">Shop</h4>
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
                  <Link href={`/collections/${cat.slug}`} className="text-earth-300 text-xs hover:text-earth-100 transition-colors tracking-wide">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-earth-400 mb-4">Info</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About Lucinda', href: '/#about' },
                { label: 'Care & Materials', href: '/#care' },
                { label: 'Shipping & Returns', href: '/#shipping' },
                { label: 'Custom Orders', href: '/#custom' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-earth-300 text-xs hover:text-earth-100 transition-colors tracking-wide">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-earth-400 mb-4">Follow</h4>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="text-earth-400 hover:text-earth-100 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" aria-label="Pinterest" className="text-earth-400 hover:text-earth-100 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-earth-800 py-5 px-6">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-earth-500 text-xs tracking-wide">
          <p>&copy; {new Date().getFullYear()} Lala Lucinda&apos;s Beadwork. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-earth-300 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-earth-300 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
