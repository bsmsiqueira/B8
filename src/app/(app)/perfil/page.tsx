import Link from 'next/link'
import { getSession, roleLabel } from '@/lib/session'
import { iniciais } from '@/lib/format'
import { PerfilForm } from './form'

export const dynamic = 'force-dynamic'

export default async function PerfilPage() {
  const s = await getSession()

  return (
    <div className="screen active" id="screen-perfil">
      <Link href="/dashboard" className="back-row">
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>Voltar</span>
      </Link>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0 28px' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--green)', color: '#fff', fontSize: 20, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
          {iniciais(s.nome)}
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 500 }}>{s.nome}</div>
        <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 3 }}>{roleLabel[s.role]}</div>
      </div>

      <PerfilForm nome={s.nome} email={s.email} escritorio={s.orgName} podeEditarEscritorio={s.role === 'owner'} />
    </div>
  )
}
