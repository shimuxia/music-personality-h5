import { useEffect, useRef, useState } from 'react'
import { HomePage } from './pages/HomePage'
import { QuizPage } from './pages/QuizPage'
import { ResultPage } from './pages/ResultPage'
import { Toast } from './components/shared/Toast'
import { questions } from './data/questions'
import { resultProfiles } from './data/results'
import { resolveQuizResult } from './lib/quiz'
import type { QuestionOption, ResultProfile, ViewState } from './types/quiz'

const COPY_RESET_MS = 2200

function App() {
  const [view, setView] = useState<ViewState>('home')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<QuestionOption[]>([])
  const [result, setResult] = useState<ResultProfile | null>(null)
  const [hasCopied, setHasCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)
  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'error'
    isVisible: boolean
  }>({
    message: '',
    type: 'success',
    isVisible: false,
  })
  const copyTimerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current)
      }
    }
  }, [])

  const handleStart = () => {
    setCurrentQuestionIndex(0)
    setSelectedOptions([])
    setResult(null)
    setView('quiz')
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setSelectedOptions([])
    setResult(null)
    setHasCopied(false)
    setCopyFailed(false)
    setToast({ message: '', type: 'success', isVisible: false })
    setView('home')
  }

  const handleSelectOption = (option: QuestionOption) => {
    const nextSelections = [...selectedOptions, option]
    setSelectedOptions(nextSelections)

    const isLastQuestion = currentQuestionIndex === questions.length - 1

    if (isLastQuestion) {
      const quizResult = resolveQuizResult(nextSelections, resultProfiles)
      setResult(quizResult)
      setView('result')
      return
    }

    setCurrentQuestionIndex((index) => index + 1)
  }

  const handleCopyShareText = async () => {
    if (!result) {
      return
    }

    const shareText = `我测出的天命音符是 ${result.note}「${result.title}」
${result.subtitle}
来测你的天命音符：
https://music-personality-h5.vercel.app/`

    try {
      await navigator.clipboard.writeText(shareText)
      setHasCopied(true)
      setCopyFailed(false)
      setToast({
        message: '✅ 已复制分享文案',
        type: 'success',
        isVisible: true,
      })

      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current)
      }

      copyTimerRef.current = window.setTimeout(() => {
        setHasCopied(false)
      }, COPY_RESET_MS)
    } catch {
      setCopyFailed(true)
      setHasCopied(false)
      setToast({
        message: '❌ 复制失败，请手动截图分享',
        type: 'error',
        isVisible: true,
      })

      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current)
      }

      copyTimerRef.current = window.setTimeout(() => {
        setCopyFailed(false)
      }, COPY_RESET_MS)
    }
  }

  const handleToastClose = () => {
    setToast(prev => ({ ...prev, isVisible: false }))
  }

  return (
    <div className="relative min-h-screen bg-[#0a0b0f] text-mist">
      {/* 极轻微的背景纹理 */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-900/10 via-transparent to-stone-900/5" />

      {/* 只在非首页显示轻微装饰 */}
      {view !== 'home' && (
        <div className="pointer-events-none absolute left-[-8rem] top-[-6rem] h-64 w-64 rounded-full bg-slate-200/5 blur-3xl" />
      )}

      <div className="relative flex min-h-screen w-full flex-col">
        {view === 'home' && (
          <HomePage
            profiles={Object.values(resultProfiles)}
            onStart={handleStart}
          />
        )}

        {view === 'quiz' && (
          <QuizPage
            currentIndex={currentQuestionIndex}
            question={questions[currentQuestionIndex]}
            total={questions.length}
            onRestart={handleRestart}
            onSelect={handleSelectOption}
          />
        )}

        {view === 'result' && result && (
          <ResultPage
            result={result}
            onCopyShareText={handleCopyShareText}
            onRestart={handleRestart}
            copied={hasCopied}
            copyFailed={copyFailed}
          />
        )}

        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={handleToastClose}
        />
      </div>
    </div>
  )
}

export default App
