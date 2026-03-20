import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign } from 'lucide-react';
import {
  COMMISSION_RATE,
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
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2 text-[11px] md:text-xs text-white/65 font-light">
        <span className="truncate">{label}</span>
        <span className="font-medium text-white/85 tabular-nums shrink-0">{displayValue ?? value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-1.5 accent-[#AC0064] rounded-full"
      />
    </div>
  );
}

export default function RevenueCalculator() {
  const [creators, setCreators] = useState(100);
  const [subsPerCreator, setSubsPerCreator] = useState(250);
  const [subscriptionPrice, setSubscriptionPrice] = useState(12);
  const [ppvSpendPerSubscriberPerMonth, setPpvSpendPerSubscriberPerMonth] = useState(14);
  const [monthlyGrowthRatePct, setMonthlyGrowthRatePct] = useState(15);
  const [monthlyChurnPct, setMonthlyChurnPct] = useState(10);

  const base = useMemo(
    () =>
      computeBaseSnapshot({
        creators,
        subsPerCreator,
        subscriptionPrice,
        ppvSpendPerSubscriberPerMonth,
      }),
    [creators, subsPerCreator, subscriptionPrice, ppvSpendPerSubscriberPerMonth]
  );

  const forecast = useMemo(
    () =>
      computeForecastRows({
        creators,
        subsPerCreator,
        subscriptionPrice,
        ppvSpendPerSubscriberPerMonth,
        monthlyGrowthRatePct,
        monthlyChurnPct,
      }),
    [
      creators,
      subsPerCreator,
      subscriptionPrice,
      ppvSpendPerSubscriberPerMonth,
      monthlyGrowthRatePct,
      monthlyChurnPct,
    ]
  );

  const month0 = forecast[0];
  const month12 = forecast[forecast.length - 1];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
      <motion.div
        className="flex items-center justify-center gap-4 mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <span className="w-10 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
        <span className="text-[10px] tracking-[0.3em] text-[#AC0064]/80 uppercase font-medium">
          Revenue forecast
        </span>
        <span className="w-10 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
      </motion.div>

      <motion.h2
        className="text-center text-xl md:text-2xl font-extralight text-white/90 mb-4 md:mb-5"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
      >
        Interactive model
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-3 md:gap-4 items-stretch">
        <motion.div
          className="p-3 md:p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex flex-col"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-md bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/25">
              <TrendingUp className="w-3.5 h-3.5 text-[#AC0064]" />
            </div>
            <div>
              <div className="text-sm font-light text-white/90">Assumptions</div>
              <div className="text-[10px] text-white/45 font-light">Monthly inputs</div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2.5">
            <SliderRow
              label="Creators"
              value={creators}
              min={10}
              max={5000}
              step={10}
              displayValue={new Intl.NumberFormat('en-US').format(creators)}
              onChange={(v) => setCreators(clampNumber(v, 10, 5000))}
            />
            <SliderRow
              label="Subs / creator"
              value={subsPerCreator}
              min={25}
              max={2000}
              step={25}
              displayValue={new Intl.NumberFormat('en-US').format(subsPerCreator)}
              onChange={(v) => setSubsPerCreator(clampNumber(v, 25, 2000))}
            />
            <SliderRow
              label="Sub price"
              value={subscriptionPrice}
              min={5}
              max={30}
              step={1}
              displayValue={formatCurrencyCompact(subscriptionPrice)}
              onChange={(v) => setSubscriptionPrice(clampNumber(v, 5, 30))}
            />
            <SliderRow
              label="PPV / sub / mo"
              value={ppvSpendPerSubscriberPerMonth}
              min={0}
              max={100}
              step={1}
              displayValue={formatCurrencyCompact(ppvSpendPerSubscriberPerMonth)}
              onChange={(v) => setPpvSpendPerSubscriberPerMonth(clampNumber(v, 0, 100))}
            />
            <SliderRow
              label="Creator growth MoM"
              value={monthlyGrowthRatePct}
              min={0}
              max={50}
              step={1}
              displayValue={`${monthlyGrowthRatePct}%`}
              onChange={(v) => setMonthlyGrowthRatePct(clampNumber(v, 0, 50))}
            />
            <SliderRow
              label="Subscriber churn MoM"
              value={monthlyChurnPct}
              min={0}
              max={40}
              step={1}
              displayValue={`${monthlyChurnPct}%`}
              onChange={(v) => setMonthlyChurnPct(clampNumber(v, 0, 40))}
            />
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col gap-2.5 min-h-0"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.04 }}
        >
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/25">
                  <DollarSign className="w-3.5 h-3.5 text-[#AC0064]" />
                </div>
                <div className="text-sm font-light text-white/90">Month 0</div>
              </div>
              <div className="text-[10px] text-white/45 font-light">
                Net {(COMMISSION_RATE * 100).toFixed(0)}% take
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                ['Subs', new Intl.NumberFormat('en-US').format(base.totalSubscribers)],
                ['GMV/mo', formatCurrencyCompact(base.totalGMV)],
                ['Platform rev/mo', formatCurrencyCompact(base.platformRevenue)],
                ['Annualized', formatCurrencyCompact(base.annualPlatformRevenue)],
              ].map(([k, v]) => (
                <div key={k} className="px-2 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <div className="text-[9px] tracking-[0.12em] text-white/40 uppercase">{k}</div>
                  <div className="text-xs font-light text-white/88 tabular-nums truncate">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex-1 flex flex-col min-h-0">
            <div className="flex items-end justify-between gap-2 mb-2">
              <div className="text-sm font-light text-white/90">12-mo projection</div>
              <div className="text-right">
                <div className="text-[9px] tracking-[0.15em] text-white/40 uppercase">M12 rev</div>
                <div className="text-sm font-light text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A] tabular-nums">
                  {formatCurrencyCompact(month12.platformRevenue)}
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[10px] md:text-xs">
                <thead>
                  <tr className="text-white/45 border-b border-white/[0.07]">
                    <th className="py-1 pr-2 font-light">Mo</th>
                    <th className="py-1 pr-2 font-light text-right">Cr</th>
                    <th className="py-1 pr-2 font-light text-right">Subs</th>
                    <th className="py-1 font-light text-right">Rev</th>
                  </tr>
                </thead>
                <tbody>
                  {[month0, forecast[6], month12].map((row) => (
                    <tr key={row.month} className="border-t border-white/[0.05] text-white/70">
                      <td className="py-1 pr-2 tabular-nums">{row.month}</td>
                      <td className="py-1 pr-2 text-right tabular-nums">
                        {new Intl.NumberFormat('en-US').format(row.creators)}
                      </td>
                      <td className="py-1 pr-2 text-right tabular-nums">
                        {new Intl.NumberFormat('en-US').format(row.totalSubscribers)}
                      </td>
                      <td className="py-1 text-right tabular-nums text-white/85">
                        {formatCurrencyCompact(row.platformRevenue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-[9px] text-white/38 font-light leading-snug">
              Illustrative only · appendix defines math
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
