import { PageHeader } from '@/components/ui/PageHeader'

export function OnboardingPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Talent" title="Onboarding / Offboarding" description="Track checklist templates, task assignments, provisioning, and completion progress." />
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/90 p-10 text-center text-sm text-slate-500 backdrop-blur">No onboarding or offboarding checklists yet.</div>
    </div>
  )
}
