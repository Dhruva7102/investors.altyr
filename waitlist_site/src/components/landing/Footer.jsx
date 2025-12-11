import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Footer() {
  return (
    <footer className="relative py-16 md:py-20 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <div>
            <span className="text-lg tracking-[0.35em] font-light text-white/60">
              ALTYR
            </span>
          </div>

          {/* Links */}
                    <nav className="flex items-center justify-center gap-8">
                      <Link to={createPageUrl('Privacy')} className="text-sm text-white/35 hover:text-white/70 transition-colors duration-300 tracking-wide">
                        Privacy
                      </Link>
                      <Link to={createPageUrl('Terms')} className="text-sm text-white/35 hover:text-white/70 transition-colors duration-300 tracking-wide">
                        Terms
                      </Link>
                    </nav>

          {/* Copyright */}
          <p className="text-sm text-white/25 font-light tracking-wide">
            © 2025 ALTYR. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}