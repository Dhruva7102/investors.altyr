import React from 'react';
import Hero from '@/components/landing/Hero';
import WhyAltyr from '@/components/landing/WhyAltyr';
import FeatureCards from '@/components/landing/FeatureCards';
import AudienceSplit from '@/components/landing/AudienceSplit';
import ExperienceShowcase from '@/components/landing/ExperienceShowcase';
import WhoWeAre from '@/components/landing/WhoWeAre';

import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div 
      className="min-h-screen bg-[#18021A] text-white antialiased"
      style={{ 
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Smooth scroll behavior */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        
        ::selection {
          background: rgba(172, 0, 100, 0.4);
          color: white;
        }
      `}</style>
      
      <Hero />
      <WhyAltyr />
      <FeatureCards />
      <AudienceSplit />
      <ExperienceShowcase />
      <WhoWeAre />

      <Footer />
    </div>
  );
}