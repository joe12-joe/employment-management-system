import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '@/lib/auth'

export function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) return <Navigate to="/" replace />

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
      toast.success('Welcome back!')
      const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/'
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Unable to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070b14]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(79,124,255,0.28),transparent_45%),radial-gradient(ellipse_at_80%_10%,rgba(139,92,246,0.18),transparent_40%),radial-gradient(ellipse_at_80%_80%,rgba(59,130,246,0.14),transparent_45%)]" />
      <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="hidden lg:block">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-sm font-bold text-white shadow-xl shadow-brand-500/30 ring-1 ring-white/20">EMS</div>
              <div>
                <div className="text-lg font-semibold tracking-tight text-white">Employment System</div>
                <div className="text-sm text-slate-400">Workforce management platform</div>
              </div>
            </div>

            <div className="mt-14 max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
                <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span></span>
                Secure workspace access
              </div>
              <h1 className="mt-6 text-5xl font-bold leading-[1.1] tracking-tight text-white xl:text-6xl">
                The smarter way to <span className="bg-gradient-to-r from-brand-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">manage your team.</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300/90">
                Streamline HR operations, track employee lifecycles, and make confident decisions — all from one beautiful workspace.
              </p>
            </div>

            <div className="mt-12 space-y-4">
              {[
                ['Centralized employee records', 'Profiles, contracts, documents, and history in one place.'],
                ['Built-in workflows', 'Approvals, onboarding, leave, and payroll flows.'],
                ['Secure by design', 'RBAC, audit trails, and controlled access.'],
              ].map(([title, desc]) => (
                <div key={title} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition hover:bg-white/[0.06]">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300 ring-1 ring-brand-400/20">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 12 4 4L19 6"/></svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{title}</div>
                    <div className="mt-0.5 text-sm text-slate-400">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8 flex items-center gap-3 lg:hidden">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-sm font-bold text-white shadow-lg shadow-brand-500/30">EMS</div>
                <div><div className="font-semibold text-white">Employment System</div><div className="text-xs text-slate-400">Admin Workspace</div></div>
              </div>

              <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.96] p-8 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-10">
                <div className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent" />

                <div className="mb-8">
                  <div className="mb-3 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">Welcome back</div>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900">Sign in to your account</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">Enter your credentials to access your workspace.</p>
                </div>

                <form className="space-y-5" onSubmit={onSubmit}>
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">Email address</span>
                    <div className="group relative">
                      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-brand-600">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/></svg>
                      </div>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10" placeholder="name@company.com" autoComplete="email" required />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
                    <div className="group relative">
                      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-brand-600">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 1 1 8 0v3"/></svg>
                      </div>
                      <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 py-3.5 pl-12 pr-14 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10" placeholder="Enter your password" autoComplete="current-password" required />
                      <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
                        {showPw ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </label>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-slate-600">
                      <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                      Remember me
                    </label>
                    <button type="button" onClick={() => toast.info('Password reset will be available after backend integration.')} className="font-medium text-brand-600 hover:text-brand-700">Forgot password?</button>
                  </div>

                  <button type="submit" disabled={loading} className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-brand-600 via-brand-600 to-indigo-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-600/35 focus:ring-4 focus:ring-brand-500/20 disabled:translate-y-0 disabled:opacity-60">
                    <span className="relative flex items-center justify-center gap-2">
                      {loading ? 'Signing in...' : 'Sign in'}
                      {!loading && <svg className="h-4 w-4 transition group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>}
                    </span>
                  </button>
                </form>

                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-3 text-slate-400">New here?</span></div>
                  </div>
                  <p className="mt-6 text-center text-sm text-slate-600">
                    Don&apos;t have an account?{' '}
                    <Link to="/register" className="font-semibold text-brand-600 transition hover:text-brand-700">Create an account</Link>
                  </p>
                </div>
              </div>

              <p className="mt-6 text-center text-xs text-slate-500">Protected by secure authentication. Your data stays private.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
