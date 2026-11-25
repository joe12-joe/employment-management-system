import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { apiClient } from '@/lib/api'

type Employee = { id: string; name: string; email: string; department: string; title: string; status: string }
const tabs = ['Profile', 'History', 'Contracts', 'Documents', 'Activity', 'Notes'] as const
type Tab = typeof tabs[number]

export function EmployeeDetailPage() {
  const { id } = useParams()
  const [tab, setTab] = useState<Tab>('Profile')
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState<{ author: string; text: string; time: string }[]>([])

  useEffect(() => { if (id) apiClient.get<Employee>(`/employees/${id}`).then(setEmployee).catch((e) => toast.error(e.message || 'Failed to load employee')) }, [id])

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Core HR" title={employee?.name ?? `Employee ${id ?? ''}`} description="Profile, employment history, contracts, documents, audit activity, and notes." action={<div className="flex gap-2"><Link to="/employees" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Back</Link></div>} />
      <div className="flex flex-wrap gap-2">{tabs.map((t) => <button key={t} onClick={() => setTab(t)} className={`rounded-xl px-4 py-2 text-sm font-medium ${tab===t ? 'bg-brand-600 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'}`}>{t}</button>)}</div>

      {tab === 'Profile' && (
        <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur">
          <h2 className="text-base font-semibold text-slate-900">Profile</h2>
          {employee ? <dl className="mt-4 grid gap-4 sm:grid-cols-2 text-sm"><div><dt className="text-slate-500">Name</dt><dd className="font-medium text-slate-900">{employee.name}</dd></div><div><dt className="text-slate-500">Email</dt><dd className="font-medium text-slate-900">{employee.email}</dd></div><div><dt className="text-slate-500">Department</dt><dd className="font-medium text-slate-900">{employee.department || '—'}</dd></div><div><dt className="text-slate-500">Title</dt><dd className="font-medium text-slate-900">{employee.title || '—'}</dd></div><div><dt className="text-slate-500">Status</dt><dd className="font-medium text-slate-900">{employee.status}</dd></div></dl> : <p className="mt-4 text-sm text-slate-500">Loading...</p>}
        </div>
      )}
      {tab === 'History' && <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur"><h2 className="text-base font-semibold text-slate-900">Employment history</h2><p className="mt-4 text-sm text-slate-500">No history records yet.</p></div>}
      {tab === 'Contracts' && <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur"><h2 className="text-base font-semibold text-slate-900">Contracts</h2><p className="mt-4 text-sm text-slate-500">No contracts yet.</p></div>}
      {tab === 'Documents' && <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur"><h2 className="text-base font-semibold text-slate-900">Documents</h2><p className="mt-4 text-sm text-slate-500">No documents uploaded.</p></div>}
      {tab === 'Activity' && <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur"><h2 className="text-base font-semibold text-slate-900">Audit activity</h2><p className="mt-4 text-sm text-slate-500">No activity recorded.</p></div>}
      {tab === 'Notes' && (
        <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur">
          <h2 className="text-base font-semibold text-slate-900">Internal notes</h2>
          <div className="mt-4 flex gap-3"><input value={note} onChange={(e)=>setNote(e.target.value)} className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm" placeholder="Add a note..." /><Button onClick={()=>{ if(!note.trim()) return; setNotes((p)=>[{author:'You', text:note, time:'Just now'}, ...p]); setNote(''); toast.success('Note added') }}>Add</Button></div>
          <div className="mt-4 space-y-3">{notes.length === 0 ? <p className="text-sm text-slate-500">No notes yet.</p> : notes.map((n,i)=><div key={i} className="rounded-xl bg-slate-50 p-4 text-sm"><div className="font-medium text-slate-900">{n.author} <span className="font-normal text-slate-400">· {n.time}</span></div><div className="mt-1 text-slate-600">{n.text}</div></div>)}</div>
        </div>
      )}
    </div>
  )
}
