import React from 'react';
import MockupFrame from '@/components/product_mockups/MockupFrame';

const quickStats = [
  { label: 'High-Value VIPs', value: '47', accent: 'from-[#AC0064] to-[#64109A]' },
  { label: 'At Risk', value: '288', accent: 'from-[#E85A24] to-[#FF8C42]' },
  { label: 'Predicted LTV', value: '$1.2M', accent: 'from-[#9B4DCA] to-[#64109A]' },
];

const fans = [
  {
    name: 'Alex M.',
    status: 'VIP',
    statusStyle: 'bg-[#AC0064]/20 text-[#FF5AAE] border-[#AC0064]/30',
    connection: 78,
    ltv: '$2,450',
    churn: 'Low',
    churnStyle: 'text-emerald-300',
  },
  {
    name: 'Jordan K.',
    status: 'Regular',
    statusStyle: 'bg-[#64109A]/20 text-[#C6A7FF] border-[#64109A]/30',
    connection: 45,
    ltv: '$890',
    churn: 'Medium',
    churnStyle: 'text-amber-300',
  },
];

export default function CrmQuickScanMockup({ size = 'md', className, style }) {
  return (
    <MockupFrame title="CRM Quick-Scan" size={size} className={className} style={style}>
      <div className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {quickStats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-3"
            >
              <div className="text-[10px] tracking-[0.16em] uppercase text-white/45">
                {s.label}
              </div>
              <div className="mt-1 text-base font-semibold text-white/90">
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${s.accent}`}>
                  {s.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Fan rows */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] overflow-hidden">
          <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
            <div className="text-sm font-light text-white/80">Fan Overview</div>
            <div className="flex items-center gap-2">
              <div className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.10] text-[11px] text-white/60">
                Filter
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.10] text-[11px] text-white/60">
                Sort
              </div>
            </div>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {fans.map((f) => (
              <div key={f.name} className="px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#AC0064] to-[#64109A] flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium text-white/90 truncate">{f.name}</div>
                        <div
                          className={`px-2 py-0.5 rounded-md border text-[11px] font-medium ${f.statusStyle}`}
                        >
                          {f.status}
                        </div>
                      </div>
                      <div className="mt-0.5 text-[12px] text-white/55">
                        Connection {f.connection}/100 • LTV {f.ltv}
                      </div>
                    </div>
                  </div>
                  <div className={`text-[12px] font-medium ${f.churnStyle}`}>{f.churn} risk</div>
                </div>

                <div className="mt-2">
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#AC0064] to-[#64109A]"
                      style={{ width: `${f.connection}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

