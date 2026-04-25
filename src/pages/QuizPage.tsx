import { GlassPanel } from '../components/shared/GlassPanel'
import type { Question, QuestionOption } from '../types/quiz'

interface QuizPageProps {
  currentIndex: number
  question: Question
  total: number
  onRestart: () => void
  onSelect: (option: QuestionOption) => void
}

export function QuizPage({
  currentIndex,
  question,
  total,
  onRestart,
  onSelect,
}: QuizPageProps) {
  const progress = ((currentIndex + 1) / total) * 100

  return (
    <main className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-4xl flex-col justify-center py-6">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={onRestart}
            className="rounded-full border border-white/8 bg-white/[0.02] px-4 py-2 text-xs text-mist/65 transition-all duration-200 hover:border-white/12 hover:bg-white/[0.04] hover:-translate-y-0.5"
          >
            返回首页
          </button>
          <div className="flex items-center gap-3 text-xs text-mist/50">
            <span className="font-medium tabular-nums tracking-wider">
              {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <span className="hidden sm:inline text-mist/40">•</span>
            <span className="hidden sm:inline text-mist/40">快速测试</span>
          </div>
        </div>

        <div className="flex-1 sm:max-w-sm">
          <div className="relative">
            <div className="h-[2px] overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sand/70 to-sand transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div
              className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-sand transition-all duration-700 ease-out"
              style={{ left: `${Math.max(0, Math.min(100, progress))}%`, transform: 'translateX(-50%) translateY(-50%)' }}
            />
          </div>
        </div>
      </header>

      <GlassPanel className="p-6 sm:p-8">
        {/* 使用key让内容独立切换，避免影响进度条 */}
        <div key={`question-${currentIndex}`} className="animate-[questionSlide_400ms_ease-out_forwards]">
          <p className="text-[10px] uppercase tracking-[0.32em] text-sand/70 font-medium">Question</p>
          <h1 className="mt-5 font-display text-2xl leading-[1.3] text-mist sm:text-3xl lg:text-[32px] max-w-2xl">
            {question.prompt}
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-[1.6] text-mist/65 font-light">{question.scene}</p>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:gap-4">
            {question.options.map((option, index) => (
              <button
                key={option.id}
                type="button"
                onClick={() => onSelect(option)}
                className="group relative rounded-2xl border border-white/6 bg-white/[0.015] p-5 text-left transition-all duration-250 hover:-translate-y-0.5 hover:border-sand/20 hover:bg-white/[0.04] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-sand/25 focus:ring-offset-2 focus:ring-offset-transparent animate-[optionFade_300ms_ease-out_forwards] opacity-0"
                style={{
                  animationDelay: `${index * 60 + 150}ms`
                }}
              >
                {/* 悬浮时的微妙背景光效 */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sand/3 via-transparent to-white/2 opacity-0 transition-opacity duration-250 group-hover:opacity-100"></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-mist/35 font-medium">
                      {option.label}
                    </span>
                    <div className="h-1.5 w-1.5 rounded-full bg-white/8 transition-all duration-200 group-hover:bg-sand/50"></div>
                  </div>
                  <p className="text-[14px] leading-[1.5] text-mist/80 group-hover:text-mist/90 transition-colors font-light">
                    {option.text}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </GlassPanel>
    </main>
  )
}
