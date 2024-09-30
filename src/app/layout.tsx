import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/components/NavBar';

export const metadata: Metadata = {
  title: 'Open AI APIs',
  description: 'Practicing with Open AI APIs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="" suppressHydrationWarning>
      <body className={'bg-[#f9f8fb]'}>
        <div className="mx-auto flex min-h-screen flex-col">
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  );
}
