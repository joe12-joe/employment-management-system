import { PageHeader } from '@/components/ui/PageHeader'

export function AuditLogPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Administration" title="Audit Log" description="Immutable trail of sensitive actions. Filter by actor, action, resource, and severity." />
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur">
        <div className="border-b border-slate-200 p-4 text-sm text-slate-500">No audit events to display.</div>
        <div className="p-6 text-sm text-slate-500">Audit events will appear here once backend activity is recorded.</div>
      </div>
    </div>
  )
}
