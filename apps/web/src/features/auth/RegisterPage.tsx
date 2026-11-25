import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '@/lib/auth'

export function RegisterPage() {
  const { isAuthenticated, register } = useAuth()
  const navigate = useNavigate()
  const [companyName, setCompanyName] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) return <Navigate to="/" replace />

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    try {
      await register(companyName, name, email, password)
      toast.success('Account created. Please sign in.')
      navigate('/login', { replace: true })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Unable to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(79,124,255,0.25),_transparent_50%),radial-gradient(ellipse_at_bottom_right,_rgba(99,102,241,0.18),_transparent_50%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-10 lg:px-16">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white shadow-lg shadow-brand-500/30">EMS</div>
            <div><div className="text-lg font-semibold text-white">Employment System</div><div className="text-sm text-slate-400">Workforce management platform</div></div>
          </div>
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-brand-200"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Get started in minutes</div>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">Create your <span className="bg-gradient-to-r from-brand-300 to-indigo-300 bg-clip-text text-transparent">workspace.</span></h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-300 sm:text-lg">Set up your admin account and start managing employees, departments, and HR workflows in one place.</p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.97] p-8 shadow-2xl shadow-black/20 backdrop-blur sm:p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Create account</h2>
              <p className="mt-2 text-sm text-slate-600">Enter your details to get started.</p>
            </div>
            <form className="space-y-5" onSubmit={onSubmit}>
              <label className="block"><span className="mb-1.5 block text-sm font-medium text-slate-700">Company name</span><input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10" placeholder="Your company" required /></label>
              <label className="block"><span className="mb-1.5 block text-sm font-medium text-slate-700">Full name</span><input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10" placeholder="Your name" required /></label>
              <label className="block"><span className="mb-1.5 block text-sm font-medium text-slate-700">Email</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10" placeholder="you@company.com" autoComplete="email" required /></label>
              <label className="block"><span className="mb-1.5 block text-sm font-medium text-slate-700">Password</span><div className="relative"><input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 pr-12 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10" placeholder="Create a password" autoComplete="new-password" minLength={8} required /><button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-medium text-slate-500 hover:text-slate-700">{showPw ? 'Hide' : 'Show'}</button></div></label>
              <button type="submit" disabled={loading} className="w-full rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:shadow-xl hover:shadow-brand-600/30 disabled:opacity-60">{loading ? 'Creating account...' : 'Create account'}</button>
            </form>
            <div className="mt-8 border-t border-slate-100 pt-6 text-center"><p className="text-sm text-slate-600">Already have an account? <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">Sign in</Link></p></div>
          </div>
        </div>
      </div>
    </div>
  )
}
