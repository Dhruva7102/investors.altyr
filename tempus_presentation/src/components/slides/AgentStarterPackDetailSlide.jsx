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

export default function AgentStarterPackDetailSlide() {
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
            Agent Starter Pack — Process &amp; Usage
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
              Deploy production-ready AI agents to Vertex AI Agent Engine in minutes, not weeks.
            </p>
            <p className="text-sm text-white/50 mt-1">
              Toolkit for creating and operating Agent Engine agents.
            </p>
          </div>

          <Section title="Key value">
            <ul className="list-disc list-inside space-y-0.5 text-white/75">
              <li><strong className="text-white/90">Zero to production in 3 commands</strong> — Create, configure, deploy</li>
              <li><strong className="text-white/90">Enterprise-ready out of the box</strong> — Security scanning, CI/CD, monitoring included</li>
              <li><strong className="text-white/90">Focus on agent logic</strong> — Infrastructure handled for you</li>
            </ul>
          </Section>

          <Section title="Quick start">
            <pre className="bg-white/[0.06] border border-white/10 rounded-lg p-3 text-xs text-white/80 overflow-x-auto font-mono">
{`agent-starter-pack create my-agent && cd my-agent \\
  && agent-starter-pack setup-cicd --dev-project my-dev-project --create-repository \\
  && agent-starter-pack add-environment staging --gcp-project my-staging-project \\
  && agent-starter-pack add-environment production --gcp-project my-prod-project`}
            </pre>
          </Section>

          <Section title="Workflow">
            <p className="text-white/75">Create → setup-cicd (dev + repo + Terraform PR) → add-environment (staging/prod) → merge Terraform PR(s) → resume → push to main (staging deploy) → manual production.</p>
            <p className="text-white/70 text-xs mt-1">Auth: WIF (GitHub → GCP). CI: Trivy SBOM + SAST, Corroborator tollgates, SHA256 + Artifactory. Runtime: Agent Engine + plugins (FinOps, Observability, Policy/Network).</p>
          </Section>

          <Section title="What you get">
            <ul className="list-disc list-inside space-y-0.5 text-white/75">
              <li>app/ (agent.py, tools.py), .github/workflows, deployment/terraform, frontend (Streamlit), tests, Makefile (install, test, lint, playground), pyproject.toml, .agent-setup.yaml</li>
              <li>Customize: agent.py (logic, system prompt), tools.py, pyproject.toml</li>
            </ul>
          </Section>

          <Section title="After deployment">
            <p className="text-white/75">Test via Agent Engine Console or curl to chat endpoint; stream logs with gcloud logging read.</p>
            <p className="text-white/70 text-xs mt-0.5">Teardown: revert Terraform PR or destroy workspace; remove repo or WIF bindings; clean up GCP resources.</p>
          </Section>
        </motion.div>
      </div>
    </section>
  );
}
