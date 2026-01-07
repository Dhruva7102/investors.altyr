import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SlideContainer({ children, slideIndex, isActive }) {
  return (
    <AnimatePresence mode="sync">
      {isActive && (
        <motion.div
          key={slideIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.08, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
