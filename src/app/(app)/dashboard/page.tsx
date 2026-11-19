import Link from 'next/link'
import { getSession } from '@/lib/session'
import { agoraSP, diasPT, mesesFull, primeiroNome, saudacao } from '@/lib/format'
import { listarProjetosAtivos } from '@/lib/projetos'
import { AddProjectCard, ProjectCard, situacao } from '@/components/project-card'
import { EmBreve } from '@/components/em-breve-button'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const s = await getSession()
  const { date: hoje, hour } = agoraSP()
  const projetos = await listarProjetosAtivos()

  const atencao = projetos.filter((p) => situacao(p, hoje) === 'warn').length
  const atrasados = projetos.filter((p) => situacao(p, hoje) === 'late').length
  const n = projetos.length

  return (
    <div className="screen active" id="screen-dashboard">
      <div className="greeting">
        <h2 id="dash-greeting">{`${saudacao(hour)}, ${primeiroNome(s.nome)}`}</h2>
        <div className="greeting-date" id="dash-date">
          {`${diasPT[hoje.getDay()]}, ${hoje.getDate()} de ${mesesFull[hoje.getMonth()]} · ${n} ${n === 1 ? 'projeto ativo' : 'projetos ativos'}`}
        </div>
      </div>
      <div className="stats-row">
        <div className="stat"><div className="stat-n green">{n}</div><div className="stat-l">Em andamento</div></div>
        <div className="stat"><div className="stat-n amber">{atencao}</div><div className="stat-l">Atenção</div></div>
        <div className="stat"><div className="stat-n red">{atrasados}</div><div className="stat-l">Atrasado</div></div>
      </div>

      <div className="section-row">
        <div className="section-title">Projetos</div>
        <EmBreve className="link" label="Novo projeto">+ Novo</EmBreve>
      </div>
      {projetos.slice(0, 5).map((p) => (
        <ProjectCard key={p.id} p={p} hoje={hoje} />
      ))}
      {projetos.length > 5 && (
        <Link href="/projetos" className="link" style={{ display: 'block', textAlign: 'center', margin: '4px 0 12px' }}>
          Ver todos os projetos
        </Link>
      )}
      <AddProjectCard />
    </div>
  )
}
