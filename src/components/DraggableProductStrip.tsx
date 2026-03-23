'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import ProductCard from './ProductCard'
import type { Product } from '@/lib/products'

interface Props {
  products: Product[]
  label: string
  shopAllHref: string
  cardWidth?: number
}

export default function DraggableProductStrip({
  products,
  label,
  shopAllHref,
  cardWidth = 340,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollStart = useRef(0)
  const didDrag = useRef(false)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !trackRef.current) return
      e.preventDefault()
      const dist = e.clientX - startX.current
      if (Math.abs(dist) > 5) didDrag.current = true
      trackRef.current.scrollLeft = scrollStart.current - dist
    }

    const handleMouseUp = () => {
      if (!isDragging.current) return
      isDragging.current = false
      setDragging(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return
    isDragging.current = true
    didDrag.current = false
    startX.current = e.clientX
    scrollStart.current = trackRef.current.scrollLeft
    setDragging(true)
  }

  const onClickCapture = (e: React.MouseEvent) => {
    if (didDrag.current) e.preventDefault()
  }

  return (
    <section className="bg-white border-b border-[#E8E8E8]">
      <div className="flex items-center justify-between px-24 py-6">
        <span className="text-[11px] font-bold tracking-[3px] text-[#1A1A18]">{label}</span>
        <Link href={shopAllHref} className="text-[13px] text-[#A8A49E] hover:text-[#1A1A18] transition-colors">
          Shop all
        </Link>
      </div>

      <div
        ref={trackRef}
        className={`flex overflow-x-auto scrollbar-hide gap-px bg-[#E8E8E8] select-none ${
          dragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ scrollBehavior: 'auto' }}
        onMouseDown={onMouseDown}
        onClickCapture={onClickCapture}
      >
        {products.map((p) => (
          <div key={p.slug} className="shrink-0" style={{ width: cardWidth }}>
            <ProductCard product={p} sizes={`${cardWidth}px`} />
          </div>
        ))}
        <div className="shrink-0 bg-white" style={{ width: 96 }} />
      </div>
    </section>
  )
}
