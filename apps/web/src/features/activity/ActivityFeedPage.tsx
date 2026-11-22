import { PageHeader } from '@/components/ui/PageHeader'

export function ActivityFeedPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Overview" title="Activity Feed" description="Recent changes across modules with actor, action, target, and time." />
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/90 p-10 text-center text-sm text-slate-500 backdrop-blur">No activity yet.</div>
    </div>
  )
}
