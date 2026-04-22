import { motion } from 'framer-motion';

const ACCENT_FROM = '#AC0064';
const ACCENT_TO = '#64109A';

export default function AgentStarterPackTitleSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-[#18021A]">
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
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          className="flex items-center justify-center gap-6 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">
            Project 3
          </span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        <motion.h2
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight text-white/90 mb-6"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: `linear-gradient(to right, ${ACCENT_FROM}, ${ACCENT_TO})` }}
          >
            Agent Starter Pack
          </span>
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Deploy to Vertex AI Agent Engine in minutes
        </motion.p>
      </div>
    </section>
  );
}
