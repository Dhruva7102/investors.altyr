import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * BarChart Component
 * SVG-based bar chart with support for grouped bars
 * 
 * @param {Array} data - Array of data objects: { label, values: [{ label, value, color }] }
 * @param {Object} config - Chart configuration: { width, height, orientation, showGrid }
 */
const BarChart = ({ 
  data = [], 
  config = {
    width: 800,
    height: 400,
    orientation: 'vertical',
    showGrid: true,
    formatValue: (val) => val.toLocaleString(),
  }
}) => {
  const [hoveredBar, setHoveredBar] = useState(null);
  
  const {
    width = 800,
    height = 400,
    orientation = 'vertical',
    showGrid = true,
    formatValue = (val) => val.toLocaleString(),
  } = config;

  // Chart dimensions
  const padding = { top: 20, right: 20, bottom: 80, left: 80 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate max value
  const allValues = data.flatMap(d => d.values.map(v => v.value));
  const maxValue = Math.max(...allValues);
  const yMax = maxValue * 1.1; // Add 10% padding

  // Bar spacing
  const barGroupWidth = chartWidth / data.length;
  const barWidth = barGroupWidth / (Math.max(...data.map(d => d.values.length)) + 1);

  // Grid lines
  const yGridLines = 5;
  const gridYValues = Array.from({ length: yGridLines + 1 }, (_, i) => 
    (yMax / yGridLines) * i
  );

  // Scale function
  const scaleY = (value) => (value / yMax) * chartHeight;

  return (
    <div className="relative" style={{ width, height }}>
      <svg width={width} height={height} className="overflow-visible">
        {/* Grid lines */}
        {showGrid && (
          <g className="opacity-20">
            {gridYValues.map((value, i) => (
              <line
                key={`grid-${i}`}
                x1={padding.left}
                y1={height - padding.bottom - scaleY(value)}
                x2={width - padding.right}
                y2={height - padding.bottom - scaleY(value)}
                stroke="white"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            ))}
          </g>
        )}

        {/* Y-axis labels */}
        <g className="text-xs fill-white/60">
          {gridYValues.map((value, i) => (
            <text
              key={`y-label-${i}`}
              x={padding.left - 10}
              y={height - padding.bottom - scaleY(value)}
              textAnchor="end"
              dominantBaseline="middle"
            >
              {formatValue(value)}
            </text>
          ))}
        </g>

        {/* Bar groups */}
        {data.map((group, groupIndex) => {
          const groupX = padding.left + groupIndex * barGroupWidth;

          return (
            <g key={`group-${groupIndex}`}>
              {/* Bars within group */}
              {group.values.map((bar, barIndex) => {
                const barHeight = scaleY(bar.value);
                const barX = groupX + barIndex * barWidth + barWidth * 0.5;
                const barY = height - padding.bottom - barHeight;
                const isHovered = hoveredBar?.groupIndex === groupIndex && hoveredBar?.barIndex === barIndex;

                return (
                  <g key={`bar-${groupIndex}-${barIndex}`}>
                    {/* Bar */}
                    <motion.rect
                      x={barX}
                      y={barY}
                      width={barWidth * 0.8}
                      height={barHeight}
                      fill={bar.color}
                      rx="4"
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={{ scaleY: 1, opacity: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: groupIndex * 0.1 + barIndex * 0.05,
                        ease: 'easeOut'
                      }}
                      style={{ 
                        transformOrigin: `${barX + barWidth * 0.4}px ${height - padding.bottom}px`,
                        filter: isHovered ? 'brightness(1.2)' : 'brightness(1)',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={() => setHoveredBar({ groupIndex, barIndex })}
                      onMouseLeave={() => setHoveredBar(null)}
                    />

                    {/* Value label on hover */}
                    {isHovered && (
                      <motion.g
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <rect
                          x={barX - 10}
                          y={barY - 35}
                          width={barWidth * 0.8 + 20}
                          height={30}
                          rx="6"
                          fill="rgba(0,0,0,0.9)"
                          stroke="white"
                          strokeWidth="1"
                        />
                        <text
                          x={barX + barWidth * 0.4}
                          y={barY - 20}
                          textAnchor="middle"
                          className="text-xs fill-white font-medium"
                        >
                          {bar.label}
                        </text>
                        <text
                          x={barX + barWidth * 0.4}
                          y={barY - 8}
                          textAnchor="middle"
                          className="text-xs fill-white/80"
                        >
                          {formatValue(bar.value)}
                        </text>
                      </motion.g>
                    )}
                  </g>
                );
              })}

              {/* Group label */}
              <text
                x={groupX + barGroupWidth / 2}
                y={height - padding.bottom + 20}
                textAnchor="middle"
                className="text-xs fill-white/70 font-light"
              >
                {group.label}
              </text>
            </g>
          );
        })}

        {/* Axes */}
        <line
          x1={padding.left}
          y1={height - padding.bottom}
          x2={width - padding.right}
          y2={height - padding.bottom}
          stroke="white"
          strokeWidth="2"
          className="opacity-40"
        />
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={height - padding.bottom}
          stroke="white"
          strokeWidth="2"
          className="opacity-40"
        />
      </svg>

      {/* Legend for grouped bars */}
      {data[0]?.values.length > 1 && (
        <div className="flex items-center justify-center gap-6 mt-4">
          {data[0].values.map((bar, i) => (
            <div key={`legend-${i}`} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: bar.color }}
              />
              <span className="text-xs text-white/70 font-light">{bar.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BarChart;
