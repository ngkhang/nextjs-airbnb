import type { Metadata } from 'next';
import '@/assets/styles/globals.css';
import { Airbnb } from '@/lib/fontsLocal';
import { defaultContent } from '@/lib/staticContent';

export const metadata: Metadata = defaultContent.rootContent.metaData;

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
