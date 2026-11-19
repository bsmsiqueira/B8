'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { salvarPerfil, type PerfilState } from './actions'
import { logout } from '@/app/login/actions'

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 12px',
  fontFamily: "'Inter',sans-serif", fontSize: 14, color: 'var(--ink)', background: 'var(--paper)',
}

function Salvar() {
  const { pending } = useFormStatus()
  return (
    <button className="btn-primary" style={{ marginBottom: 10 }} type="submit" disabled={pending}>
      {pending ? 'Salvando...' : 'Salvar alterações'}
    </button>
  )
}

export function PerfilForm({ nome, email, escritorio, podeEditarEscritorio }: {
  nome: string; email: string; escritorio: string; podeEditarEscritorio: boolean
}) {
  const [state, action] = useFormState<PerfilState, FormData>(salvarPerfil, {})

  return (
    <>
      <form action={action}>
        <div className="form-block">
          <div className="form-block-title">Dados da conta</div>
          <div className="field"><label>Nome</label><input name="nome" defaultValue={nome} style={inputStyle} /></div>
          <div className="field"><label>E-mail</label><input value={email} readOnly style={{ ...inputStyle, color: 'var(--ink-soft)' }} /></div>
        </div>

        <div className="form-block">
          <div className="form-block-title">Escritório</div>
          <div className="field">
            <label>Nome do escritório</label>
            <input name="escritorio" defaultValue={escritorio} readOnly={!podeEditarEscritorio} style={inputStyle} />
          </div>
        </div>

        {state.error && <div className="login-error">{state.error}</div>}
        {state.ok && <div className="login-error" style={{ color: 'var(--green)' }}>Alterações salvas.</div>}
        <Salvar />
      </form>
      <form action={logout}>
        <button className="btn-secondary" style={{ color: 'var(--red)', borderColor: 'var(--red)' }} type="submit">Sair da conta</button>
      </form>
    </>
  )
}
