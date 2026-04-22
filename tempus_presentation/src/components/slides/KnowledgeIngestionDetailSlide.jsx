import { motion } from 'framer-motion';

const ACCENT_FROM = '#AC0064';

function Section({ title, children }) {
  return (
    <div className="mb-7">
      <h3
        className="text-lg font-medium mb-3 pb-2 border-b border-white/10"
        style={{ color: ACCENT_FROM }}
      >
        {title}
      </h3>
      <div className="space-y-2 text-sm text-white/80 font-light leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export default function KnowledgeIngestionDetailSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex flex-col overflow-auto bg-gradient-to-b from-[#18021A] to-[#0d0110] py-12 px-6">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(172,0,100,0.35) 0%, rgba(100,16,154,0.25) 40%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <motion.div
          className="flex items-center justify-center gap-6 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">
            Knowledge Ingestion — Process
          </span>
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="text-center mb-6">
            <p className="text-lg text-white/90 font-light">
              Event-driven ingestion → chunk &amp; summarize → embed &amp; store. Query path: embed → vector search → parent chunks → response.
            </p>
          </div>

          <Section title="Ingestion">
            <ul className="list-disc list-inside space-y-1.5 text-white/75">
              <li><strong className="text-white/90">Upload &amp; trigger</strong> — Cloud Storage; Eventarc notifies Pub/Sub.</li>
              <li><strong className="text-white/90">Process</strong> — Vertex Engine (L4 GPU) partitions file into images, text, tables.</li>
              <li><strong className="text-white/90">Chunk</strong> — Chunk by title; split into table / image / text paths.</li>
              <li><strong className="text-white/90">Summarize</strong> — GKE + Gemini 1.5 Pro (tables), Gemini Vision Pro (images); text → recursive chunking → Child Chunks Pub/Sub.</li>
              <li><strong className="text-white/90">Store &amp; embed</strong> — Summaries in Bigtable; text → Gecko-003 embeddings → Vertex Vector Store.</li>
            </ul>
          </Section>

          <Section title="Retrieval">
            <ul className="list-disc list-inside space-y-1.5 text-white/75">
              <li>Embed user query (Gecko-003) → nearest-neighbor search in Vector Store.</li>
              <li>Retrieve matching child chunk IDs; use them to fetch parent chunks from Bigtable.</li>
              <li>Compile parent content → response (for LLM or direct answer).</li>
            </ul>
          </Section>

          <Section title="Observability">
            <p className="text-white/75">Prometheus scrapes metrics from GKE, Pub/Sub, Vertex Engine. Grafana for dashboards and alerting on thresholds or anomalies.</p>
          </Section>
        </motion.div>
      </div>
    </section>
  );
}
