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

const PieChart = ({ data, size = 320, gapDeg = 1.25 }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const center = size / 2;
  const rOuter = size * 0.38;
  const rInner = size * 0.22;
  const labelR = (rOuter + rInner) / 2;

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
      const labelX = center + labelR * Math.cos(midRad);
      const labelY = center + labelR * Math.sin(midRad);

      const percentage = share * 100;
      const angleDeg = sweep;
      /** Scale typography with slice share; cap for readability */
      const pctFont = Math.round(Math.max(10, Math.min(22, 8 + percentage * 0.42)));
      const shortFont = Math.round(Math.max(7, Math.min(12, 5 + percentage * 0.22)));
      const showShort = Boolean(item.shortLabel) && percentage >= 17 && angleDeg >= 42;

      const pathData = donutSegmentPath(center, center, rOuter, rInner, startAngle, endAngle);

      return {
        ...item,
        percentage: percentage.toFixed(0),
        percentageNum: percentage,
        angleDeg,
        pathData,
        labelX,
        labelY,
        midAngle,
        index,
        pctFont,
        shortFont,
        showShort,
      };
    });
  }, [data, total, center, rOuter, rInner, labelR, gapDeg, usable]);

  const uid = useId().replace(/:/g, '');
  const defsId = `pie-${uid}`;

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
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

        {/* Subtle outer ring (subdivision guide) */}
        <circle
          cx={center}
          cy={center}
          r={rOuter + 6}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
        <circle
          cx={center}
          cy={center}
          r={rInner - 4}
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
                  scale: isHovered ? 1.04 : 1,
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

              {segment.percentageNum >= 8 && (
                <g pointerEvents="none">
                  <motion.text
                    x={segment.labelX}
                    y={segment.labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="rgba(255,255,255,0.95)"
                    fontWeight={600}
                    fontSize={segment.pctFont}
                    letterSpacing="-0.02em"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      opacity: 1,
                      scale: isHovered ? 1.06 : 1,
                      fontSize: isHovered ? segment.pctFont + 1 : segment.pctFont,
                    }}
                    transition={{ duration: 0.35, delay: 0.2 + segment.index * 0.05 }}
                    style={{
                      textShadow: '0 1px 3px rgba(0,0,0,0.65), 0 0 12px rgba(0,0,0,0.4)',
                    }}
                  >
                    {segment.percentage}%
                  </motion.text>
                  {segment.showShort ? (
                    <motion.text
                      x={segment.labelX}
                      y={segment.labelY + segment.pctFont * 0.55}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="rgba(255,255,255,0.72)"
                      fontWeight={500}
                      fontSize={segment.shortFont}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35 + segment.index * 0.05 }}
                      style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}
                    >
                      {segment.shortLabel}
                    </motion.text>
                  ) : null}
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default PieChart;
