'use client';

import type { TextareaHTMLAttributes, DetailedHTMLProps } from 'react';

type Props = {
  label?: string;
} & DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export default function TextArea({ label, className = '', ...rest }: Props) {
  return (
    <label className="grid gap-2">
      {label ? <span className="text-sm font-medium text-gray-700">{label}</span> : null}
      <textarea
        {...rest}
        className={`w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 ${className}`}
      />
    </label>
  );
}
