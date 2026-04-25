import { useEffect, useRef, useState } from 'react'

interface UseScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(options: UseScrollRevealOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    once = true,
  } = options

  const elementRef = useRef<T>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true)
            if (once) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            setIsRevealed(false)
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { elementRef, isRevealed }
}

export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(itemCount: number, options: UseScrollRevealOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    once = true,
  } = options

  const containerRef = useRef<T>(null)
  const [revealedItems, setRevealedItems] = useState<Set<number>>(new Set())

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 开始stagger reveal
            for (let i = 0; i < itemCount; i++) {
              setTimeout(() => {
                setRevealedItems((prev) => new Set([...prev, i]))
              }, i * 80) // 每个item间隔80ms
            }

            if (once) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            setRevealedItems(new Set())
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(container)

    return () => observer.disconnect()
  }, [itemCount, threshold, rootMargin, once])

  return { containerRef, revealedItems }
}