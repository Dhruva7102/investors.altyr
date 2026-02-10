(function () {
  var API_BASE_KEY = 'redirect_admin_api_base';
  var SECRET_KEY = 'redirect_admin_secret';

  function getApiBase() {
    var el = document.getElementById('apiBase');
    var defaultBase = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? 'http://localhost:3000/v1'
      : ''; // Production: no same-origin API; user must set node-service URL in Settings
    return (el && el.value.trim()) || sessionStorage.getItem(API_BASE_KEY) || window.REDIRECT_API_BASE || defaultBase;
  }

  function getSecret() {
    var el = document.getElementById('adminSecret');
    return (el && el.value.trim()) || sessionStorage.getItem(SECRET_KEY) || '';
  }

  function setStored() {
    var base = document.getElementById('apiBase');
    var secret = document.getElementById('adminSecret');
    if (base && base.value.trim()) sessionStorage.setItem(API_BASE_KEY, base.value.trim());
    if (secret && secret.value.trim()) sessionStorage.setItem(SECRET_KEY, secret.value.trim());
  }

  function headers() {
    var h = { 'Content-Type': 'application/json' };
    var secret = getSecret();
    if (secret) h['X-Redirect-Admin-Secret'] = secret;
    return h;
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

  document.getElementById('btnCreate').addEventListener('click', function () {
    var apiBase = getApiBase();
    var onlyfansUrl = document.getElementById('onlyfansUrl').value.trim();
    var altyrUrl = document.getElementById('altyrUrl').value.trim();

    hideMessage('createMessage');
    hideResult('createResult');

    if (!apiBase) {
      showMessage('createMessage', 'Set API base URL in Settings.', true);
      return;
    }
    if (!onlyfansUrl) {
      showMessage('createMessage', 'OnlyFans URL is required.', true);
      return;
    }
    if (window.location.protocol === 'https:' && apiBase.indexOf('http://') === 0) {
      showMessage('createMessage', 'Mixed content: this page is HTTPS but the API URL is HTTP. Browsers block that. Use this admin from an HTTP page (e.g. http://localhost:5173/admin.html) or use an HTTPS API URL.', true);
      return;
    }

    setStored();

    var body = { onlyfansUrl: onlyfansUrl };
    if (altyrUrl) body.altyrUrl = altyrUrl;

    fetch(apiBase.replace(/\/$/, '') + '/redirect-links/simple', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(body)
    })
      .then(function (res) {
        return res.text().then(function (text) {
          var ct = res.headers.get('content-type');
          if (!ct || ct.indexOf('application/json') === -1) {
            var preview = text.slice(0, 80).replace(/</g, '&lt;');
            throw new Error('Server returned non-JSON (status ' + res.status + '). Preview: ' + (preview || '(empty)') + '. Set API base in Settings to the node-service that has redirect-links (not the waitlist URL).');
          }
          try {
            var data = JSON.parse(text);
            if (!res.ok) throw new Error(data.message || res.statusText);
            return data;
          } catch (e) {
            var preview = text.slice(0, 80).replace(/</g, '&lt;');
            throw new Error('Invalid JSON from server. Preview: ' + preview + '. Wrong API base URL?');
          }
        });
      })
      .then(function (data) {
        showMessage('createMessage', 'Link created.', false);
        showResult('createResult', 'Proxy URL: <a href="' + data.proxyUrl + '" target="_blank" rel="noopener">' + data.proxyUrl + '</a>');
        document.getElementById('onlyfansUrl').value = '';
        document.getElementById('altyrUrl').value = '';
        loadList();
      })
      .catch(function (err) {
        showMessage('createMessage', err.message || 'Create failed.', true);
      });
  });

  function loadList() {
    var apiBase = getApiBase();
    var listResult = document.getElementById('listResult');
    var listMessage = document.getElementById('listMessage');

    listResult.innerHTML = '';
    hideMessage('listMessage');

    if (!apiBase) {
      listResult.innerHTML = '<p class="url">Set API base in Settings, then click Refresh list.</p>';
      return;
    }

    setStored();

    fetch(apiBase.replace(/\/$/, '') + '/redirect-links/simple?skip=0&limit=50', {
      method: 'GET',
      headers: headers()
    })
      .then(function (res) {
        return res.text().then(function (text) {
          var ct = res.headers.get('content-type');
          if (!ct || ct.indexOf('application/json') === -1) {
            var preview = text.slice(0, 80).replace(/</g, '&lt;');
            throw new Error('Server returned non-JSON (status ' + res.status + '). Preview: ' + (preview || '(empty)') + '. Set API base to the node-service that has redirect-links.');
          }
          try {
            var data = JSON.parse(text);
            if (!res.ok) throw new Error(data.message || res.statusText);
            return data;
          } catch (e) {
            var preview = text.slice(0, 80).replace(/</g, '&lt;');
            throw new Error('Invalid JSON from server. Preview: ' + preview + '. Wrong API base URL?');
          }
        });
      })
      .then(function (data) {
        if (!data.data || data.data.length === 0) {
          listResult.innerHTML = '<p class="url">No links yet. Create one above.</p>';
          return;
        }
        var html = '';
        data.data.forEach(function (link) {
          html += '<div class="link-row">';
          html += '<span class="slug">' + link.slug + '</span>';
          if (link.creatorName) html += ' — ' + link.creatorName;
          html += '<br /><a href="' + link.proxyUrl + '" target="_blank" rel="noopener">' + link.proxyUrl + '</a>';
          html += '<br /><span class="url">OF: ' + link.onlyfansUrl + '</span>';
          if (link.altyrUrl) html += '<br /><span class="url">Altyr: ' + link.altyrUrl + '</span>';
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

  document.getElementById('toggleSettings').addEventListener('click', function () {
    var panel = document.getElementById('settingsPanel');
    panel.classList.toggle('hidden');
  });

  var defaultBase = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:3000/v1'
    : '';
  var apiBaseEl = document.getElementById('apiBase');
  if (apiBaseEl) {
    apiBaseEl.value = sessionStorage.getItem(API_BASE_KEY) || window.REDIRECT_API_BASE || defaultBase;
  }
  var secretEl = document.getElementById('adminSecret');
  if (secretEl) {
    secretEl.value = sessionStorage.getItem(SECRET_KEY) || '';
  }
  loadList();
})();
