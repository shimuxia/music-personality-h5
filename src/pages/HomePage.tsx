import type { ResultProfile } from '../types/quiz'
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal'
import { HeroPiano } from '../components/shared/HeroPiano'

interface HomePageProps {
  profiles: ResultProfile[]
  onStart: () => void
}

export function HomePage({ profiles, onStart }: HomePageProps) {
  // 滚动显现hooks
  const sectionReveal = useScrollReveal<HTMLElement>({ threshold: 0.2 })
  const titleReveal = useScrollReveal<HTMLHeadingElement>({ threshold: 0.3 })
  const subtitleReveal = useScrollReveal<HTMLParagraphElement>({ threshold: 0.3 })
  const cardsStagger = useStaggerReveal<HTMLDivElement>(7, { threshold: 0.15 })
  const bottomNoteReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.5 })

  return (
    <main className="min-h-screen">
      {/* 首屏 Hero Section */}
      <section className="flex min-h-screen items-center relative overflow-hidden">
        {/* 背景视觉连接 */}
        <div className="absolute inset-0 hero-glow"></div>

        {/* 真实钢琴底图 */}
        <HeroPiano />

        {/* 蓝色粒子特效层 */}
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_340px] xl:gap-16 2xl:gap-20">

            {/* 左侧主内容 */}
            <div className="max-w-2xl lg:max-w-none">
              <p
                className="text-xs font-medium uppercase tracking-[0.28em] text-sand/80"
                style={{
                  animation: 'heroFadeUp 0.8s ease-out 0.1s both'
                }}
              >
                FATE NOTE TYPE
              </p>

              <div className="mt-10">
                <h1 className="font-sans tracking-[-0.01em]">
                  <div
                    className="text-[24px] font-light text-mist/70 sm:text-[28px] lg:text-[32px] leading-[1.2] mb-1 overflow-hidden"
                    style={{
                      animation: 'textRevealLeft 0.7s ease-out 0.25s both'
                    }}
                  >
                    测出你的
                  </div>
                  <div
                    className="text-[48px] font-normal text-[#faf8f3] sm:text-[64px] lg:text-[88px] leading-[0.9] tracking-[-0.03em] overflow-hidden"
                    style={{
                      animation: 'textRevealLeft 0.8s ease-out 0.4s both'
                    }}
                  >
                    天命音符
                  </div>
                </h1>
              </div>

              <p
                className="mt-10 max-w-md text-[17px] leading-[1.6] text-mist/70 font-light"
                style={{
                  animation: 'heroFadeUp 0.7s ease-out 0.65s both'
                }}
              >
                10 道题，不到 1 分钟，找到属于你的音格。
              </p>

              <div
                className="mt-14"
                style={{
                  animation: 'heroFadeUp 0.7s ease-out 0.8s both'
                }}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={onStart}
                    className="group inline-flex items-center justify-center rounded-[32px] bg-[#faf8f3] px-9 py-[14px] text-[15px] font-medium text-[#0a0b0f] transition-all duration-300 hover:bg-sand/90 hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(199,176,139,0.15)] focus:outline-none focus:ring-2 focus:ring-sand/30 focus:ring-offset-2 focus:ring-offset-transparent"
                  >
                    开始快速测试
                    <svg className="ml-2 w-[15px] h-[15px] transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    disabled
                    className="group inline-flex items-center justify-center rounded-[32px] border border-mist/10 bg-transparent px-9 py-[14px] text-[13px] font-light text-mist/40 transition-all duration-300 cursor-not-allowed"
                  >
                    进入精确版
                    <span className="ml-2 text-[10px] text-mist/25">Coming Soon</span>
                  </button>
                </div>

                <p
                  className="mt-7 text-[14px] text-mist/55 font-light tracking-[0.01em]"
                  style={{
                    animation: 'heroFadeUp 0.6s ease-out 0.95s both'
                  }}
                >
                  单选 · 无需登录 · 即刻生成结果卡
                </p>
              </div>
            </div>

            {/* 右侧示例卡片 - 精致版 */}
            <div className="mt-16 lg:mt-0 flex justify-center lg:justify-end">
              <div
                className="relative max-w-[320px] w-full lg:max-w-none"
                style={{
                  animation: 'cardFloatIn 0.9s ease-out 1.05s both'
                }}
              >
                {/* 背景光效增强 */}
                <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-sand/8 via-sand/2 to-white/[0.02]"></div>
                <div className="absolute inset-0 rounded-[28px] border border-white/[0.08] backdrop-blur-sm"></div>
                {/* 轻微背景暖光 */}
                <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-sand/[0.03] via-transparent to-transparent opacity-60"></div>

                <div className="relative p-8 lg:p-9">
                  <div className="flex items-center justify-between mb-8">
                    <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-sand/60">
                      结果预览
                    </p>
                    <div className="h-[1px] w-8 bg-gradient-to-r from-sand/20 to-transparent"></div>
                  </div>

                  <div className="relative mb-8">
                    <div className="absolute inset-0 rounded-full bg-sand/10 blur-md"></div>
                    <div className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full border border-sand/20 bg-white/[0.03] font-sans text-[36px] font-light text-sand backdrop-blur-sm">
                      A
                    </div>
                  </div>

                  <h3 className="mb-2 text-[28px] font-light leading-[1.1] text-[#faf8f3] tracking-[-0.01em]">
                    月影慢拍者
                  </h3>

                  <div className="mb-6 flex items-center gap-2">
                    <div className="h-[2px] w-4 bg-gradient-to-r from-sand/40 to-transparent rounded-full"></div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-sand/50 font-medium">
                      天命音符 A
                    </p>
                  </div>

                  <p className="mb-8 text-[15px] leading-[1.5] text-mist/65 font-light">
                    "你能听见别人没说出口的那一半情绪。"
                  </p>

                  <div className="flex flex-wrap gap-[6px]">
                    <span className="rounded-full border border-sand/15 bg-sand/[0.03] px-[14px] py-[6px] text-[11px] font-medium text-sand/70 tracking-[0.01em]">
                      温柔感应
                    </span>
                    <span className="rounded-full border border-white/8 bg-white/[0.02] px-[14px] py-[6px] text-[11px] font-medium text-mist/50 tracking-[0.01em]">
                      关系洞察
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 首屏底部轻量说明 */}
          <div
            ref={bottomNoteReveal.elementRef}
            className={`mt-20 lg:mt-24 text-center scroll-reveal-fast ${bottomNoteReveal.isRevealed ? 'revealed' : ''}`}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-sand/50">
              7 Notes / 7 Personalities
            </p>
          </div>
        </div>
      </section>

      {/* 第二屏 - 7 个音符展示 */}
      <section ref={sectionReveal.elementRef} className="py-24 sm:py-32 relative">
        {/* 背景光晕 */}
        <div className="absolute inset-0 section-glow"></div>

        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2
              ref={titleReveal.elementRef}
              className={`font-sans text-[32px] font-light tracking-[-0.02em] text-[#faf8f3] sm:text-[40px] lg:text-[48px] leading-[1.15] scroll-reveal ${titleReveal.isRevealed ? 'revealed' : ''}`}
            >
              七枚音符，七种共振方式
            </h2>
            <p
              ref={subtitleReveal.elementRef}
              className={`mt-8 text-[17px] leading-[1.6] text-mist/65 font-light max-w-lg mx-auto scroll-reveal-fast ${subtitleReveal.isRevealed ? 'revealed' : ''}`}
              style={{
                transitionDelay: subtitleReveal.isRevealed ? '0.1s' : '0s'
              }}
            >
              每个人都会落在某个频率里。你的答案，会决定哪一枚音符更接近你。
            </p>
          </div>

          <div ref={cardsStagger.containerRef} className="mt-16 sm:mt-20">
            {/* 第一行：4个音符 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-4 lg:mb-6">
              {profiles.slice(0, 4).map((profile, index) => (
                <div
                  key={profile.note}
                  className={`note-card group rounded-2xl p-6 lg:p-7 text-center stagger-item ${cardsStagger.revealedItems.has(index) ? 'revealed' : ''}`}
                >
                  <div className="relative mb-5">
                    <div className="absolute inset-0 rounded-full bg-sand/8 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <p className="relative font-sans text-[36px] lg:text-[40px] font-light text-sand transition-all duration-200 group-hover:text-sand/90">
                      {profile.note}
                    </p>
                  </div>
                  <h3 className="mb-3 text-[14px] lg:text-[15px] font-medium text-[#faf8f3] tracking-[0.01em] transition-colors duration-200 group-hover:text-sand/85">
                    {profile.title}
                  </h3>
                  <p className="text-[12px] leading-[1.4] text-mist/55 font-light transition-colors duration-200 group-hover:text-mist/70 overflow-hidden">
                    {profile.subtitle.slice(0, 24)}...
                  </p>
                </div>
              ))}
            </div>

            {/* 第二行：3个音符（居中） */}
            <div className="flex justify-center">
              <div className="grid grid-cols-3 gap-4 lg:gap-6 max-w-3xl w-full">
                {profiles.slice(4, 7).map((profile, index) => (
                  <div
                    key={profile.note}
                    className={`note-card group rounded-2xl p-6 lg:p-7 text-center stagger-item ${cardsStagger.revealedItems.has(index + 4) ? 'revealed' : ''}`}
                  >
                    <div className="relative mb-5">
                      <div className="absolute inset-0 rounded-full bg-sand/8 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <p className="relative font-sans text-[36px] lg:text-[40px] font-light text-sand transition-all duration-200 group-hover:text-sand/90">
                        {profile.note}
                      </p>
                    </div>
                    <h3 className="mb-3 text-[14px] lg:text-[15px] font-medium text-[#faf8f3] tracking-[0.01em] transition-colors duration-200 group-hover:text-sand/85">
                      {profile.title}
                    </h3>
                    <p className="text-[12px] leading-[1.4] text-mist/55 font-light transition-colors duration-200 group-hover:text-mist/70 line-clamp-2">
                      {profile.subtitle.slice(0, 24)}...
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
