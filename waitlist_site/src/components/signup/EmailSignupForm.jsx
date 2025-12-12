import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { storeWaitlistEmail } from '@/api/airtable';

export default function EmailSignupForm({ 
  type = 'creator', 
  onSubmit,
  title = "Join the Waitlist",
  subtitle = "Be the first to know when we launch."
}) {
  const [contact, setContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const isCreator = type === 'creator';

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isValidPhone = (value) => /^[\d\s\-\+\(\)]{7,}$/.test(value.replace(/\s/g, ''));
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contact || isSubmitting) return;
    
    const isEmail = isValidEmail(contact);
    const isPhone = isValidPhone(contact);
    
    if (!isEmail && !isPhone) {
      setError('Please enter a valid email or phone number');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      // Store to Airtable
      await storeWaitlistEmail(contact, type);
      
      if (onSubmit) {
        await onSubmit(contact);
      }
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to store email:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className={`relative p-8 md:p-10 rounded-3xl border backdrop-blur-sm ${
        isCreator 
          ? 'bg-gradient-to-br from-[#B56A00]/10 to-transparent border-[#B56A00]/20' 
          : 'bg-gradient-to-br from-[#AC0064]/10 to-transparent border-[#AC0064]/20'
      }`}>
        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none"
          style={{
            background: isCreator
              ? 'radial-gradient(circle at 50% 0%, rgba(181,106,0,0.15) 0%, transparent 50%)'
              : 'radial-gradient(circle at 50% 0%, rgba(172,0,100,0.15) 0%, transparent 50%)',
          }}
        />

        <div className="relative z-10">
          <h3 className="text-xl md:text-2xl font-light text-white/90 mb-2 text-center tracking-wide">
            {title}
          </h3>
          <p className="text-white/40 text-sm font-light text-center mb-8">
            {subtitle}
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Enter your email or phone"
                  value={contact}
                  onChange={(e) => { setContact(e.target.value); setError(''); }}
                  required
                  className="w-full h-14 px-5 bg-white/[0.03] border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-white/20 focus:ring-0 transition-colors"
                />
                {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting || !contact}
                className={`group w-full h-14 text-[15px] font-medium text-white border-0 rounded-xl transition-all duration-500 hover:scale-[1.01] ${
                  isCreator
                    ? 'bg-[#B56A00] hover:bg-[#C97A00] hover:shadow-[0_0_40px_rgba(181,106,0,0.3)]'
                    : 'bg-[#AC0064] hover:bg-[#C0007A] hover:shadow-[0_0_40px_rgba(172,0,100,0.3)]'
                }`}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Get Early Access
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          ) : (
            <motion.div
              className="text-center py-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 ${
                isCreator ? 'bg-[#B56A00]/20' : 'bg-[#AC0064]/20'
              }`}>
                <Check className={`w-7 h-7 ${isCreator ? 'text-[#FFAA34]' : 'text-[#AC0064]'}`} />
              </div>
              <p className="text-white/80 font-light">You're on the list!</p>
              <p className="text-white/40 text-sm mt-1">We'll be in touch soon.</p>
            </motion.div>
          )}

          <p className="text-white/25 text-xs text-center mt-6 font-light">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </motion.div>
  );
}