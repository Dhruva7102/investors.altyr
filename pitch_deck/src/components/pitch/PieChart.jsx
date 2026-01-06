import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PieChart = ({ data, size = 320 }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const center = size / 2;
  const radius = size * 0.35;
  const innerRadius = 0; // Full pie chart
  
  // Calculate total
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Build segments
  let currentAngle = -90; // Start at top
  
  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    
    // Convert to radians
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    // Calculate arc coordinates
    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);
    
    // Large arc flag
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    // Create path
    const pathData = [
      `M ${center} ${center}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `Z`
    ].join(' ');
    
    // Calculate label position (midpoint of segment)
    const midAngle = (startAngle + endAngle) / 2;
    const midRad = (midAngle * Math.PI) / 180;
    const labelRadius = radius * 0.65; // Position labels at 65% of radius
    const labelX = center + labelRadius * Math.cos(midRad);
    const labelY = center + labelRadius * Math.sin(midRad);
    
    currentAngle = endAngle;
    
    return {
      ...item,
      percentage: percentage.toFixed(0),
      pathData,
      labelX,
      labelY,
      midAngle,
      index
    };
  });
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="drop-shadow-lg"
      >
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
                fill={segment.color}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  filter: isHovered ? 'brightness(1.15)' : 'brightness(1)'
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: segment.index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                style={{ 
                  transformOrigin: `${center}px ${center}px`,
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
                }}
              />
              
              {/* Percentage label */}
              {parseFloat(segment.percentage) >= 10 && (
                <motion.text
                  x={segment.labelX}
                  y={segment.labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-sm font-semibold fill-white pointer-events-none select-none"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: isHovered ? 1.1 : 1
                  }}
                  transition={{ 
                    duration: 0.4, 
                    delay: segment.index * 0.1 + 0.3,
                    ease: 'easeOut'
                  }}
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  {segment.percentage}%
                </motion.text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default PieChart;
