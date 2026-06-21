/** Shared constants & formulas for the deck revenue calculator + methodology slide
 *
 * Altyr economics (per connected creator, per month):
 *   - Altyr Pro SaaS fee: $250 / connected creator / month
 *   - Altyr Platform commission: 20% of whale GMV transacted on Altyr
 *       whale GMV on Altyr = gross whale GMV/creator × whale→Altyr penetration
 *   total revenue/creator = SAAS_FEE + (whaleGMV × penetration × COMMISSION_RATE)
 */

export const COMMISSION_RATE = 0.20; // platform take on whale GMV
export const SAAS_FEE = 250; // $/connected creator/month (Altyr Pro)
export const FORECAST_MONTHS = 12;

export function clampNumber(value, min, max) {
  const n = Number(value);
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
}

function perCreatorRevenue({ whaleGMVPerCreator, penetrationPct, commissionRate }) {
  const pen = clampNumber(penetrationPct, 0, 100) / 100;
  const commission = whaleGMVPerCreator * pen * commissionRate;
  return {
    saas: SAAS_FEE,
    commission,
    total: SAAS_FEE + commission,
    gmvOnAltyr: whaleGMVPerCreator * pen,
  };
}

/**
 * Month 0: connected creators as given.
 * Each following month creators compound: C_m = round(C_0 × (1 + g)^m),
 * net of agency churn applied to the prior base.
 */
export function computeForecastRows({
  creators,
  whaleGMVPerCreator,
  penetrationPct,
  commissionRate = COMMISSION_RATE,
  monthlyGrowthRatePct,
  monthlyChurnPct,
}) {
  const g = clampNumber(monthlyGrowthRatePct, 0, 50) / 100;
  const c = clampNumber(monthlyChurnPct, 0, 40) / 100;

  const rows = [];
  let cPrev = creators;

  for (let m = 0; m <= FORECAST_MONTHS; m += 1) {
    let cM;
    if (m === 0) {
      cM = creators;
    } else {
      // grow gross, then net of churn on the prior base
      const grown = cPrev * (1 + g);
      cM = Math.round(grown * (1 - c));
    }

    const pc = perCreatorRevenue({ whaleGMVPerCreator, penetrationPct, commissionRate });
    const saasRevenue = cM * pc.saas;
    const commissionRevenue = cM * pc.commission;
    const platformRevenue = saasRevenue + commissionRevenue;
    const totalGMV = cM * pc.gmvOnAltyr;

    rows.push({
      month: m,
      creators: cM,
      saasRevenue,
      commissionRevenue,
      totalGMV,
      platformRevenue,
    });

    cPrev = cM;
  }

  return rows;
}

export function computeBaseSnapshot({
  creators,
  whaleGMVPerCreator,
  penetrationPct,
  commissionRate = COMMISSION_RATE,
}) {
  const pc = perCreatorRevenue({ whaleGMVPerCreator, penetrationPct, commissionRate });
  const saasRevenue = creators * pc.saas;
  const commissionRevenue = creators * pc.commission;
  const totalGMV = creators * pc.gmvOnAltyr;
  const platformRevenue = saasRevenue + commissionRevenue;

  return {
    creators,
    saasRevenue,
    commissionRevenue,
    totalGMV,
    platformRevenue,
    annualPlatformRevenue: platformRevenue * 12,
  };
}
