import type { Metadata } from 'next';
import '@/assets/styles/globals.css';
import { Airbnb } from '@/lib/fontsLocal';
import staticContent from '@/locales/en.json';

export const metadata: Metadata = staticContent.root.metaData;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${Airbnb.variable}`}>{children}</body>
    </html>
  );
}
