// Fan-facing mock loop data: quests, creator info, perks, and store items.

export const demoCreator = {
  id: 'creator-001',
  name: 'Ava R.',
  handle: '@ava',
  tagline: 'Exclusive drops, voice notes, and behind-the-scenes.',
  tier: 'VIP',
  tierProgress: 0.68,
  perks: [
    'Priority replies during peak hours',
    'Weekly exclusive drop',
    'Early access to limited bundles',
    'Custom request queue access',
  ],
}

export const demoQuests = [
  { id: 'q-1', title: 'Daily check-in', description: 'Log in and claim your streak reward.', xp: 50, reward: 'Streak +1', category: 'Habit' },
  { id: 'q-2', title: 'Send a message', description: 'Say hi or respond to the latest drop.', xp: 10, reward: 'Warmth +1', category: 'Connection' },
  { id: 'q-3', title: 'React to a post', description: 'Leave a reaction on the newest post.', xp: 5, reward: 'Visibility +1', category: 'Engagement' },
  { id: 'q-4', title: 'Unlock a badge', description: 'Complete any 3 quests today.', xp: 75, reward: 'Badge: Chatter', category: 'Progression' },
]

export const demoStoreItems = [
  { id: 's-1', name: 'VIP Emote Pack', price: 300, type: 'Cosmetic', description: 'Profile flair + chat emotes.' },
  { id: 's-2', name: 'Golden Border', price: 500, type: 'Cosmetic', description: 'A premium border for your avatar.' },
  { id: 's-3', name: 'Priority Reply Token', price: 800, type: 'Perk', description: 'Move to the front of the reply queue once.' },
  { id: 's-4', name: 'Exclusive Drop Voucher', price: 1200, type: 'Perk', description: 'Redeem for one premium drop.' },
]

export const demoOffers = [
  { id: 'o-1', title: 'Limited Bundle (24h)', price: 49, details: 'Behind-the-scenes + voice note + 3 photos.' },
  { id: 'o-2', title: 'Custom Request', price: 150, details: 'Personalized content request (priority queue).' },
  { id: 'o-3', title: 'VIP Month Upgrade', price: 25, details: 'Unlock VIP perks for 30 days.' },
]

export default { demoCreator, demoQuests, demoStoreItems, demoOffers }

