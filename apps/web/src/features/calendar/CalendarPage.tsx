import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { apiClient } from '@/lib/api'

type Event = { id: string; title: string; date: string; type: string }

export function CalendarPage() {
  const [items, setItems] = useState<Event[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title: '', date: '', type: 'event' })
  const load = () => apiClient.get<Event[]>('/calendar').then(setItems).catch((e) => toast.error(e.message))
  useEffect(() => { load() }, [])
  async function create() {
    try { const e = await apiClient.post<Event>('/calendar', form); setItems((p) => [...p, e].sort((a,b)=>a.date.localeCompare(b.date))); setOpen(false); setForm({ title:'', date:'', type:'event' }) } catch (err: any) { toast.error(err.message) }
  }
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Workflows" title="Calendar" description="Unified view of leave, interviews, onboarding tasks, reviews, and holidays." action={<Button onClick={() => setOpen(true)}>Add event</Button>} />
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur divide-y divide-slate-100">
        {items.length === 0 ? <div className="p-10 text-center text-sm text-slate-500">No calendar events yet.</div> : items.map((e) => <div key={e.id} className="p-4 flex justify-between"><div><div className="font-medium text-slate-900">{e.title}</div><div className="text-sm text-slate-500">{e.type}</div></div><div className="text-sm text-slate-600">{new Date(e.date).toLocaleDateString()}</div></div>)}
      </div>
      <Modal open={open} title="Add event" onClose={() => setOpen(false)}><div className="space-y-4"><Input label="Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} /><Input label="Date" type="date" value={form.date} onChange={(e)=>setForm({...form,date:e.target.value})} /><Input label="Type" value={form.type} onChange={(e)=>setForm({...form,type:e.target.value})} /><div className="flex justify-end gap-3"><Button variant="secondary" onClick={()=>setOpen(false)}>Cancel</Button><Button onClick={create}>Create</Button></div></div></Modal>
    </div>
  )
}
