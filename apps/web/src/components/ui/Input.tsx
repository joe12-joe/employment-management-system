import type { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }

export function Input({ label, error, className = '', ...props }: Props) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>}
      <input className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:ring-4 focus:ring-brand-500/10 ${error ? 'border-red-300 focus:border-red-500' : 'border-slate-300 focus:border-brand-500'} ${className}`} {...props} />
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  )
}
