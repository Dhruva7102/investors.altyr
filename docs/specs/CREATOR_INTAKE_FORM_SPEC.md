# Creator Intake Form — Implementation Spec (Altyr Pro Onboarding)

> **Audience:** Dhruva (dev), intended to be used as context for Claude Code when building
> the creator intake flow inside the Altyr Pro onboarding tool (Linear: **ALTYR-9**,
> "White-Glove Onboarding tool").
>
> **Status:** Spec only — no implementation exists in this repo. The product code lives in
> the Altyr Pro repos (node-service behind the KrakenD gateway); this document defines
> what to build, the data model, and the acceptance criteria.
>
> **Companion docs (design source of truth):**
> - Full field-level spec with rationale: "Creator Intake Form — Onboarding Specification" (artifact/PDF from Solan)
> - Creator-facing wizard mockup (artifact)
> - Internal field-blocking doc with Keep/Cut/Discuss status (artifact)
> - Nate's manual audit format (`Captivate/Charm Audit form` docx) — the audit template below encodes it

---

## 1. What this is

A 7-step intake wizard inside Altyr Pro that onboards a creator into the agency. One
structured intake produces four outputs:

| Output | Consumer |
|---|---|
| **Audit inputs** | The automated account-audit pipeline (logins, page inventory, VPN region, pricing matrix, baselines) |
| **Knowledge base (KB)** | The per-creator KB that the AI chat-shift scorer evaluates against (out of 100) and that chatter account packs are generated from |
| **Compliance record** | Agency paperwork + references to OnlyFans-held verification (never copies) |
| **Ops runbook** | Schedules, escalation contacts, permission grants |

**Key decision (from Solan):** identity documents are **NOT collected**. OnlyFans already
holds gov ID, verification selfie, and co-performer release forms, and the agency has
access to them. The intake stores *references/confirmation flags* for those, plus the
agency's own paperwork (agreement, tax form, misc document locker).

## 2. Non-goals

- No re-collection of gov ID / selfie / §2257 releases (OF holds these).
- No storage of raw credentials in the intake database — credentials go to the
  credential vault (or session-cookie capture); the intake stores an opaque
  `vault_ref` only. **Hard requirement.**
- No payment/banking collection at launch (collect payout *state* only) — pending a
  scope decision.
- The audit pipeline itself is a separate build; this spec defines the intake fields it
  consumes and the audit template shape it runs (§7).

## 3. Entities

```
CreatorIntake
├── id, creator_id, agency_id
├── state: draft → in_review → ready_for_audit → live   (+ abandoned)
├── current_step (1–7), per-step completed_at timestamps
├── fill_mode: self_serve | manager_assisted
└── has_many: PageAccount, PersonaProfile (1), PricingMatrix (1),
              TopSpenderDossier, DocumentSlot, PermissionGrant, OpsProfile (1)

PageAccount            (repeating — one per page)
├── platform: onlyfans | fansly
├── url, handle, display_alias
├── page_type: free | paid | vip
├── oftv: bool
├── credential_vault_ref        (opaque — NEVER a password)
├── linked_email_vault_ref      (opaque)
├── twofa_method: sms | authenticator | email | none
├── twofa_backup_vault_ref      (opaque, nullable)
└── login_region                (audit "VPN Location")

PersonaProfile
├── archetypes[]                (enum + freeform: bubbly, luxury, gnd, dom, sub, alt, milf, other)
├── backstory { stated_age, stated_location, day_job, relationship_story, hobbies, pets, other }
├── voice_rules { emojis[], pet_names[], slang, capitalization, msg_length, typo_tolerance }
├── never_say[]                 (chat-audit auto-deduction list)
├── energy_balance: soft | balanced | direct    (aggressive↔submissive posture)
├── languages[]
└── example_messages[]          (3–5 verbatim samples for scorer calibration)

PricingMatrix
├── sub_price, promo_rules
├── ppv_bounds[] { category: solo|bg|gg|anal|fetish|sexting, min, max, explicitness_ceiling }
├── tip_menu[], bundles[], vip_offers[]
└── customs { offered, rate, turnaround_days }

TopSpenderDossier      (repeating)
├── fan_alias, approx_30d_spend
├── preferences, boundaries, history_notes

DocumentSlot           (repeating — the "document locker")
├── kind: agency_agreement | tax_form | other
├── label, file_ref, notes
└── esign_status                (agreement + tax form use embedded e-sign)

VerificationReference  (on CreatorIntake — replaces ID uploads)
├── of_identity_verified: bool, confirmed_by, confirmed_at
└── collab_releases { partner_names[], confirmed_on_of: bool, confirmed_at }

OpsProfile
├── availability, preferred_channel, response_expectation
├── blackout_dates[], posting_rhythm { feed, stories, bumps, ppv }
├── live_features { lives, video_calls, sexting_takeovers }
└── checkin_cadence: weekly | biweekly | monthly

PermissionGrant        (repeating, versioned, logged)
├── key: message_as_persona | run_automated_audits | adjust_pricing_in_matrix |
│        unsend_and_clear_queues | crosspost_socials.<platform>
├── granted: bool, granted_at, signature_ref
└── escalation_contacts[]
```

