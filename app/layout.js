import { Mukta } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/components/CartProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const mukta = Mukta({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-mukta',
  display: 'swap',
})

export const metadata = {
  title: "Lala Lucinda's Beadwork",
  description:
    "Handmade beadwork jewelry and art by Lucinda — necklaces, bracelets, earrings, rings, and one-of-a-kind wall hangings. Each piece made by hand, one at a time.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={mukta.variable}>
      <body className="font-mukta">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
