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

/** Word-wrap titles for SVG (slightly shorter lines = less horizontal sprawl). */
function titleLines(title, maxLen = 20) {
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
    if (b.length > maxLen + 8) b = `${b.slice(0, maxLen + 4).trim()}…`;
    return [a, b];
  }
  return lines;
}

/**
 * Donut + elbow callouts: % sits at the bend; titles sit past the horizontal/vertical leg.
 */
const PieChart = ({ data, chartSize = 386, labelPad = 142, gapDeg = 1.35 }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const dim = chartSize + labelPad * 2;
  const center = dim / 2;
  const rOuter = chartSize * 0.36;
  const rInner = chartSize * 0.21;

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

      const radialLeg = 28;
      const elbowX = center + (rOuter + radialLeg) * cos;
      const elbowY = center + (rOuter + radialLeg) * sin;

      const titleText = item.title || item.shortLabel || '';
      const lines = titleLines(titleText);
      const titleFont = Math.round((Math.max(12, Math.min(15.5, 11 + percentage * 0.07)) * 10)) / 10;
      const lineHeight = titleFont * 1.5;
      const pctFont = Math.round((Math.max(12.5, Math.min(15, 12 + percentage * 0.05)) * 10)) / 10;

      const hBase = 52 + Math.min(56, titleText.length * 0.5);
      const isRight = cos > 0.14;
      const isLeft = cos < -0.14;

      let cornerX;
      let cornerY;
      let textAnchor;
      let titleX;
      let pctX;
      let pctY;
      let pctTextAnchor = 'middle';

      if (isRight) {
        cornerX = elbowX + hBase;
        cornerY = elbowY;
        textAnchor = 'start';
        titleX = cornerX + 18;
        pctX = elbowX - sin * 18;
        pctY = elbowY + cos * 18;
      } else if (isLeft) {
        cornerX = elbowX - hBase;
        cornerY = elbowY;
        textAnchor = 'end';
        titleX = cornerX - 18;
        pctX = elbowX - sin * 18;
        pctY = elbowY + cos * 18;
      } else {
        const vLeg = 52;
        const down = sin > 0;
        cornerX = elbowX;
        cornerY = elbowY + (down ? vLeg : -vLeg);
        textAnchor = 'middle';
        titleX = cornerX;
        pctX = elbowX + cos * 20;
        pctY = elbowY + sin * 20;
      }

      const nLines = lines.length;
      const blockH = (nLines - 1) * lineHeight + titleFont * 0.95;
      const titleFirstBaseline = cornerY - blockH / 2 + titleFont * 0.82;

      const pctStr = `${percentage.toFixed(0)}%`;
      const pillW = pctStr.length * (pctFont * 0.58) + 14;
      const pillH = pctFont + 10;

      return {
        ...item,
        percentage: percentage.toFixed(0),
        percentageNum: percentage,
        pathData,
        midAngle,
        index,
        rimX,
        rimY,
        elbowX,
        elbowY,
        cornerX,
        cornerY,
        textAnchor,
        titleX,
        titleFirstBaseline,
        titleFont,
        lineHeight,
        titleLines: lines,
        pctX,
        pctY,
        pctFont,
        pctStr,
        pctTextAnchor,
        pillW,
        pillH,
      };
    });
  }, [data, total, center, rOuter, rInner, gapDeg, usable]);

  const uid = useId().replace(/:/g, '');
  const defsId = `pie-${uid}`;

  return (
    <div className="relative mx-auto w-full max-w-[min(100%,720px)] aspect-square shrink-0">
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
                <motion.path
                  d={`M ${segment.rimX} ${segment.rimY} L ${segment.elbowX} ${segment.elbowY} L ${segment.cornerX} ${segment.cornerY}`}
                  fill="none"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth={1.25}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 + segment.index * 0.05 }}
                />

                {/* % on the elbow — pill + text (no collision with title) */}
                <g>
                  <rect
                    x={segment.pctX - segment.pillW / 2}
                    y={segment.pctY - segment.pillH / 2}
                    width={segment.pillW}
                    height={segment.pillH}
                    rx={segment.pillH / 2}
                    fill="rgba(12,4,18,0.92)"
                    stroke={segment.color}
                    strokeOpacity={0.55}
                    strokeWidth={1}
                  />
                  <motion.text
                    x={segment.pctX}
                    y={segment.pctY}
                    textAnchor={segment.pctTextAnchor}
                    dominantBaseline="central"
                    fill="rgba(255,255,255,0.95)"
                    fontFamily='system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                    fontWeight={600}
                    fontSize={segment.pctFont}
                    letterSpacing="-0.02em"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.28 + segment.index * 0.05 }}
                  >
                    {segment.pctStr}
                  </motion.text>
                </g>

                <motion.text
                  x={segment.titleX}
                  y={segment.titleFirstBaseline}
                  textAnchor={segment.textAnchor}
                  fill="rgba(255,255,255,0.93)"
                  fontFamily='system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                  fontWeight={300}
                  letterSpacing="0.02em"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.34 + segment.index * 0.05 }}
                  style={{ textShadow: '0 1px 4px rgba(0,0,0,0.85)' }}
                >
                  {segment.titleLines.map((line, i) => (
                    <tspan key={i} x={segment.titleX} dy={i === 0 ? 0 : segment.lineHeight} fontSize={segment.titleFont}>
                      {line}
                    </tspan>
                  ))}
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
