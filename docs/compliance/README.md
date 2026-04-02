# ALTYR Compliance Documents

This folder contains internal procedure and policy documents prepared for payment processor compliance (Segpay Adult Content Due Diligence).

## Files

| File | Description | Submitted to |
|------|-------------|--------------|
| `UGC_PROCEDURES.md` | User-Generated Content Policies & Procedures — covers all 12 required topics from Segpay's Procedure Document Requirements table | Segpay (upon request) |

## Related documents (in `../legal/`)

| File | Description |
|------|-------------|
| `AGE_AND_IDENTITY_VERIFICATION_POLICY.md` | Age & identity verification policy for creators and performers |
| `PERFORMER_CREATOR_AGREEMENT.md` | Creator agreement (contract between platform and creators) |

## Submitting to Segpay

These documents can be submitted as PDF attachments through the Segpay Merchant Portal or via the compliance team contact.

### Convert to PDF

```bash
# Using pandoc
pandoc docs/compliance/UGC_PROCEDURES.md -o UGC_PROCEDURES.pdf

# Using npm
npx md-to-pdf docs/compliance/UGC_PROCEDURES.md
```

## Ongoing Reporting (ALTYR-82)

Per Segpay requirements, a monthly **Website Compliance Violations** report must be submitted through the Segpay Merchant Portal. Responsibility: Compliance Officer.
