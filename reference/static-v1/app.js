/* K. Pomey — shared behaviour. Spec v2.1 §4.5 motion, §5 components, §12.9 site.json */
(function () {
  'use strict';
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };

  /* ---- §12.9 contact details come from one file, never from the markup ----
     Anchors ship with studio.html#contact as their no-JS destination, so the
     phone number appears in exactly one place in the whole project.        */
  var SITE = null;
  fetch('site.json')
    .then(function (r) { return r.json(); })
    .then(function (d) { SITE = d; hydrate(); })
    .catch(function () { /* file:// or offline — fallback hrefs already work */ });

  function waLink(msg) {
    if (!SITE) return null;
    return 'https://wa.me/' + SITE.whatsapp + '?text=' + encodeURIComponent(msg);
  }

  function hydrate() {
    $$('[data-wa]').forEach(function (a) {
      a.href = waLink(a.getAttribute('data-wa') || 'Hello K. Pomey, I saw your website.');
      a.rel = 'noopener';
      a.target = '_blank';
    });
    $$('[data-site]').forEach(function (el) {
      var k = el.getAttribute('data-site');
      if (!SITE[k]) return;
      el.textContent = SITE[k];
      if (k === 'email') el.href = 'mailto:' + SITE.email;
      if (k === 'whatsappDisplay') el.href = 'tel:+' + SITE.whatsapp;
      if (k === 'instagram') {
        el.textContent = '@' + SITE.instagram;
        el.href = 'https://instagram.com/' + SITE.instagram;
      }
    });
    $$('[data-ig]').forEach(function (a) { a.href = 'https://instagram.com/' + SITE.instagram; });
  }

  /* ---- §5.1 drawer ------------------------------------------------------ */
  var drawer = $('#drawer'), burger = $('#burger');
  if (drawer && burger) {
    var lastFocus = null;
    var open = function () {
      lastFocus = document.activeElement;
      drawer.hidden = false;
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      var f = $('.drawer-x', drawer); if (f) f.focus();
    };
    var close = function () {
      drawer.hidden = true;
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };
    burger.addEventListener('click', open);
    $$('.drawer-x, .drawer nav a', drawer).forEach(function (el) {
      el.addEventListener('click', close);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !drawer.hidden) close();
    });
  }

  /* ---- §5.6 before / after. Native range input drives everything. ------- */
  $$('.ba').forEach(function (ba) {
    var r = $('.ba-r', ba);
    if (!r) return;
    var set = function () { ba.style.setProperty('--x', r.value + '%'); };
    r.addEventListener('input', set);
    set();
  });

  /* ---- §5.4 index peek. Pointer-driven, so fine pointers only. --------- */
  var peek = $('#peek');
  if (peek && FINE && !RM) {
    var rows = $$('.idx-row[data-peek]');
    var tx = 0, ty = 0, px = 0, py = 0, live = false, raf = 0;
    var tick = function () {
      px += (tx - px) * 0.14;
      py += (ty - py) * 0.14;
      peek.style.transform = 'translate3d(' + px + 'px,' + py + 'px,0)';
      raf = requestAnimationFrame(tick);
    };
    rows.forEach(function (row) {
      row.addEventListener('mouseenter', function () {
        var slot = $('.ph', peek);
        slot.className = 'ph ' + (row.getAttribute('data-tone') || '');
        slot.setAttribute('data-label', row.getAttribute('data-peek'));
        peek.classList.add('on');
        if (!live) { live = true; raf = requestAnimationFrame(tick); }
      });
      row.addEventListener('mouseleave', function () { peek.classList.remove('on'); });
    });
    document.addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; });
    document.addEventListener('mouseleave', function () {
      peek.classList.remove('on');
      if (live) { cancelAnimationFrame(raf); live = false; }
    });
  }

  /* ---- §4.5 section entrance: fade + 16px rise, 65ms stagger in fours --- */
  var rv = $$('.rv');
  if (rv.length) {
    if (RM || !('IntersectionObserver' in window)) {
      rv.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en, i) {
          if (!en.isIntersecting) return;
          en.target.style.transitionDelay = (i % 4) * 65 + 'ms';
          en.target.classList.add('in');
          io.unobserve(en.target);
        });
      }, { rootMargin: '0px 0px -12% 0px' });
      rv.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---- §5.9 contact form → structured wa.me deep link ------------------- */
  var form = $('#enquiry');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      $$('.field', form).forEach(function (f) {
        var input = $('input, textarea', f);
        if (!input || !input.required) return;
        var bad = !input.value.trim();
        f.classList.toggle('bad', bad);
        if (bad && ok) { input.focus(); ok = false; }
      });
      if (!ok) return;
      var v = function (n) { var el = form.elements[n]; return el ? el.value.trim() : ''; };
      var lines = [
        'Hello K. Pomey,',
        '',
        'Name: ' + v('name'),
        'Site location: ' + v('place'),
        'Need: ' + v('need')
      ];
      if (v('more')) lines.push('Details: ' + v('more'));
      lines.push('', 'Sent from ' + (SITE ? SITE.domain : 'the website'));
      var url = waLink(lines.join('\n'));
      if (url) { window.open(url, '_blank', 'noopener'); return; }
      form.querySelector('.form-fb').hidden = false;   /* site.json unreachable */
    });
  }
})();
