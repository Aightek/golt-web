'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/lib/products'

interface ProductCardProps {
  product: Product
  priority?: boolean
  sizes?: string
}

export default function ProductCard({ product, priority, sizes = '25vw' }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const altImage = product.thumbs?.[0]
  const hasAlt = !!altImage && altImage !== product.image

  return (
    <Link
      href={`/products/${product.slug}`}
      className="block bg-white group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden aspect-[4/5]">
        {/* Primary image */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={sizes}
          className={`object-cover transition-opacity duration-300 ${hovered && hasAlt ? 'opacity-0' : 'opacity-100'}`}
          priority={priority}
        />

        {/* Alternate image — stacked, toggled by opacity */}
        {hasAlt && (
          <Image
            src={altImage}
            alt={product.name}
            fill
            sizes={sizes}
            className={`object-cover transition-opacity duration-300 absolute inset-0 ${hovered ? 'opacity-100' : 'opacity-0'}`}
          />
        )}

        {product.isNew && (
          <span className="absolute top-3 left-3 bg-[#1A1A18] text-white text-[10px] font-semibold tracking-[1.5px] px-2 py-1 z-10">
            NEW
          </span>
        )}

        {/* Add to Cart — slides up on hover */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-white flex items-center justify-center z-10 transition-all duration-200 ${
            hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
          }`}
          style={{ height: 40 }}
        >
          <span className="text-[11px] font-semibold tracking-[2.5px] text-[#1A1A18]">ADD TO CART</span>
        </div>
      </div>

      <div className="px-3 pt-3 pb-4">
        {product.badge && (
          <p className="text-[10px] font-semibold tracking-[2px] text-[#A8A49E] mb-0.5">{product.badge}</p>
        )}
        <p className="text-[13px] font-medium text-[#1A1A18] leading-snug">{product.name}</p>
        <p className="text-[13px] text-[#6B6760] mt-0.5">{product.price}</p>
      </div>
    </Link>
  )
}
