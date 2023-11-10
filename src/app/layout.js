import './globals.css'

import { Inter } from 'next/font/google'
import Header from './components/Header';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Movie Search App ',
  description: 'Generated by create next app',
  icons:{
    icon:['/favicon.ico?v=4'],
    apple:['/apple-touch-icon.png?v=4'],
    shortcut:['/apple-touch-icon.png']
   }

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
