(function () {
  var API_BASE_KEY = 'redirect_admin_api_base';
  var TOKEN_KEY = 'redirect_admin_token';

  function getApiBase() {
    var el = document.getElementById('apiBase');
    return (el && el.value.trim()) || sessionStorage.getItem(API_BASE_KEY) || window.REDIRECT_API_BASE || '';
  }

  function getToken() {
    var el = document.getElementById('token');
    return (el && el.value.trim()) || sessionStorage.getItem(TOKEN_KEY) || '';
  }

  function setStored() {
    var base = document.getElementById('apiBase');
    var token = document.getElementById('token');
    if (base && base.value.trim()) sessionStorage.setItem(API_BASE_KEY, base.value.trim());
    if (token && token.value.trim()) sessionStorage.setItem(TOKEN_KEY, token.value.trim());
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
    var token = getToken();
    var creatorName = document.getElementById('creatorName').value.trim();
    var onlyfansUrl = document.getElementById('onlyfansUrl').value.trim();

    hideMessage('createMessage');
    hideResult('createResult');

    if (!apiBase) {
      showMessage('createMessage', 'Set API base URL.', true);
      return;
    }
    if (!token) {
      showMessage('createMessage', 'Set Authorization token (JWT) to create links.', true);
      return;
    }
    if (!onlyfansUrl) {
      showMessage('createMessage', 'OnlyFans URL is required.', true);
      return;
    }

    setStored();

    fetch(apiBase.replace(/\/$/, '') + '/redirect-links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token.startsWith('Bearer ') ? token : 'Bearer ' + token
      },
      body: JSON.stringify({
        creatorName: creatorName || undefined,
        onlyfansUrl: onlyfansUrl
      })
    })
      .then(function (res) {
        return res.json().then(function (data) {
          if (!res.ok) throw new Error(data.message || res.statusText);
          return data;
        });
      })
      .then(function (data) {
        showMessage('createMessage', 'Link created.', false);
        showResult('createResult', 'Proxy URL: <a href="' + data.proxyUrl + '" target="_blank" rel="noopener">' + data.proxyUrl + '</a>');
        document.getElementById('onlyfansUrl').value = '';
        loadList();
      })
      .catch(function (err) {
        showMessage('createMessage', err.message || 'Create failed.', true);
      });
  });

  function loadList() {
    var apiBase = getApiBase();
    var token = getToken();
    var listResult = document.getElementById('listResult');
    var listMessage = document.getElementById('listMessage');

    listResult.innerHTML = '';
    hideMessage('listMessage');

    if (!apiBase || !token) {
      listResult.innerHTML = '<p class="text-muted">Set API base and token, then click Refresh list.</p>';
      return;
    }

    setStored();

    fetch(apiBase.replace(/\/$/, '') + '/redirect-links?skip=0&limit=50', {
      method: 'GET',
      headers: {
        'Authorization': token.startsWith('Bearer ') ? token : 'Bearer ' + token
      }
    })
      .then(function (res) {
        return res.json().then(function (data) {
          if (!res.ok) throw new Error(data.message || res.statusText);
          return data;
        });
      })
      .then(function (data) {
        if (!data.data || data.data.length === 0) {
          listResult.innerHTML = '<p class="text-muted">No links yet. Create one above.</p>';
          return;
        }
        var html = '';
        data.data.forEach(function (link) {
          html += '<div class="link-row">';
          html += '<span class="slug">' + link.slug + '</span>';
          if (link.creatorName) html += ' — ' + link.creatorName;
          html += '<br /><a href="' + link.proxyUrl + '" target="_blank" rel="noopener">' + link.proxyUrl + '</a>';
          html += '<br /><span class="url">OF: ' + link.onlyfansUrl + '</span>';
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

  if (document.getElementById('apiBase')) {
    document.getElementById('apiBase').value = sessionStorage.getItem(API_BASE_KEY) || window.REDIRECT_API_BASE || '';
  }
  if (document.getElementById('token')) {
    document.getElementById('token').value = sessionStorage.getItem(TOKEN_KEY) || '';
  }
  loadList();
})();
