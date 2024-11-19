import type { Metadata } from 'next';
import '@/assets/styles/globals.css';
import { Airbnb } from '@/lib/fontsLocal';
import { defaultContent } from '@/lib/staticContent';
import ToastProvider from '@/components/ToastProvider';

export const metadata: Metadata = defaultContent.rootContent.metaData;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${Airbnb.variable}`}>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
