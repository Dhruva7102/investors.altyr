import React from 'react';
import { cn } from '@/lib/utils';

export default function MockupFrame({
  title,
  size = 'md',
  className,
  style,
  children,
}) {
  return (
    <div
      className={cn(
        'relative rounded-2xl bg-white/[0.03] border border-white/[0.10] backdrop-blur-sm overflow-hidden',
        'shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_rgba(0,0,0,0.35)]',
        size === 'sm' ? 'p-4' : 'p-5',
        className
      )}
      style={style}
    >
      {/* Chrome */}
      <div className={cn('flex items-center justify-between', size === 'sm' ? 'mb-3' : 'mb-4')}>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-white/10 border border-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/10 border border-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/10 border border-white/15" />
        </div>
        {title ? (
          <div className="text-[11px] tracking-[0.18em] uppercase text-white/45 font-light">
            {title}
          </div>
        ) : (
          <div className="text-[11px] tracking-[0.18em] uppercase text-white/30 font-light">
            Product UI
          </div>
        )}
      </div>

      {children}
    </div>
  );
}

