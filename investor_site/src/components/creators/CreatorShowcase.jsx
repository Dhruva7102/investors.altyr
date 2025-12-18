import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import CreatorCard from '@/components/creators/CreatorCard';
import { fetchCreators } from '@/api/airtable';

function splitTwoRows(items) {
  const midpoint = Math.ceil(items.length / 2);
  return [items.slice(0, midpoint), items.slice(midpoint)];
}

function duplicateForMarquee(items) {
  // Duplicate content so scrollLeft can loop seamlessly.
  return [...items, ...items];
}

export default function CreatorShowcase() {
  const [creators, setCreators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const pauseUntilRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const data = await fetchCreators();
        if (!cancelled) setCreators(Array.isArray(data) ? data : []);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const [topRow, bottomRow] = useMemo(() => splitTwoRows(creators), [creators]);

  const topMarquee = useMemo(() => duplicateForMarquee(topRow), [topRow]);
  const bottomMarquee = useMemo(() => duplicateForMarquee(bottomRow), [bottomRow]);

  const pauseAuto = (ms = 2200) => {
    pauseUntilRef.current = Math.max(pauseUntilRef.current, Date.now() + ms);
  };

  const onWheelToHorizontal = (ref) => (e) => {
    if (!ref?.current) return;
    // Trackpad horizontal works naturally; this is a nice fallback for mouse wheels.
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    e.preventDefault();
    pauseAuto();
    ref.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    // Auto-scroll by nudging scrollLeft. Still allows manual scrolling at any time.
    // Pauses briefly on user interaction for a premium “you’re in control” feel.
    if (!creators.length) return;

    const topEl = topRef.current;
    const bottomEl = bottomRef.current;
    if (!topEl || !bottomEl) return;

    let lastT = performance.now();

    const tick = (t) => {
      const dt = Math.min(32, t - lastT);
      lastT = t;

      const paused = Date.now() < pauseUntilRef.current;

      if (!paused) {
        // px per second (parallax feel via different speeds)
        // Tuned slightly faster so it feels “alive” even with manual-scroll enabled.
        const topSpeed = 34;
        const bottomSpeed = 46;

        // Loop point is half the scrollWidth because we duplicate content 2x.
        const topLoop = topEl.scrollWidth / 2;
        const bottomLoop = bottomEl.scrollWidth / 2;

        if (topLoop > 0) {
          topEl.scrollLeft = (topEl.scrollLeft + (topSpeed * dt) / 1000) % topLoop;
        }

        if (bottomLoop > 0) {
          // Reverse direction by subtracting; keep in [0, loop)
          let nextBottom = bottomEl.scrollLeft - (bottomSpeed * dt) / 1000;
          if (nextBottom < 0) nextBottom += bottomLoop;
          bottomEl.scrollLeft = nextBottom % bottomLoop;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [creators.length]);

  return (
    <div className="relative">
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 md:w-28 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #18021A, transparent)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-16 md:w-28 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #18021A, transparent)' }}
      />

      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-60">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-[120px] rounded-2xl bg-white/5 border border-white/10 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Desktop: 2 rows (manual scroll + auto-scroll w/ parallax speeds) */}
            <div className="hidden md:block">
              <div className="space-y-6">
                <div
                  ref={topRef}
                  className="scrollRow hide-scrollbar cursor-grab active:cursor-grabbing"
                  onWheel={onWheelToHorizontal(topRef)}
                  onPointerDown={() => pauseAuto(3000)}
                  onPointerUp={() => pauseAuto(1800)}
                  onTouchStart={() => pauseAuto(3500)}
                  onMouseEnter={() => pauseAuto(1200)}
                >
                  <div className="rowInner">
                    {topMarquee.map((creator, idx) => (
                      <CreatorCard key={`${creator.handle}-top-${idx}`} creator={creator} />
                    ))}
                  </div>
                </div>

                <div
                  ref={bottomRef}
                  className="scrollRow hide-scrollbar cursor-grab active:cursor-grabbing"
                  onWheel={onWheelToHorizontal(bottomRef)}
                  onPointerDown={() => pauseAuto(3000)}
                  onPointerUp={() => pauseAuto(1800)}
                  onTouchStart={() => pauseAuto(3500)}
                  onMouseEnter={() => pauseAuto(1200)}
                >
                  <div className="rowInner">
                    {bottomMarquee.map((creator, idx) => (
                      <CreatorCard key={`${creator.handle}-bottom-${idx}`} creator={creator} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: single row (manual scroll + auto-scroll) */}
            <div className="md:hidden">
              <div
                ref={topRef}
                className="scrollRow hide-scrollbar cursor-grab active:cursor-grabbing"
                onWheel={onWheelToHorizontal(topRef)}
                onPointerDown={() => pauseAuto(3000)}
                onPointerUp={() => pauseAuto(1800)}
                onTouchStart={() => pauseAuto(3500)}
                onMouseEnter={() => pauseAuto(1200)}
              >
                <div className="rowInner">
                  {duplicateForMarquee(creators).map((creator, idx) => (
                    <CreatorCard key={`${creator.handle}-mobile-${idx}`} creator={creator} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Scroll CSS (scoped) */}
      <style>{`
        .scrollRow {
          overflow-x: auto;
          overflow-y: hidden;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }

        .rowInner {
          display: flex;
          gap: 16px;
          width: max-content;
          padding: 6px 64px;
        }

        @media (min-width: 768px) {
          .rowInner {
            gap: 20px;
            padding: 6px 112px;
          }
        }

        /* Hide scrollbar but keep scrolling */
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}


