/**
 * Simple proxy server for Airtable API testing
 * Avoids CORS issues when testing locally
 */

const http = require('http');
const https = require('https');
const url = require('url');

const PORT = 8787;

const server = http.createServer(async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Health check
  if (pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }));
    return;
  }

  // Airtable proxy endpoint
  if (pathname === '/airtable' && req.method === 'GET') {
    const { baseId, tableId } = parsedUrl.query;
    
    if (!baseId || !tableId) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        error: 'Missing required parameters: baseId and tableId' 
      }));
      return;
    }

    // Get Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing Authorization header' }));
      return;
    }

    // Proxy request to Airtable
    const airtableUrl = `https://api.airtable.com/v0/${baseId}/${tableId}`;
    
    console.log(`[airtable] Fetching from: ${airtableUrl}`);

    const options = {
      hostname: 'api.airtable.com',
      path: `/v0/${baseId}/${tableId}`,
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'User-Agent': 'Altyr-Test-App/1.0'
      }
    };

    const proxyReq = https.request(options, (proxyRes) => {
      let data = '';

      proxyRes.on('data', (chunk) => {
        data += chunk;
      });

      proxyRes.on('end', () => {
        console.log(`[airtable] Response status: ${proxyRes.statusCode}`);
        
        res.writeHead(proxyRes.statusCode, { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });

        try {
          const parsed = JSON.parse(data);
          
          if (proxyRes.statusCode === 200) {
            console.log(`[airtable] Success! Found ${parsed.records?.length || 0} records`);
          } else {
            console.error(`[airtable] Error:`, parsed);
          }
          
          res.end(data);
        } catch (err) {
          console.error(`[airtable] JSON parse error:`, err);
          res.end(data);
        }
      });
    });

    proxyReq.on('error', (err) => {
      console.error(`[airtable] Request error:`, err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        error: 'Proxy request failed',
        details: err.message 
      }));
    });

    proxyReq.end();
    return;
  }

  // Default 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ 
    error: 'Not found',
    endpoints: {
      '/health': 'Health check',
      '/airtable?baseId=...&tableId=...': 'Fetch Airtable records (requires Authorization header)'
    }
  }));
});

server.listen(PORT, () => {
  console.log(`[airtable-test] proxy running on http://localhost:${PORT}`);
  console.log(`[airtable-test] endpoints:`);
  console.log(`  GET /health`);
  console.log(`  GET /airtable?baseId=...&tableId=...`);
  console.log('');
  console.log('Open test-x-api/index.html in your browser to test');
});
