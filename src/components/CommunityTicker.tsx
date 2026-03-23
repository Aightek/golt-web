'use client'

import Image from 'next/image'

const items = [
  {
    type: 'image' as const,
    src: '/products/GoltDesign_74fef74963fd98ec29fe33d11559ad5d_hexDCDCDC.jpeg',
    alt: 'Community photo 1',
  },
  {
    type: 'quote' as const,
    handle: '@berguzar_k',
    text: '"This bag goes with everything. The print is even better in person."',
  },
  {
    type: 'image' as const,
    src: '/products/GoltDesign_f426743542edd94c52a6e0a9e54e4645_hexDCDCDC.jpeg',
    alt: 'Community photo 2',
  },
  {
    type: 'quote' as const,
    handle: '@zeynep.style',
    text: '"Bought the crossbody in the geometric print — quality is incredible."',
  },
  {
    type: 'image' as const,
    src: '/products/GoltDesign_4401cca141344c83170d70e1fad8fc65_hexDCDCDC.jpeg',
    alt: 'Community photo 3',
  },
  {
    type: 'quote' as const,
    handle: '@merve.bags',
    text: '"Handmade and it really shows. My third Golt bag now."',
  },
  {
    type: 'image' as const,
    src: '/products/GoltDesign_c6efdb1b38d0fec9d1fc1e901ba4389e_hexDCDCDC.jpeg',
    alt: 'Community photo 4',
  },
  {
    type: 'quote' as const,
    handle: '@irem.carries',
    text: '"The canvas quality is unlike anything I\'ve found at this price."',
  },
]

// Duplicate for seamless loop
const track = [...items, ...items]

export default function CommunityTicker() {
  return (
    <div
      className="border-t border-b border-[#E8E8E8] bg-white overflow-hidden"
      style={{ height: 240 }}
    >
      {/* Label */}
      <div className="flex h-full">
        <div
          className="flex flex-col justify-center gap-1.5 px-8 border-r border-[#E8E8E8] shrink-0 bg-white z-10"
          style={{ width: 160 }}
        >
          <span className="text-[10px] font-bold tracking-[3px] text-[#A8A49E]">FROM THE</span>
          <span className="text-[10px] font-bold tracking-[3px] text-[#A8A49E]">COMMUNITY</span>
        </div>

        {/* Scrolling ticker */}
        <div className="flex-1 overflow-hidden relative">
          <div className="flex h-full community-ticker">
            {track.map((item, i) =>
              item.type === 'image' ? (
                <div
                  key={i}
                  className="relative shrink-0 border-r border-[#E8E8E8]"
                  style={{ width: 200 }}
                >
                  <Image src={item.src} alt={item.alt} fill className="object-cover" />
                </div>
              ) : (
                <div
                  key={i}
                  className="flex flex-col justify-center gap-2 px-10 py-8 shrink-0 border-r border-[#E8E8E8]"
                  style={{ width: 340 }}
                >
                  <p className="text-[11px] text-[#A8A49E] tracking-[0.5px]">{item.handle}</p>
                  <p className="text-[15px] font-semibold text-[#1A1A18] leading-[1.5]">
                    {item.text}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
