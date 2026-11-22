import { PageHeader } from '@/components/ui/PageHeader'

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Analytics" title="Reports & Analytics" description="Headcount, turnover, leave, payroll, and compliance insights." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[['Headcount','0'],['Turnover','0%'],['Open positions','0'],['Avg tenure','—']].map(([l,v]) => (
          <div key={l} className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur"><div className="text-sm text-slate-500">{l}</div><div className="mt-2 text-3xl font-bold text-slate-900">{v}</div></div>
        ))}
      </div>
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/90 p-10 text-center text-sm text-slate-500 backdrop-blur">No report data available yet.</div>
    </div>
  )
}
