'use client';

import type { InputHTMLAttributes, DetailedHTMLProps } from 'react';

type Props = {
  label?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default function Input({ label, className = '', ...rest }: Props) {
  return (
    <label className="grid gap-2">
      {label ? <span className="text-sm font-medium text-gray-700">{label}</span> : null}
      <input
        {...rest}
        className={`w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 ${className}`}
      />
    </label>
  );
}
