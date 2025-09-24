'use client';

import React from 'react';

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  loading?: boolean;
  variant?: 'default' | 'ghost';
};

export default function Button({
  className = '',
  children,
  loading = false,
  variant = 'default',
  ...rest
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-black/10 disabled:opacity-60 disabled:cursor-not-allowed transition';
  const style =
    variant === 'ghost'
      ? 'border border-transparent hover:bg-gray-50'
      : 'border border-gray-200 shadow-sm hover:shadow-md bg-white';

  return (
    <button
      {...rest}
      aria-busy={loading || undefined}
      className={`${base} ${style} ${className}`}
    >
      {children}
    </button>
  );
}
