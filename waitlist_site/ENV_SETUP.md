# Environment Variables for Waitlist Site

## Required Environment Variables

Add these to your Vercel project settings (Settings → Environment Variables):

### Airtable Configuration
- **VITE_AIRTABLE_API_KEY**: Your Airtable Personal Access Token (starts with `pat...`)
- **VITE_AIRTABLE_BASE_ID**: Your Airtable Base ID (starts with `app...`)

## Airtable Table Structure

The waitlist site uses two separate Airtable tables:

### Creators Table
- **Table ID**: `tblTYUu6019qDOoSQ`
- **Table Name**: Creators
- **Fields**:
  - **Emails** (primary): Field ID `fldZv1kaQxw33TMgS` - Optional
  - **Phone number**: Field ID `fld1vqZScSirZsi5U` - Optional
  - **X.com**: Field ID `fldrBclz4LVKRnHpz` - Optional
  - At least one field must be provided

### Fans Table
- **Table ID**: `tblgZjlVJQowsWLWf`
- **Table Name**: Fans
- **Fields**:
  - **Email** (primary): Field ID `fldQLgyoC0iYySj0w` - Required

## Setup in Vercel

1. Go to your Vercel project
2. Navigate to Settings → Environment Variables
3. Add each variable above
4. Select all environments (Production, Preview, Development)
5. Redeploy your site

