import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/ui/PageHeader'
import { apiClient } from '@/lib/api'

type Audit = { id: string; action: string; resourceType: string; resourceId?: string | null; occurredAt: string; actorUserId?: string | null }

export function AuditLogPage() {
  const [items, setItems] = useState<Audit[]>([])
  useEffect(() => { apiClient.get<Audit[]>('/audit').then(setItems).catch((e) => toast.error(e.message || 'Failed to load audit log')) }, [])
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Administration" title="Audit Log" description="Immutable trail of sensitive actions. Filter by actor, action, resource, and severity." />
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur">
        <table className="min-w-full text-sm"><thead className="bg-slate-50/80 text-left text-slate-500"><tr><th className="px-4 py-3 font-medium">Action</th><th className="px-4 py-3 font-medium">Resource</th><th className="px-4 py-3 font-medium">Actor</th><th className="px-4 py-3 font-medium">Time</th></tr></thead>
          <tbody className="divide-y divide-slate-100">{items.length === 0 ? <tr><td colSpan={4} className="px-4 py-10 text-center text-slate-500">No audit events to display.</td></tr> : items.map((a) => (<tr key={a.id}><td className="px-4 py-3 text-slate-900">{a.action}</td><td className="px-4 py-3 text-slate-600">{a.resourceType}{a.resourceId ? ` · ${a.resourceId}` : ''}</td><td className="px-4 py-3 text-slate-600">{a.actorUserId ?? 'System'}</td><td className="px-4 py-3 text-slate-500">{new Date(a.occurredAt).toLocaleString()}</td></tr>))}</tbody></table>
      </div>
    </div>
  )
}
