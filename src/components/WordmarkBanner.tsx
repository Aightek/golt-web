'use client'

import { useRef, useState, useEffect } from 'react'

// Design spec: fontSize 262, letterSpacing -24px → -24/262 = -0.092em
const LETTER_SPACING = '-0.092em'

export default function WordmarkBanner() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const [fontSize, setFontSize] = useState<number | null>(null)

  useEffect(() => {
    const fit = () => {
      const el = textRef.current
      const container = containerRef.current
      if (!el || !container) return
      // Temporarily set to reference size to measure natural text width
      el.style.fontSize = '100px'
      const textW = el.scrollWidth
      const containerW = container.offsetWidth
      if (textW > 0) setFontSize(Math.floor(100 * containerW / textW))
    }

    const ro = new ResizeObserver(fit)

    // Must wait for DM Sans 700 — measuring with fallback font gives wrong metrics
    document.fonts.load('700 100px "DM Sans"').then(() => {
      fit()
      if (containerRef.current) ro.observe(containerRef.current)
    })

    return () => ro.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="bg-white overflow-hidden pt-8 border-t border-[#E8E8E8]">
      <p
        ref={textRef}
        className="select-none whitespace-nowrap"
        style={{
          fontFamily: 'DM Sans',
          fontWeight: 700,
          fontSize: fontSize ?? 262,
          letterSpacing: LETTER_SPACING,
          lineHeight: 0.69,
          color: '#1A1A18',
          visibility: fontSize ? 'visible' : 'hidden',
        }}
      >
        GOLT DESIGN
      </p>
    </div>
  )
}
