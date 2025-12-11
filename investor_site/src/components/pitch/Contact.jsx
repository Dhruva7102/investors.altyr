import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 md:py-24 bg-gradient-to-b from-[#0d0110] to-[#18021A]">
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Divider line */}
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        {/* ALTYR wordmark */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 
            className="text-4xl md:text-5xl font-semibold tracking-[0.15em] mb-8"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            <span className="bg-gradient-to-r from-[#9B4DCA] via-[#E85A24] to-[#FF8C42] bg-clip-text text-transparent">
              ALTYR
            </span>
          </h2>
        </motion.div>

        {/* Contact info */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-white/60 font-light mb-2">
            Dhruva Kolikineni
          </p>
          <p className="text-white/50 font-light text-sm mb-4">
            CEO, Altyr
          </p>
          
          <a 
            href="mailto:dhruva@altyr.com"
            className="inline-flex items-center gap-2 text-[#AC0064] hover:text-[#64109A] transition-colors duration-300 font-light group"
          >
            <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            <span>dhruva@altyr.com</span>
          </a>
        </motion.div>

        {/* Footer note */}
        <motion.div
          className="text-center mt-12 pt-8 border-t border-white/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p className="text-xs text-white/30 font-light">
            © 2024 Altyr. Building the next generation of creator platforms.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

