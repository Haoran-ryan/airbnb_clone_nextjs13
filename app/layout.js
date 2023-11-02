import { Nunito } from 'next/font/google'
import './globals.css'

import Navbar from "@/app/components/navbar/Navbar";
import Modal from "@/app/components/modals/Modal";
const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone powerd by Next.js & authored by Ryan Guo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Modal
            isOpen={true}
            title="Modal Title"
            body="Modal Body"
            actionLabel='Save'

        />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
