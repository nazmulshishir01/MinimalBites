import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'MinimalBites - Fresh Food, Minimal Fuss',
  description: 'A modern food delivery application with fresh ingredients and fast delivery',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster 
          position="top-right" 
          richColors 
          closeButton
          toastOptions={{
            duration: 3000,
          }}
        />
      </body>
    </html>
  )
}
