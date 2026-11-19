import { createClient } from '@/lib/supabase/server'
import type { Role } from '@/lib/session'

export type Pessoa = { id: string; full_name: string | null; email: string; role: Role }

export async function listarEquipe(): Promise<Pessoa[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('profiles')
    .select('id, full_name, email, role')
    .in('role', ['owner', 'member'])
    .order('created_at', { ascending: true })
  return (data ?? []) as Pessoa[]
}

export const nomeDe = (p: Pessoa) => p.full_name || p.email.split('@')[0]
