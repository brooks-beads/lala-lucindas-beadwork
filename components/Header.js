'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useCart } from './CartProvider'

export default function Header() {
  const { cartCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-gold text-midnight text-center py-2 text-xs tracking-widest uppercase font-normal">
        Free shipping on orders over $75 &nbsp;·&nbsp; Handmade to order — ships in 3–5 days
      </div>

      <header className="sticky top-0 z-50 bg-midnight border-b border-gold/20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between gap-8">

          {/* Logo — left */}
          <Link href="/" className="shrink-0 flex items-center gap-3">
            <Image
              src="/images/logo.jpg"
              alt="Lala Lucinda's logo"
              width={52}
              height={52}
              className="w-12 h-12 object-contain"
              style={{ mixBlendMode: 'multiply' }}
              priority
            />
            <div>
              <p className="font-lora text-xl md:text-2xl tracking-wide text-cream leading-none">
                Lala Lucinda&apos;s
              </p>
              <p className="text-[9px] tracking-[0.28em] uppercase text-gold font-light leading-none mt-0.5">
                Indigenous Handmade Beadwork
              </p>
            </div>
          </Link>

          {/* Desktop nav — center/right */}
          <nav className="hidden md:flex items-center gap-8 ml-auto">
            <Link href="/#shop" className="nav-link">Shop</Link>
            <Link href="/#shop" className="nav-link">Collections</Link>
            <Link href="/#about" className="nav-link">About</Link>
            <Link href="/custom-orders" className="nav-link">Custom Orders</Link>
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-5 ml-4">
            {/* Search */}
            <button className="hidden md:block text-cream/60 hover:text-gold transition-colors" aria-label="Search">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>

            {/* Cart */}
            <Link href="/cart" className="relative text-cream/60 hover:text-gold transition-colors" aria-label="Cart">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-midnight text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-normal leading-none">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-cream/80 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gold/20 bg-midnight px-6 py-6 space-y-5">
            <Link href="/#shop" className="block nav-link text-sm py-1" onClick={() => setMenuOpen(false)}>Shop All</Link>
            <Link href="/#about" className="block nav-link text-sm py-1" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/custom-orders" className="block nav-link text-sm py-1" onClick={() => setMenuOpen(false)}>Custom Orders</Link>
            <Link href="/cart" className="block nav-link text-sm py-1" onClick={() => setMenuOpen(false)}>Cart {cartCount > 0 && `(${cartCount})`}</Link>
          </div>
        )}
      </header>
    </>
  )
}
