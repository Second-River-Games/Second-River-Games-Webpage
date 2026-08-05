/* Second River Games — one-shot scroll reveal (cinematic concept).
   Sections fade and translate up gently as they enter the viewport. Once only,
   no scroll-jacking.

   Elements are marked [data-reveal="pending"] by this script rather than in the
   HTML, so anyone without JS gets the content plainly visible instead of a page
   of invisible sections. */
(function () {
  'use strict';

  var targets = document.querySelectorAll('[data-reveal-on-scroll]');
  if (!targets.length) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches || !('IntersectionObserver' in window)) return;

  Array.prototype.forEach.call(targets, function (el) {
    el.setAttribute('data-reveal', 'pending');
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.setAttribute('data-reveal', 'shown');
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });

  Array.prototype.forEach.call(targets, function (el) { io.observe(el); });

  // If the user switches on reduced motion mid-visit, stop hiding anything.
  var onChange = function (e) {
    if (!e.matches) return;
    io.disconnect();
    Array.prototype.forEach.call(targets, function (el) {
      el.setAttribute('data-reveal', 'shown');
    });
  };
  if (reduced.addEventListener) reduced.addEventListener('change', onChange);
  else if (reduced.addListener) reduced.addListener(onChange);
})();
