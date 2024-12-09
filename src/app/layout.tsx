import type { Metadata } from 'next';
import '@/assets/styles/globals.css';
import { Airbnb } from '@/lib/fontsLocal';
import { defaultContent } from '@/lib/staticContent';
import ToastProvider from '@/components/ToastProvider';
import AuthProvider from '@/components/AuthProvider';

export const metadata: Metadata = defaultContent.rootContent.metaData;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${Airbnb.variable}`}>
        <AuthProvider>{children}</AuthProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
