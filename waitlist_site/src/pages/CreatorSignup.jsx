import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Users, 
  Zap, 
  Upload, 
  Award, 
  LayoutDashboard,
  TrendingUp,
  Sparkles,
  MessageCircle,
  Crown,
  Eye,
  DollarSign,
  HandHeart
} from 'lucide-react';
import EmailSignupForm from '@/components/signup/EmailSignupForm';

const founderPerks = [
  {
    icon: HandHeart,
    title: "White-Glove Onboarding",
    description: "We'll personally set up your profile for you, exactly the way you want it. You tell us how you like to present yourself, we handle the rest."
  },
  {
    icon: Upload,
    title: "Done-For-You Content Transfer",
    description: "We'll move your existing content over for you, so you don't lose momentum or spend hours re-uploading."
  },
  {
    icon: MessageCircle,
    title: "Direct Access to Founders",
    description: "Talk directly with the team building Altyr. Tell us what you've always wanted from a platform, and we'll build it around creators like you."
  },
  {
    icon: Crown,
    title: "Founding Creator Status",
    description: "Be among the first on the platform and earn a Founder badge on your profile for life. A permanent signal that you helped shape Altyr from day one."
  },
  {
    icon: Eye,
    title: "Priority Exposure",
    description: "Inner Circle creators get boosted visibility to high-value fans and VIP supporters, putting you in front of the people most likely to spend."
  },
  {
    icon: DollarSign,
    title: "Upside on Your Earnings",
    description: "Get access to potentially reduced commissions, guaranteed monthly minimums, and other exclusive perks we won't offer publicly."
  }
];

const benefits = [
  {
    icon: Zap,
    title: "Lower Fees, Faster Payouts",
    description: "Keep more of what you earn with industry-leading rates and near-instant settlement to your account."
  },
  {
    icon: Users,
    title: "Unified Fan CRM",
    description: "See every fan in one place. Segment audiences, track purchases, and understand your community like never before."
  },
  {
    icon: Award,
    title: "Fan Loyalty System",
    description: "Build deeper connections with built-in loyalty tiers, rewards, streaks, and exclusive perks for your top supporters."
  },
  {
    icon: Upload,
    title: "Ultra-Fast Uploads",
    description: "2-3× faster transcoding with sharper quality. Spend less time waiting and more time creating."
  },
  {
    icon: LayoutDashboard,
    title: "Premium Dashboard",
    description: "A beautiful, modern creator dashboard with real-time analytics, insights, and tools designed for professionals."
  },
  {
    icon: TrendingUp,
    title: "Built for Growth",
    description: "Automated messaging, scheduled drops, and smart engagement tools to help you grow your audience."
  }
];

export default function CreatorSignup() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div 
      className="min-h-screen bg-[#18021A] text-white antialiased"
      style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
    >
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(181,106,0,0.12) 0%, transparent 55%)',
            filter: 'blur(100px)',
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[500px] h-[500px]"
          style={{
            background: 'radial-gradient(circle, rgba(100,16,154,0.15) 0%, transparent 55%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to={createPageUrl('Home')}>
            <Button
              variant="ghost"
              className="text-white/50 hover:text-white hover:bg-white/[0.03] rounded-full transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <span className="text-lg tracking-[0.35em] font-light text-white/60">ALTYR</span>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </nav>

      {/* Hero Section with CTA */}
      <section className="relative z-10 pt-12 pb-16 md:pt-16 md:pb-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#B56A00]/15 border border-[#B56A00]/25 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <Zap className="w-4 h-4 text-[#FFAA34]" />
            <span className="text-xs tracking-widest text-[#FFAA34]/90 uppercase font-medium">Founder Program</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Your Craft Deserves a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFAA34] to-[#B56A00]">
              Premium Platform
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-white/50 font-light max-w-xl mx-auto leading-relaxed tracking-wide mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join our exclusive Founder Program. Get priority support, boosted visibility, lower fees for life, and help shape the future of ALTYR.
          </motion.p>

          {/* CTA in Hero */}
          <EmailSignupForm 
            type="creator"
            title="Apply for Founder Access"
            subtitle="Limited to 500 founding creators. Lock in lifetime benefits."
          />

          {/* Social proof */}
          <motion.p
            className="text-sm text-white/40 font-light tracking-wide mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="text-white/60">545</span> creators already applied · Only <span className="text-[#FFAA34]">127 spots</span> left
          </motion.p>
        </div>
      </section>

      {/* Founder Program Section */}
      <section className="relative z-10 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#B56A00]/10 border border-[#B56A00]/20 mb-6">
              <Sparkles className="w-4 h-4 text-[#FFAA34]" />
              <span className="text-xs tracking-widest text-[#FFAA34]/80 uppercase font-medium">Exclusive Access</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extralight tracking-tight mb-5">
              Join the Altyr{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFAA34] to-[#B56A00]">
                Founder Program
              </span>
            </h2>
            <p className="text-white/50 font-light max-w-2xl mx-auto leading-relaxed text-lg">
              We're hand-selecting a small group of creators to help shape Altyr before we open it up to the world.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {founderPerks.map((perk, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <div className="relative h-full p-6 md:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.04] transition-all duration-500 hover:bg-white/[0.04] hover:border-[#B56A00]/20">
                  <div className="flex gap-4">
                    <div className="shrink-0 inline-flex p-3 h-fit rounded-xl bg-gradient-to-br from-[#B56A00]/15 to-[#FFAA34]/10 border border-[#B56A00]/15 group-hover:border-[#B56A00]/25 transition-colors duration-500">
                      <perk.icon className="w-5 h-5 text-[#FFAA34]/80 group-hover:text-[#FFAA34] transition-colors duration-500" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-lg font-light mb-2 text-white/90 tracking-wide">
                        {perk.title}
                      </h3>
                      <p className="text-white/40 font-light leading-relaxed text-[15px]">
                        {perk.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-center text-white/40 font-light mt-12 text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            If you want to help design the platform you actually want to be on—and be rewarded for being early—the Founder Program is for you.
          </motion.p>
        </div>
      </section>

      {/* Platform Features */}
      <section className="relative z-10 py-16 md:py-20 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-white/40 text-sm uppercase tracking-widest mb-4">The Platform</p>
            <h2 className="text-2xl md:text-3xl font-extralight tracking-tight mb-4">
              A Better Way to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFAA34] to-[#B56A00]">
                Create & Earn
              </span>
            </h2>
            <p className="text-white/40 font-light max-w-xl mx-auto">
              Beyond the Founder perks, here's what makes ALTYR different for every creator.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <div className="relative h-full p-5 md:p-6 rounded-xl bg-white/[0.02] border border-white/[0.04] transition-all duration-500 hover:bg-white/[0.04] hover:border-[#B56A00]/15">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 inline-flex p-2.5 rounded-lg bg-gradient-to-br from-[#B56A00]/10 to-[#FFAA34]/5 border border-[#B56A00]/10 group-hover:border-[#B56A00]/20 transition-colors duration-500">
                      <benefit.icon className="w-4 h-4 text-[#FFAA34]/70 group-hover:text-[#FFAA34] transition-colors duration-500" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-base font-light mb-1.5 text-white/85 tracking-wide">
                        {benefit.title}
                      </h3>
                      <p className="text-white/35 font-light leading-relaxed text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="text-sm text-white/25 font-light tracking-wide">
            © 2025 ALTYR. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}