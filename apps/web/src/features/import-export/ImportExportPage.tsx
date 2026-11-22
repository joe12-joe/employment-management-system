import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'

export function ImportExportPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Administration" title="Import / Export Hub" description="Bulk import employee/org data and export reports with validation and job history." />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur">
          <h2 className="text-base font-semibold text-slate-900">Import employees (CSV)</h2>
          <p className="mt-1 text-sm text-slate-500">Validate rows, review errors, and import with idempotency.</p>
          <div className="mt-4 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">Select a CSV file to begin.</div>
          <div className="mt-4 flex gap-3"><Button variant="secondary" onClick={()=>toast.info('Connect backend to enable validation')}>Validate</Button><Button onClick={()=>toast.info('Connect backend to enable import')}>Import</Button></div>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur">
          <h2 className="text-base font-semibold text-slate-900">Exports</h2>
          <p className="mt-1 text-sm text-slate-500">Download reports and data extracts.</p>
          <div className="mt-4 space-y-3">
            {['Employees CSV','Departments CSV','Audit log CSV'].map((x)=>(
              <div key={x} className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3 text-sm"><span className="text-slate-700">{x}</span><Button variant="secondary" onClick={()=>toast.info('Connect backend to enable export')}>Export</Button></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
