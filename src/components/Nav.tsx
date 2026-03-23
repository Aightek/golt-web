'use client'

import Link from 'next/link'
import { Search, ShoppingBag } from 'lucide-react'

export default function Nav() {
  return (
    <nav className="flex items-center justify-between h-16 px-24 border-b border-[#E8E8E8] bg-white sticky top-0 z-50">
      <Link href="/" className="text-[22px] font-bold tracking-[-1.5px] text-[#1A1A18]">
        GOLT
      </Link>

      <div className="flex items-center gap-10">
        <Link href="/collections/totes" className="text-sm text-[#1A1A18] hover:text-[#C4572A] transition-colors">
          Shop
        </Link>
        <Link href="/collections/totes" className="text-sm text-[#1A1A18] hover:text-[#C4572A] transition-colors">
          Collections
        </Link>
        <span className="text-sm text-[#1A1A18] cursor-default">About</span>
        <span className="text-sm text-[#A8A49E] cursor-default">Journal</span>
      </div>

      <div className="flex items-center gap-6">
        <button aria-label="Search" className="text-[#1A1A18] hover:text-[#C4572A] transition-colors">
          <Search size={18} strokeWidth={1.5} />
        </button>
        <button aria-label="Cart" className="text-[#1A1A18] hover:text-[#C4572A] transition-colors">
          <ShoppingBag size={18} strokeWidth={1.5} />
        </button>
      </div>
    </nav>
  )
}
