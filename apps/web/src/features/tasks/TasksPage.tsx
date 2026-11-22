import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'

export function TasksPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Workflows" title="Tasks & Reminders" description="Track onboarding tasks, renewals, probation reviews, and reminders." action={<Button onClick={() => toast.info('Task creation coming next')}>New task</Button>} />
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/90 p-10 text-center text-sm text-slate-500 backdrop-blur">No tasks or reminders yet.</div>
    </div>
  )
}
