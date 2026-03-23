export interface Product {
  slug: string
  name: string
  price: string
  priceNum: number
  image: string
  thumbs?: string[]
  category: string
  categorySlug: string
  badge?: string
  description: string
  materials: string
  dimensions: string
  isNew?: boolean
}

const IMG = (hash: string) => `/products/GoltDesign_${hash}_hexDCDCDC.jpeg`

export const products: Product[] = [
  {
    slug: 'luna-cizgi-bosluk',
    name: 'Luna Çizgi & Boşluk',
    price: '2.500 ₺',
    priceNum: 2500,
    image: IMG('74fef74963fd98ec29fe33d11559ad5d'),
    thumbs: [
      IMG('3930f0e8065e8263ae66891fe273a86d'),
      IMG('5eff6c692ccab42c3ff4f2fee636b432'),
      IMG('c8b115f237a0dfc8ac65caace9b8caa0'),
    ],
    category: 'Totes',
    categorySlug: 'totes',
    badge: 'LUNA COLLECTION',
    description:
      'Hand-painted geometric motif on 100% hand-woven cotton canvas. Interior zip pocket, genuine cowhide leather details. Fully handmade in Istanbul. 33 × 25 cm.',
    materials: '100% hand-woven cotton canvas. Genuine cowhide leather strap and details. Interior: cotton lining with zip pocket. All dyes are water-based and non-toxic.',
    dimensions: 'Width: 33 cm · Height: 25 cm · Depth: 6 cm · Strap drop: 28 cm',
    isNew: true,
  },
  {
    slug: 'japon-dalga',
    name: 'Japon Dalga',
    price: '2.500 ₺',
    priceNum: 2500,
    image: IMG('f426743542edd94c52a6e0a9e54e4645'),
    category: 'Crossbody',
    categorySlug: 'crossbody',
    description:
      'Inspired by the Great Wave. Hand-printed on natural canvas with bold indigo linework. Adjustable strap, interior pocket.',
    materials: '100% hand-woven cotton canvas. Cotton strap. Interior zip pocket.',
    dimensions: 'Width: 33 cm · Height: 25 cm · Depth: 6 cm · Strap drop: adjustable',
    isNew: true,
  },
  {
    slug: 'japon-tarak',
    name: 'Japon Tarak',
    price: '2.500 ₺',
    priceNum: 2500,
    image: IMG('2d2c6904d2f164d7d2fa2bda732d21c3'),
    category: 'Geometric Prints',
    categorySlug: 'geometric-prints',
    description:
      'Fine-tooth comb pattern rendered in geometric lines. A quiet, meditative print on natural canvas.',
    materials: '100% hand-woven cotton canvas. Genuine leather tab. Interior pocket.',
    dimensions: 'Width: 33 cm · Height: 25 cm · Depth: 6 cm',
  },
  {
    slug: 'japon-pembe-geometrik',
    name: 'Japon Pembe Geometrik',
    price: '2.500 ₺',
    priceNum: 2500,
    image: IMG('4401cca141344c83170d70e1fad8fc65'),
    category: 'Geometric Prints',
    categorySlug: 'geometric-prints',
    description:
      'Soft pink geometric grid. Bold yet delicate — a signature Golt contrast. Hand-printed canvas.',
    materials: '100% hand-woven cotton canvas. Interior zip pocket.',
    dimensions: 'Width: 33 cm · Height: 25 cm · Depth: 6 cm',
    isNew: true,
  },
  {
    slug: 'japon-yusufcuk',
    name: 'Japon Yusufçuk',
    price: '2.500 ₺',
    priceNum: 2500,
    image: IMG('74e8fa6b66b4436ef17c19a9aa2296e7'),
    category: 'Geometric Prints',
    categorySlug: 'geometric-prints',
    description:
      'Dragonfly motif in Japanese ink style. Each piece is individually hand-stamped on natural canvas.',
    materials: '100% hand-woven cotton canvas. Leather handle. Interior pocket.',
    dimensions: 'Width: 33 cm · Height: 25 cm · Depth: 6 cm',
  },
  {
    slug: 'japon-cicek',
    name: 'Japon Çiçek',
    price: '2.500 ₺',
    priceNum: 2500,
    image: IMG('f98af07dc6c6efc972461c4c96cf098d'),
    category: 'Geometric Prints',
    categorySlug: 'geometric-prints',
    description:
      'Cherry blossom branches in geometric abstraction. Spring carried into structured form.',
    materials: '100% hand-woven cotton canvas. Interior zip pocket.',
    dimensions: 'Width: 33 cm · Height: 25 cm · Depth: 6 cm',
  },
  {
    slug: 'luna-cizgi',
    name: 'Luna Çizgi',
    price: '2.500 ₺',
    priceNum: 2500,
    image: IMG('c6efdb1b38d0fec9d1fc1e901ba4389e'),
    category: 'Totes',
    categorySlug: 'totes',
    badge: 'LUNA COLLECTION',
    description:
      'Clean horizontal lines on white canvas — the original Luna. Minimal, architectural, timeless.',
    materials: '100% hand-woven cotton canvas. Cowhide strap. Interior pocket.',
    dimensions: 'Width: 33 cm · Height: 25 cm · Depth: 6 cm · Strap drop: 28 cm',
  },
  {
    slug: 'el-dokuma',
    name: 'El Dokuma Bez Çanta',
    price: '3.000 ₺',
    priceNum: 3000,
    image: IMG('a574d32b90a3232990230f0a03a3ee4a'),
    category: 'Solid Canvas',
    categorySlug: 'solid-canvas',
    description:
      'Our purest form — undyed hand-woven canvas. No print, no dye. Just the textile itself. 100% natural.',
    materials: '100% undyed hand-woven cotton canvas. Natural cotton strap. No chemicals.',
    dimensions: 'Width: 38 cm · Height: 30 cm · Depth: 8 cm · Strap drop: 32 cm',
  },
  {
    slug: 'kaos',
    name: 'Kaos',
    price: '2.500 ₺',
    priceNum: 2500,
    image: IMG('6bce93e1430ca1037df8e282e378bcd0'),
    category: 'Geometric Prints',
    categorySlug: 'geometric-prints',
    description:
      'Controlled chaos in geometric form. Dense layered pattern that rewards close inspection.',
    materials: '100% hand-woven cotton canvas. Interior zip pocket. Leather tab.',
    dimensions: 'Width: 33 cm · Height: 25 cm · Depth: 6 cm',
    isNew: true,
  },
]

export const collections = [
  { slug: 'totes', name: 'Totes', label: 'TOTES' },
  { slug: 'crossbody', name: 'Crossbody', label: 'CROSSBODY' },
  { slug: 'geometric-prints', name: 'Geometric Prints', label: 'GEOMETRIC PRINTS' },
  { slug: 'solid-canvas', name: 'Solid Canvas', label: 'SOLID CANVAS' },
]

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function getCollection(slug: string) {
  return products.filter((p) => p.categorySlug === slug)
}

export const newArrivals = products.filter((p) => p.isNew).slice(0, 4)
export const featuredProducts = products.slice(0, 4)
export const geometricProducts = products.filter((p) => p.categorySlug === 'geometric-prints').slice(0, 4)
