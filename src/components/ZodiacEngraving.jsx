// Placeholder "17th century copperplate" treatment: cross-hatch texture, double
// astrolabe ring, tick marks, and the glyph rendered as an etched centerpiece.
// Swap-ready — replace with real illustration assets later without touching callers.
export default function ZodiacEngraving({ z, size = 80, tone = '#2C2A29' }) {
  const hatchId = `hatch-${z.id}`
  const vignetteId = `vignette-${z.id}`
  const ticks = Array.from({ length: 24 })

  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className="overflow-visible">
      <defs>
        <pattern id={hatchId} width="4" height="4" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="4" stroke={tone} strokeWidth="0.4" />
        </pattern>
        <radialGradient id={vignetteId} cx="50%" cy="45%" r="60%">
          <stop offset="55%" stopColor="transparent" />
          <stop offset="100%" stopColor={tone} stopOpacity="0.16" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill={`url(#${hatchId})`} opacity="0.14" />
      <circle cx="50" cy="50" r="46" fill={`url(#${vignetteId})`} />
      <circle cx="50" cy="50" r="46" fill="none" stroke={tone} strokeWidth="0.7" />
      <circle cx="50" cy="50" r="41" fill="none" stroke={tone} strokeWidth="0.3" strokeDasharray="0.5 2" />
      {ticks.map((_, i) => {
        const a = (i * 15 * Math.PI) / 180
        const r1 = 46
        const r2 = i % 2 === 0 ? 42.5 : 44.2
        return (
          <line
            key={i}
            x1={50 + r1 * Math.cos(a)}
            y1={50 + r1 * Math.sin(a)}
            x2={50 + r2 * Math.cos(a)}
            y2={50 + r2 * Math.sin(a)}
            stroke={tone}
            strokeWidth="0.4"
          />
        )
      })}
      <text
        x="50"
        y="60"
        textAnchor="middle"
        fontSize="32"
        fontFamily="'Cinzel', serif"
        fill={tone}
      >
        {z.symbol}
      </text>
    </svg>
  )
}
