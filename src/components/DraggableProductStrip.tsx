'use client'

import { useRef, useState, useCallback } from 'react'
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
  const scrollLeft = useRef(0)
  const didDrag = useRef(false)
  const [dragging, setDragging] = useState(false)

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!trackRef.current) return
    isDragging.current = true
    didDrag.current = false
    startX.current = e.pageX - trackRef.current.offsetLeft
    scrollLeft.current = trackRef.current.scrollLeft
    setDragging(true)
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    const dist = x - startX.current
    if (Math.abs(dist) > 4) didDrag.current = true
    trackRef.current.scrollLeft = scrollLeft.current - dist
  }, [])

  const onMouseUp = useCallback(() => {
    isDragging.current = false
    setDragging(false)
  }, [])

  const onClickCapture = useCallback((e: React.MouseEvent) => {
    // Block link clicks if user dragged
    if (didDrag.current) e.preventDefault()
  }, [])

  return (
    <section className="bg-white border-b border-[#E8E8E8]">
      {/* Header */}
      <div className="flex items-center justify-between px-24 py-6">
        <span className="text-[11px] font-bold tracking-[3px] text-[#1A1A18]">{label}</span>
        <Link
          href={shopAllHref}
          className="text-[13px] text-[#A8A49E] hover:text-[#1A1A18] transition-colors"
        >
          Shop all
        </Link>
      </div>

      {/* Draggable track */}
      <div
        ref={trackRef}
        className={`flex overflow-x-auto scrollbar-hide gap-px bg-[#E8E8E8] select-none ${
          dragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ scrollBehavior: 'auto' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onClickCapture={onClickCapture}
      >
        {products.map((p) => (
          <div key={p.slug} className="shrink-0" style={{ width: cardWidth }}>
            <ProductCard product={p} sizes={`${cardWidth}px`} />
          </div>
        ))}
        {/* Right padding sentinel */}
        <div className="shrink-0 w-24 bg-white" />
      </div>
    </section>
  )
}
