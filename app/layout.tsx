import type { Metadata } from 'next';
import {
  Geist,
  Geist_Mono,
  Montserrat,
  Poppins,
  Urbanist,
} from 'next/font/google';
import './globals.css';
import Header from '@/components/custom/Header';
import Footer from '@/components/custom/Footer';
import Script from 'next/script';
import SmartsuppChat from '@/components/custom/Smartsupp';
import GoogleTranslate from '@/components/custom/Translate';
import NextTopLoader from 'nextjs-toploader';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-urbanist',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins', // optional: for CSS variable
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: '24 Top Global Xpress',
  description:
    '24 Top Global Xpress is a worldwide global delivery logistics company Our focus is on simplifying complex supply chains, uncovering efficiency improvements that enable our customers to cut their inventories, reducing operating costs, and making significant short-term savings for long-term competitiveness. We work to connect and simplify our customers’ supply chains. As the global leader in shipping services, the company operates in more than 15 countries and employs roughly 15,000 people.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${montserrat.variable} ${urbanist.variable} antialiased`}
      >
        <NextTopLoader />
        <Header />
        {children}
        <Footer />
        <SmartsuppChat />
        <GoogleTranslate />
      </body>
    </html>
  );
}
