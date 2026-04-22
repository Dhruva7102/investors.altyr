import { motion } from 'framer-motion';

export default function KnowledgeIngestionSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex flex-col bg-gradient-to-b from-[#18021A] to-[#0d0110]">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(172,0,100,0.3) 0%, rgba(100,16,154,0.2) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 flex flex-col flex-1 min-h-0">
        <div className="flex-shrink-0 flex items-center justify-center gap-4 py-3 px-4 border-b border-white/10">
          <span className="text-xs tracking-[0.3em] text-[#AC0064]/80 uppercase font-medium">
            Knowledge Ingestion
          </span>
          <span className="text-white/40 text-sm font-light">
            Platform — Ingestion &amp; Retrieval pipelines
          </span>
        </div>

        <motion.div
          className="flex-1 flex items-center justify-center p-4 min-h-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/architecture-knowledge-platform.png"
            alt="Knowledge Management Platform — Ingestion and Retrieval Pipelines"
            className="max-w-full max-h-full w-auto h-auto object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}
