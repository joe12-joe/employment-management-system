import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '@/lib/auth'

type IconProps = { className?: string }
const I = ({ d, className }: { d: string; className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={d}/></svg>
function DashboardIcon({ className }: IconProps) { return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h4A1.5 1.5 0 0 1 11 5.5v4A1.5 1.5 0 0 1 9.5 11h-4A1.5 1.5 0 0 1 4 9.5v-4Zm9 0A1.5 1.5 0 0 1 14.5 4h4A1.5 1.5 0 0 1 20 5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4A1.5 1.5 0 0 1 13 9.5v-4ZM4 14.5A1.5 1.5 0 0 1 5.5 13h4a1.5 1.5 0 0 1 1.5 1.5v4A1.5 1.5 0 0 1 9.5 20h-4A1.5 1.5 0 0 1 4 18.5v-4Zm9 0a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a1.5 1.5 0 0 1-1.5-1.5v-4Z"/></svg> }
function UsersIcon({ className }: IconProps) { return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 19v-1a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v1"/><circle cx="8.5" cy="7" r="3"/><path d="M23 19v-1a4 4 0 0 0-3-3.87M16 4.13a3 3 0 0 1 0 5.75"/></svg> }
function OrgIcon({ className }: IconProps) { return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18M9 6h.01M9 10h.01M15 6h.01M15 10h.01M10 22v-4h4v4"/></svg> }
function ChartIcon({ className }: IconProps) { return <I className={className} d="M3 3v18h18M7 16l4-4 4 4 5-7" /> }
function CheckIcon({ className }: IconProps) { return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> }
function CalendarIcon({ className }: IconProps) { return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg> }
function MoneyIcon({ className }: IconProps) { return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5c0-1.1 1.1-2 2.5-2s2.5.9 2.5 2-1.1 2-2.5 2-2.5.9-2.5 2 1.1 2 2.5 2 2.5-.9 2.5-2"/></svg> }
function BriefcaseIcon({ className }: IconProps) { return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16M2 12h20"/></svg> }
function StarIcon({ className }: IconProps) { return <I className={className} d="M12 2l3.1 6.3 6.9 1-5 4.8 1.2 6.9-6.2-3.2-6.2 3.2 1.2-6.9-5-4.8 6.9-1L12 2z" /> }
function ReportIcon({ className }: IconProps) { return <I className={className} d="M4 19h16M4 15l4-4 4 3 5-6 3 2" /> }
function ShieldIcon({ className }: IconProps) { return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3 20 7v5c0 5-3.4 7.7-8 9-4.6-1.3-8-4-8-9V7l8-4Z"/><path d="m9 12 2 2 4-4"/></svg> }
function AuditIcon({ className }: IconProps) { return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"/><path d="M14 2v6h6M9 15h6M9 18h4"/></svg> }
function SettingsIcon({ className }: IconProps) { return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 0 1-4 0v-.1a1 1 0 0 0-.7-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 0 1 0-4h.1a1 1 0 0 0 .9-.7 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2h.1a1 1 0 0 0 .6-.9V4a2 2 0 0 1 4 0v.1a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1v.1a1 1 0 0 0 .9.6H20a2 2 0 0 1 0 4h-.1a1 1 0 0 0-.9.6Z"/></svg> }
function MenuIcon({ className }: IconProps) { return <I className={className} d="M4 7h16M4 12h16M4 17h16" /> }
function BellIcon({ className }: IconProps) { return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9"/></svg> }

const navItems = [
  { to: '/', label: 'Dashboard', icon: DashboardIcon, section: 'Overview', permission: null },
  { to: '/activity', label: 'Activity Feed', icon: ReportIcon, section: 'Overview', permission: null },
  { to: '/reports', label: 'Reports', icon: ReportIcon, section: 'Overview', permission: null },
  { to: '/employees', label: 'Employees', icon: UsersIcon, section: 'Core HR', permission: 'employees.read' },
  { to: '/org/departments', label: 'Departments', icon: OrgIcon, section: 'Core HR', permission: 'departments.read' },
  { to: '/org/chart', label: 'Org Chart', icon: ChartIcon, section: 'Core HR', permission: 'departments.read' },
  { to: '/approvals', label: 'Approvals', icon: CheckIcon, section: 'Workflows', permission: null },
  { to: '/tasks', label: 'Tasks', icon: CheckIcon, section: 'Workflows', permission: null },
  { to: '/calendar', label: 'Calendar', icon: CalendarIcon, section: 'Workflows', permission: null },
  { to: '/leave', label: 'Leave', icon: CalendarIcon, section: 'Workflows', permission: null },
  { to: '/payroll', label: 'Payroll', icon: MoneyIcon, section: 'Workflows', permission: null },
  { to: '/recruiting', label: 'Recruiting', icon: BriefcaseIcon, section: 'Talent', permission: null },
  { to: '/onboarding', label: 'Onboarding', icon: UsersIcon, section: 'Talent', permission: null },
  { to: '/performance', label: 'Performance', icon: StarIcon, section: 'Talent', permission: null },
  { to: '/admin/users-roles', label: 'Users & Roles', icon: ShieldIcon, section: 'Administration', permission: 'users.read' },
  { to: '/admin/audit', label: 'Audit Log', icon: AuditIcon, section: 'Administration', permission: 'audit.read' },
  { to: '/admin/import-export', label: 'Import / Export', icon: AuditIcon, section: 'Administration', permission: null },
  { to: '/settings', label: 'Settings', icon: SettingsIcon, section: 'Administration', permission: null },
]

const notifications: { id: number; title: string; body: string; unread: boolean }[] = []

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)
  const [cmdQ, setCmdQ] = useState('')
  const [dark, setDark] = useState(() => localStorage.getItem('ems_theme') === 'dark')
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout, hasPermission } = useAuth()
  const visibleNav = navItems.filter((n) => !n.permission || hasPermission(n.permission))
  const current = visibleNav.find((n) => (n.to === '/' ? location.pathname === '/' : location.pathname.startsWith(n.to)))
  const unread = notifications.filter((n) => n.unread).length
  const cmdResults = visibleNav.filter((n) => n.label.toLowerCase().includes(cmdQ.toLowerCase()))

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setCmdOpen((v) => !v) }
      if (e.key === 'Escape') { setCmdOpen(false); setNotifOpen(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('ems_theme', dark ? 'dark' : 'light')
  }, [dark])

  function handleLogout() { logout(); toast.success('Signed out'); navigate('/login') }

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <div className="flex min-h-screen">
        {mobileOpen && <div className="fixed inset-0 z-30 bg-slate-900/30 md:hidden" onClick={() => setMobileOpen(false)} />}
        <aside className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200/80 bg-white/95 backdrop-blur transition-transform md:static md:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex h-full flex-col">
            <div className="px-6 py-6"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white shadow-lg shadow-brand-500/25">EMS</div><div><div className="text-sm font-semibold text-slate-900">Employment System</div><div className="text-xs text-slate-500">Admin Workspace</div></div></div></div>
            <nav className="flex-1 overflow-y-auto px-3 pb-4">
              {['Overview', 'Core HR', 'Workflows', 'Talent', 'Administration'].map((section) => {
                const items = visibleNav.filter((n) => n.section === section)
                if (!items.length) return null
                return (
                  <div key={section} className="mb-4">
                    <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{section}</div>
                    <div className="space-y-1">{items.map((item) => { const Icon = item.icon; return (
                      <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setMobileOpen(false)} className={({ isActive }) => `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${isActive ? 'bg-brand-50 text-brand-700 shadow-sm ring-1 ring-brand-100' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
                        {({ isActive }) => (<><Icon className={`h-5 w-5 ${isActive ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'}`} /><span>{item.label}</span></>)}
                      </NavLink>
                    )})}</div>
                  </div>
                )
              })}
            </nav>
            <div className="border-t border-slate-200 px-4 py-4">
              <div className="flex items-center gap-3 rounded-xl px-2 py-2"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">{user?.name?.slice(0,2).toUpperCase() ?? 'HR'}</div><div className="min-w-0 flex-1"><div className="truncate text-sm font-medium text-slate-900">{user?.name}</div><div className="truncate text-xs text-slate-500">{user?.email}</div></div></div>
              <button onClick={handleLogout} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Sign out</button>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <button onClick={() => setMobileOpen(true)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden" aria-label="Open menu"><MenuIcon className="h-5 w-5" /></button>
                <div><div className="text-xs font-medium uppercase tracking-wider text-slate-400">Employment Management</div><h1 className="text-lg font-semibold text-slate-900">{current?.label ?? 'Workspace'}</h1></div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button onClick={() => setCmdOpen(true)} className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-400 hover:bg-slate-100 md:flex"><svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><span>Search...</span><kbd className="ml-2 rounded bg-white px-1.5 py-0.5 text-[10px] text-slate-400 ring-1 ring-slate-200">Ctrl K</kbd></button>
                <div className="relative">
                  <button onClick={() => setNotifOpen((v) => !v)} className="relative rounded-xl p-2.5 text-slate-600 hover:bg-slate-100" aria-label="Notifications"><BellIcon className="h-5 w-5" />{unread > 0 && <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />}</button>
                  {notifOpen && (
                    <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                      <div className="px-3 py-2 text-sm font-semibold text-slate-900">Notifications</div>
                      {notifications.length === 0 ? <div className="px-3 py-4 text-sm text-slate-500">No notifications.</div> : notifications.map((n) => <div key={n.id} className={`rounded-xl px-3 py-3 ${n.unread ? 'bg-brand-50/60' : ''}`}><div className="text-sm font-medium text-slate-900">{n.title}</div><div className="text-xs text-slate-500">{n.body}</div></div>)}
                    </div>
                  )}
                </div>
                <button onClick={() => setDark((v) => !v)} className="rounded-xl p-2.5 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800" aria-label="Toggle theme">
                  {dark ? (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41"/></svg>
                  ) : (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>
                  )}
                </button>
                <div className="hidden rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100 sm:block">System healthy</div>
              </div>
            </div>
          </header>
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><Outlet /></div></main>
        </div>
      </div>

      {cmdOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[15vh]">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setCmdOpen(false)} />
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="border-b border-slate-200 p-3"><input autoFocus value={cmdQ} onChange={(e) => setCmdQ(e.target.value)} placeholder="Search pages..." className="w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-500" /></div>
            <div className="max-h-72 overflow-y-auto p-2">
              {cmdResults.map((r) => { const Icon = r.icon; return <button key={r.to} onClick={() => { navigate(r.to); setCmdOpen(false); setCmdQ('') }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm hover:bg-slate-100"><Icon className="h-4 w-4 text-slate-400" /><span className="font-medium text-slate-700">{r.label}</span><span className="ml-auto text-xs text-slate-400">{r.section}</span></button> })}
              {cmdResults.length === 0 && <div className="px-3 py-8 text-center text-sm text-slate-500">No results</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
