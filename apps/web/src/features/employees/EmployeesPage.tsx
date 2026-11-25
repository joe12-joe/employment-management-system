import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { useAuth } from '@/lib/auth'
import { apiClient } from '@/lib/api'

type Employee = { id: string; name: string; email: string; department: string; title: string; status: 'Active' | 'Onboarding' | 'On Leave' | 'Terminated' }
const schema = z.object({ name: z.string().min(2, 'Name is required'), email: z.string().email('Valid email required'), department: z.string().min(2, 'Department is required'), title: z.string().min(2, 'Job title is required') })
type FormValues = z.infer<typeof schema>
const statusStyles: Record<Employee['status'], string> = { Active: 'bg-emerald-50 text-emerald-700 ring-emerald-100', 'On Leave': 'bg-amber-50 text-amber-700 ring-amber-100', Onboarding: 'bg-brand-50 text-brand-700 ring-brand-100', Terminated: 'bg-red-50 text-red-700 ring-red-100' }

export function EmployeesPage() {
  const { hasPermission } = useAuth()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | Employee['status']>('All')
  const [sortBy, setSortBy] = useState<'name' | 'department' | 'status'>('name')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const pageSize = 10
  const canCreate = hasPermission('employees.create')
  const canManageStatus = hasPermission('employees.manage_status')
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { name: '', email: '', department: '', title: '' } })

  async function load() {
    try { setLoading(true); setEmployees(await apiClient.get<Employee[]>('/employees')) }
    catch (err) { toast.error(err instanceof Error ? err.message : 'Failed to load employees') }
    finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return employees
      .filter((e) => (!q || [e.name, e.email, e.id, e.department, e.title].some((v) => v.toLowerCase().includes(q))) && (statusFilter === 'All' || e.status === statusFilter))
      .sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
  }, [employees, query, statusFilter, sortBy])
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize)

  async function onCreate(values: FormValues) {
    try {
      const created = await apiClient.post<Employee>('/employees', values)
      setEmployees((prev) => [created, ...prev])
      toast.success('Employee created', { description: `${values.name} added.` })
      form.reset(); setOpen(false)
    } catch (err) { toast.error(err instanceof Error ? err.message : 'Failed to create employee') }
  }
  async function confirmTerminate() {
    if (!confirmId) return
    try {
      const updated = await apiClient.patch<Employee>(`/employees/${confirmId}/status`, { status: 'Terminated' })
      setEmployees((prev) => prev.map((e) => e.id === confirmId ? updated : e))
      toast.success('Employee status updated')
    } catch (err) { toast.error(err instanceof Error ? err.message : 'Failed to update status') }
    finally { setConfirmId(null) }
  }
  function toggleAll(checked: boolean) { setSelected(checked ? paged.map((e) => e.id) : []) }
  function toggleOne(id: string) { setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]) }
  async function bulkTerminate() {
    if (!selected.length) return
    try {
      await Promise.all(selected.map((id) => apiClient.patch(`/employees/${id}/status`, { status: 'Terminated' })))
      setEmployees((prev) => prev.map((e) => selected.includes(e.id) ? { ...e, status: 'Terminated' } : e))
      toast.success('Bulk status update', { description: `${selected.length} employee(s) updated.` })
      setSelected([])
    } catch (err) { toast.error(err instanceof Error ? err.message : 'Failed to update employees') }
  }

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Core HR" title="Employees" description="Manage employee records, status transitions, contracts, and documents." action={canCreate ? <Button onClick={() => setOpen(true)}>Add employee</Button> : undefined} />

      <div className="grid gap-4 sm:grid-cols-4">
        {(['Active', 'Onboarding', 'On Leave', 'Terminated'] as const).map((s) => (
          <div key={s} className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur"><div className="text-sm text-slate-500">{s}</div><div className="mt-2 text-2xl font-bold text-slate-900">{employees.filter((e) => e.status === s).length}</div></div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 lg:flex-row lg:items-center lg:justify-between">
          <input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1) }} className="w-full max-w-sm rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10" placeholder="Search employees..." />
          <div className="flex flex-wrap gap-2">
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value as any); setPage(1) }} className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700">{['All','Active','Onboarding','On Leave','Terminated'].map((s)=><option key={s} value={s}>{s}</option>)}</select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700"><option value="name">Sort: Name</option><option value="department">Sort: Department</option><option value="status">Sort: Status</option></select>
            {canManageStatus && selected.length > 0 && <Button variant="danger" onClick={bulkTerminate}>Terminate selected ({selected.length})</Button>}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50/80 text-left text-slate-500"><tr>
              <th className="px-5 py-3"><input type="checkbox" checked={paged.length > 0 && selected.length === paged.length} onChange={(e) => toggleAll(e.target.checked)} /></th>
              <th className="px-5 py-3 font-medium">Employee</th><th className="px-5 py-3 font-medium">Department</th><th className="px-5 py-3 font-medium">Title</th><th className="px-5 py-3 font-medium">Status</th><th className="px-5 py-3 font-medium">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {paged.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50/60">
                  <td className="px-5 py-4"><input type="checkbox" checked={selected.includes(e.id)} onChange={() => toggleOne(e.id)} /></td>
                  <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">{e.name.split(' ').map((n)=>n[0]).join('').slice(0,2).toUpperCase()}</div><div><Link to={`/employees/${e.id}`} className="font-medium text-slate-900 hover:text-brand-700">{e.name}</Link><div className="text-slate-500">{e.email} · {e.id}</div></div></div></td>
                  <td className="px-5 py-4 text-slate-600">{e.department}</td>
                  <td className="px-5 py-4 text-slate-600">{e.title}</td>
                  <td className="px-5 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[e.status]}`}>{e.status}</span></td>
                  <td className="px-5 py-4">{canManageStatus && e.status !== 'Terminated' ? <button onClick={() => setConfirmId(e.id)} className="text-sm font-medium text-red-600 hover:text-red-700">Terminate</button> : <span className="text-slate-400">—</span>}</td>
                </tr>
              ))}
              {!loading && paged.length === 0 && <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-500">No employees found.</td></tr>}
              {loading && <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-500">Loading employees...</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 px-5 py-3 text-sm text-slate-600">
          <div>Showing {filtered.length === 0 ? 0 : (page-1)*pageSize+1}-{Math.min(page*pageSize, filtered.length)} of {filtered.length}</div>
          <div className="flex gap-2"><Button variant="secondary" onClick={() => setPage((p) => Math.max(1,p-1))} disabled={page===1}>Prev</Button><Button variant="secondary" onClick={() => setPage((p) => Math.min(totalPages,p+1))} disabled={page===totalPages}>Next</Button></div>
        </div>
      </div>

      <Modal open={open} title="Add employee" onClose={() => setOpen(false)}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onCreate)}>
          <Input label="Full name" {...form.register('name')} error={form.formState.errors.name?.message} />
          <Input label="Work email" type="email" {...form.register('email')} error={form.formState.errors.email?.message} />
          <Input label="Department" {...form.register('department')} error={form.formState.errors.department?.message} />
          <Input label="Job title" {...form.register('title')} error={form.formState.errors.title?.message} />
          <div className="flex justify-end gap-3 pt-2"><Button type="button" variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit">Create employee</Button></div>
        </form>
      </Modal>

      <Modal open={!!confirmId} title="Confirm status change" onClose={() => setConfirmId(null)}>
        <p className="text-sm text-slate-600">Mark <span className="font-medium text-slate-900">{confirmId}</span> as terminated?</p>
        <div className="mt-6 flex justify-end gap-3"><Button variant="secondary" onClick={() => setConfirmId(null)}>Cancel</Button><Button variant="danger" onClick={confirmTerminate}>Confirm</Button></div>
      </Modal>
    </div>
  )
}