Baseline self-reported numbers (earnings 30/90d, sub counts, chargebacks 30d,
vault snapshot, off-platform whale channels, current team, worked/flopped notes) hang
off `CreatorIntake` as a `SalesBaseline` blob — several of these may be trimmed in favor
of day-0 audit auto-derivation (open decision; see internal blocking doc).

## 4. Step flow

| # | Step | Writes | Gate to advance |
|---|---|---|---|
| 1 | Identity & Legal | CreatorIntake basics, VerificationReference, DocumentSlots | legal name, stage name, DOB, contact, country/tz; OF-verified flag confirmed; agreement + tax e-sign started |
| 2 | Persona & Voice | PersonaProfile | archetype, backstory, voice rules, never-say list |
| 3 | Content & Pricing | PricingMatrix, categories, hard limits, vault snapshot, collab names | categories, hard limits, sub price, PPV bounds |
| 4 | Fans & History | SalesBaseline, TopSpenderDossiers | earnings + sub counts (or explicit "derive from audit") |
| 5 | Accounts & Access | PageAccounts (+ vault refs) | ≥1 page fully connected incl. 2FA + login region |
| 6 | Ops & Availability | OpsProfile | availability, channel, check-in cadence |
| 7 | Permissions & Sign-off | PermissionGrants + final signature | required grants + signature |

Rules:
- **Every step saves independently** (autosave per field or per step). Creators will not
  finish in one sitting; a partial intake is a visible pipeline state for managers.
- **Manager-assisted mode:** an agency user can fill any step on the creator's behalf;
  the creator must personally complete the step-7 review + signature.
- On step-7 signature: `state → ready_for_audit`, emit event that **triggers the day-0
  baseline audit** automatically.
- Ordering is by trust: paperwork first, credentials second-to-last (after the
  relationship is contractual), consent last (so it is informed).

## 5. Credential handling (hard requirements)

1. Password/2FA fields are rendered by the **vault's capture component**, not by the
   intake form. The intake DB stores only `vault_ref` strings.
2. Prefer session-cookie capture (cookie-helper approach) where viable: audits and
   chatter sessions authenticate with the session; the password stays sealed.
3. RBAC: chatters receive brokered session access, never raw credentials. Every vault
   access is logged (who, when, which account).
4. All team/audit logins for a PageAccount route through its `login_region` (the audit's
   "VPN Location") to avoid platform security flags.
5. Rotation on team changes.

If the vault integration is not ready at launch, step 5 links out to the vault's own
flow; the form must never hold a password even transiently in its own backend.

## 6. API sketch (KrakenD gateway conventions, `/v1`, node-service)

```
POST   /v1/creatorIntake                     create draft (agencyId, creatorId, fillMode)
GET    /v1/creatorIntake                     ?intakeId | ?agencyId&state&offset&limit
PATCH  /v1/creatorIntake/step/{n}            save step payload (partial ok)
POST   /v1/creatorIntake/submitStep/{n}      validate + mark complete
POST   /v1/creatorIntake/pageAccount         add/update page (vault_ref only)
POST   /v1/creatorIntake/sign               final signature → ready_for_audit + emit audit trigger
GET    /v1/creatorIntake/summary            step-7 review payload (everything granted)
GET    /v1/creatorIntake/chatterPack        RBAC: chatter-visible distillation (see §8)
```

Follow existing gateway config style (`services/apigateway-service/config/settings/nodeApi.json`):
declarative route entries, `authorization`/`lan` headers, query-string params.

## 7. Audit template (repeatable automation)

Nate's manual audit becomes a **versioned template**; every run records
`template_version`. Scores are only comparable across runs of the same version.

