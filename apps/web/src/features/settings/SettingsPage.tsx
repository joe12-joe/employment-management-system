import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/lib/auth'
import { apiClient } from '@/lib/api'

export function SettingsPage() {
  const { user } = useAuth()
  const [company, setCompany] = useState('')
  const [timezone, setTimezone] = useState('')
  const [locale, setLocale] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient.get<any>('/settings').then((s) => {
      setCompany(s.companyName ?? ''); setTimezone(s.timezone ?? ''); setLocale(s.locale ?? '')
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  async function save() {
    try {
      await apiClient.patch('/settings', { companyName: company, timezone, locale })
      toast.success('Settings saved')
    } catch (e: any) { toast.error(e.message || 'Failed to save settings') }
  }

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Administration" title="Settings" description="Manage profile, tenant configuration, security, and feature flags." />
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur">
          <h2 className="text-base font-semibold text-slate-900">Profile</h2>
          <div className="mt-4 space-y-4 text-sm">
            <div className="rounded-xl bg-slate-50 p-4"><div className="text-slate-500">Name</div><div className="mt-1 font-medium text-slate-900">{user?.name}</div></div>
            <div className="rounded-xl bg-slate-50 p-4"><div className="text-slate-500">Email</div><div className="mt-1 font-medium text-slate-900">{user?.email}</div></div>
            <div className="rounded-xl bg-slate-50 p-4"><div className="text-slate-500">Roles</div><div className="mt-1 font-medium text-slate-900">{user?.roles.join(', ')}</div></div>
          </div>
        </section>
        <section className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur">
          <h2 className="text-base font-semibold text-slate-900">Tenant settings</h2>
          <div className="mt-4 space-y-4">
            <label className="block"><span className="mb-1.5 block text-sm font-medium text-slate-700">Company name</span><input value={company} onChange={(e)=>setCompany(e.target.value)} disabled={loading} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm" /></label>
            <label className="block"><span className="mb-1.5 block text-sm font-medium text-slate-700">Timezone</span><input value={timezone} onChange={(e)=>setTimezone(e.target.value)} disabled={loading} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm" /></label>
            <label className="block"><span className="mb-1.5 block text-sm font-medium text-slate-700">Locale</span><input value={locale} onChange={(e)=>setLocale(e.target.value)} disabled={loading} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm" /></label>
            <Button onClick={save} disabled={loading}>Save settings</Button>
          </div>
        </section>
      </div>
    </div>
  )
}
