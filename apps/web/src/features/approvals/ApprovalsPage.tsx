import { PageHeader } from '@/components/ui/PageHeader'

export function ApprovalsPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Workflows" title="Approvals Inbox" description="Review and action pending approvals across leave, status changes, payroll, and offers." />
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/90 p-10 text-center text-sm text-slate-500 backdrop-blur">No pending approvals.</div>
    </div>
  )
}
