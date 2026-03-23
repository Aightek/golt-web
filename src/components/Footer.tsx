import Link from 'next/link'
import WordmarkBanner from './WordmarkBanner'

export default function Footer() {
  return (
    <>
      {/* Footer columns — stacked on mobile, row on desktop */}
      <footer className="flex flex-col md:flex-row md:justify-between md:items-start px-4 md:px-24 py-10 md:py-12 border-t border-[#E8E8E8] bg-white gap-8 md:gap-0">
        <div className="flex flex-col gap-4 md:gap-5 md:w-[280px]">
          <span className="text-[18px] md:text-[20px] font-bold tracking-[-1.5px] text-[#1A1A18]">GOLT</span>
          <p className="text-[13px] text-[#A8A49E] leading-[1.6] md:w-[260px]">
            Handmade canvas bags with geometric prints. Made with love in Istanbul.
          </p>
        </div>

        <div className="flex gap-16 md:gap-0 md:contents">
          <div className="flex flex-col gap-3 md:gap-4">
            <span className="text-[10px] font-semibold tracking-[2px] text-[#A8A49E]">SHOP</span>
            {['All Bags', 'New Arrivals', 'Best Sellers', 'By Print'].map((item) => (
              <Link key={item} href="/collections/totes" className="text-[13px] text-[#1A1A18] hover:text-[#C4572A] transition-colors">
                {item}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3 md:gap-4">
            <span className="text-[10px] font-semibold tracking-[2px] text-[#A8A49E]">ABOUT</span>
            {['Our Story', 'Craft Process', 'Sustainability', 'Contact'].map((item) => (
              <span key={item} className="text-[13px] text-[#1A1A18] cursor-default">{item}</span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 md:w-[240px]">
          <span className="text-[10px] font-semibold tracking-[2px] text-[#A8A49E]">NEWSLETTER</span>
          <p className="text-[13px] text-[#6B6760] leading-[1.5]">
            New print drops & behind-the-scenes.
          </p>
          <div className="flex border border-[#E8E8E8] w-full md:w-[240px]">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-3 py-2.5 text-[12px] text-[#1A1A18] placeholder:text-[#A8A49E] outline-none bg-white"
            />
            <button className="px-3 py-2.5 text-[11px] font-semibold text-[#1A1A18] hover:bg-[#1A1A18] hover:text-white transition-colors border-l border-[#E8E8E8]">
              →
            </button>
          </div>
        </div>
      </footer>

      <div className="text-center py-4 border-t border-[#E8E8E8] bg-white">
        <p className="text-[11px] text-[#A8A49E] tracking-[1px]">© 2026 GOLT. ALL RIGHTS RESERVED.</p>
      </div>

      {/* GOLT DESIGN wordmark — page signature */}
      <WordmarkBanner />
    </>
  )
}
