import { useState } from 'react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/ui/PageHeader'

const roles = ['Tenant Admin','HR Admin','HR Manager','Manager','Employee','Auditor']
const perms = ['employees.read','employees.create','employees.update','employees.manage_status','departments.read','audit.read','users.read','roles.assign']
const seedMatrix: Record<string, string[]> = {
  'Tenant Admin': perms, 'HR Admin': perms.filter(p=>p!=='roles.assign'), 'HR Manager': ['employees.read','employees.update','departments.read'],
  'Manager': ['employees.read','departments.read'], 'Employee': [], 'Auditor': ['employees.read','departments.read','audit.read'],
}

export function UsersRolesPage() {
  const [matrix, setMatrix] = useState(seedMatrix)
  function toggle(role: string, perm: string) {
    setMatrix((prev) => { const has = prev[role].includes(perm); return { ...prev, [role]: has ? prev[role].filter(p=>p!==perm) : [...prev[role], perm] } })
    toast.success('Permission updated')
  }
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Administration" title="Users & Roles" description="Manage users, roles, and the permission matrix." action={<button className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-brand-700">Invite user</button>} />
      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur xl:col-span-2">
          <h2 className="text-base font-semibold text-slate-900">Users</h2>
          <p className="mt-4 text-sm text-slate-500">No users yet.</p>
        </section>
        <section className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur">
          <h2 className="text-base font-semibold text-slate-900">Roles</h2>
          <div className="mt-4 space-y-2">{roles.map((r)=><div key={r} className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2.5 text-sm"><span className="font-medium text-slate-700">{r}</span><span className="text-slate-400">System</span></div>)}</div>
        </section>
      </div>
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur">
        <div className="border-b border-slate-200 px-6 py-4"><h2 className="text-base font-semibold text-slate-900">Permission matrix</h2><p className="text-sm text-slate-500">Click to toggle permissions per role.</p></div>
        <div className="overflow-x-auto"><table className="min-w-full text-sm"><thead className="bg-slate-50/80 text-left text-slate-500"><tr><th className="px-4 py-3 font-medium">Permission</th>{roles.map(r=><th key={r} className="px-4 py-3 font-medium">{r}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{perms.map(p=>(<tr key={p}><td className="px-4 py-3 font-medium text-slate-700">{p}</td>{roles.map(r=>{const on=matrix[r].includes(p); return <td key={r} className="px-4 py-3"><button onClick={()=>toggle(r,p)} className={`h-6 w-10 rounded-full transition ${on?'bg-brand-600':'bg-slate-200'}`}><span className={`block h-4 w-4 rounded-full bg-white shadow transition ${on?'translate-x-5':'translate-x-1'}`} /></button></td>})}</tr>))}</tbody></table></div>
      </section>
    </div>
  )
}
