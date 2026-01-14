import React from 'react';
import MockupFrame from '@/components/product_mockups/MockupFrame';

const factors = [
  { pct: '35%', label: 'Engagement Decline' },
  { pct: '25%', label: 'Interaction Recency' },
  { pct: '20%', label: 'Financial Stability' },
  { pct: '20%', label: 'Relationship Depth Change' },
];

const distribution = [
  { label: 'Low Risk', value: '1847 fans (65%)', width: 65, color: 'bg-emerald-400' },
  { label: 'Medium Risk', value: '712 fans (25%)', width: 25, color: 'bg-amber-400' },
  { label: 'High Risk', value: '213 fans (7%)', width: 7, color: 'bg-orange-400' },
  { label: 'Critical Risk', value: '75 fans (3%)', width: 3, color: 'bg-rose-400' },
];

export default function CrmChurnRiskMockup({ size = 'md', className, style }) {
  return (
    <MockupFrame title="Churn Risk" size={size} className={className} style={style}>
      <div className="space-y-4">
        {/* Predicted LTV header */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-light text-white/85">Predicted LTV</div>
              <div className="text-[12px] text-white/45">Based on current patterns and trends</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">
                $3,450
              </div>
              <div className="text-[12px] text-emerald-300">+18% from current</div>
            </div>
          </div>
          <div className="mt-3">
            <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full w-[72%] bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]" />
            </div>
            <div className="mt-1 flex items-center justify-between text-[11px] text-white/35">
              <span>$0</span>
              <span>$5,000</span>
            </div>
          </div>
        </div>

        <div className="text-sm font-light text-white/80 text-center">Churn Risk Scoring</div>

        {/* Factors */}
        <div className="grid grid-cols-4 gap-3">
          {factors.map((f) => (
            <div key={f.label} className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-3">
              <div className="text-base font-semibold text-[#FF5AAE]">{f.pct}</div>
              <div className="mt-1 text-[12px] text-white/55">{f.label}</div>
            </div>
          ))}
        </div>

        {/* Distribution */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-4">
          <div className="text-sm font-light text-white/80 mb-3">Churn Risk Distribution</div>
          <div className="space-y-3">
            {distribution.map((d) => (
              <div key={d.label} className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-white/10 border border-white/15 flex-shrink-0" />
                <div className="w-28 text-[12px] text-white/70">{d.label}</div>
                <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className={`h-full ${d.color}`} style={{ width: `${d.width}%` }} />
                </div>
                <div className="w-28 text-right text-[12px] text-white/55">{d.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

