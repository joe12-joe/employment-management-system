import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '@/lib/auth'
import { api } from '@/lib/api'

export function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)
  const [resetOpen, setResetOpen] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetPw, setResetPw] = useState('')
  const [resetLoading, setResetLoading] = useState(false)

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

  async function onReset(e: FormEvent) {
    e.preventDefault()
    setResetLoading(true)
    try {
      await api('/auth/reset-password', { method: 'POST', auth: false, body: JSON.stringify({ email: resetEmail, newPassword: resetPw }) })
      toast.success('Password reset successfully. You can now sign in.')
      setResetOpen(false); setResetPw('')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Unable to reset password')
    } finally { setResetLoading(false) }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070b14]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(79,124,255,0.28),transparent_45%),radial-gradient(ellipse_at_80%_10%,rgba(139,92,246,0.18),transparent_40%),radial-gradient(ellipse_at_80%_80%,rgba(59,130,246,0.14),transparent_45%)]" />
      <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="hidden lg:block">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-sm font-bold text-white shadow-xl shadow-brand-500/30 ring-1 ring-white/20">EMS</div>
              <div><div className="text-lg font-semibold tracking-tight text-white">Employment System</div><div className="text-sm text-slate-400">Workforce management platform</div></div>
            </div>
            <div className="mt-14 max-w-xl">
              <h1 className="mt-6 text-5xl font-bold leading-[1.1] tracking-tight text-white xl:text-6xl">The smarter way to <span className="bg-gradient-to-r from-brand-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">manage your team.</span></h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300/90">Streamline HR operations, track employee lifecycles, and make confident decisions — all from one beautiful workspace.</p>
            </div>
          </div>

          <div className="w-full">
            <div className="mx-auto w-full max-w-md">
              <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.96] p-8 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-10">
                <div className="mb-8">
                  <div className="mb-3 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">Welcome back</div>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900">Sign in to your account</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">Enter your credentials to access your workspace.</p>
                </div>

                <form className="space-y-5" onSubmit={onSubmit}>
                  <label className="block"><span className="mb-2 block text-sm font-medium text-slate-700">Email address</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 py-3.5 px-4 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10" placeholder="name@company.com" autoComplete="email" required /></label>
                  <label className="block"><span className="mb-2 block text-sm font-medium text-slate-700">Password</span><div className="relative"><input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 py-3.5 px-4 pr-14 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10" placeholder="Enter your password" autoComplete="current-password" required /><button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100">{showPw ? 'Hide' : 'Show'}</button></div></label>
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-slate-600"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-brand-600" />Remember me</label>
                    <button type="button" onClick={() => { setResetEmail(email); setResetOpen(true) }} className="font-medium text-brand-600 hover:text-brand-700">Forgot password?</button>
                  </div>
                  <button type="submit" disabled={loading} className="w-full rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:-translate-y-0.5 disabled:opacity-60">{loading ? 'Signing in...' : 'Sign in'}</button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600">Don&apos;t have an account? <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">Create an account</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {resetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900">Reset password</h3>
            <p className="mt-1 text-sm text-slate-500">Enter your email and a new password.</p>
            <form className="mt-4 space-y-4" onSubmit={onReset}>
              <input type="email" value={resetEmail} onChange={(e)=>setResetEmail(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm" placeholder="Email" required />
              <input type="password" value={resetPw} onChange={(e)=>setResetPw(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm" placeholder="New password (min 8 chars)" minLength={8} required />
              <div className="flex justify-end gap-3"><button type="button" onClick={()=>setResetOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">Cancel</button><button type="submit" disabled={resetLoading} className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60">{resetLoading?'Resetting...':'Reset password'}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
