import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { apiClient } from '@/lib/api'

type Job = { id: string; title: string; department?: string | null; status: string }

export function RecruitingPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title: '', department: '' })
  const load = () => apiClient.get<Job[]>('/recruiting').then(setJobs).catch((e) => toast.error(e.message))
  useEffect(() => { load() }, [])
  async function create() { try { const j = await apiClient.post<Job>('/recruiting', form); setJobs((p)=>[j,...p]); setOpen(false); setForm({title:'',department:''}) } catch(e:any){ toast.error(e.message) } }
  const stages = ['Open','Closed']
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Talent" title="Recruiting / ATS" description="Track job requisitions, candidates, pipeline stages, interviews, and offers." action={<Button onClick={()=>setOpen(true)}>Create requisition</Button>} />
      <div className="grid gap-4 sm:grid-cols-2">
        {stages.map((s) => <div key={s} className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm backdrop-blur"><div className="text-sm font-medium text-slate-500">{s}</div><div className="mt-2 text-2xl font-bold text-slate-900">{jobs.filter(j => s==='Open'?j.status==='open':j.status!=='open').length}</div></div>)}
      </div>
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur divide-y divide-slate-100">
        {jobs.length === 0 ? <div className="p-10 text-center text-sm text-slate-500">No open requisitions yet.</div> : jobs.map((j) => <div key={j.id} className="p-4 flex justify-between"><div><div className="font-medium text-slate-900">{j.title}</div><div className="text-sm text-slate-500">{j.department || '—'}</div></div><span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">{j.status}</span></div>)}
      </div>
      <Modal open={open} title="Create requisition" onClose={()=>setOpen(false)}><div className="space-y-4"><Input label="Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} /><Input label="Department" value={form.department} onChange={(e)=>setForm({...form,department:e.target.value})} /><div className="flex justify-end gap-3"><Button variant="secondary" onClick={()=>setOpen(false)}>Cancel</Button><Button onClick={create}>Create</Button></div></div></Modal>
    </div>
  )
}
