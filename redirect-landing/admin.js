(function () {
  var API_BASE_KEY   = 'redirect_admin_api_base';
  var BASIC_PASS_KEY = 'redirect_admin_basic_pass';
  var PROXY_BASE_KEY = 'redirect_admin_proxy_base';

  var DEFAULT_BASIC_PASS = 'admin@altyr.com';   // gateway Basic-auth password
  var BASIC_USER         = 'altyr';
  var DEFAULT_PROXY_BASE = 'https://altyr.com/go/';

  function getApiBase() {
    var el = document.getElementById('apiBase');
    return (el && el.value.trim()) || sessionStorage.getItem(API_BASE_KEY) || '';
  }

  function getBasicPass() {
    var el = document.getElementById('token');
    return (el && el.value.trim()) || sessionStorage.getItem(BASIC_PASS_KEY) || DEFAULT_BASIC_PASS;
  }

  function getProxyBase() {
    var el = document.getElementById('proxyBase');
    return (el && el.value.trim()) || sessionStorage.getItem(PROXY_BASE_KEY) || DEFAULT_PROXY_BASE;
  }

  function basicAuthHeader() {
    return 'Basic ' + btoa(BASIC_USER + ':' + getBasicPass());
  }

  function setStored() {
    var base      = document.getElementById('apiBase');
    var pass      = document.getElementById('token');
    var proxyBase = document.getElementById('proxyBase');
    if (base      && base.value.trim())      sessionStorage.setItem(API_BASE_KEY,   base.value.trim());
    if (pass      && pass.value.trim())      sessionStorage.setItem(BASIC_PASS_KEY, pass.value.trim());
    if (proxyBase && proxyBase.value.trim()) sessionStorage.setItem(PROXY_BASE_KEY, proxyBase.value.trim());
  }

  function showMessage(id, text, isError) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = text;
    el.className = 'message ' + (isError ? 'error' : 'success');
    el.classList.remove('hidden');
  }

  function hideMessage(id) {
    var el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  }

  function showResult(id, html) {
    var el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = html;
    el.classList.remove('hidden');
  }

  function hideResult(id) {
    var el = document.getElementById(id);
    if (el) { el.innerHTML = ''; el.classList.add('hidden'); }
  }

  // ── Create ──────────────────────────────────────────────────────────────────
  document.getElementById('btnCreate').addEventListener('click', function () {
    var apiBase     = getApiBase();
    var creatorName = document.getElementById('creatorName').value.trim();
    var onlyfansUrl = document.getElementById('onlyfansUrl').value.trim();
    var proxyBase   = getProxyBase().replace(/\/$/, '') + '/';

    hideMessage('createMessage');
    hideResult('createResult');

    if (!apiBase) {
      showMessage('createMessage', 'Set API base URL first.', true);
      return;
    }
    if (!onlyfansUrl) {
      showMessage('createMessage', 'OnlyFans URL is required.', true);
      return;
    }

    setStored();

    // Uses the gateway-Basic-auth endpoint — no JWT needed.
    fetch(apiBase.replace(/\/$/, '') + '/redirect-links/simple', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': basicAuthHeader()
      },
      body: JSON.stringify({
        onlyfansUrl: onlyfansUrl,
        creatorName: creatorName || undefined
      })
    })
      .then(function (res) {
        return res.json().then(function (body) {
          if (!res.ok) throw new Error(body.message || res.statusText);
          return body;
        });
      })
      .then(function (body) {
        var slug     = body.data.slug;
        var fullUrl  = proxyBase + slug;
        showMessage('createMessage', 'Link created.', false);
        showResult('createResult',
          'Proxy URL: <a href="' + fullUrl + '" target="_blank" rel="noopener">' + fullUrl + '</a>'
        );
        document.getElementById('onlyfansUrl').value = '';
        if (document.getElementById('creatorName')) {
          document.getElementById('creatorName').value = '';
        }
        loadList();
      })
      .catch(function (err) {
        showMessage('createMessage', err.message || 'Create failed.', true);
      });
  });

  // ── List ────────────────────────────────────────────────────────────────────
  function loadList() {
    var apiBase    = getApiBase();
    var proxyBase  = getProxyBase().replace(/\/$/, '') + '/';
    var listResult = document.getElementById('listResult');

    listResult.innerHTML = '';
    hideMessage('listMessage');

    if (!apiBase) {
      listResult.innerHTML = '<p class="text-muted">Set API base URL, then click Refresh list.</p>';
      return;
    }

    setStored();

    // Uses the gateway-Basic-auth endpoint — no JWT needed.
    fetch(apiBase.replace(/\/$/, '') + '/redirect-links/simple?skip=0&limit=50', {
      method: 'GET',
      headers: { 'Authorization': basicAuthHeader() }
    })
      .then(function (res) {
        return res.json().then(function (body) {
          if (!res.ok) throw new Error(body.message || res.statusText);
          return body;
        });
      })
      .then(function (body) {
        // Response shape: { data: { links: [...], total, skip, limit } }
        var links = body.data && body.data.links;
        if (!links || links.length === 0) {
          listResult.innerHTML = '<p class="text-muted">No links yet. Create one above.</p>';
          return;
        }
        var html = '';
        links.forEach(function (link) {
          var fullUrl = proxyBase + link.slug;
          html += '<div class="link-row">';
          html += '<span class="slug">' + link.slug + '</span>';
          html += ' — <span class="url">' + (link.onlyfansUrl || '') + '</span>';
          html += '<br /><a href="' + fullUrl + '" target="_blank" rel="noopener">' + fullUrl + '</a>';
          if (link.clicks) html += ' &nbsp;·&nbsp; ' + link.clicks + ' click' + (link.clicks === 1 ? '' : 's');
          html += '</div>';
        });
        listResult.innerHTML = html;
      })
      .catch(function (err) {
        showMessage('listMessage', err.message || 'List failed.', true);
        listResult.innerHTML = '';
      });
  }

  document.getElementById('btnList').addEventListener('click', loadList);

  // ── Restore stored values ────────────────────────────────────────────────────
  if (document.getElementById('apiBase')) {
    document.getElementById('apiBase').value =
      sessionStorage.getItem(API_BASE_KEY) || window.REDIRECT_API_BASE || '';
  }
  if (document.getElementById('token')) {
    document.getElementById('token').value =
      sessionStorage.getItem(BASIC_PASS_KEY) || DEFAULT_BASIC_PASS;
  }
  if (document.getElementById('proxyBase')) {
    document.getElementById('proxyBase').value =
      sessionStorage.getItem(PROXY_BASE_KEY) || DEFAULT_PROXY_BASE;
  }

  loadList();
})();
