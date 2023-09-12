import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import 'material-symbols'
import App from './App'

const roboto = Roboto({ subsets: ['latin'], weight: ['700'] })

export const metadata: Metadata = {
  title: 'skrach',
}

export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`w-screen h-screen`}>
      <body className={`w-full h-full bg-black text-white`}>
        <App>
        {children}
        </App>
      </body>
    </html>
  )
}
