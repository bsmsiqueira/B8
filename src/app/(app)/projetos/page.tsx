import Link from 'next/link'
import { agoraSP } from '@/lib/format'
import { listarProjetosAtivos } from '@/lib/projetos'
import { AddProjectCard, ProjectCard, situacao, type Situacao } from '@/components/project-card'
import { EmBreve } from '@/components/em-breve-button'

export const dynamic = 'force-dynamic'

const filtros: { key: 'todos' | Situacao; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'ok', label: 'No prazo' },
  { key: 'warn', label: 'Atenção' },
  { key: 'late', label: 'Atrasado' },
]

export default async function ProjetosPage({ searchParams }: { searchParams: { f?: string } }) {
  const { date: hoje } = agoraSP()
  const ativo = filtros.find((f) => f.key === searchParams.f)?.key ?? 'todos'
  const todos = await listarProjetosAtivos()
  const projetos = ativo === 'todos' ? todos : todos.filter((p) => situacao(p, hoje) === ativo)

  return (
    <div className="screen active" id="screen-projetos">
      <div className="section-row" style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 22 }}>Projetos</h2>
        <EmBreve className="link" label="Novo projeto">+ Novo</EmBreve>
      </div>

      <div className="prof-filters" style={{ marginBottom: 16 }}>
        {filtros.map((f) => (
          <Link
            key={f.key}
            href={f.key === 'todos' ? '/projetos' : `/projetos?f=${f.key}`}
            className={'prof-filter' + (ativo === f.key ? ' active' : '')}
            style={ativo === f.key ? { color: 'var(--ink)', borderColor: 'var(--ink)' } : undefined}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {projetos.map((p) => (
        <ProjectCard key={p.id} p={p} hoje={hoje} />
      ))}
      {projetos.length === 0 && ativo !== 'todos' && <div className="empty-card">Nenhum projeto neste filtro.</div>}

      <AddProjectCard />
    </div>
  )
}
