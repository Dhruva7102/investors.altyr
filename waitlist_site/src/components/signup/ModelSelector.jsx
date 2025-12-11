import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const models = [
  { id: 1, name: 'Sophia', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face' },
  { id: 2, name: 'Luna', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face' },
  { id: 3, name: 'Aria', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=face' },
  { id: 4, name: 'Maya', avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=200&fit=crop&crop=face' },
  { id: 5, name: 'Ivy', avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop&crop=face' },
  { id: 6, name: 'Nova', avatar: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=200&h=200&fit=crop&crop=face' },
  { id: 7, name: 'Jade', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face' },
  { id: 8, name: 'Ruby', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face' },
];

export default function ModelSelector({ selectedModel, onSelect }) {
  return (
    <div className="w-full overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
      <div className="flex gap-4 min-w-max">
        {models.map((model) => (
          <motion.button
            key={model.id}
            onClick={() => onSelect(model)}
            className={`relative flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 ${
              selectedModel?.id === model.id
                ? 'bg-[#AC0064]/20 border border-[#AC0064]/40'
                : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1]'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <img
                src={model.avatar}
                alt={model.name}
                className={`w-16 h-16 rounded-full object-cover transition-all duration-300 ${
                  selectedModel?.id === model.id ? 'ring-2 ring-[#AC0064]' : ''
                }`}
              />
              {selectedModel?.id === model.id && (
                <motion.div
                  className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#AC0064] rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </div>
            <span className={`text-xs font-light tracking-wide ${
              selectedModel?.id === model.id ? 'text-white/90' : 'text-white/50'
            }`}>
              {model.name}
            </span>
          </motion.button>
        ))}
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}