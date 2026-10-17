type FitTextProps = {
  text: string
  width: number
  height: number
  fontSize: number
  className?: string
}

// Stretches or squeezes the glyphs to fill a fixed box, so "1,98" takes the same
// space as "23,98" and "500g" the same as "1Kg"
export const FitText = ({
  text,
  width,
  height,
  fontSize,
  className
}: FitTextProps) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    className="block shrink-0 overflow-visible"
    aria-hidden
  >
    <text
      x={width / 2}
      y={height / 2}
      textLength={width}
      lengthAdjust="spacingAndGlyphs"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={fontSize}
      className={className}
    >
      {text}
    </text>
  </svg>
)
