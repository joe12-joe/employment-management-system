import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { apiClient } from '@/lib/api'

type Review = { id: string; employee: string; period: string; status: string }

export function PerformancePage() {
  const [items, setItems] = useState<Review[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ employee: '', period: '' })
  const load = () => apiClient.get<Review[]>('/performance').then(setItems).catch((e) => toast.error(e.message))
  useEffect(() => { load() }, [])
  async function create() { try { const r = await apiClient.post<Review>('/performance', form); setItems((p)=>[r,...p]); setOpen(false); setForm({employee:'',period:''}) } catch(e:any){ toast.error(e.message) } }
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Talent" title="Performance" description="Goals, review cycles, feedback, and calibration." action={<Button onClick={()=>setOpen(true)}>New review</Button>} />
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur divide-y divide-slate-100">
        {items.length === 0 ? <div className="p-10 text-center text-sm text-slate-500">No review cycles yet.</div> : items.map((r) => <div key={r.id} className="p-4 flex justify-between"><div><div className="font-medium text-slate-900">{r.employee}</div><div className="text-sm text-slate-500">{r.period}</div></div><span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">{r.status}</span></div>)}
      </div>
      <Modal open={open} title="New review" onClose={()=>setOpen(false)}><div className="space-y-4"><Input label="Employee" value={form.employee} onChange={(e)=>setForm({...form,employee:e.target.value})} /><Input label="Period" value={form.period} onChange={(e)=>setForm({...form,period:e.target.value})} /><div className="flex justify-end gap-3"><Button variant="secondary" onClick={()=>setOpen(false)}>Cancel</Button><Button onClick={create}>Create</Button></div></div></Modal>
    </div>
  )
}
