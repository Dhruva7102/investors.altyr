import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronLeft,
  Clock,
  Flame,
  Gift,
  Heart,
  MessageSquare,
  Search,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';

const spring = { type: 'spring', stiffness: 380, damping: 32 };

function WindowChrome({ title }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.07] bg-black/20">
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#ff5f57]/90" />
        <span className="w-2 h-2 rounded-full bg-[#febc2e]/90" />
        <span className="w-2 h-2 rounded-full bg-[#28c840]/90" />
      </div>
      <span className="text-[10px] tracking-wide text-white/35 font-light truncate max-w-[55%] text-center">
        {title}
      </span>
      <div className="w-10" />
    </div>
  );
}

function MockShell({ children, className = '' }) {
  return (
    <div
      className={`
        rounded-2xl overflow-hidden
        border border-white/[0.11]
        bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-[#0a0510]/90
        shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_50px_-24px_rgba(172,0,100,0.45),0_12px_40px_-28px_rgba(100,16,154,0.35)]
        backdrop-blur-md
        ${className}
      `}
    >
      {children}
    </div>
  );
}

function ConnectionBar({ pct }) {
  return (
    <div className="h-1.5 rounded-full bg-white/[0.07] overflow-hidden w-[76px]">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-[#AC0064] via-[#c9076f] to-[#9B4DCA]"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function CreatorCrmMock() {
  const pills = [
    ['All', '12'],
    ['Superfan', '3'],
    ['VIP', '4'],
  ];
  const fans = [
    { initials: 'JK', name: 'Jordan K.', tag: 'Superfan', tagOn: true, ltv: '$2.4k', score: 92 },
    { initials: 'MR', name: 'Mia R.', tag: 'VIP', tagOn: false, ltv: '$890', score: 71 },
  ];

  return (
    <MockShell>
      <WindowChrome title="Fan CRM — Relationship intelligence" />
      <div className="p-3 space-y-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/35" />
          <div className="pl-8 pr-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] text-white/40">
            Search fans…
          </div>
        </div>
        <div className="flex gap-1.5 overflow-hidden">
          {pills.map(([label, n], i) => (
            <button
              key={label}
              type="button"
              className={`
                px-2.5 py-1 rounded-md text-[10px] font-light whitespace-nowrap transition-all
                ${i === 0
                  ? 'bg-gradient-to-r from-[#AC0064] to-[#64109A] text-white shadow-[0_0_20px_-6px_rgba(172,0,100,0.7)]'
                  : 'bg-white/[0.04] text-white/50 border border-white/[0.06]'}
              `}
            >
              {label} <span className="opacity-60">({n})</span>
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {fans.map((f) => (
            <div
              key={f.name}
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#AC0064]/25 transition-colors"
            >
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#AC0064]/50 to-[#64109A]/40 border border-[#AC0064]/40 flex items-center justify-center text-[11px] font-medium text-white">
                  {f.initials}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#22c55e]/90 border-2 border-[#0d0110]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-white/90 truncate">{f.name}</span>
                  <span
                    className={`
                      text-[9px] px-1.5 py-0.5 rounded-md font-medium uppercase tracking-wide
                      ${f.tagOn
                        ? 'bg-[#AC0064]/25 text-[#ff8ec4] border border-[#AC0064]/35'
                        : 'bg-white/[0.06] text-white/55 border border-white/[0.08]'}
                    `}
                  >
                    {f.tag}
                  </span>
                </div>
                <div className="text-[10px] text-white/40 mt-0.5">LTV {f.ltv} · Active today</div>
              </div>
              <div className="shrink-0 text-right flex flex-col items-end gap-1">
                <div className="text-[8px] leading-tight text-white/35 max-w-[4.5rem]">
                  Relationship score
                </div>
                <ConnectionBar pct={f.score} />
              </div>
              <MessageSquare className="w-3.5 h-3.5 text-white/30 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </MockShell>
  );
}

function TimelineRow({ title, sub, last }) {
  return (
    <div className="flex gap-2.5">
      <div className="flex flex-col items-center shrink-0 w-4 pt-0.5">
        <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#AC0064] to-[#9B4DCA] ring-2 ring-[#AC0064]/25" />
        {!last ? <div className="w-px flex-1 min-h-[20px] bg-gradient-to-b from-white/25 to-white/[0.06]" /> : null}
      </div>
      <div className="pb-3 min-w-0 flex-1">
        <div className="text-[11px] font-medium text-white/88 leading-snug">{title}</div>
        <div className="text-[9px] text-white/40 mt-0.5">{sub}</div>
      </div>
    </div>
  );
}

function CreatorTimelineActionsMock() {
  const timeline = [
    { title: 'Tip · $50', sub: '2 hours ago · Positive sentiment' },
    { title: 'Unlocked PPV bundle', sub: 'Yesterday · High intent' },
    { title: 'Subscription renewed', sub: '4 days ago' },
  ];
  const actions = [
    {
      title: 'Send personalized thank-you',
      reason: 'Peak engagement after last drop — lock in loyalty.',
      priority: true,
      icon: MessageSquare,
    },
    {
      title: 'Offer early access to next set',
      reason: 'Top 10% spender this month.',
      priority: false,
      icon: Gift,
    },
  ];

  return (
    <MockShell>
      <WindowChrome title="Fan profile — Timeline & next steps" />
      <div className="divide-y divide-white/[0.06]">
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#AC0064]" />
              <span className="text-xs font-medium text-white/90">Interaction timeline</span>
            </div>
            <span className="text-[9px] text-white/35">Recent activity</span>
          </div>
          <div className="pl-0.5">
            {timeline.map((row, i) => (
              <TimelineRow key={row.title} {...row} last={i === timeline.length - 1} />
            ))}
          </div>
        </div>
        <div className="p-3 bg-white/[0.02]">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#AC0064]" />
              <span className="text-xs font-medium text-white/90">Suggested actions</span>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#AC0064]/20 text-[#ffb8d9] border border-[#AC0064]/30">
              AI
            </span>
          </div>
          <div className="space-y-2">
            {actions.map((a) => {
              const Icon = a.icon;
              return (
                <div
                  key={a.title}
                  className={`
                    group flex gap-2.5 p-2.5 rounded-xl border transition-colors cursor-default
                    ${a.priority
                      ? 'bg-gradient-to-r from-[#AC0064]/15 to-[#64109A]/10 border-[#AC0064]/25'
                      : 'bg-white/[0.03] border-white/[0.07]'}
                  `}
                >
                  <div className="w-8 h-8 rounded-lg bg-black/25 border border-white/[0.08] flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-[#AC0064]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-medium text-white/90">{a.title}</span>
                      {a.priority ? (
                        <span className="text-[8px] px-1 py-0.5 rounded bg-[#AC0064]/30 text-[#ffc4e0]">Priority</span>
                      ) : null}
                    </div>
                    <p className="text-[9px] text-white/45 mt-0.5 leading-snug">{a.reason}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#AC0064]/50 shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MockShell>
  );
}

function FanRewardsMock() {
  return (
    <MockShell>
      <WindowChrome title="Rewards — Progression fans feel" />
      <div className="p-4 bg-gradient-to-br from-[#AC0064]/[0.08] via-transparent to-[#64109A]/[0.06]">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative">
            <motion.div
              className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#AC0064] to-[#64109A] flex items-center justify-center text-2xl font-extralight text-white border-4 border-[#AC0064]/40 shadow-[0_0_32px_-6px_rgba(172,0,100,0.75)]"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={spring}
            >
              7
            </motion.div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-black/50 border border-[#AC0064]/40 text-[9px] text-[#ffb8d9] whitespace-nowrap">
              Level 7 · Patron
            </div>
          </div>
          <div className="flex-1 w-full min-w-0 space-y-2">
            <div className="flex justify-between text-[11px] text-white/55">
              <span>Next tier</span>
              <span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#9B4DCA] font-medium">
                  2,840
                </span>
                <span className="text-white/35"> / 4,000 XP</span>
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-white/[0.08] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#AC0064] via-[#e11d73] to-[#9B4DCA]"
                initial={{ width: 0 }}
                animate={{ width: '71%' }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <div className="flex justify-between items-center pt-1">
              <div className="flex items-center gap-1.5 text-[10px] text-orange-300/90">
                <Flame className="w-3.5 h-3.5" />
                <span>12-day login streak</span>
              </div>
              <div className="flex gap-1">
                {['★', '✦', '♥'].map((s, i) => (
                  <span
                    key={i}
                    className="w-6 h-6 rounded-md bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[10px] text-[#AC0064]/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { icon: Zap, label: 'Watch live', xp: '+25 XP' },
            { icon: Heart, label: 'Tip / unlock', xp: '+40 XP' },
            { icon: MessageSquare, label: 'DM reply', xp: '+15 XP' },
          ].map(({ icon: Icon, label, xp }, i) => (
            <motion.div
              key={label}
              className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
            >
              <Icon className="w-3.5 h-3.5 text-[#AC0064]/80 mx-auto mb-1" />
              <div className="text-[9px] text-white/55 leading-tight">{label}</div>
              <div className="text-[10px] text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#9B4DCA] font-medium mt-0.5">
                {xp}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MockShell>
  );
}

function FanMessagesMock() {
  return (
    <MockShell>
      <WindowChrome title="Messages" />
      <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-white/[0.07] bg-black/15">
        <button type="button" className="p-1 rounded-lg hover:bg-white/[0.06] text-white/45">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#AC0064]/50 to-[#64109A]/45 border border-[#AC0064]/40 flex items-center justify-center text-[10px] font-medium text-white">
          SK
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium text-white/90 truncate">Sasha Kim</div>
          <div className="text-[9px] text-emerald-400/90 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
            Active now
          </div>
        </div>
      </div>
      <div className="p-3 space-y-2.5 min-h-[168px]">
        <div className="flex justify-center">
          <span className="text-[9px] text-white/30 px-2 py-0.5 rounded-full bg-white/[0.04]">Today</span>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[90%] rounded-2xl rounded-tl-sm px-3 py-2 bg-gradient-to-br from-[#AC0064]/22 to-[#64109A]/18 border border-[#AC0064]/22">
            <div className="text-[9px] text-[#ffb8d9] font-medium mb-0.5">Creator</div>
            <p className="text-[11px] text-white/85 leading-snug">
              New set drops tonight — VIPs get 20 min early access.
            </p>
            <p className="text-[9px] text-white/35 mt-1">2:14 PM</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="max-w-[88%] rounded-2xl rounded-tr-sm px-3 py-2 bg-white/[0.09] border border-white/[0.1]">
            <p className="text-[11px] text-white/80 leading-snug">Already subscribed — counting down ⏳</p>
            <p className="text-[9px] text-white/35 mt-1 text-right">2:16 PM</p>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[90%] rounded-2xl rounded-tl-sm px-3 py-2 bg-gradient-to-br from-[#AC0064]/22 to-[#64109A]/18 border border-[#AC0064]/22">
            <div className="text-[9px] text-[#ffb8d9] font-medium mb-0.5 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Creator
            </div>
            <p className="text-[11px] text-white/85 leading-snug">
              You&apos;re in the <span className="text-amber-200/95">top spenders</span> this week — thank you. Want a
              custom voice note?
            </p>
            <p className="text-[9px] text-white/35 mt-1">2:18 PM</p>
          </div>
        </div>
      </div>
      <div className="px-3 py-2 border-t border-white/[0.07] bg-black/20">
        <div className="flex items-center gap-2 rounded-xl bg-white/[0.05] border border-white/[0.08] px-3 py-2">
          <MessageSquare className="w-3.5 h-3.5 text-white/25 shrink-0" />
          <span className="text-[10px] text-white/35 font-light">Write a message…</span>
        </div>
      </div>
    </MockShell>
  );
}

export default function AltyrSolutionSlide() {
  return (
    <section className="relative w-full min-h-screen overflow-y-auto bg-[#18021A] py-10 md:py-14">
      <div
        className="pointer-events-none absolute top-0 right-0 w-[min(80vw,640px)] h-[min(80vw,640px)] opacity-25"
        style={{
          background: 'radial-gradient(circle at 70% 20%, rgba(172,0,100,0.45) 0%, transparent 55%)',
          filter: 'blur(90px)',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-[min(70vw,520px)] h-[min(70vw,520px)] opacity-20"
        style={{
          background: 'radial-gradient(circle at 20% 80%, rgba(100,16,154,0.5) 0%, transparent 55%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 max-w-6xl xl:max-w-7xl mx-auto px-5 md:px-8 pb-10">
        <motion.div
          className="flex items-center justify-center gap-5 mb-8 md:mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <span className="w-14 h-px bg-gradient-to-r from-transparent to-[#64109A]/55" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/85 uppercase font-medium">The Product</span>
          <span className="w-14 h-px bg-gradient-to-l from-transparent to-[#64109A]/55" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.05 }}
          >
            <div>
              <div className="flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-[#AC0064]/90 font-medium">
                <Users className="w-4 h-4" />
                Altyr Pro — agency operating system
              </div>
              <p className="text-[10px] text-white/35 mt-1 font-light tracking-wide">What the agency and creator team sees</p>
            </div>
            <CreatorCrmMock />
            <CreatorTimelineActionsMock />
          </motion.div>

          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <div>
              <div className="flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-[#FF8C42]/90 font-medium">
                <Sparkles className="w-4 h-4" />
                Altyr Platform — premium fan experience
              </div>
              <p className="text-[10px] text-white/35 mt-1 font-light tracking-wide">What the fan sees</p>
            </div>
            <FanRewardsMock />
            <FanMessagesMock />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
