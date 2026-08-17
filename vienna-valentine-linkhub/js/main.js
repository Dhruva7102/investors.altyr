/* Landing page behaviour: staggered entrance, avatar fallback, year stamp. */
(function () {
  'use strict';

  var doc = document;

  // Feed each .reveal element its stagger index as a custom property.
  var revealed = doc.querySelectorAll('.reveal');
  for (var i = 0; i < revealed.length; i++) {
    var step = revealed[i].getAttribute('data-i');
    revealed[i].style.setProperty('--i', step === null ? i : step);
  }

  // Hide the photo if it hasn't been added yet — the monogram sits behind it.
  var avatar = doc.querySelector('[data-fallback]');
  if (avatar) {
    var drop = function () { avatar.classList.add('is-hidden'); };
    avatar.addEventListener('error', drop);
    // The error may already have fired before this script ran.
    if (avatar.complete && avatar.naturalWidth === 0) drop();
  }

  var year = doc.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  // Kick off the entrance on the next frame so the styles are settled first.
  requestAnimationFrame(function () {
    doc.body.classList.add('ready');
  });
})();
