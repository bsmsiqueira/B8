# B8

Plataforma para arquitetos, designers de interiores e seus clientes.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase (auth + banco) via `@supabase/ssr`
- Deploy: Vercel (deploy automático a cada commit na `main`)

## Estrutura
```
src/
  app/
    page.tsx            → splash (marca) → /dashboard
    login/              → tela de login + server actions (login/logout)
    dashboard/          → área logada (protegida)
  components/           → componentes de UI
  lib/
    supabase/client.ts  → Supabase no navegador
    supabase/server.ts  → Supabase no servidor
    supabase/middleware.ts → renova sessão + protege rotas
    utils.ts            → cn() para classes Tailwind
  middleware.ts
```

## Variáveis de ambiente (Vercel → Settings → Environment Variables)
| Nome | Valor |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://qruomqvcllgcwqyawund.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → `anon public` |

## Acesso
Somente por convite (sem auto-cadastro). Usuários de teste podem ser criados em
Supabase → Authentication → Users → Add user.
