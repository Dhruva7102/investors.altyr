// Showcase URLs Configuration
// Update these URLs after deploying the showcase sites to Vercel

export const SHOWCASE_URLS = {
  // CRM Showcase - Production URL
  crm: import.meta.env.VITE_CRM_SHOWCASE_URL || 'https://crmshowcase.vercel.app',

  // Gamification Showcase - Production URL
  gamification: import.meta.env.VITE_GAMIFICATION_SHOWCASE_URL || 'https://gamificationshowcase.vercel.app',

  /** Live product demo (fan + creator flows) */
  productDemo: import.meta.env.VITE_PRODUCT_DEMO_URL || 'https://dev.altyr.com',
};
