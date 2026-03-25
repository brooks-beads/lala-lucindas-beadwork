import { Lora, Lato } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/components/CartProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/react'

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
})

export const metadata = {
  title: "Lala Lucinda's Indigenous Handmade Beadwork",
  description:
    "Handmade Indigenous beadwork jewelry and art by Lala Lucinda, an enrolled citizen of the Hewisedawi Band of the Pit River Tribe. Necklaces, bracelets, earrings, rings, and custom orders — each piece one of a kind.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lora.variable} ${lato.variable}`}>
      <body className="font-lato">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <Analytics />
        </CartProvider>
      </body>
    </html>
  )
}
