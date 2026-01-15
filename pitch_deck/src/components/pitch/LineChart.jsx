import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * LineChart Component
 * SVG-based line chart with support for multiple datasets
 * 
 * @param {Array} datasets - Array of dataset objects: { label, data: [{x, y}], color }
 * @param {Object} config - Chart configuration: { width, height, showGrid, yAxisLabel, xAxisLabel }
 */
const LineChart = ({ 
  datasets = [], 
  config = {
    width: 800,
    height: 400,
    showGrid: true,
    yAxisLabel: '',
    xAxisLabel: '',
    formatY: (val) => val.toLocaleString(),
    formatX: (val) => val,
  }
}) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  
  const {
    width = 800,
    height = 400,
    showGrid = true,
    yAxisLabel = '',
    xAxisLabel = '',
    formatY = (val) => val.toLocaleString(),
    formatX = (val) => val,
  } = config;

  // Chart dimensions
  const padding = { top: 20, right: 20, bottom: 50, left: 80 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate min/max values across all datasets
  const allPoints = datasets.flatMap(d => d.data);
  const xValues = allPoints.map(p => p.x);
  const yValues = allPoints.map(p => p.y);
  
  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const yMin = Math.min(0, Math.min(...yValues)); // Start from 0 or minimum value
  const yMax = Math.max(...yValues);

  // Add 10% padding to y-axis
  const yPadding = (yMax - yMin) * 0.1;
  const yMinPadded = yMin - yPadding;
  const yMaxPadded = yMax + yPadding;

  // Scale functions
  const scaleX = (x) => ((x - xMin) / (xMax - xMin)) * chartWidth + padding.left;
  const scaleY = (y) => chartHeight - ((y - yMinPadded) / (yMaxPadded - yMinPadded)) * chartHeight + padding.top;

  // Generate grid lines
  const yGridLines = 5;
  const gridYValues = Array.from({ length: yGridLines + 1 }, (_, i) => 
    yMinPadded + (yMaxPadded - yMinPadded) * (i / yGridLines)
  );

  // Generate line paths
  const generatePath = (data) => {
    return data.map((point, i) => {
      const x = scaleX(point.x);
      const y = scaleY(point.y);
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(' ');
  };

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
                y1={scaleY(value)}
                x2={width - padding.right}
                y2={scaleY(value)}
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
              y={scaleY(value)}
              textAnchor="end"
              dominantBaseline="middle"
            >
              {formatY(value)}
            </text>
          ))}
        </g>

        {/* Y-axis label */}
        {yAxisLabel && (
          <text
            x={20}
            y={height / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(-90, 20, ${height / 2})`}
            className="text-xs fill-white/60 font-light"
          >
            {yAxisLabel}
          </text>
        )}

        {/* X-axis label */}
        {xAxisLabel && (
          <text
            x={width / 2}
            y={height - 10}
            textAnchor="middle"
            className="text-xs fill-white/60 font-light"
          >
            {xAxisLabel}
          </text>
        )}

        {/* Lines and points for each dataset */}
        {datasets.map((dataset, datasetIndex) => (
          <g key={`dataset-${datasetIndex}`}>
            {/* Line path with gradient */}
            <defs>
              <linearGradient
                id={`gradient-${datasetIndex}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor={dataset.color} stopOpacity="0.8" />
                <stop offset="100%" stopColor={dataset.color} stopOpacity="1" />
              </linearGradient>
            </defs>

            <motion.path
              d={generatePath(dataset.data)}
              fill="none"
              stroke={`url(#gradient-${datasetIndex})`}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 1.5, delay: datasetIndex * 0.2, ease: 'easeInOut' },
                opacity: { duration: 0.5, delay: datasetIndex * 0.2 }
              }}
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
            />

            {/* Data points */}
            {dataset.data.map((point, i) => {
              const cx = scaleX(point.x);
              const cy = scaleY(point.y);
              const isHovered = hoveredPoint?.datasetIndex === datasetIndex && hoveredPoint?.pointIndex === i;

              return (
                <g key={`point-${datasetIndex}-${i}`}>
                  <motion.circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 6 : 4}
                    fill={dataset.color}
                    stroke="white"
                    strokeWidth="2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: datasetIndex * 0.2 + 1 + i * 0.05,
                      ease: 'easeOut'
                    }}
                    onMouseEnter={() => setHoveredPoint({ datasetIndex, pointIndex: i })}
                    onMouseLeave={() => setHoveredPoint(null)}
                    style={{ cursor: 'pointer' }}
                  />

                  {/* Tooltip on hover */}
                  {isHovered && (
                    <g>
                      <rect
                        x={cx + 10}
                        y={cy - 30}
                        width={120}
                        height={50}
                        rx="6"
                        fill="rgba(0,0,0,0.9)"
                        stroke="white"
                        strokeWidth="1"
                      />
                      <text
                        x={cx + 70}
                        y={cy - 15}
                        textAnchor="middle"
                        className="text-xs fill-white font-medium"
                      >
                        {dataset.label}
                      </text>
                      <text
                        x={cx + 70}
                        y={cy - 2}
                        textAnchor="middle"
                        className="text-xs fill-white/80"
                      >
                        {formatX(point.x)}: {formatY(point.y)}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        ))}

        {/* X-axis tick marks */}
        {datasets[0]?.data.map((point, i) => {
          const x = scaleX(point.x);
          return (
            <g key={`x-tick-${i}`}>
              <line
                x1={x}
                y1={height - padding.bottom}
                x2={x}
                y2={height - padding.bottom + 5}
                stroke="white"
                strokeWidth="1"
                className="opacity-40"
              />
              <text
                x={x}
                y={height - padding.bottom + 15}
                textAnchor="middle"
                className="text-xs fill-white/60"
              >
                {formatX(point.x)}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      {datasets.length > 1 && (
        <div className="flex items-center justify-center gap-6 mt-4">
          {datasets.map((dataset, i) => (
            <div key={`legend-${i}`} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: dataset.color }}
              />
              <span className="text-xs text-white/70 font-light">{dataset.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LineChart;
