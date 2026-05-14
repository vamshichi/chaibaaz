import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Chaibaaz - Premium Chai Catering',
  description: 'Experience luxury chai catering for unforgettable events. Handcrafted blends, premium ingredients, and exceptional service.',
  generator: 'v0.app',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: [
      {
        url: '/clogo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/clogo.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/clogo.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/clogo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background scroll-smooth">
      <body className="font-sans antialiased bg-background text-foreground">
      
          <CustomCursor />
          {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
