import { PageHeader } from '@/components/ui/PageHeader'

export function CalendarPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Workflows" title="Calendar" description="Unified view of leave, interviews, onboarding tasks, reviews, and holidays." />
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/90 p-10 text-center text-sm text-slate-500 backdrop-blur">No calendar events yet.</div>
    </div>
  )
}
