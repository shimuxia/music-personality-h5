import { useMemo, useState, useRef, useEffect } from 'react'
import { GlassPanel } from '../components/shared/GlassPanel'
import { precisionQuestions } from '../data/precisionQuestions'
import { resolvePrecisionResult, type PrecisionAnswers } from '../utils/resolvePrecisionResult'

interface PrecisionResultPageProps {
  answers: PrecisionAnswers
  onRestart: () => void
  onReturnHome: () => void
}

interface ReportSectionProps {
  title: string
  content: string
}

function ReportSection({ title, content }: ReportSectionProps) {
  return (
    <section className="rounded-2xl border border-white/6 bg-white/[0.014] p-5 sm:p-6">
      <h3 className="text-[12px] font-medium uppercase tracking-[0.24em] text-sand/55">
        {title}
      </h3>
      <p className="mt-4 text-[15px] leading-7 text-mist/68">
        {content}
      </p>
    </section>
  )
}

export function PrecisionResultPage({ answers, onRestart, onReturnHome }: PrecisionResultPageProps) {
  const result = useMemo(() => resolvePrecisionResult(answers), [answers])
  const [copyState, setCopyState] = useState<{
    type: 'summary' | 'share' | 'feedback' | null
    status: 'idle' | 'success' | 'error'
  }>({ type: null, status: 'idle' })
  const copyTimerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current)
      }
    }
  }, [])
  const primaryReportSections = [
    ['你最明显的样子', result.primaryReport.visibleSelf],
    ['你不容易被看见的部分', result.primaryReport.hiddenSelf],
    ['你在关系里的模式', result.primaryReport.relationshipPattern],
    ['你面对压力时的习惯', result.primaryReport.stressPattern],
    ['你容易踩的坑', result.primaryReport.blindSpot],
    ['你真正需要练习的事', result.primaryReport.practice],
    ['适合你的成长提醒', result.primaryReport.growthReminder],
    ['适合公开分享的一句话', result.primaryReport.publicShareLine],
    ['更私密、更刺中的一句话', result.primaryReport.privateHitLine],
  ] as const

  const handleCopy = async (type: 'summary' | 'share' | 'feedback') => {
    let textToCopy = ''

    if (type === 'summary') {
      textToCopy = `我的天命音符精确版结果：

主音格：${result.primaryNote}「${result.primaryReport.title}」
副音符：${result.secondaryBlackKey.label}
隐藏音格：${result.hiddenNote}「${result.hiddenReport.title}」

主音格摘要：
${result.primaryReport.summary}

更私密的一句话：
${result.primaryReport.privateHitLine}

测你的天命音符：
https://music-personality-h5.vercel.app/`
    } else if (type === 'share') {
      textToCopy = `我测出的天命音符是 ${result.primaryNote}「${result.primaryReport.title}」
副音符落在 ${result.secondaryBlackKey.label}
隐藏音格是 ${result.hiddenNote}「${result.hiddenReport.title}」

有一句话还挺准：
${result.primaryReport.privateHitLine}

来测你的天命音符：
https://music-personality-h5.vercel.app/`
    } else if (type === 'feedback') {
      textToCopy = `我刚测完天命音符精确版，想反馈这三点：

1. 最像我的一句话是：
2. 最不像我的一句话是：
3. 36 题做起来的感受是：

4. 我的结果是：
主音格：${result.primaryNote}「${result.primaryReport.title}」
副音符：${result.secondaryBlackKey.label}
隐藏音格：${result.hiddenNote}「${result.hiddenReport.title}」`
    }

    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopyState({ type, status: 'success' })

      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current)
      }

      copyTimerRef.current = window.setTimeout(() => {
        setCopyState({ type: null, status: 'idle' })
      }, 2200)
    } catch {
      setCopyState({ type, status: 'error' })

      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current)
      }

      copyTimerRef.current = window.setTimeout(() => {
        setCopyState({ type: null, status: 'idle' })
      }, 2200)
    }
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-5xl flex-col px-4 py-8 sm:px-6 lg:py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onReturnHome}
          className="rounded-full border border-white/8 bg-white/[0.02] px-4 py-2 text-xs text-mist/65 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/12 hover:bg-white/[0.04]"
        >
          返回首页
        </button>
        <p className="text-xs text-mist/45">
          已完成 {result.answeredCount} / {precisionQuestions.length} 题
        </p>
      </div>

      <GlassPanel className="p-5 sm:p-8 lg:p-10">
        <div className="space-y-10">
          <header>
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-sand/60">
              Precision Report
            </p>
            <h1 className="mt-4 font-display text-[34px] leading-[1.12] text-mist sm:text-[46px]">
              精确版音格报告
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-mist/60">
              这是一版精确测试内测结果，后续还会继续根据真实反馈调整。
            </p>
          </header>

          <section className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-sand/12 bg-sand/[0.03] p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-sand/45">Result</p>
              <p className="mt-3 text-[20px] leading-snug text-mist">
                主音符：{result.primaryNote}「{result.primaryReport.title}」
              </p>
            </div>
            <div className="rounded-2xl border border-sand/12 bg-sand/[0.03] p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-sand/45">Result</p>
              <p className="mt-3 text-[20px] leading-snug text-mist">
                副音符：{result.secondaryBlackKey.label}
              </p>
            </div>
            <div className="rounded-2xl border border-sand/12 bg-sand/[0.03] p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-sand/45">Result</p>
              <p className="mt-3 text-[20px] leading-snug text-mist">
                隐藏音格：{result.hiddenNote}「{result.hiddenReport.title}」
              </p>
            </div>
          </section>

          <section className="space-y-5">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-sand/55">
                Primary Note
              </p>
              <h2 className="mt-3 text-[28px] font-light leading-tight text-[#faf8f3] sm:text-[34px]">
                {result.primaryNote}「{result.primaryReport.title}」
              </h2>
              <p className="mt-4 max-w-3xl text-[22px] font-light leading-[1.45] text-mist/86">
                {result.primaryReport.coreLine}
              </p>
            </div>

            <ReportSection title="精确版报告短摘要" content={result.primaryReport.summary} />

            <div className="grid gap-4">
              {primaryReportSections.map(([title, content]) => (
                <ReportSection key={title} title={title} content={content} />
              ))}
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/8 bg-white/[0.018] p-5 sm:p-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-sand/50">
                Secondary Note
              </p>
              <h2 className="mt-3 text-[24px] font-light text-mist">
                副音符：{result.secondaryBlackKey.label}
              </h2>
              <p className="mt-4 text-[17px] leading-7 text-mist/78">
                {result.secondaryBlackKey.description}
              </p>
              <p className="mt-5 text-[13px] leading-6 text-mist/45">
                由你的主音符 {result.primaryNote} 与相邻倾向 {result.secondaryBlackKey.sourceNote} 共同形成。
              </p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.018] p-5 sm:p-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-sand/50">
                Hidden Note
              </p>
              <h2 className="mt-3 text-[24px] font-light text-mist">
                隐藏音格：{result.hiddenNote}「{result.hiddenReport.title}」
              </h2>
              <p className="mt-4 text-[17px] leading-7 text-mist/78">
                {result.hiddenReport.privateHitLine}
              </p>
              <p className="mt-5 text-[14px] leading-7 text-mist/58">
                {result.hiddenReport.summary}
              </p>
            </div>
          </section>

          {(result.missingQuestionIds.length > 0 || result.invalidAnswerIds.length > 0) && (
            <section className="rounded-2xl border border-red-300/12 bg-red-300/[0.035] p-5">
              <p className="text-[12px] font-medium text-red-100/70">结果提示</p>
              {result.missingQuestionIds.length > 0 && (
                <p className="mt-3 text-[13px] leading-6 text-mist/55">
                  未答题号：{result.missingQuestionIds.join('、')}
                </p>
              )}
              {result.invalidAnswerIds.length > 0 && (
                <p className="mt-2 text-[13px] leading-6 text-mist/55">
                  无效答案：{result.invalidAnswerIds.map(({ questionId, answerId }) => `${questionId}:${answerId}`).join('、')}
                </p>
              )}
            </section>
          )}

          {/* 复制功能区 */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => handleCopy('summary')}
                className={`rounded-full px-6 py-3 text-[14px] font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                  copyState.type === 'summary' && copyState.status === 'error'
                    ? 'bg-red-400/80 text-ink'
                    : copyState.type === 'summary' && copyState.status === 'success'
                    ? 'bg-green-400/80 text-ink'
                    : 'bg-mist text-ink hover:bg-mist/90'
                }`}
              >
                {copyState.type === 'summary' && copyState.status === 'error'
                  ? '复制失败，请手动选中文本'
                  : copyState.type === 'summary' && copyState.status === 'success'
                  ? '已复制，可以粘贴到任意地方'
                  : '复制报告摘要'
                }
              </button>
              <button
                type="button"
                onClick={() => handleCopy('share')}
                className={`rounded-full px-6 py-3 text-[14px] font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                  copyState.type === 'share' && copyState.status === 'error'
                    ? 'bg-red-400/80 text-ink'
                    : copyState.type === 'share' && copyState.status === 'success'
                    ? 'bg-green-400/80 text-ink'
                    : 'bg-sand text-ink hover:bg-sand/90'
                }`}
              >
                {copyState.type === 'share' && copyState.status === 'error'
                  ? '复制失败，请手动选中文本'
                  : copyState.type === 'share' && copyState.status === 'success'
                  ? '已复制，可以粘贴到任意地方'
                  : '复制分享文案'
                }
              </button>
            </div>
          </section>

          {/* 内测反馈提示区 */}
          <section className="rounded-2xl border border-white/4 bg-white/[0.008] p-5">
            <h3 className="text-[14px] font-medium text-mist/70 mb-3">
              帮我校准这个测试
            </h3>
            <p className="text-[13px] leading-6 text-mist/55 mb-4">
              如果你愿意，可以把结果发给我，并简单说三件事：
              <br />
              1. 哪句话最像你？
              <br />
              2. 哪句话不像你？
              <br />
              3. 36 题会不会太长？
            </p>
            <button
              type="button"
              onClick={() => handleCopy('feedback')}
              className={`rounded-full border border-white/8 bg-white/[0.025] px-5 py-2.5 text-[13px] text-mist/65 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/12 hover:bg-white/[0.04] ${
                copyState.type === 'feedback' && copyState.status === 'error'
                  ? 'border-red-300/20 bg-red-300/[0.035] text-red-200/70'
                  : copyState.type === 'feedback' && copyState.status === 'success'
                  ? 'border-green-300/20 bg-green-300/[0.035] text-green-200/70'
                  : ''
              }`}
            >
              {copyState.type === 'feedback' && copyState.status === 'error'
                ? '复制失败，请手动选中文本'
                : copyState.type === 'feedback' && copyState.status === 'success'
                ? '已复制，可以粘贴到任意地方'
                : '复制反馈问题'
              }
            </button>
          </section>

          <div className="flex flex-col gap-3 border-t border-white/6 pt-7 sm:flex-row">
            <button
              type="button"
              onClick={onRestart}
              className="rounded-full bg-mist px-7 py-3.5 text-[14px] font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-mist/90"
            >
              重新测试
            </button>
            <button
              type="button"
              onClick={onReturnHome}
              className="rounded-full border border-white/8 bg-white/[0.025] px-7 py-3.5 text-[14px] text-mist/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/12 hover:bg-white/[0.04]"
            >
              返回首页
            </button>
          </div>
        </div>
      </GlassPanel>
    </main>
  )
}
