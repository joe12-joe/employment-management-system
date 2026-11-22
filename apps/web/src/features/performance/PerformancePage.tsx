import { PageHeader } from '@/components/ui/PageHeader'

export function PerformancePage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Talent" title="Performance" description="Goals, review cycles, feedback, and calibration." action={<button className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-brand-700">New goal</button>} />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/90 p-10 text-center text-sm text-slate-500 backdrop-blur">No active goals yet.</div>
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/90 p-10 text-center text-sm text-slate-500 backdrop-blur">No review cycles yet.</div>
      </div>
    </div>
  )
}
