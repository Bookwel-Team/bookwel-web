import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bookwel',
  description: "Book suggestion using user's interests and AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className='white bg-neutral' lang='en'>
      <body className='relative w-screen h-screen'>{children}</body>
    </html>
  );
}
