'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import ProductCard from './ProductCard'
import type { Product } from '@/lib/products'

// Items are repeated this many times for the infinite loop
const REPEAT = 4

interface Props {
  products: Product[]
  label: string
  shopAllHref: string
}

function getCardWidth() {
  const vw = window.innerWidth
  if (vw <= 396) return Math.round(vw / 2)   // mobile:  ~1 card + half peeks each side
  if (vw <= 768) return Math.round(vw / 4)   // tablet:  ~3 cards + half peeks each side
  return 340                                  // desktop: ~4 cards
}

export default function DraggableProductStrip({ products, label, shopAllHref }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollStart = useRef(0)
  const didDrag = useRef(false)
  const [dragging, setDragging] = useState(false)
  const [cardWidth, setCardWidth] = useState(340)

  // Responsive card width
  useEffect(() => {
    const update = () => setCardWidth(getCardWidth())
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // On card width change: reset scroll to second set + half-card offset
  // so the user sees a half-card peeking in from the left (signals "there's more")
  useEffect(() => {
    const el = trackRef.current
    if (!el || el.scrollWidth === 0) return
    const oneSetWidth = el.scrollWidth / REPEAT
    el.scrollLeft = oneSetWidth + cardWidth / 2
  }, [cardWidth])

  // Teleport to equivalent position in the middle sets when approaching edges.
  // Uses actual scrollWidth so no manual calculation needed.
  // Also adjusts scrollStart when dragging so the drag anchor stays correct.
  const checkInfinite = useCallback((el: HTMLDivElement) => {
    const oneSetWidth = el.scrollWidth / REPEAT
    if (oneSetWidth <= 0) return
    const sl = el.scrollLeft
    if (sl < oneSetWidth) {
      el.scrollLeft = sl + oneSetWidth
      if (isDragging.current) scrollStart.current += oneSetWidth
    } else if (sl >= oneSetWidth * (REPEAT - 1)) {
      el.scrollLeft = sl - oneSetWidth
      if (isDragging.current) scrollStart.current -= oneSetWidth
    }
  }, [])

  // Mouse drag — window-level listeners prevent stuck state when pointer leaves window
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !trackRef.current) return
      e.preventDefault()
      const dist = e.clientX - startX.current
      if (Math.abs(dist) > 5) didDrag.current = true
      trackRef.current.scrollLeft = scrollStart.current - dist
      checkInfinite(trackRef.current)
    }

    const cancelDrag = () => {
      if (!isDragging.current) return
      isDragging.current = false
      setDragging(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', cancelDrag)
    window.addEventListener('blur', cancelDrag)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', cancelDrag)
      window.removeEventListener('blur', cancelDrag)
    }
  }, [checkInfinite])

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

  // Native touch scroll fires scroll events — use them to teleport at edges
  const handleScroll = () => {
    if (!trackRef.current || isDragging.current) return
    checkInfinite(trackRef.current)
  }

  const items = Array.from({ length: REPEAT }, () => products).flat()

  return (
    <section className="bg-white border-b border-[#E8E8E8]">
      <div className="flex items-center justify-between px-4 md:px-24 py-6">
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
        style={{ scrollBehavior: 'auto', touchAction: 'pan-x' }}
        onMouseDown={onMouseDown}
        onClickCapture={onClickCapture}
        onDragStart={(e) => e.preventDefault()}
        onScroll={handleScroll}
      >
        {items.map((p, i) => (
          <div key={`${p.slug}-${i}`} className="shrink-0" style={{ width: cardWidth }}>
            <ProductCard product={p} sizes={`${cardWidth}px`} />
          </div>
        ))}
      </div>
    </section>
  )
}
