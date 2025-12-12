// Airtable API client for storing waitlist emails
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME || 'Emails';

const AIRTABLE_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

/**
 * Create a record in Airtable
 * @param {Object} fields - The fields to create (e.g., { Email: "test@example.com", Type: "creator" })
 * @returns {Promise<Object>} The created record
 */
export async function createAirtableRecord(fields) {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    throw new Error('Airtable API credentials are not configured');
  }

  const response = await fetch(AIRTABLE_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        Email: fields.email || fields.Email,
        Type: fields.type || fields.Type || 'waitlist',
        ...fields
      }
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error?.message || `Airtable API error: ${response.status}`);
  }

  return await response.json();
}

/**
 * Store waitlist email to Airtable
 * @param {string} email - The email address
 * @param {string} type - The type (creator, fan, etc.)
 * @returns {Promise<Object>} The created record
 */
export async function storeWaitlistEmail(email, type = 'waitlist') {
  return createAirtableRecord({
    Email: email,
    Type: type,
    Created: new Date().toISOString()
  });
}

