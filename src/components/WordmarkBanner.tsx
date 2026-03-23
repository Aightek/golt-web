'use client'

import { useRef, useState, useEffect } from 'react'

export default function WordmarkBanner() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const [fontSize, setFontSize] = useState<number | null>(null)

  useEffect(() => {
    const fit = () => {
      const el = textRef.current
      const container = containerRef.current
      if (!el || !container) return
      el.style.fontSize = '100px'
      const textW = el.scrollWidth
      const containerW = container.offsetWidth
      if (textW > 0) setFontSize(Math.floor(100 * containerW / textW))
    }

    const ro = new ResizeObserver(fit)

    // Wait for DM Sans 700 to be available before first measurement.
    // Without this the browser measures with the fallback font (wrong metrics → wrong size).
    document.fonts.load('700 100px "DM Sans"').then(() => {
      fit()
      if (containerRef.current) ro.observe(containerRef.current)
    })

    return () => ro.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="border-t border-[#E8E8E8] bg-white overflow-hidden pt-8">
      <p
        ref={textRef}
        className="text-[#1A1A18] font-bold select-none whitespace-nowrap leading-[0.85]"
        style={{
          fontSize: fontSize ?? 200,
          letterSpacing: '-0.05em',
          // Hide until we have a valid measurement so there's no wrong-size flash
          visibility: fontSize ? 'visible' : 'hidden',
        }}
      >
        GOLT DESIGN
      </p>
    </div>
  )
}
