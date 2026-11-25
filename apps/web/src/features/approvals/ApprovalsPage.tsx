import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { apiClient } from '@/lib/api'

type Approval = { id: string; type: string; requester: string; status: string; createdAt: string }

export function ApprovalsPage() {
  const [items, setItems] = useState<Approval[]>([])
  const load = async () => { try { setItems(await apiClient.get<Approval[]>('/approvals')) } catch (e: any) { toast.error(e.message || 'Failed to load approvals') } }
  useEffect(() => { load() }, [])
  async function act(id: string, status: string) {
    try { const u = await apiClient.patch<Approval>(`/approvals/${id}`, { status }); setItems((p) => p.map((x) => x.id === id ? u : x)); toast.success(`Request ${status}`) } catch (e: any) { toast.error(e.message) }
  }
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Workflows" title="Approvals Inbox" description="Review and action pending approvals across leave, status changes, payroll, and offers." />
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur divide-y divide-slate-100">
        {items.length === 0 ? <div className="p-10 text-center text-sm text-slate-500">No pending approvals.</div> : items.map((a) => (
          <div key={a.id} className="flex items-center justify-between p-4 gap-4"><div><div className="font-medium text-slate-900">{a.type}</div><div className="text-sm text-slate-500">{a.requester} · {new Date(a.createdAt).toLocaleDateString()}</div></div><div className="flex items-center gap-2"><span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">{a.status}</span>{a.status==='pending' && <><Button variant="secondary" onClick={() => act(a.id,'approved')}>Approve</Button><Button variant="danger" onClick={() => act(a.id,'rejected')}>Reject</Button></>}</div></div>
        ))}
      </div>
    </div>
  )
}
