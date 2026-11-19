'use client'

import { mostrarEmBreve } from './em-breve'

/** Elemento clicável que só mostra o toast "em breve" (igual ao protótipo). */
export function EmBreve({
  label,
  className,
  style,
  children,
}: {
  label: string
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  return (
    <div className={className} style={style} onClick={() => mostrarEmBreve(label)}>
      {children}
    </div>
  )
}
