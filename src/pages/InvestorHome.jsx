import React from 'react';
import Hero from '@/components/pitch/Hero';
import Vision from '@/components/pitch/Vision';
import Problem from '@/components/pitch/Problem';
import Solution from '@/components/pitch/Solution';
import Market from '@/components/pitch/Market';
import GoToMarket from '@/components/pitch/GoToMarket';
import Team from '@/components/pitch/Team';
import Raise from '@/components/pitch/Raise';
import Contact from '@/components/pitch/Contact';
import SideNav from '@/components/SideNav';

export default function InvestorHome() {
  return (
    <div 
      className="min-h-screen bg-[#18021A] text-white antialiased"
      style={{ 
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Smooth scroll behavior and cursor styles */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        
        ::selection {
          background: rgba(172, 0, 100, 0.4);
          color: white;
        }
        
        /* Subtle cursor pointer for interactive elements */
        button, a, [role="button"] {
          cursor: pointer;
        }
        
        /* Smooth transitions for all interactive elements */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
      
      {/* Side Navigation */}
      <SideNav />
      
      {/* All Sections */}
      <Hero />
      <Vision />
      <Problem />
      <Solution />
      <Market />
      <GoToMarket />
      <Team />
      <Raise />
      <Contact />
    </div>
  );
}

