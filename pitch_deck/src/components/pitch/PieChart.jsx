import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const RAD = Math.PI / 180;

function donutPath(cx, cy, rInner, rOuter, startDeg, endDeg) {
  const a0 = startDeg * RAD;
  const a1 = endDeg * RAD;
  const xo0 = cx + rOuter * Math.cos(a0);
  const yo0 = cy + rOuter * Math.sin(a0);
  const xo1 = cx + rOuter * Math.cos(a1);
  const yo1 = cy + rOuter * Math.sin(a1);
  const xi0 = cx + rInner * Math.cos(a0);
  const yi0 = cy + rInner * Math.sin(a0);
  const xi1 = cx + rInner * Math.cos(a1);
  const yi1 = cy + rInner * Math.sin(a1);
  let sweep = endDeg - startDeg;
  if (sweep < 0) sweep += 360;
  const large = sweep > 180 ? 1 : 0;
  return [
    `M ${xo0} ${yo0}`,
    `A ${rOuter} ${rOuter} 0 ${large} 1 ${xo1} ${yo1}`,
    `L ${xi1} ${yi1}`,
    `A ${rInner} ${rInner} 0 ${large} 0 ${xi0} ${yi0}`,
    `Z`,
  ].join(' ');
}

function shadeColor(hex, amount) {
  const n = hex.replace('#', '');
  const num = parseInt(n, 16);
  let r = (num >> 16) & 255;
  let g = (num >> 8) & 255;
  let b = num & 255;
  r = Math.round(r * (1 - amount));
  g = Math.round(g * (1 - amount));
  b = Math.round(b * (1 - amount));
  return `rgb(${r},${g},${b})`;
}

/**
 * @param {Array<{ value: number, color: string, title?: string, shortTitle?: string, subdivisions?: Array<{ value: number, label?: string }> }>} data
 */
