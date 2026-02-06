(function () {
  var API_BASE = window.REDIRECT_API_BASE || '';
  if (!API_BASE && window.location.hostname === 'localhost') {
    API_BASE = 'http://localhost:3000/v1';
  }

  function getSlugFromPath() {
    var path = window.location.pathname;
    var match = path.match(/^\/g\/([^/]+)/);
    return match ? match[1] : null;
  }

  function show(id) {
    document.querySelectorAll('.screen').forEach(function (el) {
      el.classList.add('hidden');
    });
    var el = document.getElementById(id);
    if (el) el.classList.remove('hidden');
  }

  function resolve(slug) {
    return fetch(API_BASE + '/redirect-links/resolve/' + encodeURIComponent(slug), {
      method: 'GET',
      headers: { Accept: 'application/json' }
    }).then(function (res) {
      if (!res.ok) throw new Error('Resolve failed');
      return res.json();
    });
  }

  function recordClick(slug, choice) {
    return fetch(API_BASE + '/redirect-links/record-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: slug, choice: choice })
    });
  }

  function redirect(url) {
    window.location.href = url;
  }

  function run() {
    var slug = getSlugFromPath();
    if (!slug) {
      show('error');
      return;
    }

    resolve(slug)
      .then(function (data) {
        show('choice');
        var onlyfansUrl = data.onlyfansUrl;
        var altyrUrl = data.altyrUrl;

        document.getElementById('btn-onlyfans').onclick = function () {
          recordClick(slug, 'onlyfans').then(function () {
            redirect(onlyfansUrl);
          }).catch(function () {
            redirect(onlyfansUrl);
          });
        };

        document.getElementById('btn-altyr').onclick = function () {
          recordClick(slug, 'altyr').then(function () {
            redirect(altyrUrl);
          }).catch(function () {
            redirect(altyrUrl);
          });
        };
      })
      .catch(function () {
        show('error');
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
