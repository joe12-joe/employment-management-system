import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'

export function RecruitingPage() {
  const stages = ['Applied','Screening','Interview','Offer','Hired']
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Talent" title="Recruiting / ATS" description="Track job requisitions, candidates, pipeline stages, interviews, and offers." action={<Button>Create requisition</Button>} />
      <div className="grid gap-4 sm:grid-cols-5">
        {stages.map((s) => (
          <div key={s} className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm backdrop-blur">
            <div className="text-sm font-medium text-slate-500">{s}</div>
            <div className="mt-2 text-2xl font-bold text-slate-900">0</div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/90 p-10 text-center text-sm text-slate-500 backdrop-blur">No open requisitions yet.</div>
    </div>
  )
}
