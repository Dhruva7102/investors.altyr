# Airtable Integration Test App

Quick throwaway app to verify **Airtable** integration works before adding it to the main investor site.

## What it does

- Fetches **creator records** from your Airtable base
- Displays **X.com handles**, emails, and phone numbers
- Shows stats (total creators, how many have X handles, etc.)
- Displays raw JSON response for debugging

## How to run

### 1. Start the proxy server

From the project root:

```bash
cd test-x-api
node server.js
```

This starts a local proxy on `http://localhost:8787` to avoid CORS issues.

### 2. Open the UI

Open `test-x-api/index.html` in your browser.

### 3. Test the integration

The form is pre-filled with your Airtable credentials:
- API Key: `patp3YH0tUQ1hKuNL...`
- Base ID: `appv5KPKpVtQm3MbE`
- Table ID: `tblTYUu6019qDOoSQ` (Creators table)

Click **Fetch Creators** to pull all creator records.

## What you'll see

- **Total Creators**: Number of records in the table
- **With X Handle**: How many have the `X.com` field filled
- **With Email**: How many have the `Emails` field filled
- **Creator cards**: Grid showing each creator's data
- **Raw JSON**: Expandable section with the full API response

## Airtable Schema

### Creators Table (`tblTYUu6019qDOoSQ`)

Fields:
- **X.com** (field ID: `fldrBclz4LVKRnHpz`) - X/Twitter handle
- **Emails** (field ID: `fldZv1kaQxw33TMgS`) - Email address
- **Phone number** (field ID: `fld1vqZScSirZsi5U`) - Phone number

## Cleanup

When done testing, you can delete this entire `test-x-api/` directory.

```bash
cd ..
rm -rf test-x-api/
```
