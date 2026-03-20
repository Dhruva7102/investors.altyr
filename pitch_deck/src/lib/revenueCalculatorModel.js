/** Shared constants & formulas for the deck revenue calculator + methodology slide */

export const COMMISSION_RATE = 0.15;
export const FORECAST_MONTHS = 12;

export function clampNumber(value, min, max) {
  const n = Number(value);
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
}

/**
 * Month 0: subscribers = creators × avg subs/creator.
 * Each following month:
 * 1. Creators compound: C_m = round(C_0 × (1 + r)^m)
 * 2. Prior-month subscribers survive churn: S' = S_{m-1} × (1 − c)
 * 3. New creators add subscribers: max(0, C_m − C_{m-1}) × avg subs/creator
 * 4. S_m = round(S' + newSubs)
 */
export function computeForecastRows({
  creators,
  subsPerCreator,
  subscriptionPrice,
  ppvSpendPerSubscriberPerMonth,
  monthlyGrowthRatePct,
  monthlyChurnPct,
}) {
  const r = clampNumber(monthlyGrowthRatePct, 0, 50) / 100;
  const c = clampNumber(monthlyChurnPct, 0, 40) / 100;

  const rows = [];
  let cPrev = creators;
  let sPrev = Math.round(creators * subsPerCreator);

  for (let m = 0; m <= FORECAST_MONTHS; m += 1) {
    const cM = Math.round(creators * (1 + r) ** m);
    let sM;
    if (m === 0) {
      sM = sPrev;
    } else {
      const afterChurn = sPrev * (1 - c);
      const deltaC = cM - cPrev;
      const newSubs = Math.max(0, deltaC) * subsPerCreator;
      sM = Math.round(afterChurn + newSubs);
    }

    const subscriptionGMV = sM * subscriptionPrice;
    const ppvGMV = sM * ppvSpendPerSubscriberPerMonth;
    const totalGMV = subscriptionGMV + ppvGMV;
    const platformRevenue = totalGMV * COMMISSION_RATE;

    rows.push({
      month: m,
      creators: cM,
      totalSubscribers: sM,
      totalGMV,
      platformRevenue,
    });

    cPrev = cM;
    sPrev = sM;
  }

  return rows;
}

export function computeBaseSnapshot({
  creators,
  subsPerCreator,
  subscriptionPrice,
  ppvSpendPerSubscriberPerMonth,
}) {
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
}
