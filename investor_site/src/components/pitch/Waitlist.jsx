import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CreatorCard from '@/components/creators/CreatorCard';
import { creators } from '@/data/creators';

/**
 * Waitlist - Horizontal scrollable grid of creator profiles
 * Features 2 rows (desktop) with parallax effect
 */
export default function Waitlist() {
  const containerRef = useRef(null);
  
  // Track scroll position for parallax effect
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  // Split creators into two rows for desktop
  const midpoint = Math.ceil(creators.length / 2);
  const topRowCreators = creators.slice(0, midpoint);
  const bottomRowCreators = creators.slice(midpoint);

  // Parallax transforms - top row moves slightly faster
  const topRowX = useTransform(scrollXProgress, [0, 1], [0, -50]);
  const bottomRowX = useTransform(scrollXProgress, [0, 1], [0, -30]);

  return (
    <section id="waitlist" className="py-20 px-4 md:px-8 relative">
      {/* Header */}
      <motion.div
        className="text-center mb-12 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-extralight text-white/90 mb-4">
          Our{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">
            Waitlist
          </span>
        </h3>
        <p className="text-lg md:text-xl text-white/60 font-light">
          High-profile creators already excited to join Altyr
        </p>
      </motion.div>

      {/* Scrollable Container with Fade Edges */}
      <div className="relative max-w-[1400px] mx-auto">
        {/* Left fade edge */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, #18021A, transparent)',
          }}
        />
        
        {/* Right fade edge */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, #18021A, transparent)',
          }}
        />

        {/* Desktop: 2 rows with parallax */}
        <div className="hidden md:block">
          <div className="space-y-6">
            {/* Top Row */}
            <motion.div
              style={{ x: topRowX }}
              className="overflow-x-auto hide-scrollbar"
            >
              <div className="flex gap-6 pb-4 px-32">
                {topRowCreators.map((creator, index) => (
                  <motion.div
                    key={creator.handle}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.05,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    <CreatorCard creator={creator} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bottom Row */}
            <motion.div
              style={{ x: bottomRowX }}
              className="overflow-x-auto hide-scrollbar"
            >
              <div className="flex gap-6 pb-4 px-32">
                {bottomRowCreators.map((creator, index) => (
                  <motion.div
                    key={creator.handle}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: (index + midpoint) * 0.05,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    <CreatorCard creator={creator} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile: Single scrollable row */}
        <div 
          ref={containerRef}
          className="md:hidden overflow-x-auto hide-scrollbar scroll-smooth"
          style={{
            scrollSnapType: 'x mandatory',
          }}
        >
          <div className="flex gap-4 pb-4 px-8">
            {creators.map((creator, index) => (
              <motion.div
                key={creator.handle}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                style={{ scrollSnapAlign: 'start' }}
              >
                <CreatorCard creator={creator} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Background gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20"
          style={{
            background: 'radial-gradient(circle, #AC0064, transparent)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20"
          style={{
            background: 'radial-gradient(circle, #64109A, transparent)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* CSS for hiding scrollbar */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

