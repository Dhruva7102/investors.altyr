# ALTYR — User-Generated Content (UGC) Policies & Procedures

**Prepared for:** Segpay — Adult Content Due Diligence  
**Document type:** UGC Procedure Document  
**Effective Date:** March 1, 2026  
**Last Updated:** March 1, 2026  
**Version:** 1.0  

---

## Overview

ALTYR is a subscription-based creator platform that allows verified adult creators to publish and monetize original content for subscribing fans. This document describes ALTYR's binding internal procedures for managing user-generated content (UGC) in compliance with applicable law and Segpay's UGC compliance requirements as documented at [gethelp.segpay.com](https://gethelp.segpay.com/docs/Content/ComplianceDocs/UserGeneratedContent.htm).

All ALTYR personnel involved in content operations, trust & safety, and compliance are required to follow these procedures. These procedures are reviewed and updated at least annually or whenever legal or processor requirements change.

---

## 1. Identity & Age Verification

### Policy Statement

No person under 18 years of age may appear in, create, or upload content on ALTYR. Age and identity verification is mandatory for all content creators before any content is published. This requirement is absolute and non-negotiable.

### Creator Verification Process

**Step 1 — Account application**  
When a user applies to become a creator, they are placed in a `pending_verification` state. No content upload capability is enabled until verification is fully approved.

**Step 2 — Government-issued photo ID submission**  
The creator must upload:
- Front **and** back of a valid, unexpired government-issued photo ID (passport, driver's licence, national identity card, or equivalent)
- A live selfie and/or a selfie holding the ID next to their face, taken at the time of application

Accepted document types: passport, driver's licence, national ID card, residence permit with photo. Documents must be in English or accompanied by a certified translation.

**Step 3 — Review and validation**  
Our Trust & Safety team (or authorized third-party KYC vendor) validates:
- The document is genuine and unaltered
- The name, date of birth, and photo match
- The date of birth confirms the individual is 18 or older
- The document is not expired

Review is completed within 2 business days of submission. Creators are notified of approval or rejection by email.

**Step 4 — Approval and record creation**  
Upon approval, the creator's account is upgraded to `verified_creator` status. A compliance record is created that includes:
- Creator's legal name and date of birth
- Document type and reference number
- Date of verification
- Verification outcome and reviewer ID
- Copies of submitted documents (securely stored, encrypted at rest)

All verification records are retained for a minimum of **7 years** in compliance with 18 U.S.C. § 2257.

### Collaborator (Co-Performer) Verification

Before a creator may publish content featuring another individual:
1. The creator must submit a **model release form** (18 U.S.C. § 2257 release) naming each collaborator, including their legal name, date of birth, address, and proof of age
2. ALTYR's Trust & Safety team reviews and approves the release form before the content may be published
3. Content featuring unverified collaborators is held in a `pending_review` state and is not visible to the public until approved
4. Release form records are retained for 7 years

> **Reference documents:** [`docs/legal/AGE_AND_IDENTITY_VERIFICATION_POLICY.md`](../legal/AGE_AND_IDENTITY_VERIFICATION_POLICY.md) | [`docs/legal/PERFORMER_CREATOR_AGREEMENT.md`](../legal/PERFORMER_CREATOR_AGREEMENT.md)

---

## 2. Content Review & Handling

### Policy Statement

All content submitted by creators is reviewed before it becomes visible to any subscriber or the public. No UGC is published automatically without human review sign-off.

### Pre-Publication Review Steps

**Step 1 — Upload queuing**  
When a creator uploads content (image, video, or live stream session recording), the content is placed in a `queued_for_review` state. It is stored in a private, non-public bucket and is not accessible by any end user.

**Step 2 — Automated first-pass scan**  
Content is run through automated detection tools (see Section 4) to flag:
- Apparent minors
- Non-consensual or illegal content indicators
- Duplicate/previously removed content (hash matching)

Content that fails automated checks is immediately escalated to a human reviewer with a `flagged` status and is never auto-approved.

**Step 3 — Human review**  
A trained Trust & Safety reviewer examines every piece of content for:
- Presence of any individual who appears to be under 18
- Non-consensual acts, violence, or clearly illegal content
- Content that contradicts or is inconsistent with submitted model release forms (i.e., additional individuals not covered by a release)
- Watermarks, logos, or indicators suggesting content originated from a prohibited source

**Step 4 — Decision**
| Outcome | Action |
|---------|--------|
| **Approved** | Content status set to `approved`; becomes visible to eligible subscribers |
| **Needs information** | Content held; creator notified within 24 hours with specific request |
| **Rejected** | Content deleted; creator notified with reason; repeat violations trigger escalation |
| **Escalated** | Content flagged for senior review or law enforcement referral |

**Step 5 — Publication**  
Only content with `approved` status is made visible. The content record retains its review history (reviewer ID, timestamp, outcome) indefinitely.

### SLA Targets

| Content Type | Target Review Time |
|---|---|
| Images | ≤ 24 hours |
| Videos (< 10 min) | ≤ 48 hours |
| Videos (≥ 10 min) | ≤ 72 hours |
| Flagged / escalated content | ≤ 4 hours |

---

## 3. Content Moderation Personnel

### Roles and Responsibilities

| Role | Responsibilities |
|------|-----------------|
| **Trust & Safety Reviewer** | Performs day-to-day pre-publication content review; executes takedown requests; flags escalations; logs all decisions in the compliance system |
| **Trust & Safety Lead** | Manages the reviewer team; handles escalated reviews; sets review standards; manages appeals; reports compliance metrics weekly |
| **Compliance Officer** | Owns all processor and legal compliance obligations; approves UGC procedure updates; handles law enforcement requests; submits monthly Segpay Website Compliance Violations reports |
| **Engineering — Safety Tools** | Maintains automated scanning pipelines; manages hash-matching databases; integrates third-party KYC/moderation APIs |
| **Executive Sponsor (CEO / COO)** | Ultimate accountability for compliance posture; approves policy changes; signs legal attestations |

### Staffing

ALTYR maintains sufficient Trust & Safety Reviewer capacity to meet the SLA targets in Section 2. Reviewer headcount is reviewed quarterly and scaled to creator volume. Reviewers are never used to review content from creators they have a personal relationship with.

### Training

All Trust & Safety personnel complete onboarding training covering:
- ALTYR content policies and these procedures
- Identification of underage individuals and prohibited content
- Handling CSAM discoveries (mandatory law enforcement reporting, no internal distribution)
- Escalation paths and documentation requirements
- Confidentiality and data handling

Training is refreshed annually and after any significant policy update. Training completion is logged.

---

## 4. Tools & Technologies

### Age & Identity Verification

| Tool / Method | Purpose |
|---|---|
| **Dedicated KYC verification team** | Human review of government-issued ID documents |
| **Third-party KYC vendor** (e.g., Stripe Identity, Persona, Veriff, or equivalent) | Automated document authentication, liveness check, and age extraction |
| **18 U.S.C. § 2257 model release forms** | Collaborator age/identity documentation; maintained in secure creator record |

### Content Moderation

| Tool / Method | Purpose |
|---|---|
| **PhotoDNA / perceptual hash matching** | Detects re-uploads of previously removed or CSAM-database-matched content |
| **AI content classifiers** (e.g., AWS Rekognition, Sightengine, or equivalent) | First-pass detection of apparent minors, explicit content categories, and violence |
| **Internal review queue system** | Workflow tool for managing content review SLAs, reviewer assignment, and audit logging |
| **NCMEC CyberTipline** | Mandatory reporting channel for discovered CSAM |

### Platform Security

- All content stored in private cloud buckets (AWS S3 or equivalent); no direct public URLs
- Content delivery requires authenticated, time-limited signed URLs
- Access to raw content is restricted to authorized Trust & Safety personnel
- All access and moderation actions are audit-logged with timestamps and user IDs

---

## 5. Documentation & Agreement Availability

### Commitment

ALTYR commits to producing the following documentation within **48 hours** of any written request from Segpay or authorized compliance investigators:

1. **Creator identification documents** — Government-issued ID copies, selfie photos, and verification records for any specified creator
2. **Signed creator agreements** — Executed Performer/Creator Agreement for any specified creator
3. **Model release forms** — 18 U.S.C. § 2257 release forms for collaborators appearing in specified content
4. **Content review records** — Review history, outcome, reviewer ID, and timestamp for any specified piece of content
5. **Account activity logs** — Upload history, status changes, and violation history for any specified account

### Storage and Retrieval

All compliance documentation is stored in a secure, access-controlled compliance record system. Records are indexed by creator ID, content ID, and date range to support rapid retrieval. Backup copies are maintained in geographically separate cloud storage. The Compliance Officer is the single point of contact for all document requests.

---

## 6. Handling Inappropriate Content

### Non-Compliant Content (policy violations)

1. Content is immediately removed from public visibility (status set to `suspended`)
2. The creator is notified by email with the specific policy violated and the content reference
3. The Trust & Safety Lead reviews the case within 24 hours
4. Outcome is one of: warning issued, content permanently deleted, account suspended, or account terminated

### Illegal Content (CSAM, non-consensual imagery, trafficking)

1. Content is immediately removed and quarantined (not deleted, preserved for law enforcement)
2. The Trust & Safety Lead and Compliance Officer are notified immediately
3. If CSAM is discovered, a report is filed with NCMEC's CyberTipline within 24 hours as required by 18 U.S.C. § 2258A
4. Law enforcement contact is made if directed by legal counsel or required by law
5. The involved creator account is immediately terminated
6. No internal personnel views, copies, or distributes the content beyond what is necessary to make the report

### Non-Consensual Intimate Imagery (NCII)

1. Content is immediately removed upon credible report or internal detection
2. The individual depicted is contacted (if contact information is available) to confirm removal
3. The case is logged and the creator account is reviewed for termination
4. Individuals may submit removal requests via the [Complaints & Content Removal page](https://altyr.com/complaints-content-removal)

### Content Removal Requests from Depicted Individuals

Individuals who appear in content on ALTYR (including former partners, collaborators, or individuals who did not consent to distribution) may request removal by:
- Emailing [support@admin.com](mailto:support@admin.com) with subject "Content Removal Request"
- Using the report form at `/report-problem`

All removal requests are reviewed within **5 business days**. Verified removal requests are actioned within 24 hours of verification.

---

## 7. Offender Management

### Violation Tracking

Every content violation and complaint is recorded in the creator's compliance profile, including:
- Date and type of violation
- Content ID(s) involved
- Action taken
- Reviewing team member

### Escalation Ladder

| Strike Level | Trigger | Action |
|---|---|---|
| **Warning** | First minor policy violation | Written warning by email; violation noted on record |
| **Content suspension** | Second violation within 90 days, or first serious violation | Specific content removed; creator temporarily unable to upload new content pending review |
| **Account suspension** | Third violation within 180 days, or serious/pattern violation | Full account suspended; creator cannot post, earn, or receive new subscribers; review within 5 business days |
| **Account termination** | Illegal content, CSAM, non-consensual imagery, repeat serious violations | Permanent ban; account data retained for legal obligations; all content removed; payout funds may be withheld pending investigation |

### Appeals

Creators who believe a moderation decision was made in error may appeal by emailing [support@admin.com](mailto:support@admin.com) with subject "Moderation Appeal — [Account ID]". Appeals are reviewed by the Trust & Safety Lead within 5 business days. The Lead's decision is final. Appeals do not stay enforcement actions for violations involving illegal content.

---

## 8. User Banning Criteria

The following actions result in **immediate permanent account termination** without prior warning:

- Uploading, sharing, or distributing Child Sexual Abuse Material (CSAM) or content that sexually depicts or exploits minors
- Uploading non-consensual intimate imagery (NCII / "revenge porn")
- Impersonating another creator for the purpose of fraud
- Providing false identification documents during verification
- Facilitating, advertising, or arranging sex trafficking or sexual exploitation through the platform
- Using the platform to solicit or arrange in-person sexual acts for payment
- Attempting to circumvent age verification systems or content review controls
- Repeated (3+) serious content policy violations within any 12-month period

The following actions may result in **suspension or termination** at ALTYR's discretion:

- Repeated minor policy violations
- Chargebacks or payment fraud
- Harassment, threats, or doxxing of other users or creators
- Copyright infringement following a valid DMCA notice and failure to remedy
- Sharing login credentials with unauthorized third parties
- Using automated bots or scrapers on the platform

Terminated accounts may not re-register using the same identity or payment method. Suspected re-registration by a banned user is treated as a new serious violation.

---

## 9. Prevention of Exploitation

ALTYR takes a zero-tolerance stance toward human trafficking, sex trafficking, physical abuse, and prostitution facilitation. The following proactive measures are in place:

### Platform Design Controls
- Content upload is restricted to **verified creators only** — unverified users cannot publish any content
- Direct messaging between users has filters and reporting tools to flag solicitation language
- No classified-style listing features, meetup/escort advertising, or price-per-hour service listings are permitted on the platform
- Any content or profile description that explicitly or implicitly advertises in-person sexual services is immediately removed and results in account termination

### Detection and Monitoring
- Trust & Safety reviewers are trained to recognize trafficking indicators in content and profile descriptions (see Section 3)
- Automated text classifiers scan profile bios, post captions, and messages for language associated with trafficking, solicitation, or coercion
- Reports from users, creators, or third parties alleging trafficking or exploitation are treated as Priority 1 incidents and reviewed within 4 hours

### Reporting
- ALTYR reports confirmed or suspected trafficking to the **National Human Trafficking Hotline** (1-888-373-7888) and/or relevant law enforcement
- ALTYR cooperates fully with law enforcement investigations related to trafficking or exploitation

### Creator Agreements
- All creators sign the [Performer/Creator Agreement](../legal/PERFORMER_CREATOR_AGREEMENT.md) which explicitly prohibits facilitating trafficking, coercion, or prostitution
- Violation of this agreement is grounds for immediate termination and law enforcement referral

---

## 10. Prohibited Marketing & Search Terms

### Policy

ALTYR prohibits the use of any marketing language, advertising copy, meta tags, search engine keywords, or in-platform search terms that:
- Reference, suggest, or allude to minors or underage individuals in a sexual context
- Use terms associated with non-consensual activities
- Reference trafficking, exploitation, or coercion
- Use terms designed to evade content filters (e.g., deliberate misspellings of prohibited terms)

### Enforcement Controls

**Search functionality**  
- ALTYR's internal content search is filtered against a continuously maintained blocklist of prohibited terms
- Searches using prohibited terms return no results and do not log or surface content
- The blocklist is reviewed and updated monthly by the Compliance Officer

**Creator profiles and content descriptions**  
- Profile bios, post titles, and content descriptions are scanned on submission against the prohibited-term blocklist
- Content or profiles matching prohibited terms are held pending review and not published until cleared

**Paid marketing and SEO**  
- All paid advertising campaigns are reviewed by the Compliance Officer before launch
- Keyword lists for any search-engine advertising (Google, Meta, etc.) exclude prohibited terms
- Affiliate and partner marketing materials are approved before use and must comply with this policy
- ALTYR does not engage affiliate traffic sources that market using prohibited terms

**Third-party tags and integrations**  
- Analytics and advertising tags added to the platform are reviewed to ensure they do not insert prohibited search terms or retargeting categories

---

## 11. Streaming Platform Specifics

ALTYR supports live streaming by verified creators. The following controls apply:

### Verified-Only Participation

- Only creators with a `verified_creator` account status may initiate a live stream
- Creators are reminded at stream-start that any individual appearing on stream must be a verified collaborator with a signed model release form on file
- Allowing an unverified individual to appear on a live stream is a serious policy violation (see Section 7)

### Real-Time Monitoring

- All live streams are monitored in real time by the Trust & Safety team during business hours
- After-hours streams are recorded and reviewed within 4 hours of the stream ending before VOD replay is enabled
- Automated content classifiers analyze the live video stream in real time and flag anomalies for immediate human review

### Immediate Termination Capability

- Trust & Safety reviewers have a single-action "terminate stream" control available in the moderation dashboard
- Stream termination disconnects the stream feed and notifies the creator immediately
- Terminated streams are preserved as evidence and cannot be republished by the creator
- The engineering team maintains this control with a target response time of < 60 seconds from decision to stream termination

### Consequences for Violations During Streams

| Violation | Immediate Action | Post-Stream Action |
|---|---|---|
| Unverified individual appears on stream | Stream terminated | Creator suspended pending review |
| Minor appears on stream | Stream terminated; NCMEC report filed | Creator permanently banned; law enforcement referral |
| Illegal activity depicted | Stream terminated | Creator permanently banned; law enforcement referral; content preserved for evidence |
| Policy violation (non-illegal) | Warning issued; stream may continue | Violation recorded; escalation per Section 7 |

### VOD (Video On Demand) from Live Streams

Stream recordings are treated as uploaded video content and follow the full pre-publication review process in Section 2 before they are made available to subscribers as VOD replays.

---

## 12. Content Moderator Training (Reference)

> *This section serves as a training reference supplement. A full training manual is maintained separately and available to Segpay upon request.*

### Onboarding Training Curriculum (New Reviewers)

All new Trust & Safety Reviewers complete the following before handling any live review queue:

| Module | Topics | Duration |
|---|---|---|
| **Platform policies** | ALTYR Terms, prohibited content list, these UGC procedures | 2 hours |
| **Legal requirements** | 18 U.S.C. § 2257 overview, DMCA, NCMEC reporting obligations | 1.5 hours |
| **Age assessment** | Industry best practices for assessing apparent age; escalation when uncertain | 2 hours |
| **CSAM identification & response** | Recognition, immediate response steps, reporting to NCMEC, no internal distribution rule | 1 hour (+ external NCMEC module) |
| **Trafficking indicators** | Language, content patterns, and profile signals associated with trafficking and exploitation | 1.5 hours |
| **Moderation tools** | Review queue system, content status controls, escalation workflow, documentation | 1 hour |
| **Mental health & wellness** | Vicarious trauma awareness, support resources, mandatory break schedules | 1 hour |

### Ongoing Training

- Annual refresher covering policy updates and emerging threat patterns
- Ad-hoc briefings when new prohibited content categories are identified
- Documented completion for all training sessions stored in HR/compliance records

### Reviewer Wellness

Trust & Safety Reviewers are provided access to mental health support resources, are required to take regular breaks from graphic content review, and may rotate to non-graphic moderation tasks when needed.

---

## Appendix A — Key Contacts

| Role | Contact |
|---|---|
| General support / content reports | [support@admin.com](mailto:support@admin.com) |
| Compliance Officer | [support@admin.com](mailto:support@admin.com) |
| NCMEC CyberTipline | [cybertipline.org](https://www.cybertipline.org) / 1-800-843-5678 |
| National Human Trafficking Hotline | 1-888-373-7888 |
| Segpay Merchant Portal | [cs.segpay.com](https://cs.segpay.com) |

---

## Appendix B — Related Documents

| Document | Location |
|---|---|
| Age & Identity Verification Policy | [`docs/legal/AGE_AND_IDENTITY_VERIFICATION_POLICY.md`](../legal/AGE_AND_IDENTITY_VERIFICATION_POLICY.md) |
| Performer/Creator Agreement | [`docs/legal/PERFORMER_CREATOR_AGREEMENT.md`](../legal/PERFORMER_CREATOR_AGREEMENT.md) |
| Complaints & Content Removal Policy | [altyr.com/complaints-content-removal](https://altyr.com/complaints-content-removal) |
| 18 U.S.C. 2257 Statement | [altyr.com/usc2257](https://altyr.com/usc2257) |
| Terms & Conditions | [altyr.com/terms-and-conditions](https://altyr.com/terms-and-conditions) |
| Privacy Policy | [altyr.com/privacy-policy](https://altyr.com/privacy-policy) |

---

## Document Control

| Field | Value |
|---|---|
| Owner | Compliance Officer, ALTYR Inc. |
| Review frequency | Annual (or upon material change to processor requirements) |
| Next scheduled review | March 1, 2027 |
| Distribution | Internal compliance team; provided to Segpay upon request |
| Classification | Confidential — not for public distribution |
