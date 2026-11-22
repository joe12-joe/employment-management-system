import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'

export function PayrollPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Payroll & Compensation" title="Payroll" description="Manage compensation, payroll runs, approvals, and payslips." action={<Button>New payroll run</Button>} />
      <div className="grid gap-4 sm:grid-cols-3">
        {[['Next payroll','—'],['Employees in run','0'],['Estimated gross','—']].map(([l,v]) => (
          <div key={l} className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur"><div className="text-sm text-slate-500">{l}</div><div className="mt-2 text-2xl font-bold text-slate-900">{v}</div></div>
        ))}
      </div>
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/90 p-10 text-center text-sm text-slate-500 backdrop-blur">No payroll runs yet.</div>
    </div>
  )
}
