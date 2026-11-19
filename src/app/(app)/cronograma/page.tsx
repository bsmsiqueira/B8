import { agoraSP, diasPT, mesesFull } from '@/lib/format'

export const dynamic = 'force-dynamic'

const rotulo: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: 'var(--ink-soft)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.5px' }
const diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex']

/** Cronograma global: mesmo cabeçalho do protótipo; as tarefas entram quando o módulo de tarefas existir. */
export default function CronogramaPage() {
  const { date: hoje } = agoraSP()
  const mes = mesesFull[hoje.getMonth()]
  const seg = new Date(hoje)
  seg.setDate(hoje.getDate() - ((hoje.getDay() + 6) % 7))
  const semana = diasSemana.map((d, i) => {
    const dt = new Date(seg)
    dt.setDate(seg.getDate() + i)
    return { d, n: dt.getDate(), hoje: dt.getTime() === hoje.getTime() }
  })

  return (
    <div className="screen active" id="screen-calendario">
      <div className="cal-header">
        <div className="cal-month-title">{`${mes.charAt(0).toUpperCase() + mes.slice(1)} ${hoje.getFullYear()}`}</div>
        <div className="cal-nav-btns">
          <div className="cal-nav-btn"><svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg></div>
          <div className="cal-nav-btn"><svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg></div>
        </div>
      </div>
      <div className="view-tabs">
        <div className="view-tab">Mensal</div>
        <div className="view-tab active">Semanal</div>
      </div>
      <div style={{ marginBottom: 10 }}>
        <div style={rotulo}>Cliente</div>
        <div className="prof-filters">
          <div className="prof-filter active" style={{ color: 'var(--ink)', borderColor: 'var(--ink)' }}>Todos</div>
        </div>
      </div>
      <div style={{ marginBottom: 10 }}>
        <div style={rotulo}>Profissional</div>
        <div className="prof-filters">
          <div className="prof-filter active" style={{ color: 'var(--ink)', borderColor: 'var(--ink)' }}>
            <div className="prof-dot" style={{ background: 'var(--ink)' }} />Todos
          </div>
        </div>
      </div>
      <div className="week-grid">
        <div className="week-days-header">
          <div />
          {semana.map((s) => (
            <div key={s.d} className={'week-day-label' + (s.hoje ? ' today-col' : '')}>
              {s.d}<br /><strong>{s.n}</strong>
            </div>
          ))}
        </div>
      </div>
      <div className="today-events" id="cal-semanal-events">
        <div className="today-label" id="cal-hoje-label">{`Hoje — ${diasPT[hoje.getDay()]}, ${hoje.getDate()} de ${mes}`}</div>
        <div className="empty-card">Nenhuma tarefa nesta semana.</div>
      </div>
    </div>
  )
}
