import { StatCard } from '@/components/ui/StatCard'

const stats = [
  { label: 'Total Employees', value: '0', detail: 'No data yet', tone: 'blue' as const },
  { label: 'Active Departments', value: '0', detail: 'No data yet', tone: 'green' as const },
  { label: 'Pending Approvals', value: '0', detail: 'No data yet', tone: 'amber' as const },
  { label: 'Audit Events (24h)', value: '0', detail: 'No data yet', tone: 'slate' as const },
]

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-brand-200/40 bg-gradient-to-r from-slate-900 via-slate-800 to-brand-900 p-6 text-white shadow-xl shadow-slate-900/10 sm:p-8">
        <div className="relative">
          <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-brand-100 ring-1 ring-white/15">Workspace</div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Employment Management System</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">Set up your organization, add employees, and start managing HR workflows.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur">
          <h2 className="text-base font-semibold text-slate-900">Recent activity</h2>
          <p className="mt-4 text-sm text-slate-500">No recent activity to display.</p>
        </section>
        <section className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur">
          <h2 className="text-base font-semibold text-slate-900">Getting started</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li className="rounded-lg bg-slate-50 px-3 py-2">Connect your backend API and authentication.</li>
            <li className="rounded-lg bg-slate-50 px-3 py-2">Create departments and organization structure.</li>
            <li className="rounded-lg bg-slate-50 px-3 py-2">Add employees and assign roles.</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
