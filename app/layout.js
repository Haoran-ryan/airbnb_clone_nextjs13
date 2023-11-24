import { Nunito } from 'next/font/google'
import './globals.css'

import Navbar from "@/app/components/navbar/Navbar";
import RegisterModal from "@/app/components/modals/RegisterModal";
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from '@/app/components/modals/LoginModal';
import getCurrentUser from '@/app/actions/getCurrentUser';
import RentModal from './components/modals/RentModal';
const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone powered by Next.js & authored by Ryan Guo',
}

export default async function RootLayout({ children }) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal/>
        <RentModal />
        <Navbar currentUser = {currentUser} />
        <div className='pb-20 pt-28'>
        {children}
        </div>
      </body>
    </html>
  )
}
