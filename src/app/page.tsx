'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/logo'

/**
 * Splash: mostra a marca por ~1,2s e segue para o dashboard.
 * Se não houver sessão, o middleware redireciona para /login.
 */
export default function Splash() {
  const router = useRouter()

  useEffect(() => {
    const t = setTimeout(() => router.replace('/dashboard'), 1200)
    return () => clearTimeout(t)
  }, [router])

  return (
    <main className="grid min-h-dvh place-items-center">
      <div className="animate-fade-up flex flex-col items-center gap-4">
        <Logo />
        <div className="h-0.5 w-24 overflow-hidden rounded-full bg-line">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-accent" />
        </div>
      </div>
    </main>
  )
}
