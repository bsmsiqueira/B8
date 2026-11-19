export const diasPT = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
export const mesesFull = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

/** Data/hora atual no fuso de São Paulo (o servidor roda em UTC). */
export function agoraSP() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', hour12: false,
  }).formatToParts(new Date())
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value)
  const d = new Date(get('year'), get('month') - 1, get('day'))
  return { date: d, hour: get('hour') % 24 }
}

export function saudacao(hour: number) {
  return hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'
}

export function iniciais(nome: string) {
  const p = nome.trim().split(/\s+/).filter(Boolean)
  if (p.length === 0) return '?'
  if (p.length === 1) return p[0].slice(0, 2).toUpperCase()
  return (p[0][0] + p[p.length - 1][0]).toUpperCase()
}

export function primeiroNome(nome: string) {
  const n = nome.trim().split(/\s+/)[0] || ''
  return n.charAt(0).toUpperCase() + n.slice(1)
}

/** Cores dos profissionais do protótipo, em rodízio. */
export const coresEquipe = ['var(--joao)', 'var(--alex)', 'var(--nathalia)', 'var(--mari)']
