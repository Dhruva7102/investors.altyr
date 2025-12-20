import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'vision', label: 'Vision' },
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'market', label: 'Market' },
  { id: 'calculator', label: 'Revenue' },
  { id: 'gtm', label: 'Go-to-Market' },
  { id: 'team', label: 'Team' },
  { id: 'raise', label: 'Raise' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'risks', label: 'Risks' },
  { id: 'contact', label: 'Contact' }
];

export default function SideNav() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="flex flex-col gap-4">
        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          return (
            <motion.button
              key={section.id}
              onClick={() => handleClick(section.id)}
              className="group relative flex items-center justify-end"
              aria-label={`Navigate to ${section.label}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Label - always visible for active, appears on hover for others */}
              <motion.span
                className="absolute right-8 px-3 py-1.5 text-xs font-medium text-white/90 bg-gradient-to-r from-[#AC0064]/20 to-[#64109A]/20 backdrop-blur-sm rounded-md border border-[#AC0064]/40 pointer-events-none whitespace-nowrap"
                initial={{ opacity: 0, x: 10 }}
                animate={{ 
                  opacity: isActive ? 1 : 0,
                  x: isActive ? 0 : 10
                }}
                whileHover={{ 
                  opacity: 1, 
                  x: 0 
                }}
                transition={{ duration: 0.2 }}
              >
                {section.label}
              </motion.span>

              {/* Dot indicator */}
              <div className="relative w-3 h-3">
                {/* Outer ring for active state */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-[#AC0064]"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Inner dot */}
                <motion.div
                  className={`absolute inset-0 m-auto rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-2 h-2 bg-gradient-to-br from-[#AC0064] to-[#64109A]'
                      : 'w-1.5 h-1.5 bg-white/30 group-hover:bg-white/60 group-hover:w-2 group-hover:h-2'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />

                {/* Connecting line to next dot */}
                {index < sections.length - 1 && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-4 bg-gradient-to-b from-white/20 to-transparent" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}

