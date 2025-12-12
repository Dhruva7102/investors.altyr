# Environment Variables for Waitlist Site

## Required Environment Variables

Add these to your Vercel project settings (Settings → Environment Variables):

### Airtable Configuration
- **VITE_AIRTABLE_API_KEY**: Your Airtable Personal Access Token (starts with `pat...`)
- **VITE_AIRTABLE_BASE_ID**: Your Airtable Base ID (starts with `app...`)
- **VITE_AIRTABLE_TABLE_NAME**: `Emails` (optional, defaults to "Emails")

## Airtable Table Structure

Make sure your Airtable table "Emails" has these fields:
- **Email** (Single line text) - Required
- **Type** (Single line text) - e.g., "creator", "fan", "waitlist"
- **Created** (Date/Time) - Optional, auto-populated

## Setup in Vercel

1. Go to your Vercel project
2. Navigate to Settings → Environment Variables
3. Add each variable above
4. Select all environments (Production, Preview, Development)
5. Redeploy your site

