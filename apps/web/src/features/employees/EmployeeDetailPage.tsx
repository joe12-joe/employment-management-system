import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'

const tabs = ['Profile', 'History', 'Contracts', 'Documents', 'Activity', 'Notes'] as const
type Tab = typeof tabs[number]

export function EmployeeDetailPage() {
  const { id } = useParams()
  const [tab, setTab] = useState<Tab>('Profile')
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState<{ author: string; text: string; time: string }[]>([])

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Core HR" title={`Employee ${id ?? ''}`} description="Profile, employment history, contracts, documents, audit activity, and notes." action={<div className="flex gap-2"><Button variant="secondary" onClick={() => toast.info('Edit flow coming next')}>Edit</Button><Link to="/employees" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Back</Link></div>} />
      <div className="flex flex-wrap gap-2">{tabs.map((t) => <button key={t} onClick={() => setTab(t)} className={`rounded-xl px-4 py-2 text-sm font-medium ${tab===t ? 'bg-brand-600 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'}`}>{t}</button>)}</div>

      {tab === 'Profile' && (
        <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur">
          <h2 className="text-base font-semibold text-slate-900">Profile</h2>
          <p className="mt-4 text-sm text-slate-500">Employee profile data will appear here when connected to the API.</p>
        </div>
      )}
      {tab === 'History' && <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur"><h2 className="text-base font-semibold text-slate-900">Employment history</h2><p className="mt-4 text-sm text-slate-500">No history records yet.</p></div>}
      {tab === 'Contracts' && <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur"><div className="flex items-center justify-between"><h2 className="text-base font-semibold text-slate-900">Contracts</h2><Button variant="secondary" onClick={()=>toast.info('Contract creation flow coming next')}>Add contract</Button></div><p className="mt-4 text-sm text-slate-500">No contracts yet.</p></div>}
      {tab === 'Documents' && <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur"><div className="flex items-center justify-between"><h2 className="text-base font-semibold text-slate-900">Documents</h2><Button variant="secondary" onClick={()=>toast.info('Upload flow will be wired to API')}>Upload document</Button></div><p className="mt-4 text-sm text-slate-500">No documents uploaded.</p></div>}
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
