import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/ui/PageHeader'
import { apiClient } from '@/lib/api'

type Activity = { id: string; actor: string; action: string; entity: string; createdAt: string }

export function ActivityFeedPage() {
  const [items, setItems] = useState<Activity[]>([])
  useEffect(() => { apiClient.get<Activity[]>('/activity').then(setItems).catch((e) => toast.error(e.message || 'Failed to load activity')) }, [])
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Overview" title="Activity Feed" description="Recent changes across modules with actor, action, target, and time." />
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur divide-y divide-slate-100">
        {items.length === 0 ? <div className="p-10 text-center text-sm text-slate-500">No activity yet.</div> : items.map((a) => (
          <div key={a.id} className="p-4 text-sm"><span className="font-medium text-slate-900">{a.actor}</span> <span className="text-slate-600">{a.action}</span> <span className="font-medium text-slate-900">{a.entity}</span><div className="text-slate-400 mt-1">{new Date(a.createdAt).toLocaleString()}</div></div>
        ))}
      </div>
    </div>
  )
}
