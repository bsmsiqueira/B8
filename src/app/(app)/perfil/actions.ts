'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getSession } from '@/lib/session'

export type PerfilState = { ok?: boolean; error?: string }

export async function salvarPerfil(_prev: PerfilState, formData: FormData): Promise<PerfilState> {
  const s = await getSession()
  const supabase = createClient()
  const nome = String(formData.get('nome') ?? '').trim()
  const escritorio = String(formData.get('escritorio') ?? '').trim()

  if (!nome) return { error: 'Informe seu nome.' }

  const { error: e1 } = await supabase.from('profiles').update({ full_name: nome }).eq('id', s.userId)
  if (e1) return { error: 'Não foi possível salvar seu nome.' }

  if (s.role === 'owner' && escritorio) {
    const { error: e2 } = await supabase.from('organizations').update({ name: escritorio }).eq('id', s.orgId)
    if (e2) return { error: 'Não foi possível salvar o nome do escritório.' }
  }

  revalidatePath('/', 'layout')
  return { ok: true }
}
