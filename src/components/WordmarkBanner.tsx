export default function WordmarkBanner() {
  return (
    <div className="bg-white overflow-hidden pt-8 border-t border-[#E8E8E8]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/wordmark.svg"
        alt="GOLT DESIGN"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        draggable={false}
      />
    </div>
  )
}
