import React from 'react';
import MockupFrame from '@/components/product_mockups/MockupFrame';

export default function GamificationProfileMockup({ size = 'md', className, style, compact = false }) {
  const avatarSize = compact ? 'w-14 h-14' : 'w-16 h-16';
  const badgeSize = compact ? 'w-5 h-5' : 'w-6 h-6';

  return (
    <MockupFrame title="Profile Preview" size={size} className={className} style={style}>
      <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] overflow-hidden">
        {/* Banner */}
        <div className={compact ? 'h-12' : 'h-14'} style={{
          background: 'linear-gradient(90deg, rgba(100,16,154,0.35), rgba(172,0,100,0.35), rgba(232,90,36,0.25))',
        }} />

        <div className={compact ? 'p-4' : 'p-5'}>
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="relative -mt-10">
              <div
                className={`${avatarSize} rounded-full bg-gradient-to-br from-[#AC0064] to-[#64109A] border-4 border-[#18021A]`}
              />
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-400 border-2 border-[#18021A] flex items-center justify-center">
                <span className="text-[10px] font-semibold text-[#18021A]">L25</span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 pt-1">
              <div className="flex items-center gap-3">
                <div className="text-base font-semibold text-white/90 truncate">Username</div>
                <div className="flex items-center gap-1.5">
                  <div className={`${badgeSize} rounded bg-amber-400/15 border border-amber-400/50`} />
                  <div className={`${badgeSize} rounded bg-white/10 border border-white/25`} />
                  <div className={`${badgeSize} rounded bg-orange-400/15 border border-orange-400/40`} />
                </div>
              </div>
              <div className="mt-0.5 text-[12px] text-white/50">Online • Active 5 min ago</div>

              {/* XP */}
              <div className="mt-3 rounded-xl bg-white/[0.03] border border-white/[0.08] p-3">
                <div className="flex items-center justify-between text-[12px] text-white/60">
                  <span>Level 25</span>
                  <span>2,450 / 3,000 XP</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-[82%] bg-gradient-to-r from-[#AC0064] to-[#64109A]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

