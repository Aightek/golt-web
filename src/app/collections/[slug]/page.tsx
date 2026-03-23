'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { products, collections } from '@/lib/products'

interface Props {
  params: { slug: string }
}

const PAGE_SIZE = 8

export default function CollectionPage({ params }: Props) {
  const collection = collections.find((c) => c.slug === params.slug)
  const collectionName = collection?.name ?? 'All Bags'
  const collectionLabel = collection?.label ?? 'ALL BAGS'

  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest')
  const [showSort, setShowSort] = useState(false)
  const [page, setPage] = useState(1)

  const filters = [
    { key: 'all', label: 'ALL' },
    { key: 'totes', label: 'TOTES' },
    { key: 'crossbody', label: 'CROSSBODY' },
    { key: 'geometric-prints', label: 'GEOMETRIC PRINTS' },
    { key: 'solid-canvas', label: 'SOLID CANVAS' },
  ]

  const sortLabels = {
    newest: 'NEWEST',
    'price-asc': 'PRICE: LOW',
    'price-desc': 'PRICE: HIGH',
  }

  const filtered = useMemo(() => {
    let list = activeFilter === 'all' ? products : products.filter((p) => p.categorySlug === activeFilter)
    if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.priceNum - b.priceNum)
    if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.priceNum - a.priceNum)
    return list
  }, [activeFilter, sortBy])

  const visible = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < filtered.length

  return (
    <main>
      <Nav />

      {/* Collection header */}
      <div
        className="flex items-center justify-between px-24 border-b border-[#E8E8E8] bg-white"
        style={{ height: 120 }}
      >
        <div className="flex flex-col gap-1.5">
          <h1
            className="font-bold text-[#1A1A18] leading-none"
            style={{ fontSize: 48, letterSpacing: -2 }}
          >
            {collectionLabel}
          </h1>
          <p className="text-[13px] text-[#A8A49E]">{filtered.length} products</p>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-6">
          <span className="text-[11px] font-semibold tracking-[2px] text-[#A8A49E]">FILTER</span>
          <div className="w-px h-4 bg-[#E8E8E8]" />
          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-1 text-[11px] font-semibold tracking-[2px] text-[#1A1A18] hover:text-[#C4572A] transition-colors"
            >
              SORT: {sortLabels[sortBy]}
              <span className="ml-1">{showSort ? '▲' : '▼'}</span>
            </button>
            {showSort && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-[#E8E8E8] z-10 min-w-[160px]">
                {Object.entries(sortLabels).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSortBy(key as typeof sortBy)
                      setShowSort(false)
                      setPage(1)
                    }}
                    className={`block w-full text-left px-4 py-2.5 text-[11px] tracking-[1.5px] hover:bg-[#F7F7F7] transition-colors ${
                      sortBy === key ? 'font-bold text-[#1A1A18]' : 'text-[#6B6760]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div
        className="flex items-center gap-0 px-24 bg-[#F7F7F7] border-b border-[#E8E8E8]"
        style={{ height: 48 }}
      >
        {filters.map((f, i) => (
          <button
            key={f.key}
            onClick={() => {
              setActiveFilter(f.key)
              setPage(1)
            }}
            className={`text-[11px] tracking-[2px] transition-colors mr-8 ${
              activeFilter === f.key
                ? 'font-bold text-[#1A1A18]'
                : 'font-normal text-[#A8A49E] hover:text-[#1A1A18]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="bg-[#E8E8E8]">
        <div className="grid grid-cols-4 gap-px">
          {visible.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 4} />
          ))}
        </div>

        {visible.length === 0 && (
          <div className="flex items-center justify-center bg-white py-32">
            <p className="text-[13px] text-[#A8A49E] tracking-[2px]">NO PRODUCTS FOUND</p>
          </div>
        )}
      </div>

      {/* Load More */}
      {hasMore && (
        <button
          onClick={() => setPage((p) => p + 1)}
          className="flex items-center justify-center w-full text-[11px] font-semibold tracking-[3px] text-[#1A1A18] hover:bg-[#F7F7F7] transition-colors border-t border-b border-[#E8E8E8] bg-white"
          style={{ height: 80 }}
        >
          LOAD MORE →
        </button>
      )}

      {!hasMore && visible.length > 0 && (
        <div
          className="flex items-center justify-center border-t border-b border-[#E8E8E8] bg-white"
          style={{ height: 80 }}
        >
          <p className="text-[11px] text-[#A8A49E] tracking-[2px]">ALL PRODUCTS SHOWN</p>
        </div>
      )}

      <Footer />
    </main>
  )
}
