// Fan-facing conversations: fan chats with creators (not other fans).

export const creatorConversations = [
  {
    id: 'cconv-001',
    creatorId: 'creator-001',
    creatorName: 'Ava R.',
    creatorInitials: 'AR',
    isOnline: true,
    lastMessage: 'Dropping something special tonight 👀',
    lastMessageTime: '10 min ago',
    lastMessageTimestamp: new Date(Date.now() - 10 * 60 * 1000),
    unreadCount: 1,
    isPriority: true,
  },
  {
    id: 'cconv-002',
    creatorId: 'creator-002',
    creatorName: 'Mia K.',
    creatorInitials: 'MK',
    isOnline: false,
    lastMessage: 'Thanks for the support — you’re the best.',
    lastMessageTime: 'Yesterday',
    lastMessageTimestamp: new Date(Date.now() - 26 * 60 * 60 * 1000),
    unreadCount: 0,
    isPriority: false,
  },
]

export const creatorMessages = {
  'cconv-001': [
    { id: 'cm-1', sender: 'creator', content: 'Hey! I saw your reaction — thank you.', timestamp: new Date(Date.now() - 120 * 60 * 1000) },
    { id: 'cm-2', sender: 'fan', content: 'Always. Your drops are my favorite.', timestamp: new Date(Date.now() - 95 * 60 * 1000), read: true },
    { id: 'cm-3', sender: 'creator', content: 'Dropping something special tonight 👀', timestamp: new Date(Date.now() - 10 * 60 * 1000) },
  ],
  'cconv-002': [
    { id: 'cm-4', sender: 'fan', content: 'Loved the last set. Appreciate you.', timestamp: new Date(Date.now() - 30 * 60 * 60 * 1000), read: true },
    { id: 'cm-5', sender: 'creator', content: 'Thanks for the support — you’re the best.', timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000) },
  ],
}

export const fanQuickReplies = [
  'Can’t wait.',
  'Any early access?',
  'That’s perfect — thank you.',
  'What’s the VIP perk for this?',
]

export const getMessagesByCreatorConversationId = (id) => creatorMessages[id] || []

export default { creatorConversations, creatorMessages, fanQuickReplies, getMessagesByCreatorConversationId }

