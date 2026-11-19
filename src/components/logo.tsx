import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-sm font-semibold text-white">
        B8
      </div>
      <span className="text-lg font-semibold tracking-tight">B8</span>
    </div>
  )
}
