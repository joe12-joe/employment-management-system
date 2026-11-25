import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/ui/PageHeader'
import { apiClient } from '@/lib/api'

type User = { id: string; name: string; email: string; status: string; roles: string[] }
type Role = { id: string; name: string; code: string; permissions: string[] }

export function UsersRolesPage() {
  const [users, setUsers] = useState<User[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  useEffect(() => {
    apiClient.get<User[]>('/users').then(setUsers).catch((e) => toast.error(e.message || 'Failed to load users'))
    apiClient.get<Role[]>('/roles').then(setRoles).catch((e) => toast.error(e.message || 'Failed to load roles'))
  }, [])
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Administration" title="Users & Roles" description="Manage users, roles, and the permission matrix." />
      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur xl:col-span-2">
          <h2 className="text-base font-semibold text-slate-900">Users</h2>
          <div className="mt-4 divide-y divide-slate-100">
            {users.length === 0 ? <p className="text-sm text-slate-500">No users yet.</p> : users.map((u) => (
              <div key={u.id} className="py-3 flex items-center justify-between gap-4"><div><div className="font-medium text-slate-900">{u.name}</div><div className="text-sm text-slate-500">{u.email}</div></div><div className="text-right"><div className="text-xs text-slate-500">{u.roles.join(', ') || 'No role'}</div><div className="text-xs text-slate-400">{u.status}</div></div></div>
            ))}
          </div>
        </section>
        <section className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur">
          <h2 className="text-base font-semibold text-slate-900">Roles</h2>
          <div className="mt-4 space-y-2">{roles.length === 0 ? <p className="text-sm text-slate-500">No roles yet.</p> : roles.map((r)=><div key={r.id} className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2.5 text-sm"><span className="font-medium text-slate-700">{r.name}</span><span className="text-slate-400">{r.permissions.length} perms</span></div>)}</div>
        </section>
      </div>
    </div>
  )
}
