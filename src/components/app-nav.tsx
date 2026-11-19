'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { mostrarEmBreve } from './em-breve'

const itens = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
    ),
  },
  {
    href: '/cronograma',
    label: 'Cronograma',
    icon: (
      <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
    ),
  },
  {
    href: '/projetos',
    label: 'Projetos',
    icon: (
      <svg viewBox="0 0 24 24"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" /></svg>
    ),
  },
  {
    href: '/pessoas',
    label: 'Pessoas',
    icon: (
      <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>
    ),
  },
]

/** Menu inferior (mobile) / lateral (desktop) + botão flutuante, iguais ao protótipo. */
export function AppNav() {
  const pathname = usePathname()
  const fabVisivel = pathname === '/dashboard' || pathname === '/projetos'

  return (
    <>
      <nav className="bottom-nav">
        {itens.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={'nav-item' + (pathname.startsWith(item.href) ? ' active' : '')}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      <div
        className={'fab' + (fabVisivel ? '' : ' hidden')}
        id="main-fab"
        onClick={() => mostrarEmBreve('Novo projeto')}
      >
        <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
      </div>
    </>
  )
}
