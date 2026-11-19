/**
 * Configuração pública do Supabase.
 * A anon key é PÚBLICA por design (vai para o navegador de qualquer forma);
 * quem protege os dados são as políticas RLS do banco.
 * Variáveis de ambiente, se definidas na Vercel, têm prioridade.
 * NUNCA coloque a service_role key aqui.
 */
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qruomqvcllgcwqyawund.supabase.co'

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFydW9tcXZjbGxnY3dxeWF3dW5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUwNDYyNzksImV4cCI6MjExMDYyMjI3OX0.avFpq4o7XUPn8PwLoNhR9HSbCREO0Bw9qiRNl0Zu59I'
