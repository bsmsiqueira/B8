import { EmBreve } from './em-breve-button'

export type ProjetoResumo = {
  id: string
  name: string
  status: string
  phase: string | null
  area_m2: number | null
  due_date: string | null
  clients: { name: string } | null
}

export type Situacao = 'ok' | 'warn' | 'late'

/** No prazo / Atenção (vence em até 14 dias) / Atrasado (prazo final já passou). */
export function situacao(p: ProjetoResumo, hoje: Date): Situacao {
  if (!p.due_date) return 'ok'
  const due = new Date(p.due_date + 'T00:00:00')
  const dias = Math.round((due.getTime() - hoje.getTime()) / 86400000)
  if (dias < 0) return 'late'
  if (dias <= 14) return 'warn'
  return 'ok'
}

const badge: Record<Situacao, { cls: string; label: string }> = {
  ok: { cls: 'badge badge-ok', label: 'No prazo' },
  warn: { cls: 'badge badge-warn', label: 'Atenção' },
  late: { cls: 'badge badge-late', label: 'Atrasado' },
}

/** Card de projeto no mesmo layout do protótipo. */
export function ProjectCard({ p, hoje }: { p: ProjetoResumo; hoje: Date }) {
  const s = situacao(p, hoje)
  const titulo = p.clients?.name ? `${p.name} — ${p.clients.name}` : p.name
  const meta = [p.phase || 'Sem etapa definida', p.area_m2 ? `${Number(p.area_m2).toLocaleString('pt-BR')} m²` : null]
    .filter(Boolean)
    .join(' · ')

  return (
    <EmBreve className="project-card" label="Detalhe do projeto">
      <div className="project-top">
        <div className="project-name">{titulo}</div>
        <span className={badge[s].cls}>{badge[s].label}</span>
      </div>
      <div className="project-meta" style={{ marginBottom: s === 'late' ? 12 : 0 }}>{meta}</div>
      {s === 'late' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 10px', background: 'var(--red-light)', borderRadius: 7 }}>
          <svg width="13" height="13" fill="none" stroke="var(--red)" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
          <span style={{ fontSize: 11, color: 'var(--red)', fontWeight: 500 }}>Prazo final vencido</span>
        </div>
      )}
    </EmBreve>
  )
}

/** Card tracejado "Adicionar projeto" do protótipo. */
export function AddProjectCard() {
  return (
    <EmBreve
      className="project-card"
      label="Novo projeto"
      style={{ border: '1.5px dashed var(--border)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 20, cursor: 'pointer', color: 'var(--ink-soft)' }}
    >
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
      <span style={{ fontSize: 13, fontWeight: 500 }}>Adicionar projeto</span>
    </EmBreve>
  )
}
