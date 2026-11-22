import { PageHeader } from '@/components/ui/PageHeader'

export function OrgChartPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Core HR" title="Org Chart" description="Visualize reporting hierarchy and department structure." />
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/90 p-10 text-center text-sm text-slate-500 backdrop-blur">No organization data available yet.</div>
    </div>
  )
}
