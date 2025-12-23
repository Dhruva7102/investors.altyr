import { motion } from 'framer-motion';
import { Users, Target, Building2, Rocket } from 'lucide-react';
import CreatorShowcase from '@/components/creators/CreatorShowcase';

const steps = [
  {
    icon: Users,
    number: "01",
    title: "Inner Circle: Founding Creator Cohort",
    description: "Hand-selected top and rising creators receive white-glove setup, migration, direct roadmap access, and permanent Founder badges."
  },
  {
    icon: Target,
    number: "02",
    title: "Deep Implementation & Case Studies",
    description: "Focus on small initial cohort to demonstrate higher LTV per fan, more fans in VIP tiers, and improved retention and earnings stability."
  },
  {
    icon: Building2,
    number: "03",
    title: "Agencies & Managers",
    description: "Partner with managers and agencies to bring rosters of creators onto Altyr with minimal operational overhead."
  },
  {
    icon: Rocket,
    number: "04",
    title: "Product-Led Growth",
    description: "Use transparent analytics, public case studies, and creator testimonials to drive inbound interest from serious earners."
  }
];

export default function GoToMarket() {
  return (
    <section id="gtm" className="relative py-24 md:py-32">
      {/* Subtle gradient accent */}
      <div 
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(100,16,154,0.5) 0%, transparent 60%)',
          filter: 'blur(120px)',
        }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Go-To-Market</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Intro */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl font-extralight leading-relaxed text-white/90 tracking-wide">
            A <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A] font-light">focused, high-touch</span> strategy
          </h2>
        </motion.div>

        {/* Timeline steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <div className="flex gap-6 items-start">
                {/* Number + Icon column */}
                <div className="flex-shrink-0 flex flex-col items-center gap-3">
                  {/* Number badge */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/40 flex items-center justify-center">
                    <span className="text-sm font-light text-[#AC0064]">{step.number}</span>
                  </div>
                  
                  {/* Connecting line (except for last item) */}
                  {index < steps.length - 1 && (
                    <div className="w-px h-20 bg-gradient-to-b from-[#AC0064]/40 to-transparent" />
                  )}
                </div>

                {/* Content card */}
                <div className="flex-1 pb-8">
                  <div className="relative p-6 md:p-8 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500">
                    {/* Icon and title */}
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-2 rounded-lg bg-[#AC0064]/10">
                        <step.icon className="w-5 h-5 text-[#AC0064]" />
                      </div>
                      <h3 className="text-xl font-light text-white/90 tracking-wide">
                        {step.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-white/60 font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Creator social proof (horizontal marquee) */}
        <div className="mt-20">
          <motion.div
            className="flex items-center justify-center gap-6 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/40" />
            <span className="text-xs tracking-[0.35em] text-[#AC0064]/70 uppercase font-medium">Our Waitlist</span>
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/40" />
          </motion.div>

          <motion.div
            className="text-center max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl md:text-3xl font-extralight text-white/90 tracking-wide">
              Creators already leaning in
            </h3>
            <p className="mt-3 text-base md:text-lg text-white/55 font-light leading-relaxed">
              High-intent creators we’re in active conversations with—pulled live from our waitlist.
            </p>
          </motion.div>

          <CreatorShowcase />
        </div>
      </div>
    </section>
  );
}

