import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Velora Journeys | Luxury Travel to Sri Lanka & Maldives',
  description:
    'Handcrafted luxury journeys across Sri Lanka and the Maldives. Bespoke itineraries for honeymoons, wellness retreats, and cultural adventures.',
  keywords: ['luxury travel', 'Sri Lanka', 'Maldives', 'honeymoon', 'wellness retreat', 'adventure tour', 'bespoke travel'],
  openGraph: {
    title: 'Velora Journeys | Luxury Travel',
    description: 'Handcrafted luxury journeys across Sri Lanka and the Maldives.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
