import React from 'react';
import MockupFrame from '@/components/product_mockups/MockupFrame';

export default function GamificationDailyRewardMockup({ size = 'md', className, style }) {
  return (
    <MockupFrame title="Daily Reward" size={size} className={className} style={style}>
      <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5 text-center">
        <div className="text-xl">Daily Reward</div>
        <div className="mt-1 text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">
          Day 7
        </div>
        <div className="mt-2 text-sm text-white/60">+200 XP</div>
        <div className="mt-2 text-sm text-[#FF8C42]">Weekly Bonus!</div>
        <div className="mt-3 text-[12px] text-white/45">7 Day Streak</div>
        <div className="mt-4 inline-flex px-5 py-2 rounded-full bg-[#AC0064]/25 border border-[#AC0064]/35 text-white/85 text-sm">
          Claim Reward
        </div>
      </div>
    </MockupFrame>
  );
}