```jsonc
{
  "template": "account_audit",
  "version": "1.0",
  "sections": [
    { "key": "header",            "source": "intake.step5",          "eval": "lookup" },
    { "key": "welcome_message",   "source": "auto_message_settings", "eval": ["rules", "llm_vs_kb"],
      "checks": ["exists", "locked_content", "price", "quality_vs_persona"] },
    { "key": "profile_optimization", "source": "profile_scrape",     "eval": ["rules", "llm_vs_kb"],
      "checks": ["online_status_setting", "sub_price_vs_matrix", "promos", "banner", "pinned", "bio",
                 "feed_free_nudity_ratio", "funnel_present", "posting_activity", "vault_state",
                 "content_variety", "teaser_premium_balance"] },
    { "key": "mass_ppvs",         "source": "message_history",       "eval": ["rules", "llm_vs_kb"],
      "checks": ["frequency", "price_vs_matrix_per_category", "sellable_vault_count",
                 "caption_quality", "unlock_rates", "persona_consistency"] },
    { "key": "bait_messages",     "source": "outbound_sample_7d",    "eval": ["rules", "llm_vs_kb"],
      "checks": ["tone", "aggressive_submissive_balance_vs_kb", "tip_ask_cadence_24h",
                 "emoji_repetition", "message_repetition", "fun_tactics"] },
    { "key": "missed_sales",      "source": "chat_threads",          "eval": ["rules", "llm_vs_kb"],
      "checks": ["new_sub_greetings", "english_quality", "exclusive_experiences_offered",
                 "challenges_polls", "strategy_testing", "damage_control", "personalization",
                 "upsell_variety", "response_times_vs_sla", "tos_violations", "chargebacks_30d"] },
    { "key": "pricing",           "source": "live_prices",           "eval": "rules",
      "checks": ["within_matrix", "undervaluation", "progression_strategy"] },
    { "key": "top_spenders",      "source": "fan_spend_ranking",     "eval": ["rules", "llm_vs_kb"],
      "checks": ["identified_and_nurtured", "assistant_assigned", "proactive_outreach", "top3_30d_spend"] }
  ],
  "scoring": { "rollup": "weighted_sections", "scale": 100 },
  "evidence": "screenshot_per_check",
  "cadence":  { "baseline": "on_ready_for_audit", "light": "weekly", "full": "monthly",
                "triggers": ["chargeback_spike", "revenue_drop", "sla_breach"] },
  "diff":     "compare_to_previous_run + recommendation_task_completion",
  "review":   "human_signoff_before_publish"
}
```

- `llm_vs_kb` = LLM evaluation scored against the creator's KB (persona, pricing matrix,
  never-say list) — same records the chat-shift scorer uses.
- Any live price outside `PricingMatrix` bounds is an automatic flag.
- Audit recommendations become tracked tasks with owners; the next run checks
  completion automatically ("diff, don't re-describe").

## 8. Generated outputs (SOPs + chatter pack)

SOPs are **compiled views over intake records**, regenerated on record change,
versioned, and manager-approved before going live. LLM involvement is prose-smoothing
only; content is deterministic from fields.

| SOP | Source |
|---|---|
| Persona & Voice Guide | PersonaProfile (primary chat-audit rubric) |
| Pricing & Offer Matrix | PricingMatrix (amendable only with creator sign-off) |
| Boundaries & Escalation | hard limits + PermissionGrants + escalation contacts |
| Sales Playbook | steps 2–4 + rolling audit recommendations |
| Account Ops Runbook | steps 5–7 (vault procedure, VPN region, cadence, pre-authorizations) |

**Chatter pack** (`GET /v1/creatorIntake/chatterPack`, RBAC-scoped — chatters never see
raw intake): persona card, boundary sheet (requires acknowledgment before first shift),
pricing card, top-spender dossiers, content map, brokered session access with SLA
targets. If it's not in the intake or a later audit, the chatter doesn't know it —
by design.

## 9. Acceptance criteria

1. A creator (or manager in assisted mode) can complete all 7 steps across multiple
   sessions; partial state is visible to the agency as a pipeline stage.
2. No credential value ever appears in the intake service's database, logs, or network
   payloads — only `vault_ref` opaque tokens.
3. No upload fields exist for gov ID / selfie / co-performer releases; the
   VerificationReference flags are settable only by agency/admin roles.
4. Step-7 signature transitions state to `ready_for_audit` and emits the audit-trigger
   event exactly once.
5. Every PermissionGrant change is versioned and auditable (who granted, when, under
   which signature).
6. The audit template runs against a connected PageAccount using only intake data +
   scraped account data, produces a /100 score with per-check evidence, and records
   `template_version`.
7. SOPs regenerate when their source records change and require manager approval
   before becoming visible to chatters.
8. Chatter pack endpoint returns only the distilled fields listed in §8 for the
   chatter role.

## 10. Open decisions (do not guess — confirm with Solan)

- Credential mechanism: vaulted passwords vs. session-cookie capture (blocks §5/§6 UX).
- Trim step 4's auto-derivable numbers in favor of the day-0 audit?
- Payout/banking scope (state-only assumed here).
- Tax form timing: at intake vs. first payout.
- Fansly in the page repeater at launch, or OF-only.
- E-sign vendor (JotForm is referenced today; DocuSign/PandaDoc were candidates in ALTYR-1).
