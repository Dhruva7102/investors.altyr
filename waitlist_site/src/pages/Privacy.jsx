import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
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
            background: 'radial-gradient(ellipse at center, rgba(100,16,154,0.12) 0%, transparent 55%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 px-6 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
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
          <div className="w-20" />
        </div>
      </nav>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-4xl font-extralight tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-white/40 text-sm mb-12">
          Effective Date: November 28, 2025 · Last Updated: November 28, 2025
        </p>

        <div className="space-y-10 text-white/70 font-light leading-relaxed">
          <p>
            ALTYR ("we," "our," or "us") is committed to protecting your privacy. This Policy explains how we collect, use, disclose, and secure information when you use the Platform. By using the Platform, you agree to this Policy.
          </p>

          <section>
            <h2 className="text-xl font-light text-white/90 mb-4">Information We Collect</h2>
            <p className="mb-3 text-white/60">Information you provide:</p>
            <ul className="list-disc list-inside space-y-1 text-white/50 ml-2">
              <li>Email, username, and account details</li>
              <li>Content you upload, messages, and interactions</li>
              <li>Payment or payout details processed by third-party providers</li>
            </ul>
            <p className="mb-3 mt-4 text-white/60">Information collected automatically:</p>
            <ul className="list-disc list-inside space-y-1 text-white/50 ml-2">
              <li>IP address and device identifiers</li>
              <li>Browser and system information</li>
              <li>Usage logs, actions taken, and timestamps</li>
              <li>Cookies and tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-light text-white/90 mb-4">How We Use Information</h2>
            <p className="mb-3 text-white/60">We use information to:</p>
            <ul className="list-disc list-inside space-y-1 text-white/50 ml-2">
              <li>Operate and improve the Platform</li>
              <li>Process payments and subscriptions</li>
              <li>Personalize features</li>
              <li>Detect fraud, enforce policies, and ensure safety</li>
              <li>Comply with legal obligations</li>
              <li>Communicate support and updates</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-light text-white/90 mb-4">Sharing of Information</h2>
            <p className="mb-3 text-white/60">We may share information with:</p>
            <ul className="list-disc list-inside space-y-1 text-white/50 ml-2">
              <li>Payment processors</li>
              <li>Service providers who support hosting, analytics, and security</li>
              <li>Law enforcement when legally required or necessary for safety</li>
            </ul>
            <p className="mt-4 text-white/50">We do not sell personal data. Public content is visible based on your settings.</p>
          </section>

          <section>
            <h2 className="text-xl font-light text-white/90 mb-4">Payment Processing</h2>
            <p className="text-white/50">Financial information is handled by third-party providers. ALTYR does not store full payment card details.</p>
          </section>

          <section>
            <h2 className="text-xl font-light text-white/90 mb-4">Cookies</h2>
            <p className="text-white/50">We use cookies for secure login sessions, functionality, and analytics. Disabling cookies may reduce Platform functionality.</p>
          </section>

          <section>
            <h2 className="text-xl font-light text-white/90 mb-4">Your Rights</h2>
            <p className="mb-3 text-white/60">Where permitted by law, you may request:</p>
            <ul className="list-disc list-inside space-y-1 text-white/50 ml-2">
              <li>Access to personal information</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of data, subject to legal retention requirements</li>
            </ul>
            <p className="mt-4 text-white/50">Submit requests to: <a href="mailto:support@altyr.com" className="text-[#AC0064] hover:text-[#C0007A] transition-colors">support@altyr.com</a></p>
          </section>

          <section>
            <h2 className="text-xl font-light text-white/90 mb-4">Data Retention</h2>
            <p className="text-white/50">We retain information while an account is active and as required to comply with law, enforce policies, and maintain safety. Some data may persist after account deletion.</p>
          </section>

          <section>
            <h2 className="text-xl font-light text-white/90 mb-4">Security</h2>
            <p className="text-white/50">We use commercially reasonable safeguards to protect data, but no system is fully secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-light text-white/90 mb-4">Children's Privacy</h2>
            <p className="text-white/50">The Platform is intended for adults 18 years or older. We do not knowingly collect data from minors. Accounts suspected to be used by minors will be terminated.</p>
          </section>

          <section>
            <h2 className="text-xl font-light text-white/90 mb-4">International Data Transfer</h2>
            <p className="text-white/50">Data may be stored or processed in the United States, where privacy laws may differ. By using the Platform, you consent to these transfers.</p>
          </section>

          <section>
            <h2 className="text-xl font-light text-white/90 mb-4">Changes to This Policy</h2>
            <p className="text-white/50">We may update this Policy by posting a revised version with an updated Effective Date. Continued use of the Platform indicates acceptance.</p>
          </section>

          <section>
            <h2 className="text-xl font-light text-white/90 mb-4">Contact Information</h2>
            <p className="text-white/50"><a href="mailto:support@altyr.com" className="text-[#AC0064] hover:text-[#C0007A] transition-colors">support@altyr.com</a></p>
          </section>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-sm text-white/25 font-light tracking-wide">
            © 2025 ALTYR. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}