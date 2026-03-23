'use client'

import { use, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Heart, Plus, Minus } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { getProduct, products } from '@/lib/products'

interface Props {
  params: Promise<{ slug: string }>
}

const accordionItems = [
  { key: 'materials', label: 'MATERIALS & CARE' },
  { key: 'dimensions', label: 'DIMENSIONS' },
  { key: 'shipping', label: 'SHIPPING & RETURNS' },
]

const shippingText =
  'Free shipping on orders over 500 ₺. Standard delivery 3–5 business days. Express available at checkout. Returns accepted within 14 days — items must be unused and in original condition.'

export default function ProductPage({ params }: Props) {
  const { slug } = use(params)

  // All hooks must run before any conditional throw
  const [activeThumb, setActiveThumb] = useState(0)
  const [openAccordion, setOpenAccordion] = useState<string | null>('dimensions')
  const [added, setAdded] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)

  const product = getProduct(slug)
  if (!product) notFound()

  const allImages = [product.image, ...(product.thumbs ?? [])]
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4)

  const accordionContent: Record<string, string> = {
    materials: product.materials,
    dimensions: product.dimensions,
    shipping: shippingText,
  }

  const handleAddToCart = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <main>
      <Nav />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 px-24 border-b border-[#E8E8E8] bg-white" style={{ height: 44 }}>
        <Link href="/" className="text-[11px] text-[#A8A49E] tracking-[1.5px] hover:text-[#1A1A18] transition-colors">
          HOME
        </Link>
        <span className="text-[11px] text-[#D0CEC9]">/</span>
        <Link
          href={`/collections/${product.categorySlug}`}
          className="text-[11px] text-[#A8A49E] tracking-[1.5px] hover:text-[#1A1A18] transition-colors uppercase"
        >
          {product.category}
        </Link>
        <span className="text-[11px] text-[#D0CEC9]">/</span>
        <span className="text-[11px] font-semibold text-[#1A1A18] tracking-[1.5px] uppercase">
          {product.name}
        </span>
      </div>

      {/* PDP Hero */}
      <div className="flex bg-white" style={{ minHeight: 660 }}>
        {/* Images panel */}
        <div className="flex flex-col bg-[#F7F7F7] border-r border-[#E8E8E8]" style={{ width: 780 }}>
          <div className="relative flex-1" style={{ height: 560 }}>
            <Image
              src={allImages[activeThumb]}
              alt={product.name}
              fill
              className="object-contain p-10"
              priority
            />
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-px bg-[#E8E8E8] border-t border-[#E8E8E8]" style={{ height: 100 }}>
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveThumb(i)}
                  className={`relative flex-1 transition-opacity ${
                    i === activeThumb ? 'opacity-100' : 'opacity-50 hover:opacity-80'
                  }`}
                  style={{ background: '#F7F7F7' }}
                >
                  <Image src={img} alt={`View ${i + 1}`} fill className="object-contain p-2" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info panel */}
        <div className="flex flex-col flex-1 px-[72px] py-16 bg-white overflow-y-auto">
          {product.badge && (
            <div className="inline-flex items-center bg-[#1A1A18] px-[10px]" style={{ height: 24 }}>
              <span className="text-[10px] font-semibold tracking-[2px] text-white">{product.badge}</span>
            </div>
          )}

          <div style={{ height: 20 }} />

          <h1
            className="font-bold text-[#1A1A18] leading-tight"
            style={{ fontSize: 32, letterSpacing: -1 }}
          >
            {product.name}
          </h1>

          <div style={{ height: 12 }} />
          <p className="text-[22px] text-[#1A1A18]">{product.price}</p>
          <div style={{ height: 28 }} />

          <div className="h-px bg-[#E8E8E8]" />
          <div style={{ height: 28 }} />

          <p className="text-[14px] text-[#6B6760] leading-[1.7]">{product.description}</p>
          <div style={{ height: 32 }} />

          {/* Size info row */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-[2px] text-[#1A1A18]">ONE SIZE</span>
            <span className="text-[11px] text-[#A8A49E] tracking-[1px]">33 × 25 cm</span>
          </div>

          <div style={{ height: 32 }} />

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center bg-[#1A1A18] text-white text-[13px] font-semibold tracking-[2px] transition-all hover:bg-[#C4572A] active:scale-[0.99]"
            style={{ height: 52 }}
          >
            {added ? 'ADDED ✓' : 'ADD TO CART'}
          </button>

          <div style={{ height: 12 }} />

          {/* Wishlist */}
          <button
            onClick={() => setWishlisted(!wishlisted)}
            className="flex items-center justify-center gap-2.5 text-[13px] font-medium text-[#1A1A18] border border-[#1A1A18] hover:bg-[#F7F7F7] transition-colors"
            style={{ height: 48 }}
          >
            <Heart
              size={16}
              strokeWidth={1.5}
              className={wishlisted ? 'fill-[#C4572A] stroke-[#C4572A]' : ''}
            />
            {wishlisted ? 'SAVED' : 'SAVE TO WISHLIST'}
          </button>

          <div style={{ height: 32 }} />
          <div className="h-px bg-[#E8E8E8]" />
          <div style={{ height: 24 }} />

          {/* Details row */}
          <div className="flex items-center gap-6 flex-wrap">
            {['Handmade in Istanbul', 'Ships in 2–3 days', 'Free returns'].map((detail) => (
              <div key={detail} className="flex items-center gap-2">
                <span className="w-1 h-1 bg-[#C4572A] rounded-full" />
                <span className="text-[12px] text-[#6B6760]">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accordion */}
      <div className="border-t border-[#E8E8E8]">
        {accordionItems.map(({ key, label }) => (
          <div key={key} className="border-b border-[#E8E8E8]">
            <button
              className="flex items-center justify-between w-full px-24 text-left hover:bg-[#F7F7F7] transition-colors"
              style={{ height: 56 }}
              onClick={() => setOpenAccordion(openAccordion === key ? null : key)}
            >
              <span className="text-[11px] font-semibold tracking-[2px] text-[#1A1A18]">{label}</span>
              {openAccordion === key ? (
                <Minus size={16} className="text-[#1A1A18]" strokeWidth={1.5} />
              ) : (
                <Plus size={16} className="text-[#1A1A18]" strokeWidth={1.5} />
              )}
            </button>
            {openAccordion === key && (
              <div className="px-24 pb-6 pt-2">
                <p className="text-[13px] text-[#6B6760] leading-[1.8]">{accordionContent[key]}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* YOU MAY ALSO LIKE */}
      <section className="bg-white border-b border-[#E8E8E8]">
        <div className="flex items-center justify-between px-24 py-6">
          <span className="text-[11px] font-bold tracking-[3px] text-[#1A1A18]">YOU MAY ALSO LIKE</span>
          <Link href="/collections/totes" className="text-[13px] text-[#A8A49E] hover:text-[#1A1A18] transition-colors">
            Shop all
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-px bg-[#E8E8E8]">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
