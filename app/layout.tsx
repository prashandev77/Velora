import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Avelora Travel | Private Journeys — Sri Lanka, Maldives & Beyond',
  description:
    'Avelora Travel designs privately curated journeys across Sri Lanka, the Maldives and beyond, with handpicked stays, seamless planning and personalised service.',
  icons: {
    icon: '/favicon.svg',
  },
  keywords: [
    'private Sri Lanka tours',
    'Maldives luxury travel',
    'bespoke travel',
    'tailor-made journeys',
    'honeymoon Sri Lanka Maldives',
    'wildlife and wellness travel',
    'Australian travel specialist',
  ],
  openGraph: {
    title: 'Avelora Travel | Private Journeys — Sri Lanka, Maldives & Beyond',
    description:
      'Avelora Travel designs privately curated journeys across Sri Lanka, the Maldives and beyond, with handpicked stays, seamless planning and personalised service.',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get('x-nonce') ?? '';

  return (
    <html lang="en">
      <head>
        {/* Google Analytics — replace G-XXXXXXXXXX with your Measurement ID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
          nonce={nonce}
        />
        <Script id="ga-init" strategy="afterInteractive" nonce={nonce}>
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
