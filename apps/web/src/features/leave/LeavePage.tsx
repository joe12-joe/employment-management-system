import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { apiClient } from '@/lib/api'

type Leave = { id: string; employee: string; type: string; startDate: string; endDate: string; status: string; reason?: string | null }

export function LeavePage() {
  const [items, setItems] = useState<Leave[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ employee: '', type: 'Annual', startDate: '', endDate: '', reason: '' })
  const load = async () => { try { setItems(await apiClient.get<Leave[]>('/leave')) } catch (e: any) { toast.error(e.message || 'Failed to load leave requests') } }
  useEffect(() => { load() }, [])
  async function create() {
    try { const r = await apiClient.post<Leave>('/leave', form); setItems((p) => [r, ...p]); setOpen(false); toast.success('Leave request created') } catch (e: any) { toast.error(e.message) }
  }
  const pending = items.filter((i) => i.status === 'pending').length
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Time & Leave" title="Leave Management" description="Manage leave policies, balances, requests, and approvals." action={<Button onClick={() => setOpen(true)}>New leave request</Button>} />
      <div className="grid gap-4 sm:grid-cols-3">
        {[['Annual balance','—'],['Used this year',`${items.filter(i=>i.status==='approved').length} requests`],['Pending requests',String(pending)]].map(([l,v]) => (
          <div key={l} className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur"><div className="text-sm text-slate-500">{l}</div><div className="mt-2 text-2xl font-bold text-slate-900">{v}</div></div>
        ))}
      </div>
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur divide-y divide-slate-100">
        {items.length === 0 ? <div className="p-10 text-center text-sm text-slate-500">No leave requests yet.</div> : items.map((r) => (
          <div key={r.id} className="flex items-center justify-between p-4 gap-4"><div><div className="font-medium text-slate-900">{r.employee} · {r.type}</div><div className="text-sm text-slate-500">{new Date(r.startDate).toLocaleDateString()} - {new Date(r.endDate).toLocaleDateString()}</div></div><span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">{r.status}</span></div>
        ))}
      </div>
      <Modal open={open} title="New leave request" onClose={() => setOpen(false)}>
        <div className="space-y-4">
          <Input label="Employee" value={form.employee} onChange={(e) => setForm({ ...form, employee: e.target.value })} />
          <Input label="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
          <Input label="Start date" type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
          <Input label="End date" type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
          <Input label="Reason" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} />
          <div className="flex justify-end gap-3"><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={create}>Submit</Button></div>
        </div>
      </Modal>
    </div>
  )
}
