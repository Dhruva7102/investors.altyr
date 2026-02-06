import React from 'react';
import { useParams } from 'react-router-dom';
import { useRedirectResolver } from '@/hooks/useRedirectResolver';
import RedirectHero from '@/components/redirect/RedirectHero';
import WhyAltyr from '@/components/landing/WhyAltyr';
import FeatureCards from '@/components/landing/FeatureCards';
import AudienceSplit from '@/components/landing/AudienceSplit';
import ExperienceShowcase from '@/components/landing/ExperienceShowcase';
import WhoWeAre from '@/components/landing/WhoWeAre';
import Footer from '@/components/landing/Footer';
import { fanStatements, fanFeatures } from '@/components/redirect/redirectCopy';

export default function RedirectLanding() {
  const { slug } = useParams();
  const { loading, error, onlyfansUrl, altyrUrl, recordClick } = useRedirectResolver(slug);

  const state = loading ? 'loading' : error ? 'error' : 'resolved';

  const handleOnlyFansClick = () => recordClick('onlyfans');
  const handleAltyrClick = () => recordClick('altyr');

  return (
    <div
      className="min-h-screen bg-[#18021A] text-white antialiased"
      style={{
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <style>{`
        html { scroll-behavior: smooth; }
        ::selection {
          background: rgba(172, 0, 100, 0.4);
          color: white;
        }
      `}</style>

      <RedirectHero
        state={state}
        onlyfansUrl={onlyfansUrl || 'https://www.onlyfans.com'}
        altyrUrl={altyrUrl || 'https://dev.altyr.com'}
        onOnlyFansClick={handleOnlyFansClick}
        onAltyrClick={handleAltyrClick}
      />

      <div id="explore">
        <WhyAltyr statements={fanStatements} />
        <FeatureCards features={fanFeatures} />
        <AudienceSplit />
        <ExperienceShowcase />
        <WhoWeAre />
        <Footer />
      </div>
    </div>
  );
}
