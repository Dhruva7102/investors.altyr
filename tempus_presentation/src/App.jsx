import './App.css';
import { useSlideNavigation } from '@/hooks/useSlideNavigation';
import SlideContainer from '@/components/SlideContainer';
import SlideNavigation from '@/components/SlideNavigation';
import SlideIndicator from '@/components/SlideIndicator';

import TitleSlide from '@/components/slides/TitleSlide';
import KnowledgeIngestionTitleSlide from '@/components/slides/KnowledgeIngestionTitleSlide';
import KnowledgeIngestionDetailSlide from '@/components/slides/KnowledgeIngestionDetailSlide';
import KnowledgeIngestionSlide from '@/components/slides/KnowledgeIngestionSlide';
import EvaluationFrameworkTitleSlide from '@/components/slides/EvaluationFrameworkTitleSlide';
import EvaluationFrameworkDetailSlide from '@/components/slides/EvaluationFrameworkDetailSlide';
import EvaluationFrameworkSlide from '@/components/slides/EvaluationFrameworkSlide';
import AgentStarterPackTitleSlide from '@/components/slides/AgentStarterPackTitleSlide';
import AgentStarterPackDetailSlide from '@/components/slides/AgentStarterPackDetailSlide';
import AgentStarterPackSlide from '@/components/slides/AgentStarterPackSlide';

const slides = [
  TitleSlide,
  KnowledgeIngestionTitleSlide,
  KnowledgeIngestionDetailSlide,
  KnowledgeIngestionSlide,
  EvaluationFrameworkTitleSlide,
  EvaluationFrameworkDetailSlide,
  EvaluationFrameworkSlide,
  AgentStarterPackTitleSlide,
  AgentStarterPackDetailSlide,
  AgentStarterPackSlide,
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

        button, a, [role="button"] {
          cursor: pointer;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        body {
          overscroll-behavior-y: none;
        }
      `}</style>

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

      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onPrevious={previousSlide}
        onNext={nextSlide}
      />

      <SlideIndicator
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onSlideClick={goToSlide}
      />

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
