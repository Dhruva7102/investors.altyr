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
    console.error('Airtable configuration missing:', {
      hasApiKey: !!AIRTABLE_API_KEY,
      hasBaseId: !!AIRTABLE_BASE_ID,
      tableName: AIRTABLE_TABLE_NAME
    });
    throw new Error('Airtable API credentials are not configured');
  }

  // Clean up fields - remove undefined values and ensure proper structure
  const cleanFields = Object.entries(fields).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      acc[key] = value;
    }
    return acc;
  }, {});

  console.log('Sending to Airtable:', {
    url: AIRTABLE_API_URL,
    fields: cleanFields
  });

  const response = await fetch(AIRTABLE_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: cleanFields
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    const errorMessage = errorData.error?.message || errorData.message || `Airtable API error: ${response.status}`;
    console.error('Airtable API Error:', {
      status: response.status,
      statusText: response.statusText,
      error: errorData,
      url: AIRTABLE_API_URL
    });
    throw new Error(errorMessage);
  }

  const result = await response.json();
  console.log('Airtable success:', result);
  return result;
}

/**
 * Store waitlist email/phone to Airtable
 * @param {string} contact - The email address or phone number
 * @param {string} type - The type (creator, fan, etc.)
 * @returns {Promise<Object>} The created record
 */
export async function storeWaitlistEmail(contact, type = 'waitlist') {
  // Airtable table has "Creators" and "Fans" fields, not "Email" and "Type"
  // Map the type to the correct field name
  const fields = {};
  
  if (type === 'creator' || type === 'Creators') {
    fields.Creators = contact;
  } else {
    // For 'fan', 'waitlist', or any other type, store in Fans field
    fields.Fans = contact;
  }
  
  return createAirtableRecord(fields);
}

