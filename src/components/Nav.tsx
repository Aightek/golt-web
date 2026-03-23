'use client'

import Link from 'next/link'
import { Search, ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { label: 'Shop', href: '/collections/totes' },
  { label: 'Collections', href: '/collections/totes' },
  { label: 'About', href: '#' },
  { label: 'Journal', href: '#' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="flex items-center justify-between h-14 md:h-16 px-4 md:px-24 border-b border-[#E8E8E8] bg-white sticky top-0 z-50">

        {/* Mobile: MENU text button (left) */}
        <button
          className="md:hidden text-[11px] font-bold tracking-[2px] text-[#1A1A18] w-16"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          MENU
        </button>

        {/* Logo — centered on mobile, static on desktop */}
        <Link
          href="/"
          className="text-[20px] md:text-[22px] font-bold tracking-[-1.5px] text-[#1A1A18]
                     absolute left-1/2 -translate-x-1/2
                     md:static md:left-auto md:translate-x-0"
        >
          GOLT
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(({ label, href }) => (
            <Link key={label} href={href} className="text-sm text-[#1A1A18] hover:text-[#C4572A] transition-colors">
              {label}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 md:gap-6 w-16 md:w-auto justify-end">
          <button className="hidden md:block text-[#1A1A18] hover:text-[#C4572A] transition-colors" aria-label="Search">
            <Search size={18} strokeWidth={1.5} />
          </button>
          <button className="text-[#1A1A18] hover:text-[#C4572A] transition-colors" aria-label="Cart">
            <ShoppingBag size={18} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay — full screen drawer */}
      <div
        className={`fixed inset-0 bg-white z-[100] flex flex-col md:hidden transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-[#E8E8E8]">
          <Link href="/" className="text-[20px] font-bold tracking-[-1.5px] text-[#1A1A18]" onClick={() => setOpen(false)}>
            GOLT
          </Link>
          <button onClick={() => setOpen(false)} aria-label="Close menu">
            <X size={20} strokeWidth={1.5} className="text-[#1A1A18]" />
          </button>
        </div>

        {/* Drawer links */}
        <div className="flex flex-col px-6 pt-8 gap-0">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[28px] font-bold tracking-[-1px] text-[#1A1A18] py-4 border-b border-[#F0F0F0] hover:text-[#C4572A] transition-colors"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Drawer footer */}
        <div className="px-6 mt-auto pb-10 pt-6 flex items-center gap-3">
          <Search size={16} strokeWidth={1.5} className="text-[#6B6760]" />
          <span className="text-[13px] text-[#6B6760]">Search</span>
        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-[99] md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  )
}
