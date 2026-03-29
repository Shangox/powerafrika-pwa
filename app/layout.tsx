import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PowerAfrika',
  description: 'The Pan-African Sovereignty Prosecution Movement',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#CE1126" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body style={{ backgroundColor: '#080808', color: 'white', margin: 0, padding: 0, fontFamily: 'Georgia, serif', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  );
}
