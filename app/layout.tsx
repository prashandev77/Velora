import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import './globals.css';
import Script from 'next/script';
import {
    isMaintenanceBypassPath,
    isMaintenanceModeServer,
} from '@/lib/maintenance-server';

export const metadata: Metadata = {
  title: 'Avelora Travel | Private Journeys — Sri Lanka, Maldives & Beyond',
  description:
    'Avelora Travel designs private journeys across Sri Lanka, the Maldives and beyond. Handcrafted itineraries — honeymoons, wellness, wildlife and celebration travel. Designed Around You.',
  icons: {
    icon: '/favicon.svg',
  },
  keywords: [
    'Avelora Travel',
    'luxury travel',
    'Sri Lanka',
    'Maldives',
    'multi-country',
    'honeymoon',
    'wellness retreat',
    'private journey',
    'bespoke travel',
  ],
  openGraph: {
    title: 'Avelora Travel | Private Journeys',
    description:
      'Private journeys across Sri Lanka, the Maldives and beyond. Designed Around You.',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = (await headers()).get('x-pathname') ?? '';
  // Only redirect when middleware forwarded the path (avoids loops if the header is missing).
  if (
    pathname &&
    isMaintenanceModeServer() &&
    !isMaintenanceBypassPath(pathname)
  ) {
    redirect('/maintenance');
  }

  return (
    <html lang="en">
      <head>
        {/* Google Analytics — Replace G-XXXXXXXXXX with your Measurement ID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
