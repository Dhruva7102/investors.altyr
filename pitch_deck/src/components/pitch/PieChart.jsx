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
 * Donut only — labels sit outside the SVG ring with leader lines (no clipped text).
 */
export default function PieChart({
  data,
  size = 300,
  gapDeg = 2.2,
  centerTitle = 'Raise',
  centerSubtitle,
}) {
  const [hoveredKey, setHoveredKey] = useState(null);

  const labelPad = Math.round(size * 0.28);
  const vb = size + 2 * labelPad;
  const cx = vb / 2;
  const cy = vb / 2;
  const rOuter = size * 0.33;
  const rInnerBase = size * 0.19;

  const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data]);

  const { ringSegments, gradientNodes, slices } = useMemo(() => {
    const n = data.length;
    const available = 360 - n * gapDeg;
    let cursor = -90 + gapDeg / 2;
    const segs = [];
    const gradients = [];
    const sliceMeta = [];

    data.forEach((item, index) => {
      const sliceAngle = (item.value / total) * available;
      const a0 = cursor;
      const a1 = cursor + sliceAngle;
      const mid = (a0 + a1) / 2;
      const pct = (item.value / total) * 100;

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
              : shadeColor(item.color, 0.18 + si * 0.06)
            : item.color;

        const gid = `pie-grad-${index}-${si}`;
        const midRad = mid * RAD;
        const gx0 = cx + rLo * Math.cos(midRad);
        const gy0 = cy + rLo * Math.sin(midRad);
        const gx1 = cx + rHi * Math.cos(midRad);
        const gy1 = cy + rHi * Math.sin(midRad);

        gradients.push(
          <linearGradient key={gid} id={gid} gradientUnits="userSpaceOnUse" x1={gx0} y1={gy0} x2={gx1} y2={gy1}>
            <stop offset="0%" stopColor={subColor} stopOpacity={0.92} />
            <stop offset="100%" stopColor={shadeColor(subColor, 0.08)} stopOpacity={1} />
          </linearGradient>
        );

        segs.push({
          key: `${index}-${si}`,
          path: donutPath(cx, cy, rLo, rHi, a0, a1),
          fill: `url(#${gid})`,
        });

        rHi = rLo;
      });

      sliceMeta.push({ index, mid, pct, item, a0, a1 });
      cursor = a1 + gapDeg;
    });

    return { ringSegments: segs, gradientNodes: gradients, slices: sliceMeta };
  }, [data, total, cx, cy, rOuter, rInnerBase, gapDeg]);

  const kink = 18;
  const arm = 52;
  const titleSize = Math.max(11, size * 0.038);
  const pctSize = Math.max(10, size * 0.034);

  return (
    <div
      className="relative mx-auto overflow-visible aspect-square"
      style={{ width: `min(100%, ${vb}px)`, maxWidth: `${vb}px` }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${vb} ${vb}`}
        preserveAspectRatio="xMidYMid meet"
        className="overflow-visible"
      >
        <defs>
          <radialGradient id="pie-center-fade" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="rgba(172,0,100,0.2)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          {gradientNodes}
        </defs>

        <circle
          cx={cx}
          cy={cy}
          r={rOuter + 5}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
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
                stroke="rgba(18,2,20,0.75)"
                strokeWidth={1.15}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{
                  opacity: 1,
                  scale: isHovered ? 1.03 : 1,
                  filter: isHovered ? 'brightness(1.12)' : 'brightness(1)',
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              />
            </g>
          );
        })}

        <circle cx={cx} cy={cy} r={rInnerBase - 1.5} fill="#140818" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        <circle cx={cx} cy={cy} r={rInnerBase - 1.5} fill="url(#pie-center-fade)" />

        <text
          x={cx}
          y={centerSubtitle ? cy - size * 0.015 : cy + size * 0.02}
          textAnchor="middle"
          fill="#f4f4f5"
          className="font-extralight tracking-wide"
          style={{ fontSize: Math.max(12, size * 0.048) }}
        >
          {centerTitle}
        </text>
        {centerSubtitle ? (
          <text
            x={cx}
            y={cy + size * 0.055}
            textAnchor="middle"
            fill="rgba(255,255,255,0.5)"
            className="font-light"
            style={{ fontSize: Math.max(9, size * 0.03) }}
          >
            {centerSubtitle}
          </text>
        ) : null}

        {/* Outside labels + elbow leaders — text on “page” background, not on slices */}
        {slices.map(({ index, mid, pct, item }) => {
          const midRad = mid * RAD;
          const cos = Math.cos(midRad);
          const sin = Math.sin(midRad);
          const onEdgeX = cx + (rOuter + 2) * cos;
          const onEdgeY = cy + (rOuter + 2) * sin;
          const kinkX = cx + (rOuter + kink) * cos;
          const kinkY = cy + (rOuter + kink) * sin;
          const rightSide = cos >= 0;
          const labelX = rightSide ? cx + rOuter + kink + arm : cx - rOuter - kink - arm;
          const lineEndX = labelX + (rightSide ? -4 : 4);

          const short = item.shortTitle || item.title || '';
          const label = short.length > 22 ? `${short.slice(0, 20)}…` : short;
          const pctRounded = Math.round(pct);

          return (
            <g key={`out-${index}`} className="pointer-events-none select-none">
              <motion.polyline
                fill="none"
                stroke="rgba(255,255,255,0.28)"
                strokeWidth={1}
                points={`${onEdgeX},${onEdgeY} ${kinkX},${kinkY} ${lineEndX},${kinkY}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.06 + index * 0.05 }}
              />
              <motion.circle
                cx={onEdgeX}
                cy={onEdgeY}
                r={2.5}
                fill={item.color}
                stroke="rgba(0,0,0,0.35)"
                strokeWidth={0.75}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05, type: 'spring', stiffness: 400, damping: 22 }}
              />
              <text
                x={rightSide ? labelX + 6 : labelX - 6}
                y={kinkY - 5}
                textAnchor={rightSide ? 'start' : 'end'}
                fill="#f4f4f5"
                style={{
                  fontSize: titleSize,
                  fontWeight: 500,
                  paintOrder: 'stroke',
                  stroke: 'rgba(8,2,12,0.92)',
                  strokeWidth: 4,
                  strokeLinejoin: 'round',
                }}
              >
                {label}
              </text>
              <text
                x={rightSide ? labelX + 6 : labelX - 6}
                y={kinkY + 11}
                textAnchor={rightSide ? 'start' : 'end'}
                fill="rgba(255,255,255,0.55)"
                style={{
                  fontSize: pctSize,
                  fontWeight: 400,
                  fontVariantNumeric: 'tabular-nums',
                  paintOrder: 'stroke',
                  stroke: 'rgba(8,2,12,0.9)',
                  strokeWidth: 3,
                  strokeLinejoin: 'round',
                }}
              >
                {pctRounded}% of round
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
