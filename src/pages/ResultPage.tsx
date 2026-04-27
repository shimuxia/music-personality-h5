import { ResultCard } from '../components/result/ResultCard'
import { Tag } from '../components/shared/Tag'
import type { ResultProfile } from '../types/quiz'

interface ResultPageProps {
  result: ResultProfile
  onCopyShareText: () => void
  onRestart: () => void
  onOpenPrecision: () => void
  copied: boolean
  copyFailed: boolean
}

export function ResultPage({
  result,
  onCopyShareText,
  onRestart,
  onOpenPrecision,
  copied,
  copyFailed,
}: ResultPageProps) {
  return (
    <main className="flex min-h-[calc(100vh-2rem)] flex-col justify-start lg:justify-center py-8 pb-16 px-4">
      <section className="grid gap-12 lg:gap-8 lg:grid-cols-[minmax(0,1fr)_400px] max-w-6xl mx-auto w-full">
        <div className="animate-rise space-y-8">
          {/* 主要结果区 */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-sand/60 font-medium">Your Fate Note</p>
            <h1 className="mt-4 font-display text-[36px] leading-[1.1] text-mist sm:text-[48px] lg:text-[52px] max-w-2xl">
              {result.title}
            </h1>
            <p className="mt-4 text-[13px] uppercase tracking-[0.25em] text-sand/90 font-medium">
              天命音符 {result.note}
            </p>
          </div>

          {/* 核心评语区 */}
          <div>
            <p className="max-w-2xl text-[20px] leading-[1.4] text-mist/85 sm:text-[22px] font-light">
              "{result.subtitle}"
            </p>
          </div>

          {/* 描述区 */}
          <div>
            <p className="max-w-2xl text-[15px] leading-[1.6] text-mist/65 sm:text-[16px]">
              {result.description}
            </p>
          </div>

          {/* 标签区 */}
          <div className="flex flex-wrap gap-2.5">
            {result.keywords.map((keyword) => (
              <Tag key={keyword}>{keyword}</Tag>
            ))}
          </div>

          {/* 主要操作区 */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onCopyShareText}
                className={`rounded-full px-7 py-3.5 text-[14px] font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                  copyFailed
                    ? 'bg-red-400/80 text-ink'
                    : copied
                    ? 'bg-green-400/80 text-ink'
                    : 'bg-mist text-ink hover:bg-mist/90'
                }`}
              >
                {copyFailed
                  ? '复制失败，请手动长按截图'
                  : copied
                  ? '已复制分享文案'
                  : '复制分享文案'
                }
              </button>
              <button
                type="button"
                onClick={onRestart}
                className="rounded-full border border-white/8 bg-white/[0.025] px-6 py-3 text-[13px] text-mist/70 transition-all duration-200 hover:border-white/12 hover:bg-white/[0.04] hover:-translate-y-0.5"
              >
                重新测试
              </button>
            </div>
            <p className="text-[12px] text-mist/45 flex items-center gap-2">
              <span className="text-sand/50">📸</span>
              保存结果卡分享
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-white/6 bg-white/[0.012] p-6">
            <p className="max-w-lg text-[16px] leading-7 text-mist/72 font-light">
              你的主音符已经出现。
              <br />
              但一个人的旋律，往往不止一个音。
            </p>
            <button
              type="button"
              onClick={onOpenPrecision}
              className="mt-5 rounded-full border border-sand/18 bg-sand/[0.035] px-6 py-3 text-[13px] text-sand/75 transition-all duration-200 hover:-translate-y-0.5 hover:border-sand/30 hover:bg-sand/[0.055]"
            >
              查看精确版音格报告
            </button>
          </div>

          {/* 未来产品区 - 弱化处理 */}
          <div className="mt-12 p-6 rounded-2xl border border-white/4 bg-white/[0.008] relative">
            <div className="flex items-center gap-2 mb-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-mist/40 font-medium">即将推出</p>
              <div className="flex gap-1">
                <div className="w-0.5 h-0.5 rounded-full bg-sand/40 animate-pulse"></div>
                <div className="w-0.5 h-0.5 rounded-full bg-sand/40 animate-pulse delay-[200ms]"></div>
                <div className="w-0.5 h-0.5 rounded-full bg-sand/40 animate-pulse delay-[400ms]"></div>
              </div>
            </div>
            <h3 className="text-[16px] text-sand/70 font-light mb-6 max-w-lg">你的音符只是开始，真正的音乐还在路上</h3>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ['🎵 凑音符', '收集7个命运音符，解锁专属人格乐谱'],
                ['🎹 生成旋律', 'AI转化人格为独特的旋律种子'],
                ['🎮 节奏互动', '用你的情绪掌控音乐节拍'],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-xl border border-white/6 bg-white/[0.015] p-4 transition-all duration-200 hover:border-sand/15 hover:bg-white/[0.025]"
                >
                  <p className="text-[13px] text-mist/70 font-medium">{title}</p>
                  <p className="mt-2 text-[11px] leading-[1.4] text-mist/50">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 text-center">
              <p className="text-[10px] text-sand/45 tracking-wide font-light">
                关注更新 · 第一时间体验完整版
              </p>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-8 lg:self-start opacity-90">
          <ResultCard result={result} />
        </div>
      </section>
    </main>
  )
}
