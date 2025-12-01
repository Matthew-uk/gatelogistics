// components/Barcode.tsx
'use client';

type Props = { value: string; width?: number; height?: number; quiet?: number };

function hashToPattern(ch: string) {
  // simplified mapping: create pattern from char code; not a real barcode standard but produces a readable barcode-like look
  const code = ch.charCodeAt(0);
  const bits = code.toString(2).padStart(8, '0');
  return bits;
}

export default function Barcode({
  value,
  width = 300,
  height = 60,
  quiet = 6,
}: Props) {
  // create bar sequence by mapping each char to a bit pattern
  const patterns = value.split('').map(hashToPattern);
  // flatten into bars with widths
  const bars: { w: number; black: boolean }[] = [];

  // quiet zone at start
  if (quiet) bars.push({ w: quiet, black: false });

  patterns.forEach((p, idx) => {
    for (let i = 0; i < p.length; i++) {
      const bit = p[i] === '1';
      // make widths vary slightly for visual interest
      bars.push({ w: bit ? 2 : 1, black: bit });
    }
    // inter-char gap
    bars.push({ w: 2, black: false });
  });

  if (quiet) bars.push({ w: quiet, black: false });

  const totalUnits = bars.reduce((s, b) => s + b.w, 0);
  const unitWidth = width / totalUnits;

  let x = 0;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`Barcode for ${value}`}
    >
      <rect width={width} height={height} fill="#fff" />
      {bars.map((b, i) => {
        const w = b.w * unitWidth;
        const rect = b.black ? (
          <rect
            key={i}
            x={x}
            y={0}
            width={Math.max(1, w)}
            height={height - 12}
            fill="#111"
          />
        ) : null;
        x += w;
        return rect;
      })}
      {/* human-readable text */}
      <text
        x={width / 2}
        y={height - 2}
        fontSize={10}
        textAnchor="middle"
        fill="#333"
        fontFamily="Inter, system-ui"
      >
        {value}
      </text>
    </svg>
  );
}
