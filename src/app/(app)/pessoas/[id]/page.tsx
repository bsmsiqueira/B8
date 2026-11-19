import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { listarEquipe, nomeDe } from '@/lib/pessoas'
import { roleLabel } from '@/lib/session'
import { coresEquipe, iniciais } from '@/lib/format'

export const dynamic = 'force-dynamic'

const bloco: React.CSSProperties = { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '14px 16px', marginBottom: 12 }
const rotulo: React.CSSProperties = { fontSize: 10, fontWeight: 600, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 8 }

export default async function MembroPage({ params }: { params: { id: string } }) {
  const equipe = await listarEquipe()
  const idx = equipe.findIndex((p) => p.id === params.id)
  if (idx < 0) notFound()
  const p = equipe[idx]
  const cor = p.role === 'owner' ? 'var(--green)' : coresEquipe[idx % coresEquipe.length]

  const supabase = createClient()
  const { data: projetos } = await supabase.from('projects').select('id, name').eq('created_by', p.id).eq('status', 'ativo')

  return (
    <div className="screen active" id="screen-membro">
      <Link href="/pessoas" className="back-row" style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20, cursor: 'pointer', color: 'var(--ink-soft)', fontSize: 13 }}>
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
        Equipe
      </Link>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: cor, color: '#fff', fontSize: 18, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
          {iniciais(nomeDe(p))}
        </div>
        <div style={{ fontSize: 18, fontWeight: 600, fontFamily: "'Cormorant Garamond',serif" }}>{nomeDe(p)}</div>
        <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 3 }}>{roleLabel[p.role]}</div>
      </div>

      <div style={bloco}>
        <div style={rotulo}>Tipo de acesso</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="15" height="15" fill="none" stroke="var(--green)" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            <span style={{ fontSize: 13, fontWeight: 500 }}>{p.role === 'owner' ? 'Proprietário' : 'Funcionário'}</span>
          </div>
          <div style={{ fontSize: 10, background: 'var(--border)', borderRadius: 4, padding: '2px 7px', color: 'var(--ink-soft)' }}>em breve editar</div>
        </div>
      </div>

      <div style={bloco}>
        <div style={rotulo}>E-mail de acesso</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="15" height="15" fill="none" stroke="var(--ink-soft)" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
          <span style={{ fontSize: 13, color: 'var(--ink)' }}>{p.email}</span>
        </div>
      </div>

      <div style={{ ...bloco, marginBottom: 24 }}>
        <div style={{ ...rotulo, marginBottom: 10 }}>Projetos atribuídos</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {(projetos ?? []).length === 0 && <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>Nenhum projeto ainda</span>}
          {(projetos ?? []).map((pr) => (
            <div key={pr.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
              <svg width="13" height="13" fill="none" stroke="var(--ink-soft)" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" /></svg>
              <span style={{ fontSize: 13 }}>{pr.name}</span>
            </div>
          ))}
        </div>
      </div>

      <button style={{ width: '100%', padding: 13, borderRadius: 'var(--r)', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--ink-soft)', fontSize: 13, fontWeight: 500, cursor: 'default', opacity: 0.5 }} disabled>
        Remover acesso <span style={{ fontSize: 10, background: 'var(--border)', borderRadius: 4, padding: '1px 6px', marginLeft: 4 }}>em breve</span>
      </button>
    </div>
  )
}
