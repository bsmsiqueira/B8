'use client'

/** Mesmo toast "— em breve" do protótipo. */
export function mostrarEmBreve(funcionalidade?: string) {
  let el = document.getElementById('toast-em-breve') as (HTMLDivElement & { _t?: number }) | null
  if (!el) {
    el = document.createElement('div')
    el.id = 'toast-em-breve'
    el.className = 'toast-em-breve'
    document.body.appendChild(el)
  }
  const toast = el
  toast.textContent = (funcionalidade || 'Funcionalidade') + ' — em breve'
  toast.style.opacity = '1'
  window.clearTimeout(toast._t)
  toast._t = window.setTimeout(() => {
    toast.style.opacity = '0'
  }, 2000)
}
