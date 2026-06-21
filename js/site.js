/* ============================================================
   site.js — Urban IQ Connect
   Eén bron voor header + footer (partials), navigatie,
   thema-toggle, scroll-state, mobiel menu, reveals,
   cookie consent. Geen tracking vóór consent.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Navigatie-definitie (één bron) ---------- */
  var NAV = [
    { href: 'machines.html', label: 'Machines' },
    { href: 'connect.html', label: 'Connect' },
    { href: 'service.html', label: 'Service' },
    { href: 'dealer.html', label: 'Dealer worden' },
    { href: 'over-ons.html', label: 'Over ons' }
  ];

  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (page === '') page = 'index.html';

  // Productdetail- en sub-pagina's markeren "Machines" als actief
  var MACHINE_PAGES = ['machines.html', 't-300.html', 'w-300.html', 'aanbouwdelen.html'];

  function isActive(href) {
    if (href === 'machines.html') return MACHINE_PAGES.indexOf(page) !== -1;
    return href === page;
  }

  var BRAND = ''
    + '<a href="index.html" class="brand" aria-label="Urban IQ Connect home">'
    + '<img class="brand__mark brand__mark--cream" src="assets/logo-mark-cream.png" alt="" width="42" />'
    + '<img class="brand__mark brand__mark--black" src="assets/logo-mark-black.png" alt="" width="42" />'
    + '<span class="brand__name">URBAN&nbsp;<b style="color:var(--color-primary)">IQ</b>'
    + '<span class="brand__sub">Connect</span></span>'
    + '</a>';

  /* ---------- Header ---------- */
  function headerHTML() {
    var links = NAV.map(function (n) {
      return '<a class="nav__link' + (isActive(n.href) ? ' is-active' : '') + '" href="' + n.href + '">' + n.label + '</a>';
    }).join('');
    return ''
      + '<header class="site-header">'
      + BRAND
      + '<nav class="nav" aria-label="Hoofdnavigatie">' + links + '</nav>'
      + '<div class="header-actions">'
      + '<button class="icon-btn" data-theme-toggle type="button" aria-label="Wissel thema"></button>'
      + '<a class="btn btn--primary header-cta" href="contact.html">Demo aanvragen</a>'
      + '<button class="icon-btn menu-toggle" type="button" aria-label="Menu openen" aria-expanded="false">'
      + '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
      + '</button>'
      + '</div>'
      + '</header>';
  }

  /* ---------- Footer ---------- */
  function footerHTML() {
    return ''
      + '<footer class="site-footer">'
      + '<div class="wrap">'
      + '<div class="footer-grid">'
      + '<div class="footer-brand">' + BRAND
      + '<p>Compacte, slimme mini-laders voor de stedelijke omgeving. Een product van IronCub.</p>'
      + '<div class="footer-contact">'
      + '<a href="mailto:info@urbaniqconnect.com">info@urbaniqconnect.com</a>'
      + '<a href="dealer.html">Dealer of servicepartner worden</a>'
      + '</div>'
      + '</div>'
      + footerCol('Machines', [
          ['machines.html', 'Alle machines'],
          ['t-300.html', 'Urban IQ T-300 (rups)'],
          ['w-300.html', 'Urban IQ W-300 (wielen)'],
          ['aanbouwdelen.html', 'Aanbouwdelen']
        ])
      + footerCol('Platform', [
          ['connect.html', 'Connect-platform'],
          ['service.html', 'Service & support'],
          ['dealer.html', 'Dealer worden'],
          ['contact.html', 'Demo aanvragen']
        ])
      + footerCol('Bedrijf', [
          ['over-ons.html', 'Over ons'],
          ['contact.html', 'Contact'],
          ['privacy.html', 'Privacy'],
          ['voorwaarden.html', 'Voorwaarden']
        ])
      + '</div>'
      + '<div class="footer-bottom">'
      + '<span>© ' + new Date().getFullYear() + ' Urban IQ Connect · IronCub. Alle rechten voorbehouden.</span>'
      + '<span class="footer-bottom__links"><a href="privacy.html">Privacy</a><a href="cookies.html">Cookies</a><a href="voorwaarden.html">Voorwaarden</a></span>'
      + '</div>'
      + '</div>'
      + '</footer>';
  }

  function footerCol(title, items) {
    var lis = items.map(function (i) {
      return '<li><a href="' + i[0] + '">' + i[1] + '</a></li>';
    }).join('');
    return '<div class="footer-col"><h4>' + title + '</h4><ul>' + lis + '</ul></div>';
  }

  /* ---------- Cookie consent markup ---------- */
  function cookieHTML() {
    return ''
      + '<div class="cookie" role="dialog" aria-label="Cookievoorkeuren">'
      + '<p>We gebruiken cookies om de site te verbeteren. Analytics laadt pas na jouw akkoord.</p>'
      + '<div class="cookie__actions">'
      + '<button class="btn btn--ghost" data-consent="reject" type="button">Weigeren</button>'
      + '<button class="btn btn--primary" data-consent="accept" type="button">Akkoord</button>'
      + '</div>'
      + '</div>';
  }

  /* ---------- Injectie ---------- */
  function inject(selector, html) {
    var slot = document.querySelector(selector);
    if (slot) slot.outerHTML = html;
  }

  inject('[data-include="header"]', headerHTML());
  inject('[data-include="footer"]', footerHTML());
  if (!document.querySelector('.cookie')) {
    document.body.insertAdjacentHTML('beforeend', cookieHTML());
  }

  /* ---------- Thema-toggle (dark = hoofdtaal) ---------- */
  var root = document.documentElement;
  var toggle = document.querySelector('[data-theme-toggle]');
  var mode = root.getAttribute('data-theme')
    || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  root.setAttribute('data-theme', mode);
  function paintToggle() {
    if (!toggle) return;
    toggle.setAttribute('aria-label', 'Wissel naar ' + (mode === 'dark' ? 'lichte' : 'donkere') + ' modus');
    toggle.innerHTML = mode === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>';
  }
  paintToggle();
  if (toggle) {
    toggle.addEventListener('click', function () {
      mode = mode === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', mode);
      paintToggle();
    });
  }

  /* ---------- Header scroll-state ---------- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobiel menu ---------- */
  var menuBtn = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('nav-open', open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('.nav__link')) {
        nav.classList.remove('is-open');
        document.body.classList.remove('nav-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Reveal-on-scroll ---------- */
  var reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Cookie consent (geen tracking vóór consent) ---------- */
  var cookie = document.querySelector('.cookie');
  var consent = null; // in-memory: sandbox-veilig
  if (cookie) {
    setTimeout(function () { cookie.classList.add('is-visible'); }, 900);
    cookie.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-consent]');
      if (!btn) return;
      consent = btn.getAttribute('data-consent');
      cookie.classList.remove('is-visible');
      if (consent === 'accept' && window.__loadGA4) window.__loadGA4();
    });
  }

  /* ---------- Contactformulier (validatie + AVG) ---------- */
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('[data-form-status]');
      var required = form.querySelectorAll('[required]');
      var ok = true;
      required.forEach(function (field) {
        var valid = field.type === 'checkbox' ? field.checked : String(field.value).trim() !== '';
        if (field.type === 'email') {
          valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
        }
        field.classList.toggle('is-invalid', !valid);
        if (!valid) ok = false;
      });
      if (!ok) {
        if (status) {
          status.textContent = 'Controleer de gemarkeerde velden.';
          status.className = 'form-status is-error';
        }
        return;
      }
      // Placeholder: in productie POST naar backend (Resend e-mail).
      if (status) {
        status.textContent = 'Bedankt — we nemen binnen één werkdag contact op.';
        status.className = 'form-status is-success';
      }
      form.reset();
    });
  }
})();
