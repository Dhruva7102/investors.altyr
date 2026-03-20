import React from 'react';
import RevenueCalculator from '@/components/pitch/RevenueCalculator';

export default function RevenueCalculatorSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#18021A] to-[#0d0110] py-10 md:py-14">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100vw,960px)] h-[min(70vh,560px)] opacity-22 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(172,0,100,0.32) 0%, rgba(100,16,154,0.2) 45%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      <div className="relative z-10 w-full flex items-center justify-center">
        <RevenueCalculator />
      </div>
    </section>
  );
}
