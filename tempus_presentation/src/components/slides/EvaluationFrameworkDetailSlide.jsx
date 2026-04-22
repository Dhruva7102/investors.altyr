import { motion } from 'framer-motion';

const ACCENT_FROM = '#AC0064';

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h3
        className="text-base font-medium mb-2 pb-2 border-b border-white/10"
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

export default function EvaluationFrameworkDetailSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex flex-col overflow-auto bg-gradient-to-b from-[#18021A] to-[#0d0110] py-10 px-6">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(172,0,100,0.35) 0%, rgba(100,16,154,0.25) 40%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <motion.div
          className="flex items-center justify-center gap-4 mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">
            Evaluation framework — Architecture
          </span>
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        <motion.div
          className="space-y-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="text-center mb-6">
            <p className="text-lg text-white/90 font-light">
              Systematic testing and assessment of AI agents and knowledge ingestion pipelines.
            </p>
            <p className="text-sm text-white/50 mt-1">
              Web UI / CLI → unified API gateway → execution &amp; evaluation → foundation &amp; data plane.
            </p>
          </div>

          <Section title="Experience layer">
            <ul className="list-disc list-inside space-y-1 text-white/75">
              <li><strong className="text-white/90">Web UI</strong> — React + generated API client; setup runs, monitor, analyze results.</li>
              <li><strong className="text-white/90">CLI</strong> — Generated SDK for programmatic and CI/CD-driven evaluation runs.</li>
            </ul>
          </Section>

          <Section title="Unified API gateway">
            <p className="text-white/75">Single entry: auth bridge, tenant/org context, policy, rate limits. Routes to execution and foundation services.</p>
          </Section>

          <Section title="Execution &amp; evaluation">
            <ul className="list-disc list-inside space-y-1 text-white/75">
              <li><strong className="text-white/90">Orchestrator API</strong> — Receives runs, drives the evaluation workflow.</li>
              <li><strong className="text-white/90">Knowledge Ingestion Service</strong> — Evaluates ingestion pipelines (accuracy, performance).</li>
              <li><strong className="text-white/90">Agent Runtime Service</strong> — Runs and evaluates AI agents against test cases.</li>
              <li><strong className="text-white/90">Dataflow Flex Pipeline</strong> — Prepares test data, runs evaluation logic, calls endpoints under test. Run Store persists metadata and results; LangSmith for LLM/agent debugging.</li>
            </ul>
          </Section>

          <Section title="Foundation">
            <p className="text-white/75"><strong className="text-white/90">Shared:</strong> Tenant/org context, Config (draft/publish/version), Session (lifecycle + correlation), Audit (immutable ledger).</p>
            <p className="text-white/75"><strong className="text-white/90">Data plane:</strong> AlloyDB/Postgres (system of record), Redis (cache/hot state), Outbox (reliable event propagation).</p>
          </Section>

          <Section title="Observability">
            <p className="text-white/75">Logs, metrics, traces from evaluation services, pipeline, and data plane — e.g. Prometheus + Grafana for monitoring and alerting.</p>
          </Section>
        </motion.div>
      </div>
    </section>
  );
}
