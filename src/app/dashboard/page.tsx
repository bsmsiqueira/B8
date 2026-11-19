import { LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Logo } from '@/components/logo'
import { logout } from '../login/actions'

export default async function DashboardPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-dvh">
      <header className="flex items-center justify-between border-b border-line bg-paper-raised px-5 py-3">
        <Logo />
        <form action={logout}>
          <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-soft transition hover:bg-paper-sunken">
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </form>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-ink-muted">Logado como {user?.email}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {['Projetos ativos', 'Clientes', 'Aprovações pendentes'].map((label) => (
            <div key={label} className="rounded-xl border border-line bg-paper-raised p-5 shadow-card">
              <p className="text-sm text-ink-muted">{label}</p>
              <p className="mt-2 text-3xl font-semibold">—</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
