/* Age gate. Resolves the destination only after a real tap, then hands off. */
(function () {
  'use strict';

  var cfg = window.VV || {};
  var btn = document.getElementById('go');
  var label = document.getElementById('go-label');
  var fine = document.getElementById('fine');

  if (!btn) return;

  function destination() {
    try {
      var url = atob(cfg.vip || '');
      // Only ever hand off to an absolute http(s) URL.
      return /^https?:\/\//i.test(url) ? url : '';
    } catch (err) {
      return '';
    }
  }

  btn.addEventListener('click', function () {
    var url = destination();

    if (!url) {
      if (fine) fine.textContent = 'That link is temporarily unavailable — please try again shortly.';
      return;
    }

    btn.setAttribute('aria-busy', 'true');
    if (label) label.textContent = 'Taking you there';

    var spinner = document.createElement('span');
    spinner.className = 'spinner';
    btn.appendChild(spinner);

    // replace() so the gate doesn't sit in history behind them.
    window.setTimeout(function () {
      window.location.replace(url);
    }, typeof cfg.handoffMs === 'number' ? cfg.handoffMs : 450);
  });
})();
