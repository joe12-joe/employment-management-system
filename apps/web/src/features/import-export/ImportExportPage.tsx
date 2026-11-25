import { useRef, useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'
import { apiClient } from '@/lib/api'

function download(name: string, content: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = name; a.click()
  URL.revokeObjectURL(url)
}

export function ImportExportPage() {
  const fileRef = useRef<HTMLInputElement>(null)
  const [csv, setCsv] = useState('')

  async function doExport(path: string, name: string) {
    try { const data = await apiClient.get<string>(path); download(name, typeof data === 'string' ? data : JSON.stringify(data)); toast.success('Export ready') }
    catch (e: any) { toast.error(e.message || 'Export failed') }
  }

  async function onFile(file?: File | null) {
    if (!file) return
    const text = await file.text()
    setCsv(text)
    toast.success(`Loaded ${file.name}`)
  }

  async function importEmployees() {
    if (!csv) { toast.error('Select a CSV file first'); return }
    try {
      const res = await apiClient.post<{ imported: number; errors: string[] }>('/import-export/employees/import', { csv })
      toast.success(`Imported ${res.imported} employee(s)`)
      if (res.errors?.length) toast.error(res.errors.slice(0, 3).join('; '))
    } catch (e: any) { toast.error(e.message || 'Import failed') }
  }

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Administration" title="Import / Export Hub" description="Bulk import employee/org data and export reports with validation and job history." />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur">
          <h2 className="text-base font-semibold text-slate-900">Import employees (CSV)</h2>
          <p className="mt-1 text-sm text-slate-500">CSV columns: name,email,department,title.</p>
          <input ref={fileRef} type="file" accept=".csv,text/csv" className="mt-4 block w-full text-sm" onChange={(e) => onFile(e.target.files?.[0])} />
          <div className="mt-4 flex gap-3"><Button onClick={importEmployees}>Import</Button></div>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur">
          <h2 className="text-base font-semibold text-slate-900">Exports</h2>
          <p className="mt-1 text-sm text-slate-500">Download reports and data extracts.</p>
          <div className="mt-4 space-y-3">
            {[['Employees CSV','/import-export/employees/export','employees.csv'],['Departments CSV','/import-export/departments/export','departments.csv'],['Audit log CSV','/import-export/audit/export','audit.csv']].map(([label,path,name])=>(
              <div key={label} className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3 text-sm"><span className="text-slate-700">{label}</span><Button variant="secondary" onClick={()=>doExport(path,name)}>Export</Button></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
