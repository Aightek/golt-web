'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import ProductCard from './ProductCard'
import type { Product } from '@/lib/products'

const REPEAT = 4

interface Props {
  products: Product[]
  label: string
  shopAllHref: string
}

function getCardWidth() {
  const vw = window.innerWidth
  if (vw <= 640) return Math.round(vw * 0.8)    // mobile: 1 card + right peek
  if (vw <= 1024) return Math.round(vw / 3)      // tablet: ~3 cards visible
  if (vw <= 1440) return Math.round(vw / 4)      // desktop: ~4 cards visible
  return Math.round(vw / 5)                       // large desktop: ~5 cards visible
}

export default function DraggableProductStrip({ products, label, shopAllHref }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollStart = useRef(0)
  const didDrag = useRef(false)
  const [dragging, setDragging] = useState(false)
  const [cardWidth, setCardWidth] = useState(340)

  useEffect(() => {
    const update = () => setCardWidth(getCardWidth())
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // On card width change: jump to the start of the second set (flush left, no left peek)
  // Right peek happens naturally since cardWidth < viewport
  useEffect(() => {
    const el = trackRef.current
    if (!el || el.scrollWidth === 0) return
    const oneSetWidth = el.scrollWidth / REPEAT
    el.scrollLeft = oneSetWidth
  }, [cardWidth])

  // Teleport to equivalent position in middle sets when approaching edges
  const checkInfinite = useCallback((el: HTMLDivElement) => {
    const oneSetWidth = el.scrollWidth / REPEAT
    if (oneSetWidth <= 0) return
    const sl = el.scrollLeft
    if (sl < oneSetWidth) {
      const delta = oneSetWidth
      el.scrollLeft = sl + delta
      if (isDragging.current) scrollStart.current += delta
    } else if (sl >= oneSetWidth * (REPEAT - 1)) {
      const delta = oneSetWidth
      el.scrollLeft = sl - delta
      if (isDragging.current) scrollStart.current -= delta
    }
  }, [])

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

  // Touch handlers — added via native addEventListener with { passive: false }
  // so we can preventDefault on horizontal swipes while still allowing
  // vertical swipes to scroll the page
  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    let touchStartX = 0
    let touchStartY = 0
    let touchScrollStart = 0
    let directionLocked: 'h' | 'v' | null = null

    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
      touchScrollStart = el.scrollLeft
      directionLocked = null
      didDrag.current = false
    }

    const onTouchMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - touchStartX
      const dy = e.touches[0].clientY - touchStartY

      if (!directionLocked) {
        directionLocked = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v'
      }

      if (directionLocked === 'v') return // let page scroll happen

      e.preventDefault()
      if (Math.abs(dx) > 5) didDrag.current = true
      el.scrollLeft = touchScrollStart - dx
      checkInfinite(el)
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
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

  const items = Array.from({ length: REPEAT }, () => products).flat()

  return (
    <section className="bg-white border-b border-[#E8E8E8]">
      <div className="flex items-center justify-between px-4 md:px-24 py-5 md:py-6">
        <span className="text-[11px] font-bold tracking-[3px] text-[#1A1A18]">{label}</span>
        <Link href={shopAllHref} className="text-[12px] md:text-[13px] text-[#A8A49E] hover:text-[#1A1A18] transition-colors">
          Shop all
        </Link>
      </div>

      <div
        ref={trackRef}
        className={`flex overflow-x-auto scrollbar-hide gap-px bg-[#E8E8E8] select-none ${
          dragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ scrollBehavior: 'auto', touchAction: 'pan-y' }}
        onMouseDown={onMouseDown}
        onClickCapture={onClickCapture}
        onDragStart={(e) => e.preventDefault()}
      >
        {items.map((p, i) => (
          <div key={`${p.slug}-${i}`} className="shrink-0" style={{ width: cardWidth }}>
            <ProductCard product={p} sizes="(max-width: 640px) 80vw, (max-width: 1024px) 33vw, (max-width: 1440px) 25vw, 20vw" />
          </div>
        ))}
      </div>
    </section>
  )
}
