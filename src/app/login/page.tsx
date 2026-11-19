'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { mostrarEmBreve } from '@/components/em-breve'
import { login, type LoginState } from './actions'

function BotaoEntrar() {
  const { pending } = useFormStatus()
  return (
    <button className="btn-login-email" type="submit" disabled={pending} style={pending ? { opacity: 0.7 } : undefined}>
      {pending ? 'Entrando...' : 'Entrar'}
    </button>
  )
}

const emBreveTag: React.CSSProperties = { fontSize: 10, background: 'var(--border)', borderRadius: 4, padding: '1px 5px' }

/** Login idêntico ao protótipo. */
export default function LoginPage() {
  const [state, formAction] = useFormState<LoginState, FormData>(login, {})

  return (
    <div id="screen-login" className="active">
      <div className="login-top">
        <div className="login-logo">B8</div>
        <div className="login-sub">Para arquitetos e seus clientes</div>
        <div className="login-welcome">Bem-vindo de volta</div>
        <div className="login-desc">
          Acesse sua conta para gerenciar
          <br />
          seus projetos e clientes.
        </div>
      </div>
      <div className="login-bottom">
        <button className="btn-google" type="button" onClick={() => mostrarEmBreve('Login com Google')}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335" />
          </svg>
          Continuar com Google
        </button>
        <div className="login-divider">
          <span>ou entre com e-mail</span>
        </div>
        <form action={formAction}>
          <div className="login-fields">
            <input className="login-input" type="email" name="email" autoComplete="email" placeholder="seu@email.com" id="login-email" />
            <input className="login-input" type="password" name="password" autoComplete="current-password" placeholder="Senha" id="login-senha" />
          </div>
          {state.error && <div className="login-error">{state.error}</div>}
          <BotaoEntrar />
        </form>
        <div className="login-toggle">
          Não tem conta?{' '}
          <span style={{ color: 'var(--ink-soft)', cursor: 'default' }}>
            Criar conta <span style={{ ...emBreveTag, verticalAlign: 'middle' }}>em breve</span>
          </span>
        </div>
        <div className="login-terms">
          Ao continuar, você concorda com nossos
          <br />
          <span style={{ textDecoration: 'underline', color: 'var(--ink-soft)' }}>Termos de Uso</span> e{' '}
          <span style={{ textDecoration: 'underline', color: 'var(--ink-soft)' }}>Política de Privacidade</span>{' '}
          <span style={emBreveTag}>em breve</span>
        </div>
      </div>
    </div>
  )
}
