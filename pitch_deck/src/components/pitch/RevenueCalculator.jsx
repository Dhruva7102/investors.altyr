import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign } from 'lucide-react';
import {
  COMMISSION_RATE,
  SAAS_FEE,
  computeBaseSnapshot,
  computeForecastRows,
  clampNumber,
} from '@/lib/revenueCalculatorModel';

function formatCurrencyCompact(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

function SliderRow({ label, value, min, max, step, displayValue, onChange }) {
  return (
    <div className="space-y-2 w-full">
      <div className="flex items-center justify-between gap-3 text-sm text-white/70 font-light">
        <span className="leading-snug">{label}</span>
        <span className="font-medium text-white/90 tabular-nums shrink-0">{displayValue ?? value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full accent-[#AC0064]"
      />
    </div>
  );
}

export default function RevenueCalculator() {
  // Defaults reflect the model's upside steady state: 80% whale penetration,
  // ~$7,800 gross whale GMV/creator/mo, 20% take, $250 SaaS.
  const [creators, setCreators] = useState(1000);
  const [whaleGMVPerCreator, setWhaleGMVPerCreator] = useState(7800);
  const [penetrationPct, setPenetrationPct] = useState(80);
  const [commissionPct, setCommissionPct] = useState(Math.round(COMMISSION_RATE * 100));
  const [monthlyGrowthRatePct, setMonthlyGrowthRatePct] = useState(10);
  const [monthlyChurnPct, setMonthlyChurnPct] = useState(2);

  const commissionRate = commissionPct / 100;

  const base = useMemo(
    () =>
      computeBaseSnapshot({
        creators,
        whaleGMVPerCreator,
        penetrationPct,
        commissionRate,
      }),
    [creators, whaleGMVPerCreator, penetrationPct, commissionRate]
  );

  const forecast = useMemo(
    () =>
      computeForecastRows({
        creators,
        whaleGMVPerCreator,
        penetrationPct,
        commissionRate,
        monthlyGrowthRatePct,
        monthlyChurnPct,
      }),
    [creators, whaleGMVPerCreator, penetrationPct, commissionRate, monthlyGrowthRatePct, monthlyChurnPct]
  );

  const month0 = forecast[0];
  const month12 = forecast[forecast.length - 1];
  const saasMixPct = base.platformRevenue > 0 ? Math.round((base.saasRevenue / base.platformRevenue) * 100) : 0;

  return (
    <div className="w-full max-w-7xl mx-auto px-5 md:px-8">
      <motion.div
        className="flex items-center justify-center gap-6 mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <span className="w-14 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
        <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">
          Revenue forecast
        </span>
        <span className="w-14 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
      </motion.div>

      <motion.div
        className="text-center mb-6 md:mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75 }}
      >
        <h2 className="text-2xl md:text-3xl font-extralight text-white/90 mb-2">
          Revenue forecasting and projections
        </h2>
        <p className="text-sm md:text-base text-white/55 font-light max-w-2xl mx-auto leading-relaxed">
          Stress-test ecosystem revenue: ${SAAS_FEE}/creator SaaS plus {commissionPct}% of whale GMV on Altyr.
          Definitions and formulas are in the appendix.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
        <motion.div
          className="p-5 md:p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm flex flex-col"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
              <TrendingUp className="w-4 h-4 text-[#AC0064]" />
            </div>
            <div>
              <div className="text-base font-light text-white/90 tracking-wide">Assumptions</div>
              <div className="text-xs text-white/50 font-light">Monthly inputs unless noted</div>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:gap-5">
            <SliderRow
              label="Connected creators (on Altyr Pro)"
              value={creators}
              min={50}
              max={5000}
              step={50}
              displayValue={new Intl.NumberFormat('en-US').format(creators)}
              onChange={(v) => setCreators(clampNumber(v, 50, 5000))}
            />
            <SliderRow
              label="Whale GMV per creator / mo (gross)"
              value={whaleGMVPerCreator}
              min={1000}
              max={20000}
              step={100}
              displayValue={formatCurrencyCompact(whaleGMVPerCreator)}
              onChange={(v) => setWhaleGMVPerCreator(clampNumber(v, 1000, 20000))}
            />
            <SliderRow
              label="Whale → Altyr penetration"
              value={penetrationPct}
              min={0}
              max={100}
              step={5}
              displayValue={`${penetrationPct}%`}
              onChange={(v) => setPenetrationPct(clampNumber(v, 0, 100))}
            />
            <SliderRow
              label="Platform commission rate"
              value={commissionPct}
              min={10}
              max={30}
              step={1}
              displayValue={`${commissionPct}%`}
              onChange={(v) => setCommissionPct(clampNumber(v, 10, 30))}
            />
            <SliderRow
              label="Monthly creator growth (MoM)"
              value={monthlyGrowthRatePct}
              min={0}
              max={50}
              step={1}
              displayValue={`${monthlyGrowthRatePct}%`}
              onChange={(v) => setMonthlyGrowthRatePct(clampNumber(v, 0, 50))}
            />
            <SliderRow
              label="Monthly agency churn"
              value={monthlyChurnPct}
              min={0}
              max={20}
              step={1}
              displayValue={`${monthlyChurnPct}%`}
              onChange={(v) => setMonthlyChurnPct(clampNumber(v, 0, 20))}
            />
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.05 }}
        >
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                <DollarSign className="w-4 h-4 text-[#AC0064]" />
              </div>
              <div>
                <div className="text-base font-light text-white/90 tracking-wide">Snapshot (month 0)</div>
                <div className="text-xs text-white/50 font-light">
                  ~{saasMixPct}% SaaS · ~{100 - saasMixPct}% platform commission
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                ['Whale GMV on Altyr (mo)', formatCurrencyCompact(base.totalGMV)],
                ['SaaS revenue (mo)', formatCurrencyCompact(base.saasRevenue)],
                ['Total revenue (monthly)', formatCurrencyCompact(base.platformRevenue)],
                ['Total revenue (annualized)', formatCurrencyCompact(base.annualPlatformRevenue)],
              ].map(([k, v]) => (
                <div key={k} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-[10px] tracking-[0.18em] text-white/45 uppercase">{k}</div>
                  <div className="mt-1 text-base md:text-lg font-light text-white/90 tabular-nums">
                    {k.includes('Total revenue (monthly)') ? (
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">
                        {v}
                      </span>
                    ) : (
                      v
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm flex-1 flex flex-col">
            <div className="flex items-end justify-between gap-4 mb-3">
              <div>
                <div className="text-base font-light text-white/90 tracking-wide">12-month projection</div>
                <div className="text-xs text-white/50 font-light">
                  Creators {monthlyGrowthRatePct}% MoM · agency churn {monthlyChurnPct}%
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] tracking-[0.2em] text-white/45 uppercase">Month 12 rev</div>
                <div className="mt-0.5 text-lg font-light text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A] tabular-nums">
                  {formatCurrencyCompact(month12.platformRevenue)}
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-white/50">
                    <th className="py-1.5 pr-3 font-light">Month</th>
                    <th className="py-1.5 pr-3 font-light">Creators</th>
                    <th className="py-1.5 pr-3 font-light">SaaS</th>
                    <th className="py-1.5 font-light">Total rev</th>
                  </tr>
                </thead>
                <tbody>
                  {[month0, forecast[3], forecast[6], forecast[9], month12].map((row) => (
                    <tr key={row.month} className="border-t border-white/[0.06]">
                      <td className="py-1.5 pr-3 text-white/70 tabular-nums">{row.month}</td>
                      <td className="py-1.5 pr-3 text-white/70 tabular-nums">
                        {new Intl.NumberFormat('en-US').format(row.creators)}
                      </td>
                      <td className="py-1.5 pr-3 text-white/70 tabular-nums">
                        {formatCurrencyCompact(row.saasRevenue)}
                      </td>
                      <td className="py-1.5 text-white/90 tabular-nums">
                        {formatCurrencyCompact(row.platformRevenue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-white/45 font-light">
              Illustrative model only — not a promise. See appendix for exact math.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
