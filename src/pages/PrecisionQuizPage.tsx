import { GlassPanel } from '../components/shared/GlassPanel'
import { precisionQuestions, type PrecisionOptionId } from '../data/precisionQuestions'

type PrecisionAnswers = Partial<Record<string, PrecisionOptionId>>

interface PrecisionQuizPageProps {
  currentIndex: number
  answers: PrecisionAnswers
  onReturnHome: () => void
  onPrevious: () => void
  onSelect: (optionId: PrecisionOptionId) => void
}

export function PrecisionQuizPage({
  currentIndex,
  answers,
  onReturnHome,
  onPrevious,
  onSelect,
}: PrecisionQuizPageProps) {
  const total = precisionQuestions.length
  const question = precisionQuestions[currentIndex] ?? precisionQuestions[0]
  const progress = ((currentIndex + 1) / total) * 100
  const canGoPrevious = currentIndex > 0
  const selectedAnswer = answers[question.id]

  return (
    <main className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-4xl flex-col justify-center px-4 py-6 sm:px-6">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onReturnHome}
            className="rounded-full border border-white/8 bg-white/[0.02] px-4 py-2 text-xs text-mist/65 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/12 hover:bg-white/[0.04]"
          >
            返回首页
          </button>
          <button
            type="button"
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className="rounded-full border border-white/8 bg-white/[0.02] px-4 py-2 text-xs text-mist/65 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/12 hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0 disabled:hover:border-white/8 disabled:hover:bg-white/[0.02]"
          >
            上一题
          </button>
          <div className="flex items-center gap-3 text-xs text-mist/50">
            <span className="font-medium tabular-nums tracking-wider">
              {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <span className="text-mist/40">•</span>
            <span className="text-mist/45">{question.dimensionName}</span>
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
              className="absolute top-1/2 h-1.5 w-1.5 rounded-full bg-sand transition-all duration-700 ease-out"
              style={{
                left: `${Math.max(0, Math.min(100, progress))}%`,
                transform: 'translateX(-50%) translateY(-50%)',
              }}
            />
          </div>
        </div>
      </header>

      <GlassPanel className="p-5 sm:p-8">
        <div key={`precision-question-${question.id}`} className="animate-[questionSlide_400ms_ease-out_forwards]">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-sand/70">
              Precision Test
            </p>
            <span className="rounded-full border border-sand/15 bg-sand/[0.035] px-3 py-1 text-[11px] text-sand/65">
              {question.type === 'deep' ? '深层题' : question.dimensionName}
            </span>
          </div>

          <h1 className="mt-5 max-w-2xl font-display text-2xl leading-[1.3] text-mist sm:text-3xl lg:text-[32px]">
            {question.question}
          </h1>
          <p className="mt-5 max-w-xl text-[15px] font-light leading-[1.6] text-mist/65">
            {question.scene}
          </p>

          <div className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 lg:gap-4">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === option.id

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onSelect(option.id)}
                  className={`group relative rounded-2xl border p-5 text-left transition-all duration-250 hover:-translate-y-0.5 hover:border-sand/20 hover:bg-white/[0.04] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-sand/25 focus:ring-offset-2 focus:ring-offset-transparent animate-[optionFade_300ms_ease-out_forwards] opacity-0 ${
                    isSelected
                      ? 'border-sand/35 bg-sand/[0.055] shadow-[0_0_0_1px_rgba(214,196,162,0.08)]'
                      : 'border-white/6 bg-white/[0.015]'
                  }`}
                  aria-pressed={isSelected}
                  style={{ animationDelay: `${index * 60 + 150}ms` }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sand/3 via-transparent to-white/2 opacity-0 transition-opacity duration-250 group-hover:opacity-100" />

                  <div className="relative z-10">
                    <div className="mb-3 flex items-start justify-between">
                      <span className={`text-[9px] font-medium uppercase tracking-[0.3em] ${isSelected ? 'text-sand/75' : 'text-mist/35'}`}>
                        {option.id}
                      </span>
                      <div className={`h-1.5 w-1.5 rounded-full transition-all duration-200 group-hover:bg-sand/50 ${isSelected ? 'bg-sand/70' : 'bg-white/8'}`} />
                    </div>
                    <p className={`text-[14px] font-light leading-[1.5] transition-colors ${isSelected ? 'text-mist/95' : 'text-mist/80 group-hover:text-mist/90'}`}>
                      {option.text}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </GlassPanel>
    </main>
  )
}
