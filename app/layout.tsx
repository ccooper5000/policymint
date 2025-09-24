import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PolicyMint.io - Generate Terms of Service & Privacy Policy',
  description: 'Professional document generator for developers. Create Terms of Service and Privacy Policy documents tailored to your app and compliance requirements.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-gray-50 to-white">{children}</body>
    </html>
  );
}
