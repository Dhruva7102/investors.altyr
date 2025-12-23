import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import CreatorCard from '@/components/creators/CreatorCard';
import { fetchCreators } from '@/api/airtable';
import { formatFollowerCount } from '@/data/creators';

function splitTwoRows(items) {
  const midpoint = Math.ceil(items.length / 2);
  return [items.slice(0, midpoint), items.slice(midpoint)];
}

function duplicateForMarquee(items) {
  // Duplicate content so translateX(-50%) loops seamlessly.
  return [...items, ...items];
}

export default function CreatorShowcase() {
  const [creators, setCreators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ totalCreators: 0, totalFollowers: 0 });
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const mobileRef = useRef(null);
  const pauseUntilRef = useRef(0);
  const rafRef = useRef(null);
  const topPosRef = useRef(0);
  const bottomPosRef = useRef(0);
  const mobilePosRef = useRef(0);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchCreators();
        const list = Array.isArray(data) ? data : [];

        if (cancelled) return;

        setCreators(list);
        const totalFollowers = list.reduce((sum, c) => sum + (Number(c?.followers) || 0), 0);
        setStats({ totalCreators: list.length, totalFollowers });
        setIsLoading(false);
      } catch (err) {
        if (cancelled) return;
        console.error('Failed to fetch creators:', err);
        setCreators([]);
        setStats({ totalCreators: 0, totalFollowers: 0 });
        setError(err?.message || 'Failed to load creator profiles');
        setIsLoading(false);
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

  const pauseAuto = (ms = 1100) => {
    pauseUntilRef.current = Math.max(pauseUntilRef.current, Date.now() + ms);
  };

  const onWheelToHorizontal = (ref) => (e) => {
    if (!ref?.current) return;
    // Let natural horizontal trackpad scroll pass through.
    if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;
    e.preventDefault();
    pauseAuto(2200);
    ref.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    // Auto-scroll by nudging scrollLeft (still allows manual scrolling).
    // Loops seamlessly because we duplicate content 2x; loop point is half scrollWidth.
    if (!creators.length) return;

    const topEl = topRef.current;
    const bottomEl = bottomRef.current;
    const mobileEl = mobileRef.current;

    // Initialize positions from current scroll state to avoid a visual “jump”
    if (topEl) topPosRef.current = topEl.scrollLeft || 0;
    if (bottomEl) bottomPosRef.current = bottomEl.scrollLeft || 0;
    if (mobileEl) mobilePosRef.current = mobileEl.scrollLeft || 0;

    let lastT = performance.now();

    const tick = (t) => {
      const dt = Math.min(24, t - lastT);
      lastT = t;

      const paused = Date.now() < pauseUntilRef.current;

      if (!paused) {
        // px/sec: tuned to feel “alive” but not distracting
        // Increase AUTO_SCROLL_MULTIPLIER to speed up the whole system while preserving parallax.
        const AUTO_SCROLL_MULTIPLIER = 1;
        const topSpeed = 32 * AUTO_SCROLL_MULTIPLIER;
        const bottomSpeed = 44 * AUTO_SCROLL_MULTIPLIER;
        const mobileSpeed = 34 * AUTO_SCROLL_MULTIPLIER;

        if (topEl) {
          const loop = topEl.scrollWidth / 2;
          if (loop > 0) {
            topPosRef.current += (topSpeed * dt) / 1000;
            if (topPosRef.current >= loop) topPosRef.current -= loop;
            topEl.scrollLeft = topPosRef.current;
          }
        }

        if (bottomEl) {
          const loop = bottomEl.scrollWidth / 2;
          if (loop > 0) {
            bottomPosRef.current -= (bottomSpeed * dt) / 1000; // reverse direction
            if (bottomPosRef.current < 0) bottomPosRef.current += loop;
            bottomEl.scrollLeft = bottomPosRef.current;
          }
        }

        if (mobileEl) {
          const loop = mobileEl.scrollWidth / 2;
          if (loop > 0) {
            mobilePosRef.current += (mobileSpeed * dt) / 1000;
            if (mobilePosRef.current >= loop) mobilePosRef.current -= loop;
            mobileEl.scrollLeft = mobilePosRef.current;
          }
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
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg font-light">
              Unable to load creator profiles
            </p>
            <p className="text-white/40 text-sm font-light mt-2">
              {error}
            </p>
          </div>
        ) : creators.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg font-light">
              No creators in waitlist yet
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="space-y-6">
              {/* Desktop: 2 rows (manual scroll + auto-scroll w/ parallax speeds) */}
              <div className="hidden md:block">
                <div className="space-y-6">
                  <div className="relative">
                    <div
                      ref={topRef}
                      className="scrollRow hide-scrollbar cursor-grab active:cursor-grabbing"
                      onWheel={onWheelToHorizontal(topRef)}
                      onPointerDown={() => pauseAuto(3200)}
                      onPointerUp={() => pauseAuto(1800)}
                      onTouchStart={() => pauseAuto(3600)}
                    >
                      <div className="rowInner">
                        {topMarquee.map((creator, idx) => (
                          <CreatorCard key={`${creator.handle}-top-${idx}`} creator={creator} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div
                      ref={bottomRef}
                      className="scrollRow hide-scrollbar cursor-grab active:cursor-grabbing"
                      onWheel={onWheelToHorizontal(bottomRef)}
                      onPointerDown={() => pauseAuto(3200)}
                      onPointerUp={() => pauseAuto(1800)}
                      onTouchStart={() => pauseAuto(3600)}
                    >
                      <div className="rowInner">
                        {bottomMarquee.map((creator, idx) => (
                          <CreatorCard key={`${creator.handle}-bottom-${idx}`} creator={creator} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile: single row (manual scroll + auto-scroll) */}
              <div className="md:hidden">
                <div
                  ref={mobileRef}
                  className="scrollRow hide-scrollbar cursor-grab active:cursor-grabbing"
                  onWheel={onWheelToHorizontal(mobileRef)}
                  onPointerDown={() => pauseAuto(3200)}
                  onPointerUp={() => pauseAuto(1800)}
                  onTouchStart={() => pauseAuto(3600)}
                >
                  <div className="rowInner">
                    {duplicateForMarquee(creators).map((creator, idx) => (
                      <CreatorCard key={`${creator.handle}-mobile-${idx}`} creator={creator} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Summary stats */}
            <div className="flex justify-center gap-10 md:gap-14 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-semibold text-white/90">
                  {stats.totalCreators}
                </div>
                <div className="text-xs md:text-sm text-white/40 mt-1 font-light">
                  Total creators
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-semibold text-white/90">
                  {formatFollowerCount(stats.totalFollowers)}
                </div>
                <div className="text-xs md:text-sm text-white/40 mt-1 font-light">
                  Total followers
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
          scroll-behavior: auto;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior-x: contain;
          touch-action: pan-x;
        }

        .rowInner {
          display: flex;
          gap: 16px;
          width: max-content;
          padding: 6px 64px;
          transform: translateZ(0);
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


