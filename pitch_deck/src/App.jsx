import React from 'react';
import './App.css';
import { useSlideNavigation } from '@/hooks/useSlideNavigation';
import SlideContainer from '@/components/SlideContainer';
import SlideNavigation from '@/components/SlideNavigation';
import SlideIndicator from '@/components/SlideIndicator';

// Import all slides
import TitleSlide from '@/components/slides/TitleSlide';
import ProblemSlide1 from '@/components/slides/ProblemSlide1';
import RevenueConcentrationSlide from '@/components/slides/RevenueConcentrationSlide';
import ProblemSlide2 from '@/components/slides/ProblemSlide2';
import AltyrInsightSlide from '@/components/slides/AltyrInsightSlide';
import AltyrSolutionSlide from '@/components/slides/AltyrSolutionSlide';
import GoToMarketSlide from '@/components/slides/GoToMarketSlide';
import TeamSlide from '@/components/slides/TeamSlide';
import TractionSlide from '@/components/slides/TractionSlide';
import RaiseSlide from '@/components/slides/RaiseSlide';
import RevenueCalculatorSlide from '@/components/slides/RevenueCalculatorSlide';
import RisksSlide from '@/components/slides/RisksSlide';
import ContactSlide from '@/components/slides/ContactSlide';
import FinancialAssumptionsSlide from '@/components/slides/FinancialAssumptionsSlide';
import CostBreakdownTableSlide from '@/components/slides/CostBreakdownTableSlide';
import RunwayScenariosSlide from '@/components/slides/RunwayScenariosSlide';
import UseOfFundsSlide from '@/components/slides/UseOfFundsSlide';
import RevenueCalculatorMethodologySlide from '@/components/slides/RevenueCalculatorMethodologySlide';
import V2AdjacentIndustriesSlide from '@/components/slides/V2AdjacentIndustriesSlide';

const slides = [
  TitleSlide,
  ProblemSlide1,
  RevenueConcentrationSlide,
  ProblemSlide2,
  AltyrInsightSlide,
  AltyrSolutionSlide,
  GoToMarketSlide,
  TractionSlide,
  TeamSlide,
  RaiseSlide,
  RevenueCalculatorSlide,
  ContactSlide,
  FinancialAssumptionsSlide,
  RevenueCalculatorMethodologySlide,
  V2AdjacentIndustriesSlide,
  CostBreakdownTableSlide,
  RunwayScenariosSlide,
  UseOfFundsSlide,
  RisksSlide,
];

function App() {
  const { currentSlide, goToSlide, nextSlide, previousSlide } = useSlideNavigation(slides.length);

  return (
    <div
      className="min-h-screen bg-[#18021A] text-white antialiased w-full overflow-hidden"
      style={{
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Global styles */}
      <style>{`
        html, body, #root {
          overflow: hidden;
          height: 100vh;
          width: 100vw;
        }

        ::selection {
          background: rgba(172, 0, 100, 0.4);
          color: white;
        }

        /* Smooth transitions for all interactive elements */
        button, a, [role="button"] {
          cursor: pointer;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Disable pull-to-refresh on mobile */
        body {
          overscroll-behavior-y: none;
        }
      `}</style>

      {/* Slide Container - renders current slide only */}
      <div className="relative w-full h-screen">
        {slides.map((SlideComponent, index) => (
          <SlideContainer
            key={index}
            slideIndex={index}
            isActive={index === currentSlide}
          >
            <SlideComponent />
          </SlideContainer>
        ))}
      </div>

      {/* Navigation UI */}
      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onPrevious={previousSlide}
        onNext={nextSlide}
      />

      {/* Slide Indicator (dots) */}
      <SlideIndicator
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onSlideClick={goToSlide}
      />

      {/* Keyboard hint (show on first slide only) */}
      {currentSlide === 0 && (
        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-40 animate-pulse">
          <div className="px-6 py-3 rounded-full bg-white/[0.05] border border-white/[0.1] backdrop-blur-sm">
            <p className="text-sm text-white/60 font-light">
              Use <span className="text-white/90 font-medium">← →</span> arrow keys to navigate
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
