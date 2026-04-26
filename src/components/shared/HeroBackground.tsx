interface HeroBackgroundProps {
  className?: string
}

export function HeroBackground({ className = "" }: HeroBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* 第1层：基础深色背景 */}
      <div className="absolute inset-0 bg-hero-base"></div>

      {/* 第2层：横向钢琴键暗纹 */}
      <div className="absolute inset-0 piano-keys-pattern"></div>

      {/* 第3层：蓝青色流动光带 */}
      <div className="absolute inset-0 flowing-lights"></div>

      {/* 第4层：粒子效果 */}
      <div className="absolute inset-0 floating-particles"></div>

      {/* 第5层：内容保护遮罩 */}
      <div className="absolute inset-0 content-protection"></div>

      {/* SVG定义 */}
      <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%">
        <defs>
          {/* 钢琴键渐变 */}
          <linearGradient id="piano-white-key" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.01)" />
          </linearGradient>

          <linearGradient id="piano-black-key" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.4)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
          </linearGradient>

          {/* 流动光带渐变 */}
          <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="rgba(0,191,255,0)" />
            <stop offset="30%" stopColor="rgba(64,224,208,0.15)" />
            <stop offset="50%" stopColor="rgba(0,191,255,0.25)" />
            <stop offset="70%" stopColor="rgba(64,224,208,0.15)" />
            <stop offset="100%" stopColor="rgba(0,191,255,0)" />
          </linearGradient>

          {/* 粒子渐变 */}
          <radialGradient id="particle-glow">
            <stop offset="0%" stopColor="rgba(64,224,208,0.6)" />
            <stop offset="50%" stopColor="rgba(0,191,255,0.3)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* 钢琴键SVG - 响应式 */}
        <g className="piano-keys-svg">
          {/* 白键 - 主要节奏 */}
          {Array.from({length: 12}, (_, i) => (
            <rect
              key={`white-${i}`}
              x={`${(i * 8.5) - 6}%`}
              y="60%"
              width="8%"
              height="25%"
              fill="url(#piano-white-key)"
              rx="2"
              className="piano-white-key"
              style={{
                transform: `perspective(600px) rotateX(15deg)`,
                transformOrigin: 'center bottom'
              }}
            />
          ))}

          {/* 黑键 - 插入节奏 */}
          {Array.from({length: 10}, (_, i) => (
            <rect
              key={`black-${i}`}
              x={`${(i * 10.2) + 2}%`}
              y="62%"
              width="4%"
              height="18%"
              fill="url(#piano-black-key)"
              rx="1"
              className="piano-black-key"
              style={{
                transform: `perspective(600px) rotateX(15deg)`,
                transformOrigin: 'center bottom'
              }}
            />
          ))}
        </g>

        {/* 流动光带 */}
        <g className="flowing-lights-svg">
          <path
            d="M-20,65 Q20,64 50,65 T120,65"
            stroke="url(#flow-gradient)"
            strokeWidth="2"
            fill="none"
            className="light-flow light-flow-1"
          />
          <path
            d="M-20,68 Q30,67 60,68 T130,68"
            stroke="url(#flow-gradient)"
            strokeWidth="1.5"
            fill="none"
            className="light-flow light-flow-2"
            style={{ animationDelay: '-1.5s' }}
          />
        </g>

        {/* 粒子 */}
        <g className="particles-svg">
          {Array.from({length: 6}, (_, i) => (
            <circle
              key={`particle-${i}`}
              cx={`${15 + i * 12}%`}
              cy={`${30 + (i % 3) * 15}%`}
              r="1.5"
              fill="url(#particle-glow)"
              className="floating-particle"
              style={{
                animationDelay: `${i * -0.8}s`,
                animationDuration: `${3 + i * 0.5}s`
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}