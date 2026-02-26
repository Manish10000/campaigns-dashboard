import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'SeedRail - Campaign Dashboard',
  description: 'Browse, filter, and participate in campaigns. Discover opportunities that align with your interests across investing, crypto, web3, and more.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className="font-sans antialiased"
        style={{
          backgroundColor: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))'
        }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}

// Debug: Check if theme is working
if (typeof window !== 'undefined') {
  console.log('Theme debug - Document classes:', document.documentElement.className);
  console.log('Theme debug - Body styles:', getComputedStyle(document.body).backgroundColor);
}
