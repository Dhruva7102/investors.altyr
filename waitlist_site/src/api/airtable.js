// Airtable API client for storing waitlist emails
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;

// Table IDs
const CREATORS_TABLE_ID = 'tblTYUu6019qDOoSQ';
const FANS_TABLE_ID = 'tblgZjlVJQowsWLWf';

// Field IDs for Creators table
const CREATORS_EMAIL_FIELD_ID = 'fldZv1kaQxw33TMgS'; // Emails (primary)
const CREATORS_PHONE_FIELD_ID = 'fld1vqZScSirZsi5U'; // Phone number
const CREATORS_X_FIELD_ID = 'fldrBclz4LVKRnHpz'; // X.com

// Field IDs for Fans table
const FANS_EMAIL_FIELD_ID = 'fldQLgyoC0iYySj0w'; // Email (primary)

/**
 * Create a record in Airtable
 * @param {string} tableId - The Airtable table ID
 * @param {Object} fields - The fields to create using field IDs as keys
 * @returns {Promise<Object>} The created record
 */
export async function createAirtableRecord(tableId, fields) {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.error('Airtable configuration missing:', {
      hasApiKey: !!AIRTABLE_API_KEY,
      hasBaseId: !!AIRTABLE_BASE_ID,
      tableId: tableId
    });
    throw new Error('Airtable API credentials are not configured');
  }

  // Clean up fields - remove undefined values and ensure proper structure
  const cleanFields = Object.entries(fields).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      acc[key] = value;
    }
    return acc;
  }, {});

  const apiUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableId}`;

  console.log('Sending to Airtable:', {
    url: apiUrl,
    fields: cleanFields
  });

  const response = await fetch(apiUrl, {
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
      url: apiUrl
    });
    throw new Error(errorMessage);
  }

  const result = await response.json();
  console.log('Airtable success:', result);
  return result;
}

/**
 * Store waitlist data to Airtable
 * @param {Object} data - The data to store
 * @param {string} data.email - Email address (optional for creators, required for fans)
 * @param {string} data.phone - Phone number (optional, creators only)
 * @param {string} data.xHandle - X.com handle (optional, creators only)
 * @param {string} type - The type ('creator' or 'fan')
 * @returns {Promise<Object>} The created record
 */
export async function storeWaitlistEmail(data, type = 'fan') {
  if (type === 'creator') {
    // For creators: store in Creators table with email, phone, and X handle
    const fields = {};
    
    if (data.email) {
      fields[CREATORS_EMAIL_FIELD_ID] = data.email;
    }
    if (data.phone) {
      fields[CREATORS_PHONE_FIELD_ID] = data.phone;
    }
    if (data.xHandle) {
      fields[CREATORS_X_FIELD_ID] = data.xHandle;
    }
    
    // At least one field must be provided
    if (Object.keys(fields).length === 0) {
      throw new Error('At least one field (email, phone, or X handle) must be provided');
    }
    
    return createAirtableRecord(CREATORS_TABLE_ID, fields);
  } else {
    // For fans: store in Fans table with email only
    if (!data.email) {
      throw new Error('Email is required for fan signup');
    }
    
    const fields = {
      [FANS_EMAIL_FIELD_ID]: data.email
    };
    
    return createAirtableRecord(FANS_TABLE_ID, fields);
  }
}

