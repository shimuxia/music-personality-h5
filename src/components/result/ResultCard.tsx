import { Tag } from '../shared/Tag'
import type { ResultProfile } from '../../types/quiz'

interface ResultCardProps {
  result: ResultProfile
}

// 为每个音符定义专属的色彩主题
const noteThemes = {
  C: { glow: 'bg-amber-200/25', border: 'border-amber-200/20', accent: 'text-amber-200/90' },
  D: { glow: 'bg-slate-200/20', border: 'border-slate-200/15', accent: 'text-slate-200/85' },
  E: { glow: 'bg-orange-200/30', border: 'border-orange-200/25', accent: 'text-orange-200/90' },
  F: { glow: 'bg-blue-200/20', border: 'border-blue-200/15', accent: 'text-blue-200/80' },
  G: { glow: 'bg-gray-200/18', border: 'border-gray-200/12', accent: 'text-gray-200/85' },
  A: { glow: 'bg-yellow-100/22', border: 'border-yellow-100/18', accent: 'text-yellow-100/88' },
  B: { glow: 'bg-cyan-200/25', border: 'border-cyan-200/20', accent: 'text-cyan-200/90' },
} as const

export function ResultCard({ result }: ResultCardProps) {
  const theme = noteThemes[result.note as keyof typeof noteThemes]

  return (
    <article className="glass-panel staff-mask relative overflow-hidden rounded-[32px] p-6 sm:p-8 group">
      {/* 背景氛围光 */}
      <div className={`absolute inset-x-8 top-12 h-32 rounded-full ${theme.glow} blur-3xl opacity-60`} />
      <div className={`absolute inset-x-16 bottom-20 h-24 rounded-full ${theme.glow} blur-2xl opacity-40`} />

      <div className="relative flex min-h-[480px] sm:min-h-[540px] flex-col">
        {/* 顶部标识 */}
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.24em] text-mist/45 font-medium">天命音符</p>
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/10"></div>
        </div>

        {/* 音符圆环 - 增强仪式感 */}
        <div className="mt-8 relative">
          {/* 外层呼吸发光环 */}
          <div className={`absolute inset-0 rounded-full ${theme.border} animate-[breathe_4s_ease-in-out_infinite] opacity-40`}></div>
          {/* 主音符圆环 */}
          <div className={`flex h-32 w-32 items-center justify-center rounded-full border ${theme.border} bg-white/[0.04] font-display text-7xl text-mist shadow-panel sm:h-36 sm:w-36 sm:text-8xl backdrop-blur-sm relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-700 ease-out`}>
            {/* 音符内部微光 */}
            <div className={`absolute inset-2 rounded-full ${theme.glow} animate-[innerGlow_3s_ease-in-out_infinite] opacity-15`}></div>
            {/* 音符字母 */}
            <span className="relative z-10 animate-[textGlow_3.5s_ease-in-out_infinite]" style={{
              textShadow: `0 0 20px var(--glow-color, rgba(255,255,255,0.3))`
            }}>{result.note}</span>
          </div>
        </div>

        {/* 人格名称 */}
        <h2 className={`mt-10 font-display text-[42px] leading-none sm:text-5xl ${theme.accent} tracking-tight`}>
          {result.title}
        </h2>

        {/* 色彩提示 - 更精致的呈现 */}
        <div className="mt-4 flex items-center gap-2">
          <div className="h-[2px] w-6 bg-gradient-to-r from-sand/60 to-transparent"></div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-sand/70 font-medium">
            {result.paletteHint}
          </p>
        </div>

        {/* 核心描述 */}
        <p className="mt-8 max-w-[280px] text-base leading-8 text-mist/75 font-light">
          "{result.subtitle}"
        </p>

        {/* 关键词标签 - 优化间距和样式 */}
        <div className="mt-auto flex flex-wrap gap-2.5 pt-12">
          {result.keywords.map((keyword, index) => (
            <Tag
              key={keyword}
              className={`animate-rise opacity-0`}
              style={{
                animationDelay: `${index * 100 + 300}ms`,
                animationFillMode: 'forwards'
              }}
            >
              {keyword}
            </Tag>
          ))}
        </div>

        {/* 底部水印 */}
        <div className="mt-6 flex items-center justify-between text-[9px] text-mist/25 uppercase tracking-[0.2em]">
          <span>Music Personality Test</span>
          <div className="h-px w-8 bg-gradient-to-r from-white/5 to-transparent"></div>
        </div>
      </div>
    </article>
  )
}
