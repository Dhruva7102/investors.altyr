import React, { useId, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

/** Donut arc from startAngle to endAngle (degrees, -90 = top). */
function donutSegmentPath(cx, cy, rOuter, rInner, startAngle, endAngle) {
  const rad = (deg) => (deg * Math.PI) / 180;
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  const sr = rad(startAngle);
  const er = rad(endAngle);
  const x1o = cx + rOuter * Math.cos(sr);
  const y1o = cy + rOuter * Math.sin(sr);
  const x2o = cx + rOuter * Math.cos(er);
  const y2o = cy + rOuter * Math.sin(er);
  const xInnerEnd = cx + rInner * Math.cos(er);
  const yInnerEnd = cy + rInner * Math.sin(er);
  const xInnerStart = cx + rInner * Math.cos(sr);
  const yInnerStart = cy + rInner * Math.sin(sr);
  return [
    `M ${x1o} ${y1o}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2o} ${y2o}`,
    `L ${xInnerEnd} ${yInnerEnd}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${xInnerStart} ${yInnerStart}`,
    'Z',
  ].join(' ');
}

function textAnchorForAngle(midDeg) {
  const c = Math.cos((midDeg * Math.PI) / 180);
  if (c > 0.25) return 'start';
  if (c < -0.25) return 'end';
  return 'middle';
}

/** Word-wrap titles to 1–2 lines for SVG (matches card titles on the slide). */
function titleLines(title, maxLen = 24) {
  const words = title.split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length <= maxLen) cur = next;
    else {
      if (cur) lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  if (lines.length > 2) {
    const a = lines[0];
    let b = lines.slice(1).join(' ');
    if (b.length > maxLen + 6) b = `${b.slice(0, maxLen + 3).trim()}…`;
    return [a, b];
  }
  return lines;
}

/**
 * Donut with outside labels + leader lines.
 * Expects `data[].title` (same copy as the breakdown list) and `value` (%).
 */
const PieChart = ({ data, chartSize = 360, labelPad = 92, gapDeg = 1.25 }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const dim = chartSize + labelPad * 2;
  const center = dim / 2;
  const rOuter = chartSize * 0.38;
  const rInner = chartSize * 0.22;

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const n = data.length;
  const totalGap = gapDeg * n;
  const usable = 360 - totalGap;

  const segments = useMemo(() => {
    let cursor = -90 + gapDeg / 2;
    return data.map((item, index) => {
      const share = item.value / total;
      const sweep = share * usable;
      const startAngle = cursor;
      const endAngle = cursor + sweep;
      cursor = endAngle + gapDeg;

      const midAngle = (startAngle + endAngle) / 2;
      const midRad = (midAngle * Math.PI) / 180;
      const cos = Math.cos(midRad);
      const sin = Math.sin(midRad);

      const percentage = share * 100;
      const pathData = donutSegmentPath(center, center, rOuter, rInner, startAngle, endAngle);

      const rimX = center + (rOuter + 2) * cos;
      const rimY = center + (rOuter + 2) * sin;
      const lineEndR = rOuter + 28;
      const lineX2 = center + lineEndR * cos;
      const lineY2 = center + lineEndR * sin;
      const anchor = textAnchorForAngle(midAngle);
      const gapAlong = 10;
      let tx = lineX2 + gapAlong * cos;
      let ty = lineY2 + gapAlong * sin;
      if (anchor === 'middle') {
        tx += -sin * 8;
        ty += cos * 8;
      }

      const titleText = item.title || item.shortLabel || '';
      const lines = titleLines(titleText);
      const titleFont = Math.round((Math.max(8.5, Math.min(11.2, 7.4 + percentage * 0.05)) * 10)) / 10;
      const pctFont = Math.round((titleFont + 1.1) * 10) / 10;
      const lineHeight = titleFont * 1.22;
      const pctGap = titleFont * 0.55;
      const blockH = lines.length * lineHeight + pctGap + pctFont * 1.05;
      const textBlockTop = ty - blockH / 2;
      const firstBaseline = textBlockTop + titleFont * 0.88;

      return {
        ...item,
        percentage: percentage.toFixed(0),
        percentageNum: percentage,
        pathData,
        midAngle,
        index,
        rimX,
        rimY,
        lineX2,
        lineY2,
        tx,
        ty,
        anchor,
        titleFont,
        pctFont,
        lineHeight,
        pctGap,
        firstBaseline,
        titleLines: lines,
      };
    });
  }, [data, total, center, rOuter, rInner, gapDeg, usable]);

  const uid = useId().replace(/:/g, '');
  const defsId = `pie-${uid}`;

  return (
    <div className="relative mx-auto w-full max-w-[min(100%,580px)] aspect-square shrink-0">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${dim} ${dim}`}
        preserveAspectRatio="xMidYMid meet"
        className="overflow-visible"
        aria-hidden
      >
        <defs>
          {segments.map((seg) => (
            <linearGradient
              key={`g-${seg.index}`}
              id={`${defsId}-${seg.index}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={seg.color} stopOpacity="1" />
              <stop offset="100%" stopColor={seg.color} stopOpacity="0.72" />
            </linearGradient>
          ))}
        </defs>

        <circle
          cx={center}
          cy={center}
          r={rOuter + 5}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
        <circle
          cx={center}
          cy={center}
          r={rInner - 3}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
          strokeDasharray="3 5"
        />

        {segments.map((segment) => {
          const isHovered = hoveredIndex === segment.index;
          return (
            <g
              key={segment.index}
              onMouseEnter={() => setHoveredIndex(segment.index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ cursor: 'pointer' }}
            >
              <motion.path
                d={segment.pathData}
                fill={`url(#${defsId}-${segment.index})`}
                stroke="rgba(24,2,26,0.95)"
                strokeWidth={2}
                strokeLinejoin="round"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{
                  opacity: 1,
                  scale: isHovered ? 1.03 : 1,
                }}
                style={{
                  transformOrigin: `${center}px ${center}px`,
                  filter: isHovered
                    ? 'brightness(1.12) drop-shadow(0 0 14px rgba(172,0,100,0.35))'
                    : 'drop-shadow(0 2px 8px rgba(0,0,0,0.35))',
                }}
                transition={{
                  opacity: { duration: 0.55, delay: segment.index * 0.06 },
                  scale: { duration: 0.22 },
                }}
              />

              <g pointerEvents="none">
                <motion.line
                  x1={segment.rimX}
                  y1={segment.rimY}
                  x2={segment.lineX2}
                  y2={segment.lineY2}
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth={1}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.22 + segment.index * 0.05 }}
                />
                <motion.text
                  x={segment.tx}
                  y={segment.firstBaseline}
                  textAnchor={segment.anchor}
                  fill="rgba(255,255,255,0.92)"
                  fontFamily='system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                  fontWeight={300}
                  letterSpacing="0.02em"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.32 + segment.index * 0.05 }}
                  style={{ textShadow: '0 1px 3px rgba(0,0,0,0.75)' }}
                >
                  {segment.titleLines.map((line, i) => (
                    <tspan key={i} x={segment.tx} dy={i === 0 ? 0 : segment.lineHeight} fontSize={segment.titleFont}>
                      {line}
                    </tspan>
                  ))}
                  <tspan
                    x={segment.tx}
                    dy={segment.pctGap}
                    fontSize={segment.pctFont}
                    fontWeight={500}
                    fill="rgba(255,255,255,0.72)"
                  >
                    {segment.percentage}%
                  </tspan>
                </motion.text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default PieChart;
