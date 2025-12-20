import React from 'react';
import Hero from '@/components/pitch/Hero';
import Vision from '@/components/pitch/Vision';
import Problem from '@/components/pitch/Problem';
import Solution from '@/components/pitch/Solution';
import Market from '@/components/pitch/Market';
import RevenueCalculator from '@/components/pitch/RevenueCalculator';
import GoToMarket from '@/components/pitch/GoToMarket';
import Team from '@/components/pitch/Team';
import Raise from '@/components/pitch/Raise';
import Risks from '@/components/pitch/Risks';
import Contact from '@/components/pitch/Contact';
import SideNav from '@/components/SideNav';

export default function InvestorHome() {
  return (
    <div 
      className="min-h-screen bg-[#18021A] text-white antialiased w-full overflow-x-hidden"
      style={{ 
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        maxWidth: '100vw',
      }}
    >
      {/* Smooth scroll behavior and cursor styles */}
      <style>{`
        html {
          scroll-behavior: smooth;
          overflow-x: hidden !important;
          width: 100% !important;
          max-width: 100vw !important;
        }
        
        body {
          overflow-x: hidden !important;
          width: 100% !important;
          max-width: 100vw !important;
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
        
        /* Prevent horizontal scroll on mobile */
        * {
          max-width: 100%;
        }
        
        img, svg, video, canvas, audio, iframe, embed, object {
          max-width: 100%;
          height: auto;
        }
        
        /* Contain absolutely positioned elements */
        section {
          position: relative;
          overflow-x: hidden;
          overflow-y: visible;
          width: 100%;
          max-width: 100vw;
        }
        
        /* Ensure gradient orbs don't cause overflow */
        [class*="absolute"] {
          max-width: 100vw;
        }
        
        /* Prevent any element from exceeding viewport */
        body > * {
          max-width: 100vw;
          overflow-x: hidden;
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
      <RevenueCalculator />
      <Risks />
      <Contact />
    </div>
  );
}

