import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { apiClient } from '@/lib/api'

type Dept = { id: string; name: string; head: string; employees: number }

export function OrgChartPage() {
  const [depts, setDepts] = useState<Dept[]>([])
  useEffect(() => { apiClient.get<Dept[]>('/departments').then(setDepts).catch(() => {}) }, [])
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Core HR" title="Org Chart" description="Visualize reporting hierarchy and department structure." />
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur">
        {depts.length === 0 ? <p className="text-sm text-slate-500">No organization data available yet.</p> : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{depts.map((d) => <div key={d.id} className="rounded-xl border border-slate-200 p-4"><div className="font-semibold text-slate-900">{d.name}</div><div className="text-sm text-slate-500">Head: {d.head || '—'}</div><div className="text-sm text-slate-500">{d.employees} employees</div></div>)}</div>
        )}
      </div>
    </div>
  )
}
