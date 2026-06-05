import type { Metadata } from 'next'
import './globals.css'
import WhatsAppWidget from '@/components/WhatsAppWidget'

export const metadata: Metadata = {
  title: 'Himaz Properties | Premium Real Estate in Adamawa, Nigeria',
  description: 'Discover verified land and properties for sale in Yola, Jimeta, and across Adamawa State. Himaz Properties offers Sunshine City, Palm City, Arewa Estate, The Meridian Estate, and Himaz Trade Center.',
  keywords: ['land for sale Yola', 'Jimeta real estate', 'Adamawa property', 'plots for sale Adamawa', 'Himaz Properties', 'Fintiri Estate', 'Sunshine City Yola'],
  openGraph: {
    title: 'Himaz Properties | Premium Real Estate in Adamawa',
    description: 'Verified properties and land for sale in Adamawa State, Nigeria.',
    url: 'https://himazproperties.com',
    siteName: 'Himaz Properties',
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Himaz Properties',
    description: 'Premium Real Estate in Adamawa, Nigeria',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  )
}
