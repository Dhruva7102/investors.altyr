import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { formatFollowerCount } from '@/data/creators';

/**
 * CreatorCard - Compact card for displaying creator profile info
 * Optimized for horizontal scrolling with 2-row layout
 */
export default function CreatorCard({ creator }) {
  const { handle, name, followers, verified, avatarUrl } = creator;

  const initial = (name || handle || '?').trim().charAt(0).toUpperCase();
  
  return (
    <motion.a
      href={`https://x.com/${handle}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#AC0064]/50 transition-all duration-300 cursor-pointer"
      style={{
        minWidth: '220px',
        maxWidth: '220px',
        height: '120px'
      }}
      whileHover={{ 
        scale: 1.05,
        y: -4,
        transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10"
        style={{
          background: 'linear-gradient(135deg, #AC0064, #64109A)',
        }}
      />

      {/* Content */}
      <div className="flex items-start gap-3 relative z-10">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name ? `${name} avatar` : `@${handle} avatar`}
              className="w-9 h-9 rounded-full object-cover border border-white/10"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 text-white/80 text-xs font-medium"
              style={{
                background: 'linear-gradient(135deg, rgba(172,0,100,0.35), rgba(100,16,154,0.35))',
              }}
            >
              {initial}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 min-w-0">
          {/* Handle with verified badge */}
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-white/90 font-medium text-sm truncate">
              @{handle}
            </span>
            {verified && (
              <span
                className="inline-flex items-center justify-center w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: '#1D9BF0' }}
                aria-label="Verified"
                title="Verified"
              >
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </span>
            )}
          </div>

          {/* Name */}
          <span className="text-white/50 text-xs font-light truncate">
            {name}
          </span>
        </div>
      </div>

      {/* Follower count */}
      <div className="flex items-end justify-between relative z-10">
        <div className="flex flex-col">
          <span className="text-white/40 text-xs font-light">
            Followers
          </span>
          <span className="text-white/90 font-semibold text-lg">
            {formatFollowerCount(followers)}
          </span>
        </div>

        {/* Decorative gradient dot */}
        <div 
          className="w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
          style={{
            background: 'linear-gradient(135deg, #AC0064, #64109A)',
          }}
        />
      </div>

      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #AC0064, #64109A)',
        }}
      />
    </motion.a>
  );
}

