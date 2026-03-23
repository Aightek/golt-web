'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export interface CategoryItem {
  label: string
  sub: string
  href: string
  image: string
}

interface Props {
  items: CategoryItem[]
}

export default function DraggableCategoryStrip({ items }: Props) {
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
  }, [])

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

      if (directionLocked === 'v') return

      e.preventDefault()
      if (Math.abs(dx) > 5) didDrag.current = true
      el.scrollLeft = touchScrollStart - dx
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
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
    <div
      ref={trackRef}
      className={`flex overflow-x-auto scrollbar-hide gap-px bg-[#E8E8E8] border-b border-[#E8E8E8] md:grid md:grid-cols-3 select-none ${
        dragging ? 'cursor-grabbing' : 'cursor-grab md:cursor-auto'
      }`}
      style={{ scrollSnapType: 'x mandatory', touchAction: 'pan-y' }}
      onMouseDown={onMouseDown}
      onClickCapture={onClickCapture}
      onDragStart={(e) => e.preventDefault()}
    >
      {items.map((col) => (
        <Link
          key={col.label}
          href={col.href}
          className="group bg-white block shrink-0 w-[72vw] md:w-auto"
          style={{ scrollSnapAlign: 'start' }}
        >
          <div className="relative overflow-hidden aspect-[4/5]">
            <Image src={col.image} alt={col.label} fill className="object-cover" draggable={false} sizes="(max-width: 640px) 72vw, 33vw" />
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
  )
}
