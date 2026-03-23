import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import DraggableProductStrip from '@/components/DraggableProductStrip'
import DraggableCategoryStrip from '@/components/DraggableCategoryStrip'
import CommunityTicker from '@/components/CommunityTicker'
import { products, geometricProducts } from '@/lib/products'

const categoryRows = [
  [
    {
      label: 'TOTES',
      sub: 'Canvas & Leather',
      href: '/collections/totes',
      image: '/products/GoltDesign_74fef74963fd98ec29fe33d11559ad5d_hexDCDCDC.jpeg',
    },
    {
      label: 'CROSSBODY',
      sub: 'Compact & Versatile',
      href: '/collections/crossbody',
      image: '/products/GoltDesign_f426743542edd94c52a6e0a9e54e4645_hexDCDCDC.jpeg',
    },
    {
      label: 'GEOMETRIC PRINTS',
      sub: 'Bold Patterns',
      href: '/collections/geometric-prints',
      image: '/products/GoltDesign_4401cca141344c83170d70e1fad8fc65_hexDCDCDC.jpeg',
    },
  ],
  [
    {
      label: 'SOLID CANVAS',
      sub: 'Natural & Undyed',
      href: '/collections/solid-canvas',
      image: '/products/GoltDesign_a574d32b90a3232990230f0a03a3ee4a_hexDCDCDC.jpeg',
    },
    {
      label: 'SHOULDER BAGS',
      sub: 'Everyday Carry',
      href: '/collections/totes',
      image: '/products/GoltDesign_f98af07dc6c6efc972461c4c96cf098d_hexDCDCDC.jpeg',
    },
    {
      label: 'ALL BAGS',
      sub: 'Full Collection',
      href: '/collections/totes',
      image: '/products/GoltDesign_6bce93e1430ca1037df8e282e378bcd0_hexDCDCDC.jpeg',
    },
  ],
]

export default function Home() {
  return (
    <main>
      <Nav />

      {/* Hero
          Mobile:  single portrait image, full width
          Desktop: 50/50 split side by side               */}
      <section className="flex overflow-hidden bg-[#F7F7F7] h-[480px] md:h-[620px]">
        <div className="relative w-full md:w-1/2 overflow-hidden">
          <Image
            src="/products/GoltDesign_74fef74963fd98ec29fe33d11559ad5d_hexDCDCDC.jpeg"
            alt="Luna Çizgi & Boşluk"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Second panel — hidden on mobile */}
        <div className="hidden md:block relative flex-1 overflow-hidden border-l border-[#E8E8E8]">
          <Image
            src="/products/GoltDesign_c6efdb1b38d0fec9d1fc1e901ba4389e_hexDCDCDC.jpeg"
            alt="Luna Çizgi"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Shop strip — horizontal scroll on mobile */}
      <div className="flex overflow-x-auto scrollbar-hide items-center gap-5 md:gap-8 px-4 md:px-24 py-3 md:py-[14px] border-b border-[#E8E8E8] bg-white whitespace-nowrap">
        <span className="text-[10px] md:text-[11px] font-bold tracking-[3px] text-[#1A1A18] shrink-0">SHOP</span>
        {[
          { label: 'Totes', href: '/collections/totes' },
          { label: 'Crossbody', href: '/collections/crossbody' },
          { label: 'Geometric Prints', href: '/collections/geometric-prints' },
          { label: 'Solid Canvas', href: '/collections/solid-canvas' },
          { label: 'New Arrivals', href: '/collections/totes' },
        ].map(({ label, href }) => (
          <Link key={label} href={href} className="text-[12px] md:text-[13px] text-[#6B6760] hover:text-[#1A1A18] transition-colors shrink-0">
            {label}
          </Link>
        ))}
        <Link href="/collections/totes" className="text-[12px] md:text-[13px] font-medium text-[#1A1A18] hover:text-[#C4572A] transition-colors shrink-0 pl-2">
          All bags →
        </Link>
      </div>

      {/* NEW ARRIVALS — infinite draggable strip */}
      <DraggableProductStrip
        products={products}
        label="NEW ARRIVALS"
        shopAllHref="/collections/totes"
      />

      {/* Category row 1 — draggable on mobile, 3-col grid on desktop */}
      <DraggableCategoryStrip items={categoryRows[0]} />

      {/* GEOMETRIC PRINTS — infinite draggable strip */}
      <DraggableProductStrip
        products={geometricProducts}
        label="GEOMETRIC PRINTS"
        shopAllHref="/collections/geometric-prints"
      />

      {/* Category row 2 — draggable on mobile, 3-col grid on desktop */}
      <DraggableCategoryStrip items={categoryRows[1]} />

      {/* Typographic statement */}
      <section className="bg-white border-b border-[#E8E8E8] px-4 md:px-24 py-12 md:py-24">
        <p
          className="font-bold text-[#1A1A18] leading-[0.9]"
          style={{ fontSize: 'clamp(32px, 6vw, 80px)', letterSpacing: '-2px' }}
        >
          Made by hand.
          <br />
          Built to last.
        </p>
      </section>

      {/* FROM THE COMMUNITY */}
      <CommunityTicker />

      <Footer />
    </main>
  )
}
