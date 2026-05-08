interface PrecisionModalProps {
  isOpen: boolean
  onClose: () => void
  onStartPrecision: () => void
}

const reportItems = [
  '主音符',
  '副音符',
  '隐藏音格',
  '情绪节奏',
  '关系模式',
  '行动力倾向',
  '适合你的旋律风格',
]

export function PrecisionModal({ isOpen, onClose, onStartPrecision }: PrecisionModalProps) {
  if (!isOpen) {
    return null
  }

  const handleStart = () => {
    onClose()
    onStartPrecision()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <button
        type="button"
        aria-label="关闭精确版介绍"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <section className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0b0c10]/95 p-6 shadow-2xl shadow-black/40 sm:p-7">
        <p className="text-[10px] uppercase tracking-[0.3em] text-sand/55">Precision Test</p>
        <h2 className="mt-4 text-[26px] font-light leading-tight text-[#faf8f3] sm:text-[30px]">
          精确版音格测试
        </h2>
        <p className="mt-3 text-[14px] leading-7 text-mist/68">
          36 道题，分析你的主音符、副音符与隐藏音格。
        </p>
        <p className="mt-6 text-[14px] leading-7 text-mist/58">
          快速版看到的是你最亮的那面。精确版帮你看见自己还没注意到的那面。
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {reportItems.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/8 bg-white/[0.025] px-3 py-2 text-center text-[12px] text-mist/68"
            >
              {item}
            </span>
          ))}
        </div>
        <p className="mt-6 text-[13px] leading-7 text-sand/65">
          当前是精确版测试 MVP，结果后续会继续根据真实反馈调整。
        </p>
        <button
          type="button"
          onClick={handleStart}
          className="mt-6 w-full rounded-full bg-mist px-6 py-3 text-[14px] font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-mist/90"
        >
          开始精确版测试
        </button>
      </section>
    </div>
  )
}
