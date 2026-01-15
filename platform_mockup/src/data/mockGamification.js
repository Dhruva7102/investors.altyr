// Mock gamification data for XP, levels, badges

export const xpSources = [
  { id: 'daily-login', icon: 'Zap', action: 'Daily Login', xp: 50, cap: 'Once per day', color: 'altyr-orange' },
  { id: 'view-content', icon: 'Eye', action: 'View Content', xp: 5, cap: 'Max 10/day (50 XP)', color: 'altyr-purple-light' },
  { id: 'send-message', icon: 'MessageSquare', action: 'Send Message', xp: 10, cap: 'Max 5/day (50 XP)', color: 'altyr-magenta' },
  { id: 'tip', icon: 'Heart', action: 'Tip/Custom Request', xp: 25, cap: 'Unlimited', color: 'altyr-magenta' },
  { id: 'subscribe', icon: 'Star', action: 'Subscribe', xp: 100, cap: 'One-time per creator', color: 'badge-gold' },
  { id: 'purchase', icon: 'CreditCard', action: 'Purchase Content', xp: 15, cap: 'Unlimited', color: 'altyr-purple' },
]

export const levelProgression = [
  { range: '1-10', xpPerLevel: 100, description: 'Quick early wins', rewards: ['Profile unlocked', 'Basic badges'] },
  { range: '11-25', xpPerLevel: 200, description: 'Steady progression', rewards: ['First badge slot', 'Profile customization'] },
  { range: '26-50', xpPerLevel: 300, description: 'Mid-tier rewards', rewards: ['Second badge slot', 'Profile banner'] },
  { range: '51-75', xpPerLevel: 400, description: 'Advanced levels', rewards: ['Third badge slot', 'Animated effects'] },
  { range: '76-100', xpPerLevel: 500, description: 'Elite status', rewards: ['Exclusive theme', 'VIP recognition'] },
  { range: '100+', xpPerLevel: 600, description: 'Infinite progression', rewards: ['Legendary status', 'Ultimate customization'] },
]

export const levelRewards = [
  { level: 5, reward: 'Unlock profile customization', unlocked: true },
  { level: 10, reward: 'Unlock first badge slot', unlocked: true },
  { level: 15, reward: 'Unlock second badge slot', unlocked: true },
  { level: 20, reward: 'Unlock profile banner', unlocked: true },
  { level: 25, reward: 'Unlock third badge slot', unlocked: true },
  { level: 30, reward: 'Unlock animated effects', unlocked: false },
  { level: 50, reward: 'Unlock exclusive theme', unlocked: false },
  { level: 75, reward: 'Unlock legendary border', unlocked: false },
  { level: 100, reward: 'Unlock legendary status', unlocked: false },
]

export const badgeCategories = [
  {
    name: 'Engagement',
    icon: 'MessageSquare',
    badges: [
      { name: 'First Steps', rarity: 'bronze', requirement: 'Send first message', unlocked: true },
      { name: 'Chatter', rarity: 'silver', requirement: 'Send 50 messages', unlocked: true },
      { name: 'Conversationalist', rarity: 'gold', requirement: 'Send 500 messages', unlocked: false },
      { name: 'Viewer', rarity: 'bronze', requirement: 'View 100 posts', unlocked: true },
      { name: 'Binge Watcher', rarity: 'silver', requirement: 'View 1,000 posts', unlocked: false },
    ]
  },
  {
    name: 'Spending',
    icon: 'CreditCard',
    badges: [
      { name: 'Supporter', rarity: 'bronze', requirement: 'Spend $10 total', unlocked: true },
      { name: 'Patron', rarity: 'silver', requirement: 'Spend $100 total', unlocked: true },
      { name: 'Benefactor', rarity: 'gold', requirement: 'Spend $1,000 total', unlocked: false },
      { name: 'Philanthropist', rarity: 'platinum', requirement: 'Spend $10,000 total', unlocked: false },
    ]
  },
  {
    name: 'Subscriptions',
    icon: 'Users',
    badges: [
      { name: 'Loyal Fan', rarity: 'bronze', requirement: '3 months with 1 creator', unlocked: true },
      { name: 'Devoted', rarity: 'silver', requirement: '6 months with 1 creator', unlocked: true },
      { name: 'Dedicated', rarity: 'gold', requirement: '12 months with 1 creator', unlocked: false },
      { name: 'Multi-Fan', rarity: 'bronze', requirement: '5 simultaneous subscriptions', unlocked: false },
    ]
  },
  {
    name: 'Platform',
    icon: 'Star',
    badges: [
      { name: 'Early Adopter', rarity: 'gold', requirement: 'Join in first 30 days', unlocked: true },
      { name: 'Founding Member', rarity: 'platinum', requirement: 'Join in first week', unlocked: false },
      { name: 'Level 25', rarity: 'bronze', requirement: 'Reach level 25', unlocked: true },
      { name: 'Level 50', rarity: 'silver', requirement: 'Reach level 50', unlocked: false },
      { name: 'Level 100', rarity: 'gold', requirement: 'Reach level 100', unlocked: false },
    ]
  },
]

export const dailyLoginRewards = [
  { day: 1, reward: '50 XP', claimed: true },
  { day: 2, reward: '50 XP', claimed: true },
  { day: 3, reward: '75 XP', claimed: true },
  { day: 4, reward: '50 XP', claimed: true },
  { day: 5, reward: '100 XP', claimed: true },
  { day: 6, reward: '50 XP', claimed: true },
  { day: 7, reward: '150 XP + Badge', claimed: false },
]

export const currentStreak = 6

// Fan profile for gamification demo (fan-facing view)
export const demoFanProfile = {
  level: 28,
  xp: 14200,
  xpToNextLevel: 300,
  currentLevelXp: 200,
  totalBadges: 8,
  unlockedBadges: 8,
  streak: 6,
  longestStreak: 14,
  joinDate: '2024-07-15',
  customization: {
    avatarBorder: 'gradient-magenta',
    profileBanner: 'sunset',
    accentColor: '#AC0064',
    usernameEffect: 'glow',
  },
}

export default {
  xpSources,
  levelProgression,
  levelRewards,
  badgeCategories,
  dailyLoginRewards,
  currentStreak,
  demoFanProfile,
}
