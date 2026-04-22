import { motion } from 'framer-motion';

const ACCENT_FROM = '#AC0064';
const ACCENT_TO = '#64109A';

export default function TitleSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-[#18021A]">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(100,16,154,0.25) 0%, rgba(172,0,100,0.12) 35%, transparent 65%)',
            filter: 'blur(100px)'
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.7, 0.9, 0.7]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }} />

        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px]"
          style={{
            background: 'radial-gradient(circle, rgba(77,7,28,0.4) 0%, transparent 55%)',
            filter: 'blur(80px)'
          }} />

        <div
          className="absolute -top-32 -right-32 w-[400px] h-[400px]"
          style={{
            background: 'radial-gradient(circle, rgba(100,16,154,0.2) 0%, transparent 55%)',
            filter: 'blur(80px)'
          }} />

        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")'
          }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="relative inline-block">
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-[0.08em]"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(to right, ${ACCENT_FROM}, ${ACCENT_TO})` }}
              >
                Dhruva&apos;s Work
              </span>
            </h1>
            <motion.div
              className="absolute inset-0 -z-10 blur-3xl opacity-50"
              style={{
                background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
              }}
              animate={{
                opacity: [0.4, 0.6, 0.4],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>

        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl font-extralight tracking-tight leading-[1.3] mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="text-white/90">A Non-Exhaustive Body of Work</span>
        </motion.h2>

        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 mb-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex items-center gap-3 text-white/70 font-light">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ACCENT_FROM }} />
            <span className="text-base md:text-lg">Knowledge Ingestion</span>
          </div>
          <div className="flex items-center gap-3 text-white/70 font-light">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ACCENT_FROM }} />
            <span className="text-base md:text-lg">Evaluation framework</span>
          </div>
          <div className="flex items-center gap-3 text-white/70 font-light">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ACCENT_FROM }} />
            <span className="text-base md:text-lg">Agent Starter Pack</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
