import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SlideNavigation({ currentSlide, totalSlides, onPrevious, onNext }) {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4">
      {/* Slide counter */}
      <div className="px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.1] backdrop-blur-sm">
        <span className="text-sm font-light text-white/70 tabular-nums">
          {currentSlide + 1} / {totalSlides}
        </span>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center gap-2">
        <motion.button
          onClick={onPrevious}
          disabled={currentSlide === 0}
          className="p-2 rounded-full bg-white/[0.05] border border-white/[0.1] backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/[0.15] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5 text-white/70" />
        </motion.button>

        <motion.button
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          className="p-2 rounded-full bg-white/[0.05] border border-white/[0.1] backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/[0.15] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-5 h-5 text-white/70" />
        </motion.button>
      </div>
    </div>
  );
}
