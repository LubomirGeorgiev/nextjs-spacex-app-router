import '@/styles/globals.css';

import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';

import { TRPCReactProvider } from '@/trpc/react';
import { Providers } from './providers';

import './dayjs'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'SpaceX',
  description: 'List of SpaceX Launches',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          {children}
          </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
