import { Nunito } from 'next/font/google'
import './globals.css'

import Navbar from "@/app/components/navbar/Navbar";
import RegisterModal from "@/app/components/modals/RegisterModal";
import ToasterProvider from './providers/ToasterProvider';
const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone powerd by Next.js & authored by Ryan Guo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal/>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
