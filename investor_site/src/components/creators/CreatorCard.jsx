import { motion } from 'framer-motion';
import { formatFollowerCount } from '@/data/creators';

/**
 * CreatorCard - Compact card for displaying creator profile info
 * Optimized for horizontal scrolling with 2-row layout
 */
export default function CreatorCard({ creator }) {
  const { handle, followers } = creator;

  const rawHandle = (handle || '').toString().trim();
  const cleanHandle = rawHandle
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/^x\.com\//i, '')
    .replace(/^twitter\.com\//i, '')
    .replace(/^@+/, '')
    .split('?')[0]
    .split('#')[0]
    .replace(/\/+$/, '');

  const displayHandle = cleanHandle ? `@${cleanHandle}` : '@';
  
  return (
    <motion.a
      href={cleanHandle ? `https://x.com/${cleanHandle}` : 'https://x.com'}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#AC0064]/50 transition-all duration-300 cursor-pointer"
      style={{
        minWidth: '220px',
        maxWidth: '220px',
        height: '110px'
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
      <div className="flex items-start relative z-10">
        <span className="text-white/90 font-medium text-base truncate">
          {displayHandle}
        </span>
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

