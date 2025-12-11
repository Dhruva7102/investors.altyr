import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Heart,
  Play,
  Gift,
  Sparkles,
  Star,
  Zap } from
'lucide-react';
import FanGiftSignup from '@/components/signup/FanGiftSignup';

const benefits = [
{
  icon: Play,
  title: "Beautiful, Fast Interface",
  description: "A completely redesigned experience that's smooth, intuitive, and a joy to use on any device."
},
{
  icon: Zap,
  title: "True HD Streaming",
  description: "Crystal-clear playback with near-instant loading. No buffering, no compromises on quality."
},
{
  icon: Gift,
  title: "Loyalty Rewards",
  description: "Earn perks and unlock exclusive content as you support your favorite creators over time."
},
{
  icon: Star,
  title: "Early Adopter Perks",
  description: "Be among the first fans on ALTYR and get exclusive badges, priority access, and special offers."
},
{
  icon: Heart,
  title: "Better Ways to Support",
  description: "More meaningful ways to connect with and support the creators you love."
},
{
  icon: Sparkles,
  title: "Premium Experience",
  description: "Every detail crafted for a premium, sensual, and sophisticated experience."
}];


export default function FanSignup() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#18021A] text-white antialiased"
      style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>

      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(172,0,100,0.12) 0%, transparent 55%)',
            filter: 'blur(100px)'
          }} />

        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px]"
          style={{
            background: 'radial-gradient(circle, rgba(100,16,154,0.15) 0%, transparent 55%)',
            filter: 'blur(80px)'
          }} />

      </div>

      {/* Navigation */}
      <nav className="relative z-20 px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to={createPageUrl('Home')}>
            <Button
              variant="ghost"
              className="text-white/50 hover:text-white hover:bg-white/[0.03] rounded-full transition-all duration-300">

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
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#AC0064]/15 border border-[#AC0064]/25 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}>

            <Heart className="w-4 h-4 text-[#AC0064]" />
            <span className="text-xs tracking-widest text-[#AC0064] uppercase font-medium">For Fans</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}>

            A{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A]">
              Premium Experience
            </span>
            {' '}Awaits
          </motion.h1>

          <motion.p className="text-lg md:text-xl text-white/50 font-light max-w-xl mx-auto leading-relaxed tracking-wide mb-12"

          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}>We believe that enjoying the creators you love — should feel even more rewarding


          </motion.p>

          {/* Gift CTA in Hero */}
          <FanGiftSignup />

          {/* Social proof */}
          <motion.p
            className="text-sm text-white/40 font-light tracking-wide mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}>

            Join <span className="text-white/60">1,842</span> fans already on the waitlist
          </motion.p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>

            <h2 className="text-2xl md:text-3xl font-extralight tracking-tight mb-4">
              Designed for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A]">
                You
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {benefits.map((benefit, index) =>
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.08 }}>

                <div className="relative h-full p-7 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.04] transition-all duration-500 hover:bg-white/[0.04] hover:border-[#AC0064]/20 hover:shadow-[0_8px_40px_rgba(172,0,100,0.06)]">
                  <div className="relative z-10">
                    <div className="mb-5 inline-flex p-3 rounded-xl bg-gradient-to-br from-[#AC0064]/15 to-[#64109A]/10 border border-[#AC0064]/15 group-hover:border-[#AC0064]/25 transition-colors duration-500">
                      <benefit.icon className="w-5 h-5 text-[#AC0064]/80 group-hover:text-[#AC0064] transition-colors duration-500" strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-lg font-light mb-2.5 text-white/90 tracking-wide">
                      {benefit.title}
                    </h3>
                    
                    <p className="text-white/40 font-light leading-relaxed text-[15px]">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
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
    </div>);

}