import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const ALTYR_FALLBACK_URL = 'https://dev.altyr.com';

export default function RedirectHero({
  state,
  onlyfansUrl,
  altyrUrl,
  onOnlyFansClick,
  onAltyrClick,
}) {
  const scrollToExplore = () => {
    const el = document.getElementById('explore');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background - match waitlist Hero */}
      <div className="absolute inset-0 bg-[#18021A]">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(100,16,154,0.25) 0%, rgba(172,0,100,0.12) 35%, transparent 65%)',
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px]"
          style={{
            background: 'radial-gradient(circle, rgba(77,7,28,0.4) 0%, transparent 55%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute -top-32 -right-32 w-[400px] h-[400px]"
          style={{
            background: 'radial-gradient(circle, rgba(100,16,154,0.2) 0%, transparent 55%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Logo - Altyr asset from dev.altyr.com */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <img
            src="/logo.svg"
            alt="Altyr"
            className="h-12 sm:h-14 md:h-16 mx-auto w-auto"
          />
        </motion.div>

        {state === 'loading' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="w-10 h-10 mx-auto border-2 border-white/20 border-t-[#AC0064] rounded-full animate-spin" />
            <p className="text-white/50 text-sm font-light">Loading…</p>
          </motion.div>
        )}

        {state === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-lg text-white/80">This link is invalid or has expired.</p>
            <Button
              onClick={() => (window.location.href = ALTYR_FALLBACK_URL)}
              className="w-52 justify-center px-8 py-6 text-[15px] font-medium bg-gradient-to-r from-[#D4740C] to-[#B56A00] hover:from-[#E8840C] hover:to-[#C97A00] text-white border-0 rounded-full transition-all duration-500 hover:shadow-[0_0_60px_rgba(212,116,12,0.4)] hover:scale-[1.02]"
            >
              Go to Altyr
            </Button>
          </motion.div>
        )}

        {state === 'resolved' && (
          <>
            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl font-extralight tracking-tight leading-[1.2] mb-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-white/90">The Next Generation</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/80 via-[#AC0064] to-[#64109A]"> of Exclusive Content</span>
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-white/50 font-light tracking-wide mb-14"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Built for creators. Designed for fans.
            </motion.p>

            <motion.p
              className="text-sm text-white/40 font-light tracking-wide mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Get started
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button
                onClick={async () => {
                  try { await onOnlyFansClick(); } catch (_) {}
                  window.location.href = onlyfansUrl;
                }}
                className="group w-52 justify-center px-8 py-6 text-[15px] font-medium bg-white/[0.06] hover:bg-white/[0.1] text-white/90 border border-white/[0.12] hover:border-white/[0.2] rounded-full transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] hover:scale-[1.02] backdrop-blur-sm"
              >
                Proceed to OnlyFans
              </Button>
              <Button
                onClick={async () => {
                  try { await onAltyrClick(); } catch (_) {}
                  window.location.href = altyrUrl;
                }}
                className="group w-52 justify-center px-8 py-6 text-[15px] font-medium bg-gradient-to-r from-[#D4740C] to-[#B56A00] hover:from-[#E8840C] hover:to-[#C97A00] text-white border-0 rounded-full transition-all duration-500 hover:shadow-[0_0_60px_rgba(212,116,12,0.4)] hover:scale-[1.02]"
              >
                Experience Altyr
              </Button>
            </motion.div>

            <motion.p
              className="text-sm text-white/40 font-light tracking-wide mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              See why Altyr is so much better
            </motion.p>
          </>
        )}
      </div>

      {/* Scroll indicator - bottom center */}
      {state === 'resolved' && (
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          onClick={scrollToExplore}
        >
          <span className="text-xs text-white/30 tracking-widest uppercase">Explore</span>
          <motion.div
            className="p-2 rounded-full border border-white/10"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-white/40" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
