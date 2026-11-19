'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'
import { Logo } from '@/components/logo'
import { login, type LoginState } from './actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      Entrar
    </button>
  )
}

const inputClass =
  'h-11 w-full rounded-xl border border-line bg-paper-raised px-3 text-sm outline-none transition placeholder:text-ink-muted focus:border-accent focus:ring-2 focus:ring-accent/15'

export default function LoginPage() {
  const [state, formAction] = useFormState<LoginState, FormData>(login, {})

  return (
    <main className="grid min-h-dvh place-items-center px-5">
      <div className="animate-fade-up w-full max-w-sm">
        <Logo className="mb-10 justify-center" />

        <div className="rounded-xl border border-line bg-paper-raised p-6 shadow-card">
          <h1 className="text-xl font-semibold tracking-tight">Bem-vindo de volta</h1>
          <p className="mt-1 text-sm text-ink-muted">Entre para acessar seus projetos.</p>

          <form action={formAction} className="mt-6 space-y-3">
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="E-mail"
              className={inputClass}
              required
            />
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Senha"
              className={inputClass}
              required
            />

            {state.error && <p className="text-sm text-danger">{state.error}</p>}

            <div className="pt-2">
              <SubmitButton />
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-ink-muted">
          Acesso somente por convite do seu escritório.
        </p>
      </div>
    </main>
  )
}
