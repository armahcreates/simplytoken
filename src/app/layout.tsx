import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../index.css'
import { ClerkProvider } from '@clerk/nextjs'
import { JourneyProvider } from '@/contexts/JourneyContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SimplyToken™ - Tokenization Platform',
  description: 'SimplyToken™ - A comprehensive SaaS platform that simplifies the entire tokenization lifecycle for alternative assets',
  authors: [{ name: 'SimplyToken™' }],
  keywords: ['tokenization', 'blockchain', 'real estate', 'assets', 'investment'],
  openGraph: {
    title: 'SimplyToken™ - Tokenization Platform',
    description: 'SimplyToken™ - A comprehensive SaaS platform that simplifies the entire tokenization lifecycle for alternative assets',
    url: 'https://alpha.dualite.dev',
    siteName: 'SimplyToken™',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SimplyToken™ - Tokenization Platform',
    description: 'SimplyToken™ - A comprehensive SaaS platform that simplifies the entire tokenization lifecycle for alternative assets',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <JourneyProvider>
            {children}
          </JourneyProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}