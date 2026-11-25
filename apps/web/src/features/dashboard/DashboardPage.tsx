import { useEffect, useState } from 'react'
import { StatCard } from '@/components/ui/StatCard'
import { apiClient } from '@/lib/api'

type DashboardData = { employees: number; departments: number; pendingLeave: number; pendingApprovals: number; openTasks: number; recentActivity: { id: string; actor: string; action: string; entity: string; createdAt: string }[] }

export function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  useEffect(() => { apiClient.get<DashboardData>('/dashboard').then(setData).catch(() => {}) }, [])
  const stats = [
    { label: 'Total Employees', value: String(data?.employees ?? 0), detail: 'In your organization', tone: 'blue' as const },
    { label: 'Active Departments', value: String(data?.departments ?? 0), detail: 'Organization units', tone: 'green' as const },
    { label: 'Pending Approvals', value: String(data?.pendingApprovals ?? 0), detail: 'Awaiting action', tone: 'amber' as const },
    { label: 'Open Tasks', value: String(data?.openTasks ?? 0), detail: 'Tasks to complete', tone: 'slate' as const },
  ]
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-brand-200/40 bg-gradient-to-r from-slate-900 via-slate-800 to-brand-900 p-6 text-white shadow-xl shadow-slate-900/10 sm:p-8">
        <div className="relative">
          <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-brand-100 ring-1 ring-white/15">Workspace</div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Employment Management System</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">Manage your organization, employees, and HR workflows from one place.</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => <StatCard key={stat.label} {...stat} />)}</div>
      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur">
          <h2 className="text-base font-semibold text-slate-900">Recent activity</h2>
          <div className="mt-4 space-y-3">{!data?.recentActivity?.length ? <p className="text-sm text-slate-500">No recent activity to display.</p> : data.recentActivity.map((a) => <div key={a.id} className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700"><span className="font-medium">{a.actor}</span> {a.action} <span className="font-medium">{a.entity}</span></div>)}</div>
        </section>
        <section className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur">
          <h2 className="text-base font-semibold text-slate-900">Quick summary</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li className="rounded-lg bg-slate-50 px-3 py-2">Pending leave requests: {data?.pendingLeave ?? 0}</li>
            <li className="rounded-lg bg-slate-50 px-3 py-2">Pending approvals: {data?.pendingApprovals ?? 0}</li>
            <li className="rounded-lg bg-slate-50 px-3 py-2">Open tasks: {data?.openTasks ?? 0}</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