export default function PieChart({
  data,
  size = 320,
  gapDeg = 2.25,
  centerTitle = 'Raise',
  centerSubtitle,
}) {
  const [hoveredKey, setHoveredKey] = useState(null);
  const center = size / 2;
  const rOuter = size * 0.38;
  const rInnerBase = size * 0.2;

  const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data]);

  const { ringSegments, gradientNodes, sliceMidAngles } = useMemo(() => {
    const n = data.length;
    const available = 360 - n * gapDeg;
    let cursor = -90 + gapDeg / 2;
    const segs = [];
    const gradients = [];
    const mids = [];

    data.forEach((item, index) => {
      const sliceAngle = (item.value / total) * available;
      const a0 = cursor;
      const a1 = cursor + sliceAngle;
      mids.push({ index, mid: (a0 + a1) / 2, pct: (item.value / total) * 100, item });

      const subs = item.subdivisions?.length
        ? item.subdivisions
        : [{ value: item.value, label: item.title }];

      const subSum = subs.reduce((s, x) => s + x.value, 0) || 1;
      let rHi = rOuter;
      const bandThickness = (rOuter - rInnerBase) / subs.length;

      subs.forEach((sub, si) => {
        const rLo = Math.max(rInnerBase * 0.98, rHi - bandThickness);
        const subColor =
          subs.length > 1
            ? si === 0
              ? item.color
              : shadeColor(item.color, 0.2 + si * 0.07)
            : item.color;

        const gid = `pie-grad-${index}-${si}`;
        const midRad = ((a0 + a1) / 2) * RAD;
        const gx0 = center + rLo * Math.cos(midRad);
        const gy0 = center + rLo * Math.sin(midRad);
        const gx1 = center + rHi * Math.cos(midRad);
        const gy1 = center + rHi * Math.sin(midRad);

        gradients.push(
          <linearGradient key={gid} id={gid} gradientUnits="userSpaceOnUse" x1={gx0} y1={gy0} x2={gx1} y2={gy1}>
            <stop offset="0%" stopColor={shadeColor(subColor, 0.1)} stopOpacity={1} />
            <stop offset="100%" stopColor={subColor} stopOpacity={1} />
          </linearGradient>
        );

        segs.push({
          key: `${index}-${si}`,
          path: donutPath(center, center, rLo, rHi, a0, a1),
          fill: `url(#${gid})`,
        });

        rHi = rLo;
      });

      cursor = a1 + gapDeg;
    });

    return { ringSegments: segs, gradientNodes: gradients, sliceMidAngles: mids };
  }, [data, total, center, rOuter, rInnerBase, gapDeg]);

  const labelRadius = (rOuter + rInnerBase) / 2;

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        <defs>
          <radialGradient id="pie-center-fade" cx="50%" cy="38%" r="70%">
            <stop offset="0%" stopColor="rgba(172,0,100,0.22)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          {gradientNodes}
        </defs>

        <circle
          cx={center}
          cy={center}
          r={rOuter + 6}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={1}
        />

        {ringSegments.map((seg) => {
          const isHovered = hoveredKey === seg.key;
          return (
            <g
              key={seg.key}
              onMouseEnter={() => setHoveredKey(seg.key)}
              onMouseLeave={() => setHoveredKey(null)}
              style={{ cursor: 'pointer' }}
            >
              <motion.path
                d={seg.path}
                fill={seg.fill}
                stroke="rgba(24,2,26,0.88)"
                strokeWidth={1.25}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{
                  opacity: 1,
                  scale: isHovered ? 1.035 : 1,
                  filter: isHovered ? 'brightness(1.14)' : 'brightness(1)',
                }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: `${center}px ${center}px` }}
              />
            </g>
          );
        })}

        <circle cx={center} cy={center} r={rInnerBase - 2} fill="#120214" stroke="rgba(255,255,255,0.09)" strokeWidth={1} />
        <circle cx={center} cy={center} r={rInnerBase - 2} fill="url(#pie-center-fade)" />

        <text
          x={center}
          y={centerSubtitle ? center - size * 0.012 : center + size * 0.018}
          textAnchor="middle"
          className="fill-white/90 font-extralight tracking-wide"
          style={{ fontSize: Math.max(11, size * 0.045) }}
        >
          {centerTitle}
        </text>
        {centerSubtitle ? (
          <text
            x={center}
            y={center + size * 0.052}
            textAnchor="middle"
            className="fill-white/45 font-light"
            style={{ fontSize: Math.max(9, size * 0.028) }}
          >
            {centerSubtitle}
          </text>
        ) : null}

        {sliceMidAngles.map(({ index, mid, pct, item }) => {
          const midRad = mid * RAD;
          const lx = center + labelRadius * Math.cos(midRad);
          const ly = center + labelRadius * Math.sin(midRad);
          const pctRounded = Math.round(pct);
          const pctFont = Math.max(9, Math.min(19, 8 + pct * 0.38));
          const titleFont = Math.max(7, Math.min(12, 5.5 + pct * 0.22));
          const short = item.shortTitle || item.title?.split(' ').slice(0, 2).join(' ') || '';
          const showTitle = pct >= 20 && short.length > 0;

          if (pct < 6) return null;

          return (
            <g key={`lbl-${index}`} className="pointer-events-none select-none">
              <motion.text
                x={lx}
                y={ly - (showTitle ? pctFont * 0.38 : 0)}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-white font-semibold"
                style={{
                  fontSize: pctFont,
                  textShadow: '0 1px 3px rgba(0,0,0,0.9), 0 0 14px rgba(0,0,0,0.45)',
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.12 + index * 0.06, duration: 0.45 }}
              >
                {pctRounded}%
              </motion.text>
              {showTitle ? (
                <motion.text
                  x={lx}
                  y={ly + pctFont * 0.44}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-white/78 font-light"
                  style={{
                    fontSize: titleFont,
                    textShadow: '0 1px 2px rgba(0,0,0,0.95)',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.95 }}
                  transition={{ delay: 0.22 + index * 0.06, duration: 0.4 }}
                >
                  {short.length > 20 ? `${short.slice(0, 18)}…` : short}
                </motion.text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
