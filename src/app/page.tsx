import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import DraggableProductStrip from '@/components/DraggableProductStrip'
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

      {/* Hero — 50/50 split */}
      <section className="flex overflow-hidden bg-[#F7F7F7]" style={{ height: 620 }}>
        <div className="relative flex-1 overflow-hidden">
          <Image
            src="/products/GoltDesign_74fef74963fd98ec29fe33d11559ad5d_hexDCDCDC.jpeg"
            alt="Luna Çizgi & Boşluk"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative flex-1 overflow-hidden border-l border-[#E8E8E8]">
          <Image
            src="/products/GoltDesign_c6efdb1b38d0fec9d1fc1e901ba4389e_hexDCDCDC.jpeg"
            alt="Luna Çizgi"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Shop strip */}
      <div className="flex items-center justify-between px-24 py-[14px] border-b border-[#E8E8E8] bg-white">
        <span className="text-[11px] font-bold tracking-[3px] text-[#1A1A18]">SHOP</span>
        <div className="flex items-center gap-8">
          {[
            { label: 'Totes', href: '/collections/totes' },
            { label: 'Crossbody', href: '/collections/crossbody' },
            { label: 'Geometric Prints', href: '/collections/geometric-prints' },
            { label: 'Solid Canvas', href: '/collections/solid-canvas' },
            { label: 'New Arrivals', href: '/collections/totes' },
          ].map(({ label, href }) => (
            <Link key={label} href={href} className="text-[13px] text-[#6B6760] hover:text-[#1A1A18] transition-colors">
              {label}
            </Link>
          ))}
        </div>
        <Link href="/collections/totes" className="text-[13px] font-medium text-[#1A1A18] hover:text-[#C4572A] transition-colors">
          All bags →
        </Link>
      </div>

      {/* NEW ARRIVALS — draggable horizontal strip */}
      <DraggableProductStrip
        products={products}
        label="NEW ARRIVALS"
        shopAllHref="/collections/totes"
        cardWidth={340}
      />

      {/* Category row 1 */}
      <div className="grid grid-cols-3 gap-px bg-[#E8E8E8] border-b border-[#E8E8E8]">
        {categoryRows[0].map((col) => (
          <Link key={col.label} href={col.href} className="group bg-white block">
            <div className="relative overflow-hidden" style={{ height: 480 }}>
              <Image
                src={col.image}
                alt={col.label}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-[#E8E8E8]">
              <div>
                <p className="text-[11px] font-bold tracking-[2px] text-[#1A1A18]">{col.label}</p>
                <p className="text-[12px] text-[#A8A49E] mt-0.5">{col.sub}</p>
              </div>
              <span className="text-[#A8A49E] group-hover:text-[#1A1A18] transition-colors">→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* GEOMETRIC PRINTS */}
      <section className="bg-white border-b border-[#E8E8E8]">
        <div className="flex items-center justify-between px-24 py-6">
          <span className="text-[11px] font-bold tracking-[3px] text-[#1A1A18]">GEOMETRIC PRINTS</span>
          <Link href="/collections/geometric-prints" className="text-[13px] text-[#A8A49E] hover:text-[#1A1A18] transition-colors">
            Shop all
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-px bg-[#E8E8E8]">
          {geometricProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Category row 2 */}
      <div className="grid grid-cols-3 gap-px bg-[#E8E8E8] border-b border-[#E8E8E8]">
        {categoryRows[1].map((col) => (
          <Link key={col.label} href={col.href} className="group bg-white block">
            <div className="relative overflow-hidden" style={{ height: 480 }}>
              <Image
                src={col.image}
                alt={col.label}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-[#E8E8E8]">
              <div>
                <p className="text-[11px] font-bold tracking-[2px] text-[#1A1A18]">{col.label}</p>
                <p className="text-[12px] text-[#A8A49E] mt-0.5">{col.sub}</p>
              </div>
              <span className="text-[#A8A49E] group-hover:text-[#1A1A18] transition-colors">→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Typographic statement */}
      <section className="bg-white border-b border-[#E8E8E8] px-24 py-24">
        <p
          className="font-bold text-[#1A1A18] leading-[0.9]"
          style={{ fontSize: 'clamp(40px, 6vw, 80px)', letterSpacing: '-3px' }}
        >
          Made by hand.
          <br />
          Built to last.
        </p>
      </section>

      {/* FROM THE COMMUNITY — auto-scrolling ticker */}
      <CommunityTicker />

      <Footer />
    </main>
  )
}
