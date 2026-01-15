import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Check, 
  Sparkles, 
  ArrowRight,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const creatorBenefits = [
  "Industry-leading payout rates",
  "Full-featured fan CRM",
  "Automated messaging & scheduling",
  "2-3× faster upload speeds",
  "Reliable, predictable payments"
];

const fanBenefits = [
  "Beautifully redesigned interface",
  "True HD streaming quality",
  "Loyalty rewards & levels",
  "Exclusive early-access perks"
];

export default function AudienceSplit() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Background accent */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] opacity-20"
        style={{
          background: 'radial-gradient(ellipse, rgba(100,16,154,0.3) 0%, transparent 55%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-20 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-tight">
            Built for Creators.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A]">
              Loved by Fans.
            </span>
          </h2>
        </motion.div>

        {/* Combined Card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="relative rounded-3xl bg-white/[0.015] border border-white/[0.06] backdrop-blur-sm overflow-hidden">
            {/* Corner accents */}
            <div 
              className="absolute top-0 left-0 w-80 h-80 opacity-40 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 0% 0%, rgba(100,16,154,0.15) 0%, transparent 50%)',
              }}
            />
            <div 
              className="absolute bottom-0 right-0 w-80 h-80 opacity-40 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 100% 100%, rgba(172,0,100,0.15) 0%, transparent 50%)',
              }}
            />

            {/* Center divider */}
            <div className="absolute top-8 bottom-8 left-1/2 -translate-x-1/2 w-px hidden md:block">
              <div className="w-full h-full bg-gradient-to-b from-transparent via-[#64109A]/20 to-transparent" />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row">
              {/* For Creators */}
              <div className="flex-1 p-10 md:p-14 lg:p-16 flex flex-col">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#64109A]/10 border border-[#64109A]/20 mb-10 w-fit">
                  <Sparkles className="w-3.5 h-3.5 text-[#AC0064]" />
                  <span className="text-xs tracking-widest text-white/70 uppercase font-medium">For Creators</span>
                </div>
                
                <ul className="space-y-5 flex-1">
                  {creatorBenefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#B56A00] to-[#FFAA34] flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-[15px] font-light text-white/70">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <div className="mt-10">
                <Link to="/demo/creators">
                  <Button className="group px-7 py-5 text-sm font-medium bg-[#B56A00] hover:bg-[#C97A00] text-white border-0 rounded-full transition-all duration-500 hover:shadow-[0_0_40px_rgba(181,106,0,0.3)] hover:scale-[1.02]">
                    Sign Up as a Creator
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </Button>
                </Link>
                </div>
              </div>

              {/* Mobile divider */}
              <div className="md:hidden mx-10">
                <div className="h-px bg-gradient-to-r from-transparent via-[#64109A]/20 to-transparent" />
              </div>

              {/* For Fans */}
              <div className="flex-1 p-10 md:p-14 lg:p-16 flex flex-col">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#AC0064]/10 border border-[#AC0064]/20 mb-10 w-fit">
                  <Heart className="w-3.5 h-3.5 text-[#FFAA34]" />
                  <span className="text-xs tracking-widest text-white/70 uppercase font-medium">For Fans</span>
                </div>
                
                <ul className="space-y-5 flex-1">
                  {fanBenefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#AC0064] to-[#64109A] flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-[15px] font-light text-white/70">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <div className="mt-10">
                <Link to="/demo/fans">
                  <Button className="group px-7 py-5 text-sm font-medium bg-[#AC0064] hover:bg-[#C0007A] text-white border-0 rounded-full transition-all duration-500 hover:shadow-[0_0_40px_rgba(172,0,100,0.3)] hover:scale-[1.02]">
                    Sign Up as a Fan
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </Button>
                </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}