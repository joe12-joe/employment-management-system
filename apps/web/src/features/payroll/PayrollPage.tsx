import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { apiClient } from '@/lib/api'

type Run = { id: string; period: string; status: string; total: string }

export function PayrollPage() {
  const [items, setItems] = useState<Run[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ period: '', total: '' })
  const load = () => apiClient.get<Run[]>('/payroll').then(setItems).catch((e) => toast.error(e.message))
  useEffect(() => { load() }, [])
  async function create() { try { const r = await apiClient.post<Run>('/payroll', form); setItems((p)=>[r,...p]); setOpen(false); setForm({period:'',total:''}) } catch(e:any){ toast.error(e.message) } }
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Payroll & Compensation" title="Payroll" description="Manage compensation, payroll runs, approvals, and payslips." action={<Button onClick={()=>setOpen(true)}>New payroll run</Button>} />
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur divide-y divide-slate-100">
        {items.length === 0 ? <div className="p-10 text-center text-sm text-slate-500">No payroll runs yet.</div> : items.map((r) => <div key={r.id} className="p-4 flex justify-between"><div><div className="font-medium text-slate-900">{r.period}</div><div className="text-sm text-slate-500">Total: {r.total}</div></div><span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">{r.status}</span></div>)}
      </div>
      <Modal open={open} title="New payroll run" onClose={()=>setOpen(false)}><div className="space-y-4"><Input label="Period" value={form.period} onChange={(e)=>setForm({...form,period:e.target.value})} placeholder="e.g. 2026-11" /><Input label="Total" value={form.total} onChange={(e)=>setForm({...form,total:e.target.value})} /><div className="flex justify-end gap-3"><Button variant="secondary" onClick={()=>setOpen(false)}>Cancel</Button><Button onClick={create}>Create</Button></div></div></Modal>
    </div>
  )
}
