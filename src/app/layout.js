import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import NavBar from '@/components/global/NavBar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: {
    default: 'Memory in Images',
  },
  description: 'Search within your images using natural language.',
  keywords: [
    'Memory',
    'Images',
    'Search',
    'Image Vector Search',
    'Image Search',
  ],

  metadataBase: new URL('https://memory-in-images.vercel.app'),

  openGraph: {
    title: 'Memory in Images',
    description: 'Search within your images using natural language.',
    url: 'https://memory-in-images.vercel.app',
    siteName: 'Memory in Images',
    images: [
      {
        url: '/banner.jpg',
        width: 960,
        height: 540,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Memory in Images',
    description: 'Search within your images using natural language.',
    images: ['/banner.jpg'],
    creator: '@PushkarYadavIn',
    site: '@PushkarYadavIn',
  },

  icons: {
    icon: [{ url: '/logo.png', sizes: '256x256', type: 'image/png' }],
    apple: [{ url: '/logo.png', sizes: '256x256', type: 'image/png' }],
    other: [
      {
        rel: 'apple-touch-icon',
        url: '/logo.png',
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen`}
      >
        <NavBar />
        {children}
        <Toaster position='top-center' richColors={true} />
      </body>
    </html>
  );
}
