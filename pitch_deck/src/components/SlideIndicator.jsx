import React from 'react';
import { motion } from 'framer-motion';

export default function SlideIndicator({ currentSlide, totalSlides, onSlideClick }) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
      {Array.from({ length: totalSlides }, (_, i) => i).map((index) => {
        const isActive = index === currentSlide;
        return (
          <motion.button
            key={index}
            onClick={() => onSlideClick(index)}
            className="group relative"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
          >
            {/* Outer ring for active state */}
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#AC0064]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}

            {/* Inner dot */}
            <motion.div
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-3 h-3 bg-gradient-to-br from-[#AC0064] to-[#64109A]'
                  : 'w-2 h-2 bg-white/30 group-hover:bg-white/60 group-hover:w-2.5 group-hover:h-2.5'
              }`}
            />
          </motion.button>
        );
      })}
    </div>
  );
}
