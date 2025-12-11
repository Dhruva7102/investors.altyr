import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function Terms() {
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
          Terms of Service
        </h1>
        <p className="text-white/40 text-sm mb-12">
          Effective Date: November 28, 2025 · Last Updated: November 28, 2025
        </p>

        <div className="space-y-10 text-white/70 font-light leading-relaxed">
          <p>
            Welcome to ALTYR ("the Platform," "the Service," "we," "our," or "us"). These Terms of Service ("Terms") form a legal agreement between ALTYR and any person who accesses or uses the Platform ("User," "you," or "your"). By creating an account, accessing, or using the Platform, you agree to these Terms. If you do not agree, do not use the Platform.
          </p>

          <section>
            <h2 className="text-xl font-light text-white/90 mb-4">Eligibility</h2>
            <p className="text-white/50">You must be at least 18 years old and legally capable of entering into this agreement. We may request proof of age or identity. Accounts suspected of being used by minors will be terminated.</p>
          </section>

          <section>
            <h2 className="text-xl font-light text-white/90 mb-4">Account Registration and Security</h2>
            <p className="text-white/50">You are responsible for maintaining the confidentiality of your account credentials and any activity under your account. Notify us immediately of unauthorized use. We may refuse or revoke access at any time.</p>
          </section>

          <section>
            <h2 className="text-xl font-light text-white/90 mb-4">User Content</h2>
            
            <h3 className="text-lg font-light text-white/70 mb-2 mt-6">3.1 Ownership</h3>
            <p className="text-white/50">You retain ownership of content you upload, post, or make available. By posting content, you grant ALTYR a worldwide, non-exclusive, royalty-free license to host, display, transmit, and distribute your content and to promote the Platform consistent with your visibility settings.</p>
            
            <h3 className="text-lg font-light text-white/70 mb-2 mt-6">3.2 Prohibited Content</h3>
            <p className="mb-3 text-white/60">You may not upload or share:</p>
            <ul className="list-disc list-inside space-y-1 text-white/50 ml-2">
              <li>Content involving any person under 18 years old</li>
              <li>Content depicting non-consensual, illegal, or exploitative acts</li>
              <li>Harassment, extremism, hate speech, or threats</li>
              <li>Copyright-infringing or unauthorized content</li>
              <li>Spam, scams, or fraudulent behavior</li>
              <li>Malware or harmful code</li>
            </ul>
            <p className="mt-4 text-white/50">We may remove content and suspend or terminate accounts at our discretion.</p>
          </section>

          <section>
            <h2 className="text-xl font-light text-white/90 mb-4">Payments and Fees</h2>
            <p className="text-white/50">Creators may sell access to content through subscriptions, paid messages, and other offerings. Payments are processed by third-party providers. ALTYR may charge transaction fees, disclosed at checkout. All sales are final except where law requires otherwise. You are responsible for reporting and paying taxes on your earnings.</p>
          </section>

          <section>
            <h2 className="text-xl font-light text-white/90 mb-4">Intellectual Property</h2>
            <p className="text-white/50">All trademarks, software, and Platform design elements belong exclusively to ALTYR. You may not copy, reverse engineer, modify, or distribute Platform assets without written consent.</p>
          </section>

          <section>
            <h2 className="text-xl font-light text-white/90 mb-4">Acceptable Use</h2>
            <p className="mb-3 text-white/60">You agree not to:</p>
            <ul className="list-disc list-inside space-y-1 text-white/50 ml-2">
              <li>Use the Platform for unlawful purposes</li>
              <li>Attempt unauthorized access to other accounts or systems</li>
              <li>Interfere with Platform operations or security</li>
              <li>Collect user data without consent</li>
              <li>Circumvent safety or verification systems</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-light text-white/90 mb-4">Termination</h2>
            <p className="text-white/50">We may suspend or terminate your account at any time, with or without notice, including for violations of these Terms or applicable laws. Access to content or earnings may be restricted following termination. Some information may be retained for legal purposes.</p>
          </section>

          <section>
            <h2 className="text-xl font-light text-white/90 mb-4">Disclaimers</h2>
            <p className="text-white/50">The Platform is provided "as is" without warranties of any kind. We do not guarantee uninterrupted service or that content posted by users is lawful, accurate, or safe.</p>
          </section>

          <section>
            <h2 className="text-xl font-light text-white/90 mb-4">Limitation of Liability</h2>
            <p className="mb-3 text-white/60">To the fullest extent permitted under California and United States law:</p>
            <ul className="list-disc list-inside space-y-1 text-white/50 ml-2">
              <li>ALTYR is not liable for indirect, incidental, or consequential damages</li>
              <li>Total liability shall not exceed the amount you paid ALTYR in the six months prior to the event giving rise to the claim</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-light text-white/90 mb-4">Indemnification</h2>
            <p className="text-white/50">You agree to indemnify and hold ALTYR harmless from claims arising out of your content, conduct, or breach of these Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-light text-white/90 mb-4">Dispute Resolution</h2>
            <p className="text-white/50">Any dispute shall be resolved exclusively by binding arbitration under the laws of the State of California, United States. Venue shall be San Francisco County, California. You waive the right to a jury trial or class action.</p>
          </section>

          <section>
            <h2 className="text-xl font-light text-white/90 mb-4">Changes to These Terms</h2>
            <p className="text-white/50">We may update these Terms at any time by posting a revised version with an updated Effective Date. Continued use of the Platform indicates acceptance of updated Terms.</p>
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