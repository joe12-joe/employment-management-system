import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'danger'; children: ReactNode }

const styles = {
  primary: 'bg-brand-600 text-white shadow-sm shadow-brand-600/20 hover:bg-brand-700',
  secondary: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
  ghost: 'text-slate-700 hover:bg-slate-100',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

export function Button({ variant = 'primary', className = '', children, ...props }: Props) {
  return <button className={`inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition focus:ring-4 focus:ring-brand-500/15 disabled:opacity-60 ${styles[variant]} ${className}`} {...props}>{children}</button>
}
