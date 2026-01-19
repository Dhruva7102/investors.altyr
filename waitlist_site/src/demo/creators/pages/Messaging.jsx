import React, { useState, useEffect } from 'react'
import { trackPageView } from '@/lib/mixpanel'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  Send,
  Image,
  Mic,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Star,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Gift,
  Crown,
  Zap,
  Heart,
  Calendar,
  MessageSquare,
  Sparkles,
  Tag,
} from 'lucide-react'
import { StatusBadge, ConnectionScoreBar } from '@/components/shared'
import { getFanById } from '@/data/mockFans'
import { mockConversations, getMessagesByConversationId, quickReplies } from '@/data/mockConversations'

function ConversationItem({ conversation, isActive, onClick }) {
  const statusColors = {
    Superfan: 'from-amber-400 to-amber-600',
    VIP: 'from-altyr-magenta to-altyr-purple',
    Regular: 'from-blue-400 to-blue-600',
    Casual: 'from-gray-400 to-gray-500',
  }

  return (
    <motion.div
      onClick={onClick}
      className={`
        p-3 rounded-xl cursor-pointer transition-all duration-300
        ${isActive ? 'bg-gradient-to-r from-altyr-magenta/20 to-altyr-purple/10 border border-altyr-magenta/30' : 'hover:bg-white/[0.03] border border-transparent'}
      `}
      whileHover={{ x: 2 }}
    >
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium text-white bg-gradient-to-br ${statusColors[conversation.fanStatus]}`}>
            {conversation.fanInitials}
          </div>
          {conversation.isOnline && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-altyr-bg-dark" />}
          <div className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-altyr-bg-dark border border-altyr-purple/50 text-[9px] text-altyr-purple-light font-medium">
            {conversation.level}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-white/90'}`}>{conversation.fanName}</span>
              {conversation.fanStatus === 'Superfan' && <Crown className="w-3.5 h-3.5 text-amber-400" />}
              {conversation.fanStatus === 'VIP' && <Star className="w-3.5 h-3.5 text-altyr-magenta" />}
            </div>
            <span className="text-[10px] text-white/40">{conversation.lastMessageTime}</span>
          </div>

          <div className="flex items-center gap-2">
            <p className={`text-xs truncate flex-1 ${conversation.unreadCount > 0 ? 'text-white/80 font-medium' : 'text-white/50'}`}>
              {conversation.hasTip && <span className="text-green-400">💵 </span>}
              {conversation.lastMessage}
            </p>
            {conversation.unreadCount > 0 && (
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-altyr-magenta text-[10px] font-medium flex items-center justify-center">
                {conversation.unreadCount}
              </span>
            )}
          </div>

          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-altyr-magenta to-altyr-purple rounded-full" style={{ width: `${conversation.connectionScore}%` }} />
            </div>
            <span className="text-[9px] text-white/40">{conversation.connectionScore}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function MessageBubble({ message, isCreator }) {
  const formatTime = (date) => new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${isCreator ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-[70%] ${isCreator ? 'order-2' : ''}`}>
        {message.hasTip && (
          <div className="flex items-center gap-1 mb-1 text-green-400 text-xs">
            <Gift className="w-3 h-3" />
            <span>Sent ${message.tipAmount} tip</span>
          </div>
        )}
        <div
          className={`
            px-4 py-2.5 rounded-2xl
            ${isCreator ? 'bg-gradient-to-r from-altyr-magenta to-altyr-purple text-white rounded-br-sm' : 'bg-white/[0.08] text-white/90 rounded-bl-sm'}
          `}
        >
          <p className="text-sm">{message.content}</p>
        </div>
        <div className={`flex items-center gap-1 mt-1 ${isCreator ? 'justify-end' : ''}`}>
          <span className="text-[10px] text-white/30">{formatTime(message.timestamp)}</span>
          {isCreator && message.read && <span className="text-[10px] text-altyr-purple-light">✓✓</span>}
        </div>
      </div>
    </motion.div>
  )
}

function FanProfileSidebar({ fan, conversation }) {
  if (!fan) return null

  const healthIcon = { up: TrendingUp, down: TrendingDown, stable: Minus }
  const HealthIcon = healthIcon[fan.healthTrend]
  const healthColors = { up: 'text-green-400', down: 'text-red-400', stable: 'text-white/50' }

  return (
    <div className="w-72 flex-shrink-0 border-l border-white/[0.08] bg-altyr-bg-dark/50 overflow-y-auto overflow-x-hidden">
      <div className="p-4 space-y-4">
        <div className="text-center pb-4 border-b border-white/[0.08]">
          <div className="relative inline-block mb-3">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-altyr-magenta to-altyr-purple flex items-center justify-center text-2xl font-light text-white">
              {fan.initials}
            </div>
            {conversation.isOnline && <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-altyr-bg-dark" />}
          </div>
          <h3 className="text-lg font-light text-white/90">{fan.name}</h3>
          <div className="flex items-center justify-center gap-2 mt-2">
            <StatusBadge status={fan.status} />
            <span className="px-2 py-0.5 rounded-full bg-altyr-purple/20 border border-altyr-purple/40 text-altyr-purple-light text-xs">
              Level {fan.level}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
            <div className="text-lg font-light text-gradient">${fan.ltv.toLocaleString()}</div>
            <div className="text-[10px] text-white/40">Lifetime Value</div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
            <div className="text-lg font-light text-white/90">{fan.subscriptionMonths}mo</div>
            <div className="text-[10px] text-white/40">Subscribed</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="p-2 rounded-lg bg-white/[0.02] text-center">
            <div className="text-sm font-medium text-white/80">{fan.totalMessages}</div>
            <div className="text-[9px] text-white/40">Messages</div>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.02] text-center">
            <div className="text-sm font-medium text-white/80">{fan.totalPurchases}</div>
            <div className="text-[9px] text-white/40">Purchases</div>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.02] text-center">
            <div className="text-sm font-medium text-green-400">${fan.recentSpend}</div>
            <div className="text-[9px] text-white/40">Last 30d</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-altyr-purple/10 to-altyr-magenta/5 border border-altyr-purple/20">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-altyr-purple-light" />
            <span className="text-xs text-white/70 font-medium">AI Insights</span>
          </div>
          <div className="space-y-2 text-xs text-white/60">
            <div className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-altyr-magenta mt-1.5 flex-shrink-0" />
              <span>
                Best response time: <span className="text-white/80">7-9 PM</span>
              </span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-altyr-orange mt-1.5 flex-shrink-0" />
              <span>
                Prefers: <span className="text-white/80">Personal touches, exclusivity</span>
              </span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
              <span>
                Engagement trend: <span className="text-green-400">↑ 12% this month</span>
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/60">Connection Score</span>
            <div className="flex items-center gap-1">
              <HealthIcon className={`w-3 h-3 ${healthColors[fan.healthTrend]}`} />
              <span className={`text-xs ${healthColors[fan.healthTrend]}`}>
                {fan.healthTrend === 'up' ? 'Rising' : fan.healthTrend === 'down' ? 'Declining' : 'Stable'}
              </span>
            </div>
          </div>
          <ConnectionScoreBar score={fan.connectionScore} size="lg" showLabel />
        </div>

        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-altyr-orange" />
            <span className="text-xs text-white/60">XP Progress</span>
          </div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-white/40">Level {fan.level}</span>
            <span className="text-altyr-purple-light">{fan.xp.toLocaleString()} XP</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-altyr-orange to-altyr-magenta rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(fan.xp % 500) / 5}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <p className="text-[10px] text-white/30 mt-1">{fan.xpToNext} XP to next level</p>
        </div>

        {fan.badges && fan.badges.length > 0 && (
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-white/60">Badges</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {fan.badges.slice(0, 4).map((badge, index) => (
                <span key={index} className="px-2 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px]">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        )}

        <div
          className={`p-4 rounded-xl border ${
            fan.churnRisk === 'High'
              ? 'bg-red-500/10 border-red-500/30'
              : fan.churnRisk === 'Medium'
                ? 'bg-amber-500/10 border-amber-500/30'
                : 'bg-green-500/10 border-green-500/30'
          }`}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle
              className={`w-4 h-4 ${fan.churnRisk === 'High' ? 'text-red-400' : fan.churnRisk === 'Medium' ? 'text-amber-400' : 'text-green-400'}`}
            />
            <span className="text-xs text-white/60">Churn Risk</span>
          </div>
          <p className={`text-sm font-medium mt-1 ${fan.churnRisk === 'High' ? 'text-red-400' : fan.churnRisk === 'Medium' ? 'text-amber-400' : 'text-green-400'}`}>
            {fan.churnRisk}
          </p>
        </div>

        {fan.preferences && (
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-4 h-4 text-altyr-magenta" />
              <span className="text-xs text-white/60">Preferences</span>
            </div>
            {fan.preferences.likes && fan.preferences.likes.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {fan.preferences.likes.map((like, index) => (
                  <span key={index} className="px-2 py-1 rounded-full bg-altyr-magenta/10 border border-altyr-magenta/30 text-altyr-magenta text-[10px]">
                    {like}
                  </span>
                ))}
              </div>
            )}
            {fan.preferences.notes && <p className="text-xs text-white/50 italic">"{fan.preferences.notes}"</p>}
          </div>
        )}

        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-altyr-purple-light" />
            <span className="text-xs text-white/60">Key Dates</span>
          </div>
          <div className="space-y-2 text-xs">
            {fan.preferences?.birthday && (
              <div className="flex justify-between">
                <span className="text-white/40">Birthday</span>
                <span className="text-white/70">{fan.preferences.birthday}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-white/40">Member Since</span>
              <span className="text-white/70">{fan.preferences?.anniversaryDate || 'Unknown'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Last Interaction</span>
              <span className="text-white/70">{fan.lastInteraction}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <button className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-altyr-magenta to-altyr-purple text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <Gift className="w-4 h-4" />
            Send Offer
          </button>
          <button className="w-full px-4 py-2.5 rounded-xl glass-card hover:bg-white/[0.05] text-white/70 text-sm flex items-center justify-center gap-2">
            <Tag className="w-4 h-4" />
            Add to Segment
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Messaging() {
  const [activeConversation, setActiveConversation] = useState(mockConversations[0])
  const [messageInput, setMessageInput] = useState('')
  const [filter, setFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    trackPageView('Creator Messaging', {
      demo_type: 'creator',
    })
  }, [])

  const messages = getMessagesByConversationId(activeConversation?.id)
  const activeFan = getFanById(activeConversation?.fanId)
  const suggestions = quickReplies[activeConversation?.fanStatus] || []

  const filters = ['All', 'Priority', 'Unread', 'With Tips']

  const filteredConversations = mockConversations
    .filter((conv) => {
      if (filter === 'Priority') return conv.isPriority
      if (filter === 'Unread') return conv.unreadCount > 0
      if (filter === 'With Tips') return conv.hasTip
      return true
    })
    .filter((conv) => conv.fanName.toLowerCase().includes(searchQuery.toLowerCase()))

  const totalUnread = mockConversations.reduce((sum, c) => sum + c.unreadCount, 0)

  return (
    <div className="-m-8 overflow-x-auto">
      <div className="flex min-w-[1040px] h-[min(860px,calc(100vh-220px))]">
      <div className="w-72 flex-shrink-0 border-r border-white/[0.08] bg-altyr-bg-dark/30 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/[0.08]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-altyr-magenta" />
              <h2 className="text-lg font-light text-white/90">Messages</h2>
              {totalUnread > 0 && <span className="px-2 py-0.5 rounded-full bg-altyr-magenta text-[10px] font-medium">{totalUnread}</span>}
            </div>
            <button className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors">
              <Filter className="w-4 h-4 text-white/50" />
            </button>
          </div>

          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-altyr-magenta/50"
            />
          </div>

          <div className="flex gap-1 overflow-x-auto pb-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`
                  px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all
                  ${filter === f ? 'bg-altyr-magenta/20 text-altyr-magenta border border-altyr-magenta/30' : 'text-white/50 hover:text-white/70 hover:bg-white/[0.03]'}
                `}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isActive={activeConversation?.id === conversation.id}
              onClick={() => {
                setActiveConversation(conversation)
                trackEvent('Conversation Opened', {
                  conversation_id: conversation.id,
                  fan_id: conversation.fanId,
                  fan_status: conversation.fanStatus,
                  demo_type: 'creator',
                })
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col bg-altyr-bg overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-altyr-magenta to-altyr-purple flex items-center justify-center text-sm font-medium text-white">
                {activeConversation?.fanInitials}
              </div>
              {activeConversation?.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-altyr-bg" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white/90 font-medium">{activeConversation?.fanName}</h3>
                <StatusBadge status={activeConversation?.fanStatus} size="sm" />
              </div>
              <p className="text-xs text-white/40">{activeConversation?.isOnline ? 'Online' : 'Last seen ' + activeConversation?.lastMessageTime}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors text-white/50 hover:text-white/70">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors text-white/50 hover:text-white/70">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors text-white/50 hover:text-white/70">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} isCreator={message.sender === 'creator'} />
            ))}
          </AnimatePresence>
        </div>

        <div className="px-6 py-2 flex gap-2 overflow-x-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setMessageInput(suggestion)}
              className="px-3 py-1.5 rounded-full glass-card hover:bg-white/[0.05] text-xs text-white/60 whitespace-nowrap transition-all"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/[0.08]">
          <div className="flex items-end gap-3">
            <div className="flex gap-2">
              <button className="p-2.5 rounded-xl glass-card hover:bg-white/[0.05] text-white/50 hover:text-white/70 transition-colors">
                <Image className="w-5 h-5" />
              </button>
              <button className="p-2.5 rounded-xl glass-card hover:bg-white/[0.05] text-white/50 hover:text-white/70 transition-colors">
                <Gift className="w-5 h-5" />
              </button>
            </div>

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

            <div className="flex gap-2">
              <button className="p-2.5 rounded-xl glass-card hover:bg-white/[0.05] text-white/50 hover:text-white/70 transition-colors">
                <Mic className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  if (messageInput.trim()) {
                    trackEvent('Message Sent', {
                      conversation_id: activeConversation?.id,
                      fan_id: activeConversation?.fanId,
                      message_length: messageInput.length,
                      demo_type: 'creator',
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
      </div>

      <FanProfileSidebar fan={activeFan} conversation={activeConversation} />
      </div>
    </div>
  )
}

