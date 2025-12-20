import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';

function clampNumber(value, min, max) {
  const n = Number(value);
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCurrencyCompact(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  displayValue,
  onChange,
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm md:text-base text-white/70 font-light">
          {label}
        </div>
        <div className="text-sm md:text-base font-medium text-white/90 tabular-nums">
          {displayValue ?? value}
        </div>
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
      <div className="flex items-center justify-between text-xs text-white/35 font-light tabular-nums">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export default function RevenueCalculator() {
  const COMMISSION_RATE = 0.2;
  const FORECAST_MONTHS = 12;

  const [creators, setCreators] = useState(100);
  const [subsPerCreator, setSubsPerCreator] = useState(250);
  const [subscriptionPrice, setSubscriptionPrice] = useState(12);
  const [ppvSpendPerSubscriberPerMonth, setPpvSpendPerSubscriberPerMonth] = useState(14);
  const [monthlyGrowthRatePct, setMonthlyGrowthRatePct] = useState(15);

  const base = useMemo(() => {
    const totalSubscribers = creators * subsPerCreator;
    const subscriptionGMV = totalSubscribers * subscriptionPrice;
    const ppvGMV = totalSubscribers * ppvSpendPerSubscriberPerMonth;
    const totalGMV = subscriptionGMV + ppvGMV;
    const platformRevenue = totalGMV * COMMISSION_RATE;

    return {
      totalSubscribers,
      subscriptionGMV,
      ppvGMV,
      totalGMV,
      platformRevenue,
      annualPlatformRevenue: platformRevenue * 12,
    };
  }, [creators, subsPerCreator, subscriptionPrice, ppvSpendPerSubscriberPerMonth]);

  const forecast = useMemo(() => {
    const r = clampNumber(monthlyGrowthRatePct, 0, 50) / 100;
    const months = Array.from({ length: FORECAST_MONTHS + 1 }, (_, i) => i);

    return months.map((m) => {
      const growthMultiplier = Math.pow(1 + r, m);
      const creatorsM = Math.round(creators * growthMultiplier);
      const totalSubscribersM = creatorsM * subsPerCreator;

      const subscriptionGMV = totalSubscribersM * subscriptionPrice;
      const ppvGMV = totalSubscribersM * ppvSpendPerSubscriberPerMonth;
      const totalGMV = subscriptionGMV + ppvGMV;
      const platformRevenue = totalGMV * COMMISSION_RATE;

      return {
        month: m,
        creators: creatorsM,
        totalSubscribers: totalSubscribersM,
        totalGMV,
        platformRevenue,
      };
    });
  }, [
    creators,
    subsPerCreator,
    subscriptionPrice,
    ppvSpendPerSubscriberPerMonth,
    monthlyGrowthRatePct,
  ]);

  const month0 = forecast[0];
  const month12 = forecast[forecast.length - 1];

  return (
    <section
      id="calculator"
      className="relative py-24 md:py-32 bg-gradient-to-b from-[#18021A] to-[#0d0110]"
    >
      {/* Gradient accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[700px] opacity-25"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(172,0,100,0.35) 0%, rgba(100,16,154,0.25) 40%, transparent 70%)',
          filter: 'blur(150px)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">
            Revenue Forecast
          </span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm mb-6">
            <Calculator className="w-4 h-4 text-[#AC0064]" />
            <span className="text-sm text-white/70 font-light">
              Investors: model GMV → platform revenue at <span className="text-white/90 font-medium">20% commission</span>
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight text-white/90 mb-4">
            Simple, high-signal unit economics
          </h2>
          <p className="text-lg md:text-xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed">
            Adjust the inputs to see how quickly platform revenue scales as creators onboard and monetize through subscriptions + pay-per-view.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          {/* Controls */}
          <motion.div
            className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm flex flex-col"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                <TrendingUp className="w-5 h-5 text-[#AC0064]" />
              </div>
              <div>
                <div className="text-base md:text-lg font-light text-white/90 tracking-wide">
                  Assumptions
                </div>
                <div className="text-sm text-white/50 font-light">
                  All values are monthly unless noted.
                </div>
              </div>
            </div>

            <div className="space-y-10 flex-1 flex flex-col justify-between">
              <SliderRow
                label="Creators on platform"
                value={creators}
                min={10}
                max={5000}
                step={10}
                displayValue={new Intl.NumberFormat('en-US').format(creators)}
                onChange={(v) => setCreators(clampNumber(v, 10, 5000))}
              />

              <SliderRow
                label="Avg subscribers per creator"
                value={subsPerCreator}
                min={25}
                max={2000}
                step={25}
                displayValue={new Intl.NumberFormat('en-US').format(subsPerCreator)}
                onChange={(v) => setSubsPerCreator(clampNumber(v, 25, 2000))}
              />

              <SliderRow
                label="Average subscription price"
                value={subscriptionPrice}
                min={5}
                max={30}
                step={1}
                displayValue={formatCurrency(subscriptionPrice)}
                onChange={(v) => setSubscriptionPrice(clampNumber(v, 5, 30))}
              />

              <SliderRow
                label="Total spent on PPV per subscriber (per month)"
                value={ppvSpendPerSubscriberPerMonth}
                min={0}
                max={100}
                step={1}
                displayValue={formatCurrency(ppvSpendPerSubscriberPerMonth)}
                onChange={(v) => setPpvSpendPerSubscriberPerMonth(clampNumber(v, 0, 100))}
              />

              <SliderRow
                label="Monthly growth rate (creators)"
                value={monthlyGrowthRatePct}
                min={0}
                max={50}
                step={1}
                displayValue={`${monthlyGrowthRatePct}%`}
                onChange={(v) => setMonthlyGrowthRatePct(clampNumber(v, 0, 50))}
              />
            </div>
          </motion.div>

          {/* Outputs */}
          <motion.div
            className="space-y-6 flex flex-col"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.05 }}
          >
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                  <DollarSign className="w-5 h-5 text-[#AC0064]" />
                </div>
                <div>
                  <div className="text-base md:text-lg font-light text-white/90 tracking-wide">
                    Snapshot (Month 0)
                  </div>
                  <div className="text-sm text-white/50 font-light">
                    Commission rate: {(COMMISSION_RATE * 100).toFixed(0)}%
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-xs tracking-[0.25em] text-white/45 uppercase">
                    Total Subscribers
                  </div>
                  <div className="mt-1.5 text-xl font-light text-white/90 tabular-nums">
                    {new Intl.NumberFormat('en-US').format(base.totalSubscribers)}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-xs tracking-[0.25em] text-white/45 uppercase">
                    Total GMV (Monthly)
                  </div>
                  <div className="mt-1.5 text-xl font-light text-white/90 tabular-nums">
                    {formatCurrencyCompact(base.totalGMV)}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-xs tracking-[0.25em] text-white/45 uppercase">
                    Platform Revenue (Monthly)
                  </div>
                  <div className="mt-1.5 text-xl font-light text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A] tabular-nums">
                    {formatCurrencyCompact(base.platformRevenue)}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-xs tracking-[0.25em] text-white/45 uppercase">
                    Platform Revenue (Annualized)
                  </div>
                  <div className="mt-1.5 text-xl font-light text-white/90 tabular-nums">
                    {formatCurrencyCompact(base.annualPlatformRevenue)}
                  </div>
                </div>
              </div>

              <div className="mt-4 text-xs text-white/50 font-light leading-relaxed">
                GMV includes <span className="text-white/75">subscriptions</span> and{' '}
                <span className="text-white/75">pay-per-view</span>. Platform revenue is{' '}
                <span className="text-white/80 font-medium">GMV × 20%</span>.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm flex-1 flex flex-col">
              <div className="flex items-end justify-between gap-6 mb-5">
                <div>
                  <div className="text-base md:text-lg font-light text-white/90 tracking-wide">
                    12-Month Projection
                  </div>
                  <div className="text-sm text-white/50 font-light">
                    Growth applied to creators at {monthlyGrowthRatePct}% MoM
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs tracking-[0.25em] text-white/45 uppercase">
                    Month 12 Platform Rev
                  </div>
                  <div className="mt-1 text-xl font-light text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A] tabular-nums">
                    {formatCurrencyCompact(month12.platformRevenue)}
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-white/50">
                      <th className="py-1.5 pr-4 font-light">Month</th>
                      <th className="py-1.5 pr-4 font-light">Creators</th>
                      <th className="py-1.5 pr-4 font-light">Subscribers</th>
                      <th className="py-1.5 pr-4 font-light">Platform Rev</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[month0, forecast[3], forecast[6], forecast[9], month12].map(
                      (row) => (
                        <tr key={row.month} className="border-t border-white/[0.06]">
                          <td className="py-1.5 pr-4 text-white/70 tabular-nums">
                            {row.month}
                          </td>
                          <td className="py-1.5 pr-4 text-white/70 tabular-nums">
                            {new Intl.NumberFormat('en-US').format(row.creators)}
                          </td>
                          <td className="py-1.5 pr-4 text-white/70 tabular-nums">
                            {new Intl.NumberFormat('en-US').format(row.totalSubscribers)}
                          </td>
                          <td className="py-1.5 pr-4 text-white/90 tabular-nums">
                            {formatCurrencyCompact(row.platformRevenue)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 text-xs text-white/45 font-light">
                This is a simplified investor model (not a promise). Real-world results vary by creator quality, retention, pricing, and PPV cadence.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


