import React, { useMemo, useState, useEffect } from 'react'
import { trackPageView } from '@/lib/mixpanel'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Send, Image, Smile, MoreVertical, Sparkles, Zap, Trophy } from 'lucide-react'
import { GlassCard, IconContainer } from '@/components/shared'
import { demoFanProfile, currentStreak } from '@/data/mockGamification'
import { creatorConversations, getMessagesByCreatorConversationId, fanQuickReplies } from '@/data/mockFanMessages'

function ConversationItem({ conversation, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        p-3 rounded-xl cursor-pointer transition-all duration-300
        ${isActive ? 'bg-gradient-to-r from-altyr-magenta/20 to-altyr-purple/10 border border-altyr-magenta/30' : 'hover:bg-white/[0.03] border border-transparent'}
      `}
    >
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium text-white bg-gradient-to-br from-altyr-magenta to-altyr-purple">
            {conversation.creatorInitials}
          </div>
          {conversation.isOnline && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-altyr-bg-dark" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-white/90'}`}>{conversation.creatorName}</span>
            <span className="text-[10px] text-white/40">{conversation.lastMessageTime}</span>
          </div>

          <div className="flex items-center gap-2">
            <p className={`text-xs truncate flex-1 ${conversation.unreadCount > 0 ? 'text-white/80 font-medium' : 'text-white/50'}`}>{conversation.lastMessage}</p>
            {conversation.unreadCount > 0 && (
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-altyr-magenta text-[10px] font-medium flex items-center justify-center">
                {conversation.unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function MessageBubble({ message }) {
  const isFan = message.sender === 'fan'
  const formatTime = (date) => new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${isFan ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-[70%] ${isFan ? 'order-2' : ''}`}>
        <div
          className={`
            px-4 py-2.5 rounded-2xl
            ${isFan ? 'bg-gradient-to-r from-altyr-magenta to-altyr-purple text-white rounded-br-sm' : 'bg-white/[0.08] text-white/90 rounded-bl-sm'}
          `}
        >
          <p className="text-sm">{message.content}</p>
        </div>
        <div className={`flex items-center gap-1 mt-1 ${isFan ? 'justify-end' : ''}`}>
          <span className="text-[10px] text-white/30">{formatTime(message.timestamp)}</span>
          {isFan && message.read && <span className="text-[10px] text-altyr-purple-light">✓✓</span>}
        </div>
      </div>
    </motion.div>
  )
}

function FanStatusSidebar() {
  const progress = demoFanProfile.currentLevelXp / demoFanProfile.xpToNextLevel

  return (
    <div className="w-72 flex-shrink-0 border-l border-white/[0.08] bg-altyr-bg-dark/50 overflow-y-auto overflow-x-hidden">
      <div className="p-4 space-y-4">
        <div className="text-center pb-4 border-b border-white/[0.08]">
          <div className="relative inline-block mb-3">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-altyr-magenta to-altyr-purple flex items-center justify-center text-2xl font-light text-white">
              {demoFanProfile.level}
            </div>
          </div>
          <h3 className="text-lg font-light text-white/90">Your Status</h3>
          <p className="text-xs text-white/40">Progression + perks</p>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-altyr-orange" />
            <span className="text-xs text-white/60">Level Progress</span>
          </div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-white/40">Level {demoFanProfile.level}</span>
            <span className="text-altyr-purple-light">{demoFanProfile.xp.toLocaleString()} XP</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-altyr-orange to-altyr-magenta rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <p className="text-[10px] text-white/30 mt-1">{demoFanProfile.xpToNextLevel - demoFanProfile.currentLevelXp} XP to next level</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
            <div className="text-lg font-light text-gradient">{currentStreak}</div>
            <div className="text-[10px] text-white/40">Day streak</div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
            <div className="text-lg font-light text-white/90">{demoFanProfile.unlockedBadges}</div>
            <div className="text-[10px] text-white/40">Badges</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-altyr-purple/10 to-altyr-magenta/5 border border-altyr-purple/20">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-altyr-purple-light" />
            <span className="text-xs text-white/70 font-medium">Suggestions</span>
          </div>
          <div className="space-y-2 text-xs text-white/60">
            <div className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-altyr-magenta mt-1.5 flex-shrink-0" />
              <span>
                Ask for: <span className="text-white/80">early access</span>
              </span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-altyr-orange mt-1.5 flex-shrink-0" />
              <span>
                Best time: <span className="text-white/80">7–9 PM</span>
              </span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
              <span>
                You’re close to: <span className="text-green-400">next reward</span>
              </span>
            </div>
          </div>
        </div>

        <GlassCard hover className="p-4">
          <div className="flex items-center gap-3">
            <IconContainer icon={Trophy} size="sm" />
            <div className="min-w-0">
              <p className="text-sm text-white/90">VIP Perk</p>
              <p className="text-xs text-white/50 truncate">Priority replies once per day</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

export default function FanMessages() {
  const [activeConversation, setActiveConversation] = useState(creatorConversations[0])
  const [messageInput, setMessageInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    trackPageView('Fan Messages', {
      demo_type: 'fan',
    })
  }, [])

  const messages = useMemo(() => getMessagesByCreatorConversationId(activeConversation?.id), [activeConversation])

  const filtered = useMemo(() => {
    return creatorConversations.filter((c) => c.creatorName.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery])

  return (
    <div className="-m-6 overflow-x-auto">
      <div className="flex min-w-[980px] h-[min(820px,calc(100vh-260px))]">
      <div className="w-72 flex-shrink-0 border-r border-white/[0.08] bg-altyr-bg-dark/30 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/[0.08]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-light text-white/90">Messages</h2>
            <button className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors">
              <MoreVertical className="w-4 h-4 text-white/50" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-altyr-magenta/50"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filtered.map((c) => (
            <ConversationItem
              key={c.id}
              conversation={c}
              isActive={activeConversation?.id === c.id}
              onClick={() => {
                setActiveConversation(c)
                trackEvent('Conversation Opened', {
                  conversation_id: c.id,
                  creator_name: c.creatorName,
                  demo_type: 'fan',
                })
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col bg-altyr-bg overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-altyr-magenta to-altyr-purple flex items-center justify-center text-sm font-medium text-white">
              {activeConversation?.creatorInitials}
            </div>
            <div>
              <h3 className="text-white/90 font-medium">{activeConversation?.creatorName}</h3>
              <p className="text-xs text-white/40">{activeConversation?.isOnline ? 'Online' : 'Offline'}</p>
            </div>
          </div>
          <button className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors text-white/50 hover:text-white/70">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </AnimatePresence>
        </div>

        <div className="px-6 py-2 flex gap-2 overflow-x-auto">
          {fanQuickReplies.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setMessageInput(s)}
              className="px-3 py-1.5 rounded-full glass-card hover:bg-white/[0.05] text-xs text-white/60 whitespace-nowrap transition-all"
            >
              {s}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/[0.08]">
          <div className="flex items-end gap-3">
            <button className="p-2.5 rounded-xl glass-card hover:bg-white/[0.05] text-white/50 hover:text-white/70 transition-colors">
              <Image className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/40 focus:outline-none focus:border-altyr-magenta/50 transition-colors"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/70 transition-colors">
                <Smile className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={() => {
                if (messageInput.trim()) {
                  trackEvent('Message Sent', {
                    conversation_id: activeConversation?.id,
                    creator_name: activeConversation?.creatorName,
                    message_length: messageInput.length,
                    demo_type: 'fan',
                  })
                }
              }}
              className="p-2.5 rounded-xl bg-gradient-to-r from-altyr-magenta to-altyr-purple text-white hover:opacity-90 transition-opacity"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <FanStatusSidebar />
      </div>
    </div>
  )
}

