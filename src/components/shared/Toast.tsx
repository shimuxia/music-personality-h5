import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export function Toast({ message, type, isVisible, onClose, duration = 2500 }: ToastProps) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true)
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 300) // 等待动画结束
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!shouldRender) {
    return null
  }

  return (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
      }`}
    >
      <div
        className={`
          px-5 py-3.5 rounded-xl backdrop-blur-md border shadow-lg
          ${
            type === 'success'
              ? 'bg-slate-900/90 border-[#c7b08b]/30 text-[#f2ede3] shadow-[#c7b08b]/20'
              : 'bg-slate-900/90 border-red-400/30 text-[#f2ede3] shadow-red-400/20'
          }
        `}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-medium">{message}</span>
        </div>
      </div>
    </div>
  )
}