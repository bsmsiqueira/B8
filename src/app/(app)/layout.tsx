import Link from 'next/link'
import { AppNav } from '@/components/app-nav'
import { getSession } from '@/lib/session'
import { iniciais } from '@/lib/format'

/** Estrutura do app idêntica ao protótipo: topbar + telas + menu. */
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const s = await getSession()

  return (
    <div className="app">
      <div className="topbar">
        <Link href="/dashboard" className="logo">B8</Link>
        <div className="topbar-right">
          <Link href="/perfil" className="avatar" style={{ cursor: 'pointer' }} title="Meu perfil">
            {iniciais(s.nome)}
          </Link>
        </div>
      </div>

      <div className="screens-wrap">{children}</div>

      <AppNav />
    </div>
  )
}
