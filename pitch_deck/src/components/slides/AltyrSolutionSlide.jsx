import React from 'react';
import { motion } from 'framer-motion';
import {
  Crown,
  ExternalLink,
  Flame,
  Heart,
  MessageSquare,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { SHOWCASE_URLS } from '@/config/showcaseUrls';

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
    <div className="h-1.5 rounded-full bg-white/[0.07] overflow-hidden w-[68px]">
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
              <div className="shrink-0 text-right">
                <div className="text-[9px] text-white/35 mb-0.5">Score</div>
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

function MiniMetric({ label, value, delta, up }) {
  return (
    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
      <div className="text-[9px] text-white/40 font-light mb-1 leading-tight">{label}</div>
      <div className="text-lg font-extralight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/80">
        {value}
      </div>
      <div className={`text-[10px] font-medium mt-0.5 flex items-center gap-0.5 ${up ? 'text-emerald-400/90' : 'text-white/35'}`}>
        {up ? <TrendingUp className="w-3 h-3" /> : null}
        {delta}
      </div>
    </div>
  );
}

function CreatorRevenueMock() {
  return (
    <MockShell>
      <WindowChrome title="Revenue — Live pulse" />
      <div className="p-3">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <MiniMetric label="Net MRR" value="$48.2k" delta="+12.4%" up />
          <MiniMetric label="Blended LTV" value="$186" delta="+8.1%" up />
          <MiniMetric label="Top-fan share" value="34%" delta="Whales" up={false} />
          <MiniMetric label="PPV attach" value="61%" delta="Subs + PPV" up={false} />
        </div>
        <div className="rounded-lg bg-black/30 border border-white/[0.06] px-2 py-2">
          <svg viewBox="0 0 120 36" className="w-full h-[36px]" preserveAspectRatio="none">
            <defs>
              <linearGradient id="solGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#AC0064" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#64109A" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,28 L20,24 L40,26 L55,18 L72,20 L88,12 L100,14 L120,6 L120,36 L0,36 Z"
              fill="url(#solGrad)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            <motion.polyline
              points="0,28 20,24 40,26 55,18 72,20 88,12 100,14 120,6"
              fill="none"
              stroke="url(#solLine)"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="solLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#AC0064" />
                <stop offset="100%" stopColor="#9B4DCA" />
              </linearGradient>
            </defs>
          </svg>
          <div className="flex justify-between text-[9px] text-white/35 px-0.5">
            <span>7d</span>
            <span className="text-white/50">GMV trajectory</span>
            <span>Now</span>
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

function FanVipMock() {
  return (
    <MockShell>
      <WindowChrome title="Moments — Status & recognition" />
      <div className="p-3 space-y-3">
        <motion.div
          className="relative overflow-hidden rounded-xl border border-[#AC0064]/30 bg-gradient-to-r from-[#AC0064]/20 via-[#64109A]/15 to-[#9B4DCA]/10 px-3 py-3"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={spring}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_55%)] pointer-events-none" />
          <div className="relative flex items-start gap-2.5">
            <div className="p-2 rounded-lg bg-black/30 border border-white/10">
              <Crown className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <div className="text-xs font-medium text-white/95">Inner Circle unlocked</div>
              <div className="text-[10px] text-white/55 mt-0.5 leading-snug">
                Exclusive drops, priority replies, and a visible crown on your profile.
              </div>
              <button
                type="button"
                className="mt-2.5 px-3 py-1.5 rounded-lg text-[10px] font-medium bg-gradient-to-r from-[#AC0064] to-[#64109A] text-white shadow-[0_0_24px_-8px_rgba(172,0,100,0.9)]"
              >
                Enter lounge
              </button>
            </div>
          </div>
        </motion.div>
        <div className="space-y-2">
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl rounded-tr-md px-3 py-2 bg-white/[0.08] border border-white/[0.08] text-[11px] text-white/75">
              That drop was insane — already unlocked the bonus set 🔥
            </div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[88%] rounded-2xl rounded-tl-md px-3 py-2 bg-gradient-to-br from-[#AC0064]/25 to-[#64109A]/20 border border-[#AC0064]/25 text-[11px] text-white/85">
              <span className="inline-flex items-center gap-1 text-[#ffb8d9] font-medium">
                <Sparkles className="w-3 h-3" /> Creator
              </span>
              <span className="block mt-1 text-white/80">
                Love it. You just hit <span className="text-amber-200/95">Top 50 fans</span> — new badge live on your
                profile.
              </span>
            </div>
          </div>
        </div>
      </div>
    </MockShell>
  );
}

const linkBtn =
  'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-light border border-white/[0.12] bg-white/[0.04] text-white/80 hover:border-[#AC0064]/45 hover:bg-[#AC0064]/10 transition-all duration-300';

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
          className="flex items-center justify-center gap-5 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <span className="w-14 h-px bg-gradient-to-r from-transparent to-[#64109A]/55" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/85 uppercase font-medium">Altyr&apos;s solution</span>
          <span className="w-14 h-px bg-gradient-to-l from-transparent to-[#64109A]/55" />
        </motion.div>

        <motion.div
          className="text-center max-w-3xl mx-auto mb-10 md:mb-12"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
        >
          <h2 className="text-2xl md:text-4xl font-extralight text-white/95 tracking-tight mb-3">
            Show, don&apos;t tell —{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#ff8ec4] to-[#9B4DCA]">
              product you can feel
            </span>
          </h2>
          <p className="text-sm md:text-base text-white/50 font-light leading-relaxed">
            Pulled from the same interaction patterns as our live demo: CRM depth for creators, and progression +
            recognition loops fans actually want to complete.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.05 }}
          >
            <div className="flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-[#AC0064]/90 font-medium">
              <Users className="w-4 h-4" />
              Creators
            </div>
            <p className="text-xs text-white/45 font-light -mt-2 mb-1 max-w-md">
              Know who matters, why they stay, and what to do next — before the spreadsheet does.
            </p>
            <CreatorCrmMock />
            <CreatorRevenueMock />
          </motion.div>

          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-[#AC0064]/90 font-medium">
              <Sparkles className="w-4 h-4" />
              Fans
            </div>
            <p className="text-xs text-white/45 font-light -mt-2 mb-1 max-w-md">
              Clear tiers, visible status, and dopamine that isn&apos;t a cheap dark pattern — it&apos;s the product.
            </p>
            <FanRewardsMock />
            <FanVipMock />
          </motion.div>
        </div>

        <motion.div
          className="mt-10 md:mt-12 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          <a href={SHOWCASE_URLS.productDemo} target="_blank" rel="noopener noreferrer" className={linkBtn}>
            Open live demo
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
          <a href={SHOWCASE_URLS.crm} target="_blank" rel="noopener noreferrer" className={linkBtn}>
            CRM showcase
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
          <a href={SHOWCASE_URLS.gamification} target="_blank" rel="noopener noreferrer" className={linkBtn}>
            Gamification showcase
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
