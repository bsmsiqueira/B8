import { createClient } from '@/lib/supabase/server'
import type { ProjetoResumo } from '@/components/project-card'

export async function listarProjetosAtivos(): Promise<ProjetoResumo[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('projects')
    .select('id, name, status, phase, area_m2, due_date, clients(name)')
    .eq('status', 'ativo')
    .order('created_at', { ascending: false })
  return (data ?? []) as unknown as ProjetoResumo[]
}
