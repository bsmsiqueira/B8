import Link from 'next/link'
import { listarEquipe, nomeDe } from '@/lib/pessoas'
import { roleLabel } from '@/lib/session'
import { coresEquipe, iniciais } from '@/lib/format'
import { EmBreve } from '@/components/em-breve-button'

export const dynamic = 'force-dynamic'

const card: React.CSSProperties = {
  background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)',
  padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
}

export default async function PessoasPage() {
  const equipe = await listarEquipe()

  return (
    <div className="screen active" id="screen-equipe">
      <div className="greeting">
        <h2>Pessoas</h2>
        <div className="greeting-date">Equipe e clientes do escritório</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
        {equipe.map((p, i) => (
          <Link key={p.id} href={`/pessoas/${p.id}`} style={card}>
            <div className="setor-avatar" style={{ background: p.role === 'owner' ? 'var(--green)' : coresEquipe[i % coresEquipe.length], width: 38, height: 38, fontSize: 12 }}>
              {iniciais(nomeDe(p))}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{nomeDe(p)}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-soft)' }}>{roleLabel[p.role]}</div>
            </div>
            <svg width="16" height="16" fill="none" stroke="var(--ink-soft)" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
          </Link>
        ))}
        <EmBreve
          label="Convidar membro"
          style={{ ...card, border: '1px dashed var(--border)', justifyContent: 'center', gap: 8, color: 'var(--ink-soft)' }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
          <span style={{ fontSize: 13 }}>Adicionar membro</span>
          <span style={{ fontSize: 10, background: 'var(--border)', borderRadius: 4, padding: '1px 6px', marginLeft: 8, color: 'var(--ink-soft)' }}>em breve</span>
        </EmBreve>
      </div>
    </div>
  )
}
