import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ExternalLink } from 'lucide-react';

export default function ContactSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#18021A] to-[#0d0110]">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Primary gradient orb - centered, elegant */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(100,16,154,0.25) 0%, rgba(172,0,100,0.12) 35%, transparent 65%)',
            filter: 'blur(70px)'
          }}
        />

        {/* Secondary accent - bottom left */}
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px]"
          style={{
            background: 'radial-gradient(circle, rgba(77,7,28,0.4) 0%, transparent 55%)',
            filter: 'blur(60px)'
          }} />

        {/* Tertiary accent - top right */}
        <div
          className="absolute -top-32 -right-32 w-[400px] h-[400px]"
          style={{
            background: 'radial-gradient(circle, rgba(100,16,154,0.2) 0%, transparent 55%)',
            filter: 'blur(60px)'
          }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Logo wordmark */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="relative inline-block">
            <h1 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-[0.12em]"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              <span className="bg-gradient-to-r from-[#9B4DCA] via-[#E85A24] to-[#FF8C42] bg-clip-text text-transparent">
                ALTYR
              </span>
            </h1>
            {/* Glow effect behind text */}
            <div
              className="absolute inset-0 -z-10 blur-3xl opacity-50"
              style={{
                background: 'linear-gradient(90deg, #9B4DCA, #E85A24, #FF8C42)',
              }}
            />
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Email */}
          <div className="flex items-center justify-center gap-3 text-white/70">
            <Mail className="w-5 h-5 text-[#AC0064]" />
            <a 
              href="mailto:dhruva@altyr.com"
              className="text-xl md:text-2xl font-light hover:text-white/90 transition-colors"
            >
              dhruva@altyr.com
            </a>
          </div>

          {/* Website */}
          <div className="flex items-center justify-center gap-3 text-white/70">
            <ExternalLink className="w-5 h-5 text-[#AC0064]" />
            <a 
              href="https://altyr.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl md:text-2xl font-light hover:text-white/90 transition-colors"
            >
              altyr.com
            </a>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-lg md:text-xl text-white/50 font-extralight italic mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Let's build the future of creator monetization, together.
        </motion.p>

        {/* Footer note */}
        <motion.div
          className="mt-20 pt-6 border-t border-white/[0.04]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <p className="text-xs text-white/40 font-light">
            © 2026 Altyr • Confidential & Proprietary
          </p>
        </motion.div>
      </div>
    </section>
  );
}
