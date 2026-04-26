import { useEffect, useRef } from 'react'

interface HeroBackgroundProps {
  className?: string
}

export function HeroBackground({ className = "" }: HeroBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 响应式画布尺寸
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 音流粒子系统
    interface Particle {
      x: number
      y: number
      targetX: number
      targetY: number
      opacity: number
      size: number
      speed: number
      life: number
      maxLife: number
    }

    interface MusicStream {
      startX: number
      startY: number
      direction: number
      particles: Particle[]
      lastSpawn: number
      active: boolean
    }

    // 音流源点（对应钢琴键位）
    const streamSources: MusicStream[] = [
      { startX: 0.25, startY: 0.75, direction: 45, particles: [], lastSpawn: 0, active: true },
      { startX: 0.35, startY: 0.75, direction: 35, particles: [], lastSpawn: 500, active: true },
      { startX: 0.55, startY: 0.75, direction: 40, particles: [], lastSpawn: 1000, active: true },
      { startX: 0.65, startY: 0.75, direction: 50, particles: [], lastSpawn: 1500, active: true },
    ]

    let animationId: number
    let startTime = Date.now()

    const animate = () => {
      const currentTime = Date.now() - startTime
      const canvasWidth = canvas.clientWidth
      const canvasHeight = canvas.clientHeight

      // 清空画布
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)

      streamSources.forEach((stream, streamIndex) => {
        // 生成新粒子
        if (currentTime - stream.lastSpawn > 300 + streamIndex * 100) {
          const particle: Particle = {
            x: stream.startX * canvasWidth,
            y: stream.startY * canvasHeight,
            targetX: stream.startX * canvasWidth + Math.cos(stream.direction * Math.PI / 180) * 200,
            targetY: stream.startY * canvasHeight - Math.sin(stream.direction * Math.PI / 180) * 150,
            opacity: 0,
            size: 1 + Math.random() * 2,
            speed: 0.5 + Math.random() * 0.3,
            life: 0,
            maxLife: 2000 + Math.random() * 1000
          }
          stream.particles.push(particle)
          stream.lastSpawn = currentTime
        }

        // 更新和绘制粒子
        stream.particles = stream.particles.filter(particle => {
          particle.life += 16
          const progress = particle.life / particle.maxLife

          if (progress > 1) return false

          // 粒子轨迹计算
          particle.x = particle.x + (particle.targetX - particle.x) * particle.speed * 0.02
          particle.y = particle.y + (particle.targetY - particle.y) * particle.speed * 0.02

          // 透明度变化
          if (progress < 0.1) {
            particle.opacity = progress * 10
          } else if (progress > 0.8) {
            particle.opacity = (1 - progress) * 5
          } else {
            particle.opacity = 0.6 + Math.sin(progress * Math.PI * 4) * 0.2
          }

          // 绘制音流粒子
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 3
          )
          gradient.addColorStop(0, `rgba(64, 224, 208, ${particle.opacity * 0.8})`)
          gradient.addColorStop(0.5, `rgba(0, 191, 255, ${particle.opacity * 0.5})`)
          gradient.addColorStop(1, `rgba(64, 224, 208, 0)`)

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
          ctx.fill()

          return true
        })

        // 绘制音流主体轨迹
        if (stream.particles.length > 1) {
          ctx.strokeStyle = `rgba(64, 224, 208, 0.15)`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(stream.particles[0].x, stream.particles[0].y)

          for (let i = 1; i < Math.min(stream.particles.length, 8); i++) {
            const particle = stream.particles[i]
            ctx.lineTo(particle.x, particle.y)
          }
          ctx.stroke()
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* 第1层：深色氛围基础 */}
      <div className="absolute inset-0 musical-base-realistic"></div>

      {/* 第2层：写实钢琴 */}
      <div className="absolute inset-0 realistic-piano">
        {/* 钢琴底座和阴影 */}
        <div className="piano-body"></div>

        {/* 主键盘区域 */}
        <div className="piano-keyboard-realistic">
          {/* 白键 - 更真实的材质 */}
          <div className="white-keys-realistic">
            {Array.from({length: 14}, (_, i) => (
              <div
                key={`white-${i}`}
                className={`white-key-realistic ${i === 3 || i === 7 || i === 10 ? 'active-key' : ''}`}
                style={{
                  animationDelay: `${i * 0.4}s`,
                  '--key-index': i
                } as React.CSSProperties}
              />
            ))}
          </div>

          {/* 黑键 - 写实材质和位置 */}
          <div className="black-keys-realistic">
            {[
              { index: 0, offset: 3.5 },
              { index: 1, offset: 10.5 },
              { index: 2, offset: 24.5 },
              { index: 3, offset: 31.5 },
              { index: 4, offset: 38.5 },
              { index: 5, offset: 52.5 },
              { index: 6, offset: 59.5 },
              { index: 7, offset: 73.5 },
              { index: 8, offset: 80.5 },
              { index: 9, offset: 87.5 }
            ].map(({ index, offset }) => (
              <div
                key={`black-${index}`}
                className={`black-key-realistic ${index === 1 || index === 4 || index === 7 ? 'active-key' : ''}`}
                style={{
                  left: `${offset}%`,
                  animationDelay: `${index * 0.3 + 0.2}s`
                }}
              />
            ))}
          </div>

          {/* 按键反光和高光 */}
          <div className="key-reflections">
            {[3, 7, 10].map(i => (
              <div
                key={`reflection-${i}`}
                className="key-reflection white-reflection"
                style={{ left: `${(i + 0.5) * 7.14}%` }}
              />
            ))}
            {[1, 4, 7].map(i => (
              <div
                key={`black-reflection-${i}`}
                className="key-reflection black-reflection"
                style={{ left: `${[10.5, 38.5, 73.5][i === 1 ? 0 : i === 4 ? 1 : 2]}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 第3层：Canvas 音流可视化 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none music-streams-canvas"
        style={{ width: '100%', height: '100%' }}
      />

      {/* 第4层：环境光效 */}
      <div className="absolute inset-0 ambient-lighting">
        <div className="stage-glow"></div>
        <div className="piano-rim-light"></div>
      </div>

      {/* 第5层：内容保护遮罩 */}
      <div className="absolute inset-0 content-protection-enhanced"></div>

      {/* SVG 装饰层 - 减少到最少 */}
      <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%">
        <defs>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* 仅保留少量环境装饰 */}
        <g className="ambient-particles">
          {Array.from({length: 3}, (_, i) => (
            <circle
              key={`ambient-${i}`}
              cx={`${30 + i * 30}%`}
              cy={`${20 + i * 10}%`}
              r="1"
              fill="rgba(64,224,208,0.3)"
              filter="url(#softGlow)"
              className="ambient-particle"
              style={{ animationDelay: `${i * 2}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}