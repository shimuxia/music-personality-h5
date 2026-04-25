import type { CSSProperties } from 'react'

interface TagProps {
  children: string
  className?: string
  style?: CSSProperties
}

export function Tag({ children, className = '', style }: TagProps) {
  return (
    <span
      className={`rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs tracking-[0.18em] text-mist/70 hover:border-white/15 hover:bg-white/[0.06] transition-colors duration-300 ${className}`}
      style={style}
    >
      {children}
    </span>
  )
}
