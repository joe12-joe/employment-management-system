import type { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string
  detail: string
  tone?: 'blue' | 'green' | 'amber' | 'slate'
  icon?: ReactNode
}

const tones = {
  blue: { bg: 'from-brand-500/12 to-transparent', icon: 'bg-brand-50 text-brand-600 ring-brand-100' },
  green: { bg: 'from-emerald-500/12 to-transparent', icon: 'bg-emerald-50 text-emerald-600 ring-emerald-100' },
  amber: { bg: 'from-amber-500/12 to-transparent', icon: 'bg-amber-50 text-amber-600 ring-amber-100' },
  slate: { bg: 'from-slate-500/10 to-transparent', icon: 'bg-slate-100 text-slate-600 ring-slate-200' },
}

export function StatCard({ label, value, detail, tone = 'blue', icon }: StatCardProps) {
  const t = tones[tone]
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/80 p-5 shadow-sm shadow-slate-200/50 backdrop-blur transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60">
      <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${t.bg}`} />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
          <p className="mt-2 text-sm text-slate-600">{detail}</p>
        </div>
        {icon && <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset ${t.icon}`}>{icon}</div>}
      </div>
    </div>
  )
}
