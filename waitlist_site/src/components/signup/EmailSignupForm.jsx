import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { storeWaitlistEmail } from '@/api/airtable';
import { identifyUser, trackEvent } from '@/lib/mixpanel';

// X (Twitter) icon component
const XIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function EmailSignupForm({ 
  type = 'creator', 
  onSubmit,
  title = "Join the Waitlist",
  subtitle = "Be the first to know when we launch."
}) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [xHandle, setXHandle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const isCreator = type === 'creator';

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isValidPhone = (value) => /^[\d\s\-\+\(\)]{7,}$/.test(value.replace(/\s/g, ''));
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // For creators: require either email OR phone, and X username is mandatory
    if (isCreator) {
      if (!email && !phone) {
        setError('Please provide either an email address or phone number');
        return;
      }
      
      if (!xHandle || xHandle.trim() === '') {
        setError('X username is required');
        return;
      }
    } else {
      // For fans: email is required
      if (!email) {
        setError('Email is required');
        return;
      }
    }
    
    // Validate email if provided
    if (email && !isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Validate phone if provided
    if (phone && !isValidPhone(phone)) {
      setError('Please enter a valid phone number');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      // Store to Airtable
      await storeWaitlistEmail({
        email: email || undefined,
        phone: phone || undefined,
        xHandle: isCreator ? xHandle : undefined
      }, type);
    
      // Identify user in Mixpanel if email is provided
      if (email) {
        identifyUser(email, {
          user_type: type,
          has_phone: !!phone,
          has_x_handle: !!xHandle,
        })
      }
    
      // Track signup event
      trackEvent('Waitlist Signup', {
        user_type: type,
        has_email: !!email,
        has_phone: !!phone,
        has_x_handle: !!xHandle,
      })
    
      if (onSubmit) {
        await onSubmit({ email, phone, xHandle });
      }
    
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to store data:', error);
      // Show more specific error message if available
      const errorMessage = error.message || 'Something went wrong. Please try again.';
      setError(errorMessage.includes('not configured') 
        ? 'Service is not configured. Please contact support.' 
        : errorMessage);
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
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  className="w-full h-14 px-5 bg-white/[0.03] border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-white/20 focus:ring-0 transition-colors"
                />
                {isCreator && (
                  <>
                    <Input
                      type="tel"
                      placeholder="Phone number"
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value); setError(''); }}
                      className="w-full h-14 px-5 bg-white/[0.03] border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-white/20 focus:ring-0 transition-colors"
                    />
                    <div className="relative">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
                        <XIcon className="w-5 h-5 text-white/40" />
                      </div>
                      <Input
                        type="text"
                        placeholder="X username"
                        value={xHandle}
                        onChange={(e) => { setXHandle(e.target.value); setError(''); }}
                        className="w-full h-14 pl-12 pr-5 bg-white/[0.03] border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-white/20 focus:ring-0 transition-colors"
                      />
                    </div>
                  </>
                )}
                {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting || (isCreator ? (!email && !phone) || !xHandle : !email)}
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