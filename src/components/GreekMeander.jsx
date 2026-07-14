// Fixed top-edge Greek key (meander) frieze — a slow-scrolling repeating SVG pattern
// that reinforces the museum/antiquity aesthetic without competing with foreground content.
export default function GreekMeander() {
  return (
    <div
      className="pointer-events-none fixed top-0 left-0 w-full h-3 overflow-hidden opacity-[0.18]"
      style={{ zIndex: 1 }}
    >
      <svg
        width="400%"
        height="100%"
        viewBox="0 0 800 12"
        preserveAspectRatio="none"
        className="animate-[meander-scroll_50s_linear_infinite]"
      >
        <defs>
          <pattern id="meander" width="40" height="12" patternUnits="userSpaceOnUse">
            <path
              d="M0 2 H10 V10 H18 V2 H28 V10 H38 V2"
              stroke="#2C2A29"
              strokeWidth="1.4"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="800" height="12" fill="url(#meander)" />
      </svg>
    </div>
  )
}
