import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { apiClient } from '@/lib/api'

type Task = { id: string; title: string; assignee?: string | null; status: string; dueDate?: string | null }

export function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [assignee, setAssignee] = useState('')
  const load = async () => { try { setTasks(await apiClient.get<Task[]>('/tasks')) } catch (e: any) { toast.error(e.message || 'Failed to load tasks') } }
  useEffect(() => { load() }, [])
  async function create() {
    if (!title.trim()) return
    try { const t = await apiClient.post<Task>('/tasks', { title, assignee }); setTasks((p) => [t, ...p]); setTitle(''); setAssignee(''); setOpen(false); toast.success('Task created') } catch (e: any) { toast.error(e.message) }
  }
  async function toggle(t: Task) {
    const status = t.status === 'done' ? 'open' : 'done'
    try { const u = await apiClient.patch<Task>(`/tasks/${t.id}`, { status }); setTasks((p) => p.map((x) => x.id === t.id ? u : x)) } catch (e: any) { toast.error(e.message) }
  }
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Workflows" title="Tasks & Reminders" description="Track onboarding tasks, renewals, probation reviews, and reminders." action={<Button onClick={() => setOpen(true)}>New task</Button>} />
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur divide-y divide-slate-100">
        {tasks.length === 0 ? <div className="p-10 text-center text-sm text-slate-500">No tasks or reminders yet.</div> : tasks.map((t) => (
          <div key={t.id} className="flex items-center justify-between p-4"><div><div className={`font-medium ${t.status==='done'?'line-through text-slate-400':'text-slate-900'}`}>{t.title}</div><div className="text-sm text-slate-500">{t.assignee || 'Unassigned'}</div></div><Button variant="secondary" onClick={() => toggle(t)}>{t.status==='done'?'Reopen':'Done'}</Button></div>
        ))}
      </div>
      <Modal open={open} title="New task" onClose={() => setOpen(false)}>
        <div className="space-y-4"><Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} /><Input label="Assignee" value={assignee} onChange={(e) => setAssignee(e.target.value)} /><div className="flex justify-end gap-3"><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={create}>Create</Button></div></div>
      </Modal>
    </div>
  )
}
