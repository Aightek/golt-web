import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/lib/products'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export default function ProductCard({ product, priority }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="group block bg-white">
      <div className="relative overflow-hidden bg-[#F7F7F7] aspect-[4/5]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          priority={priority}
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-[#1A1A18] text-white text-[10px] font-semibold tracking-[1.5px] px-2 py-1">
            NEW
          </span>
        )}
      </div>
      <div className="p-4 pb-5">
        {product.badge && (
          <p className="text-[10px] font-semibold tracking-[2px] text-[#A8A49E] mb-1">{product.badge}</p>
        )}
        <p className="text-[13px] font-medium text-[#1A1A18] leading-tight">{product.name}</p>
        <p className="text-[13px] text-[#6B6760] mt-1">{product.price}</p>
      </div>
    </Link>
  )
}
