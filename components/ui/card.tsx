'use client';

export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-gray-200 bg-white p-5 shadow-sm ${className}`}>{children}</div>;
}
