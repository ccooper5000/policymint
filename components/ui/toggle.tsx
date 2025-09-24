'use client';

import React from 'react';

export type ToggleProps = {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  className?: string;
  disabled?: boolean;
};

export default function Toggle({
  label,
  hint,
  checked,
  onChange,
  className = '',
  disabled = false,
}: ToggleProps) {
  return (
    <div className={`flex items-start justify-between gap-4 ${className}`}>
      <div className="min-w-0">
        <div className="text-sm font-medium text-gray-900">{label}</div>
        {hint ? <div className="text-xs text-gray-500">{hint}</div> : null}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition
          ${checked ? 'bg-black' : 'bg-gray-300'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
        `}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition
            ${checked ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
    </div>
  );
}
