/* Second River Games — mobile navigation.
   The site's other script is reveal.js, which loads on the three hero pages.
   Everything else is CSS. */
(function () {
  'use strict';

  var nav = document.querySelector('[data-nav]');
  if (!nav) return;

  var toggle = nav.querySelector('[data-nav-toggle]');
  var menu = nav.querySelector('[data-nav-menu]');
  if (!toggle || !menu) return;

  function setOpen(open) {
    nav.setAttribute('data-open', open ? 'true' : 'false');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function close(returnFocus) {
    if (nav.getAttribute('data-open') !== 'true') return;
    setOpen(false);
    if (returnFocus) toggle.focus();
  }

  setOpen(false);

  toggle.addEventListener('click', function () {
    setOpen(nav.getAttribute('data-open') !== 'true');
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close(true);
  });

  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target)) close(false);
  });

  // Leaving the menu by keyboard should close it behind you.
  nav.addEventListener('focusout', function (e) {
    if (!nav.contains(e.relatedTarget)) close(false);
  });

  // The menu is only a panel below 860px (matching the CSS breakpoint); above
  // that it is always visible, so drop the open state rather than leaving a
  // stale attribute behind.
  var wide = window.matchMedia('(min-width: 861px)');
  var onChange = function (e) { if (e.matches) setOpen(false); };
  if (wide.addEventListener) wide.addEventListener('change', onChange);
  else wide.addListener(onChange);
})();
