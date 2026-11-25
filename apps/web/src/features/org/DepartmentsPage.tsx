import { useEffect, useState } from 'react'
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

type Dept = { id: string; name: string; head: string; employees: number; status: 'Active' | 'Inactive' }
const schema = z.object({ name: z.string().min(2, 'Name required'), head: z.string().min(2, 'Department head required') })

export function DepartmentsPage() {
  const { hasPermission } = useAuth()
  const [departments, setDepartments] = useState<Dept[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const form = useForm<{ name: string; head: string }>({ resolver: zodResolver(schema), defaultValues: { name: '', head: '' } })
  const canCreate = hasPermission('departments.create')

  async function load() {
    try { setLoading(true); setDepartments(await apiClient.get<Dept[]>('/departments')) }
    catch (err) { toast.error(err instanceof Error ? err.message : 'Failed to load departments') }
    finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  async function onCreate(values: { name: string; head: string }) {
    try {
      const created = await apiClient.post<Dept>('/departments', { name: values.name, headName: values.head })
      setDepartments((prev) => [created, ...prev])
      toast.success('Department created')
      form.reset(); setOpen(false)
    } catch (err) { toast.error(err instanceof Error ? err.message : 'Failed to create department') }
  }

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Core HR" title="Departments" description="Manage organization structure, department ownership, and reporting hierarchy." action={canCreate ? <Button onClick={() => setOpen(true)}>Add department</Button> : undefined} />
      {loading ? (
        <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-10 text-center text-sm text-slate-500 backdrop-blur">Loading departments...</div>
      ) : departments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/90 p-10 text-center text-sm text-slate-500 backdrop-blur">No departments yet. Create your first department to get started.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {departments.map((d) => (
            <div key={d.id} className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur">
              <h3 className="text-base font-semibold text-slate-900">{d.name}</h3>
              <p className="mt-1 text-sm text-slate-500">Head: {d.head || '—'}</p>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm"><span className="text-slate-500">Employees</span><span className="font-semibold text-slate-900">{d.employees}</span></div>
            </div>
          ))}
        </div>
      )}
      <Modal open={open} title="Add department" onClose={() => setOpen(false)}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onCreate)}>
          <Input label="Department name" {...form.register('name')} error={form.formState.errors.name?.message} />
          <Input label="Department head" {...form.register('head')} error={form.formState.errors.head?.message} />
          <div className="flex justify-end gap-3 pt-2"><Button type="button" variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit">Create department</Button></div>
        </form>
      </Modal>
    </div>
  )
}
