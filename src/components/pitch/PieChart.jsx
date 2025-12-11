import React from 'react';
import { motion } from 'framer-motion';

// Calculate pie chart segments
const calculatePieSegments = (data) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -90; // Start at top
  
  return data.map((item) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    
    // Convert to radians
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    // Calculate arc coordinates (using radius of 40 to leave some margin)
    const radius = 40;
    const x1 = 50 + radius * Math.cos(startRad);
    const y1 = 50 + radius * Math.sin(startRad);
    const x2 = 50 + radius * Math.cos(endRad);
    const y2 = 50 + radius * Math.sin(endRad);
    
    // Large arc flag
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    const pathData = [
      `M 50 50`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `Z`
    ].join(' ');
    
    currentAngle = endAngle;
    
    return {
      ...item,
      percentage: percentage.toFixed(0),
      pathData,
      startAngle,
      endAngle,
      midAngle: (startAngle + endAngle) / 2,
    };
  });
};

export default function PieChart({ data, size = 300 }) {
  const segments = calculatePieSegments(data);
  const center = 50; // SVG viewBox center
  const labelRadius = 25; // Distance from center for labels
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="transform -rotate-90"
      >
        {segments.map((segment, index) => {
          // Calculate label position (convert back from -90 rotation)
          const labelAngleRad = ((segment.midAngle + 90) * Math.PI) / 180;
          const labelX = center + labelRadius * Math.cos(labelAngleRad);
          const labelY = center + labelRadius * Math.sin(labelAngleRad);
          
          return (
            <g key={index}>
              <motion.path
                d={segment.pathData}
                fill={segment.color}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                style={{ 
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))',
                }}
              />
              {/* Percentage label */}
              {segment.percentage >= 15 && (
                <motion.text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-[3.5px] font-semibold fill-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
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
}

