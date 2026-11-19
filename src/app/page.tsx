'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

/** Splash idêntica ao protótipo: logo, tagline e barra de carregamento (2,2s). */
export default function Splash() {
  const router = useRouter()
  const [bar, setBar] = useState(0)
  const [fade, setFade] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setBar(100), 100)
    const t2 = setTimeout(() => setFade(true), 2200)
    const t3 = setTimeout(() => router.replace('/dashboard'), 2600)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [router])

  return (
    <div id="screen-splash" className={fade ? 'fade-out' : undefined}>
      <div className="splash-logo">B8</div>
      <div className="splash-tagline">Gestão de projetos para arquitetos</div>
      <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 6, letterSpacing: '.5px' }}>Carregando...</div>
      <div className="splash-loader">
        <div className="splash-loader-bar" id="splash-bar" style={{ width: `${bar}%` }} />
      </div>
    </div>
  )
}
