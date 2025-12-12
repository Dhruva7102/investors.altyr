import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Check, Loader2, Gift } from 'lucide-react';
import { storeWaitlistEmail } from '@/api/airtable';

export default function FanGiftSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Store to Airtable
      await storeWaitlistEmail(email, 'fan');
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to store email:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}>

      <div className="relative p-8 md:p-10 rounded-3xl border backdrop-blur-sm bg-gradient-to-br from-[#AC0064]/10 to-transparent border-[#AC0064]/20">
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(172,0,100,0.15) 0%, transparent 50%)'
          }} />


        <div className="relative z-10">
          {!isSubmitted ?
          <>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Gift className="w-5 h-5 text-[#AC0064]" />
                <h3 className="text-xl md:text-2xl font-light text-white/90 tracking-wide text-center">
                  Claim Your Special Gift
                </h3>
              </div>
              <p className="text-white/40 text-sm font-light text-center mb-8">
                Join the waitlist and receive an exclusive welcome gift when we launch
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-14 px-5 bg-white/[0.03] border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-white/20 focus:ring-0 transition-colors" />

                
                <Button
                type="submit"
                disabled={isSubmitting || !email}
                className="group w-full h-14 text-[15px] font-medium text-white border-0 rounded-xl transition-all duration-500 hover:scale-[1.01] bg-[#AC0064] hover:bg-[#C0007A] hover:shadow-[0_0_40px_rgba(172,0,100,0.3)] disabled:opacity-50 disabled:hover:scale-100">

                  {isSubmitting ?
                <Loader2 className="w-5 h-5 animate-spin" /> :

                <>
                      Claim My Gift
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                    </>
                }
                </Button>
              </form>

              <p className="text-white/25 text-xs text-center mt-6 font-light">
                No spam. Unsubscribe anytime.
              </p>
            </> :

          <motion.div
            className="text-center py-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}>

              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 bg-[#AC0064]/20">
                <Check className="w-7 h-7 text-[#AC0064]" />
              </div>
              <p className="text-white/80 font-light">Your gift is on the way!</p>
              <p className="text-white/40 text-sm mt-1">Check your inbox for a special surprise when we launch.</p>
            </motion.div>
          }
        </div>
      </div>
    </motion.div>);

}