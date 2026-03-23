import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GOLT — Handmade Canvas Bags',
  description: 'Handmade canvas bags with geometric prints. Made with love in Istanbul.',
  openGraph: {
    title: 'GOLT — Handmade Canvas Bags',
    description: 'Handmade canvas bags with geometric prints. Made with love in Istanbul.',
    siteName: 'GOLT',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
