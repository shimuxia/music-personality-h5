interface HeroBackgroundProps {
  className?: string
}

export function HeroBackground({ className = "" }: HeroBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* 第1层：深蓝黑渐变基础 */}
      <div className="absolute inset-0 musical-base"></div>

      {/* 第2层：钢琴舞台区域 */}
      <div className="absolute inset-0 piano-stage">
        {/* 主钢琴键盘 - CSS版本 */}
        <div className="piano-keyboard">
          {/* 白键组 */}
          <div className="white-keys">
            {Array.from({length: 14}, (_, i) => (
              <div
                key={`white-${i}`}
                className={`white-key white-key-${i}`}
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
          {/* 黑键组 */}
          <div className="black-keys">
            {[1, 2, 4, 5, 6, 8, 9, 11, 12, 13].map((i, index) => (
              <div
                key={`black-${i}`}
                className={`black-key black-key-${i}`}
                style={{
                  left: `${i * 7.14 - 1.5}%`,
                  animationDelay: `${index * 0.4 + 0.2}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* 按键发光点 */}
        <div className="key-lights">
          {Array.from({length: 8}, (_, i) => (
            <div
              key={`light-${i}`}
              className={`key-light key-light-${i}`}
              style={{
                left: `${15 + i * 10}%`,
                animationDelay: `${i * 1.2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* 第3层：音符流动层 */}
      <div className="absolute inset-0 music-flow-layer">
        {/* 音符粒子上升 */}
        <div className="music-notes">
          {Array.from({length: 12}, (_, i) => (
            <div
              key={`note-${i}`}
              className={`music-note music-note-${i % 4}`}
              style={{
                left: `${8 + i * 7}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + (i % 3)}s`
              }}
            >
              ♪
            </div>
          ))}
        </div>

        {/* 音波扩散 */}
        <div className="sound-waves">
          {Array.from({length: 5}, (_, i) => (
            <div
              key={`wave-${i}`}
              className={`sound-wave sound-wave-${i}`}
              style={{ animationDelay: `${i * 1.5}s` }}
            />
          ))}
        </div>
      </div>

      {/* 第4层：光流动效果 */}
      <div className="absolute inset-0 light-streams">
        <div className="stream stream-1"></div>
        <div className="stream stream-2"></div>
        <div className="stream stream-3"></div>
      </div>

      {/* 第5层：内容保护遮罩 */}
      <div className="absolute inset-0 content-protection-new"></div>

      {/* SVG 增强层 */}
      <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%">
        <defs>
          {/* 音符发光 */}
          <filter id="noteGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* 波纹渐变 */}
          <radialGradient id="waveGradient" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(64,224,208,0.15)" />
            <stop offset="70%" stopColor="rgba(0,191,255,0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* 光流渐变 */}
          <linearGradient id="streamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="rgba(64,224,208,0.1)" />
            <stop offset="50%" stopColor="rgba(0,191,255,0.2)" />
            <stop offset="80%" stopColor="rgba(64,224,208,0.1)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* SVG 音符 */}
        <g className="svg-musical-elements">
          {Array.from({length: 6}, (_, i) => (
            <text
              key={`svg-note-${i}`}
              x={`${20 + i * 15}%`}
              y={`${25 + (i % 2) * 20}%`}
              fill="rgba(64,224,208,0.4)"
              fontSize="14"
              filter="url(#noteGlow)"
              className="svg-note"
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              {['♪', '♫', '♪', '♬', '♪', '♫'][i]}
            </text>
          ))}
        </g>

        {/* SVG 波纹 */}
        <g className="svg-waves">
          {Array.from({length: 3}, (_, i) => (
            <circle
              key={`svg-wave-${i}`}
              cx="50%"
              cy="75%"
              r={`${10 + i * 15}%`}
              fill="none"
              stroke="url(#waveGradient)"
              strokeWidth="1"
              className="svg-wave"
              style={{ animationDelay: `${i * 1}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}