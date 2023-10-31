import { Nunito } from 'next/font/google'
import './globals.css'

import Navbar from "@/app/components/narbar/Navbar";
const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone powerd by Next.js & authored by Ryan Guo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
