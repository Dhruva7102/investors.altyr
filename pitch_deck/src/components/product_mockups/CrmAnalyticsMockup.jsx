import React from 'react';
import MockupFrame from '@/components/product_mockups/MockupFrame';

const topStats = [
  { label: 'Total Fans', value: '2,847', delta: '+12%', deltaStyle: 'text-emerald-300' },
  { label: 'Avg Connection', value: '62', delta: '+3%', deltaStyle: 'text-emerald-300' },
  { label: 'Total LTV', value: '$1.2M', delta: '+18%', deltaStyle: 'text-emerald-300' },
  { label: 'At Risk', value: '288', delta: '-5%', deltaStyle: 'text-emerald-300' },
];

export default function CrmAnalyticsMockup({ size = 'md', className, style }) {
  return (
    <MockupFrame title="CRM Analytics" size={size} className={className} style={style}>
      <div className="space-y-4">
        <div className="text-sm font-light text-white/80">Advanced Analytics Dashboard</div>

        {/* Top tiles */}
        <div className="grid grid-cols-4 gap-3">
          {topStats.map((s) => (
            <div key={s.label} className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-3">
              <div className="text-[10px] tracking-[0.16em] uppercase text-white/45">{s.label}</div>
              <div className="mt-1 text-base font-semibold text-white/90">{s.value}</div>
              <div className={`mt-0.5 text-[12px] ${s.deltaStyle}`}>{s.delta}</div>
            </div>
          ))}
        </div>

        {/* Chart placeholders */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-4">
            <div className="text-[11px] tracking-[0.12em] uppercase text-white/45">
              Relationship Depth Distribution
            </div>
            <div className="mt-3 h-20 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center">
              <div className="text-[11px] text-white/35">chart</div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-4">
            <div className="text-[11px] tracking-[0.12em] uppercase text-white/45">LTV Prediction Timeline</div>
            <div className="mt-3 h-20 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center">
              <div className="text-[11px] text-white/35">chart</div>
            </div>
          </div>
        </div>

        {/* Table preview */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] overflow-hidden">
          <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
            <div className="text-sm font-light text-white/80">Fan List (Advanced View)</div>
            <div className="flex items-center gap-2">
              <div className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.10] text-[11px] text-white/60">
                Export
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.10] text-[11px] text-white/60">
                Save View
              </div>
            </div>
          </div>
          <div className="px-4 py-3 grid grid-cols-6 gap-2 text-[11px] text-white/40 border-b border-white/[0.06]">
            <div>Name</div>
            <div>Status</div>
            <div>Connection</div>
            <div>LTV</div>
            <div>Churn</div>
            <div>Segment</div>
          </div>
          <div className="px-4 py-3 grid grid-cols-6 gap-2 text-[12px] text-white/70">
            <div className="text-white/85">Sam T.</div>
            <div>
              <span className="px-2 py-0.5 rounded-md bg-[#64109A]/20 border border-[#64109A]/30 text-[#C6A7FF]">
                Superfan
              </span>
            </div>
            <div>92/100</div>
            <div>$5,200</div>
            <div className="text-emerald-300">Low</div>
            <div>High-Value VIPs</div>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

