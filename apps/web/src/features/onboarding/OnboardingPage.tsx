import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { apiClient } from '@/lib/api'

type Item = { id: string; employee: string; title: string; status: string }

export function OnboardingPage() {
  const [items, setItems] = useState<Item[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ employee: '', title: '' })
  const load = () => apiClient.get<Item[]>('/onboarding').then(setItems).catch((e) => toast.error(e.message))
  useEffect(() => { load() }, [])
  async function create() { try { const i = await apiClient.post<Item>('/onboarding', form); setItems((p)=>[i,...p]); setOpen(false); setForm({employee:'',title:''}) } catch(e:any){ toast.error(e.message) } }
  async function toggle(i: Item) { try { const u = await apiClient.patch<Item>(`/onboarding/${i.id}`, { status: i.status === 'done' ? 'pending' : 'done' }); setItems((p)=>p.map(x=>x.id===i.id?u:x)) } catch(e:any){ toast.error(e.message) } }
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Talent" title="Onboarding / Offboarding" description="Track checklist templates, task assignments, provisioning, and completion progress." action={<Button onClick={()=>setOpen(true)}>Add item</Button>} />
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur divide-y divide-slate-100">
        {items.length === 0 ? <div className="p-10 text-center text-sm text-slate-500">No onboarding or offboarding checklists yet.</div> : items.map((i) => <div key={i.id} className="p-4 flex items-center justify-between"><div><div className="font-medium text-slate-900">{i.title}</div><div className="text-sm text-slate-500">{i.employee}</div></div><Button variant="secondary" onClick={()=>toggle(i)}>{i.status==='done'?'Reopen':'Done'}</Button></div>)}
      </div>
      <Modal open={open} title="Add onboarding item" onClose={()=>setOpen(false)}><div className="space-y-4"><Input label="Employee" value={form.employee} onChange={(e)=>setForm({...form,employee:e.target.value})} /><Input label="Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} /><div className="flex justify-end gap-3"><Button variant="secondary" onClick={()=>setOpen(false)}>Cancel</Button><Button onClick={create}>Create</Button></div></div></Modal>
    </div>
  )
}
