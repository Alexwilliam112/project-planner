import { Poppins } from 'next/font/google'
import './globals.css'
import AppConfigProvider from '@/providers/app-config-provider'
import { Toaster } from '@/components/ui/sonner'

export const metadata = {
  title: 'Mekari | Project Planner',
  description: 'Mekari Project Planner',
}

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <AppConfigProvider>
          {children}
          <Toaster />
        </AppConfigProvider>
      </body>
    </html>
  )
}
