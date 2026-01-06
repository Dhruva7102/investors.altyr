import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SlideContainer({ children, slideIndex, isActive }) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={slideIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="absolute inset-0 w-full h-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
