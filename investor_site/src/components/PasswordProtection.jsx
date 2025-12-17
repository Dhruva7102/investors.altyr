import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function PasswordProtection({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Check if already authenticated (stored in sessionStorage)
  useEffect(() => {
    const authStatus = sessionStorage.getItem('investor_deck_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Set your password here - in production, consider using environment variables
    const correctPassword = import.meta.env.VITE_INVESTOR_PASSWORD || 'Altyr2024!';

    if (password === correctPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('investor_deck_authenticated', 'true');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  // Show loading state briefly to prevent flash
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#18021A] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#AC0064]/30 border-t-[#AC0064] rounded-full animate-spin" />
      </div>
    );
  }

  // Show password form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#18021A] flex items-center justify-center px-6">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[#18021A]">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px]"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(100,16,154,0.25) 0%, rgba(172,0,100,0.12) 35%, transparent 65%)',
              filter: 'blur(100px)'
            }}
          />
        </div>

        {/* Password form */}
        <motion.div
          className="relative z-10 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="relative p-10 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
            {/* Glow effect */}
            <div
              className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 50% 0%, rgba(172,0,100,0.15) 0%, transparent 50%)',
              }}
            />

            <div className="relative z-10 text-center">
              {/* Logo */}
              <div className="mb-8">
                <h1
                  className="text-4xl font-semibold tracking-[0.12em] mb-2"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  <span className="bg-gradient-to-r from-[#9B4DCA] via-[#E85A24] to-[#FF8C42] bg-clip-text text-transparent">
                    ALTYR
                  </span>
                </h1>
              </div>

              {/* Lock icon */}
              <div className="mb-6 flex justify-center">
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                  <Lock className="w-6 h-6 text-[#AC0064]" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-extralight text-white/90 mb-2 tracking-tight">
                Investor Deck
              </h2>
              <p className="text-white/50 text-sm font-light mb-8">
                Please enter the password to continue
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    placeholder="Enter password"
                    className="w-full h-14 px-5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-white/20 focus:ring-0 transition-colors outline-none"
                    autoFocus
                  />
                  {error && (
                    <p className="text-red-400 text-xs mt-2 text-left">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full h-14 text-[15px] font-medium text-white bg-[#AC0064] hover:bg-[#C0007A] border-0 rounded-xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(172,0,100,0.3)] hover:scale-[1.01]"
                >
                  Access Deck
                </button>
              </form>

              {/* Footer note */}
              <p className="text-white/25 text-xs mt-6 font-light">
                For authorized investors only
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Show protected content if authenticated
  return <>{children}</>;
}

