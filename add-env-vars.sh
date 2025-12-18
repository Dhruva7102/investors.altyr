#!/bin/bash
# Script to add Airtable environment variables to Vercel
# Run this script and it will prompt for each value

echo "Adding VITE_AIRTABLE_API_KEY for production..."
vercel env add VITE_AIRTABLE_API_KEY production

echo "Adding VITE_AIRTABLE_BASE_ID for production..."
vercel env add VITE_AIRTABLE_BASE_ID production

echo "Adding VITE_AIRTABLE_TABLE_NAME for production..."
vercel env add VITE_AIRTABLE_TABLE_NAME production

echo "Adding VITE_AIRTABLE_API_KEY for preview..."
vercel env add VITE_AIRTABLE_API_KEY preview

echo "Adding VITE_AIRTABLE_BASE_ID for preview..."
vercel env add VITE_AIRTABLE_BASE_ID preview

echo "Adding VITE_AIRTABLE_TABLE_NAME for preview..."
vercel env add VITE_AIRTABLE_TABLE_NAME preview

echo "Done! Check with: vercel env ls"

