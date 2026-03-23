'use client'

import { useRef, useState, useLayoutEffect } from 'react'

export default function WordmarkBanner() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const [fontSize, setFontSize] = useState(200)

  useLayoutEffect(() => {
    const fit = () => {
      const el = textRef.current
      const container = containerRef.current
      if (!el || !container) return
      // Measure at a reference size, then scale to fill container width
      el.style.fontSize = '100px'
      const textW = el.scrollWidth
      const containerW = container.offsetWidth
      if (textW > 0) setFontSize(Math.floor(100 * containerW / textW))
    }

    fit()
    const ro = new ResizeObserver(fit)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="border-t border-[#E8E8E8] bg-white overflow-hidden pt-8">
      <p
        ref={textRef}
        className="text-[#1A1A18] font-bold select-none whitespace-nowrap leading-[0.85]"
        style={{ fontSize, letterSpacing: '-0.05em', fontFamily: 'DM Sans' }}
      >
        GOLT DESIGN
      </p>
    </div>
  )
}
