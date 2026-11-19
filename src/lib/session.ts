import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type Role = 'owner' | 'member' | 'client'

export type SessionContext = {
  userId: string
  email: string
  nome: string
  role: Role
  orgId: string
  orgName: string
}

/** Usuário logado + perfil + escritório. Redireciona para /login se não houver sessão. */
export async function getSession(): Promise<SessionContext> {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, role, org_id, organizations(name)')
    .eq('id', user.id)
    .single()

  const org = profile?.organizations as unknown as { name: string } | null
  const email = profile?.email ?? user.email ?? ''

  return {
    userId: user.id,
    email,
    nome: profile?.full_name || email.split('@')[0],
    role: (profile?.role as Role) ?? 'member',
    orgId: profile?.org_id ?? '',
    orgName: org?.name ?? '',
  }
}

export const roleLabel: Record<Role, string> = {
  owner: 'Proprietário do escritório',
  member: 'Equipe',
  client: 'Cliente',
}
