import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { apiClient } from '@/lib/api'

type Summary = { employees: number; departments: number; pendingLeave: number; pendingApprovals: number; openTasks: number }

export function ReportsPage() {
  const [data, setData] = useState<Summary | null>(null)
  useEffect(() => { apiClient.get<Summary>('/reports/summary').then(setData).catch(() => {}) }, [])
  const stats = [['Headcount', String(data?.employees ?? 0)], ['Departments', String(data?.departments ?? 0)], ['Pending leave', String(data?.pendingLeave ?? 0)], ['Open tasks', String(data?.openTasks ?? 0)]] as const
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Analytics" title="Reports & Analytics" description="Headcount, turnover, leave, payroll, and compliance insights." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([l,v]) => (
          <div key={l} className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur"><div className="text-sm text-slate-500">{l}</div><div className="mt-2 text-3xl font-bold text-slate-900">{v}</div></div>
        ))}
      </div>
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur text-sm text-slate-600">Live data is connected to backend summary endpoints. Expand with dedicated report queries as needed.</div>
    </div>
  )
}
