/* ============================================================
   site.js — Urban IQ Connect
   Eén bron voor header + footer (partials), navigatie,
   thema-toggle, scroll-state, mobiel menu, reveals,
   cookie consent. Geen tracking vóór consent.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Navigatie-definitie (één bron, mega-menu) ---------- */
  var NAV = [
    { label: 'Machines', top: 'machines.html', children: [
      ['machines.html', 'Alle machines', 'Het volledige overzicht'],
      ['t-300.html', 'Urban IQ T-300', 'Rups · maximale grip'],
      ['w-300.html', 'Urban IQ W-300', 'Wielen · snelheid'],
      ['aanbouwdelen.html', 'Aanbouwdelen', '12+ werktuigen, 30s wissel']
    ]},
    { label: 'Platform', top: 'connect.html', children: [
      ['connect.html', 'Connect-platform', 'Je vloot, live in één dashboard'],
      ['service.html', 'Service & support', 'Uptime als afspraak']
    ]},
    { label: 'Dealer', top: 'dealer.html', children: [
      ['dealer.html', 'Dealer worden', 'Bouw mee aan het netwerk'],
      ['contact.html', 'Demo aanvragen', 'Op jouw eigen werf']
    ]},
    { label: 'Over ons', top: 'over-ons.html', children: [
      ['over-ons.html', 'Over Urban IQ', 'Wie we zijn en waarom'],
      ['contact.html', 'Contact', 'Direct in gesprek']
    ]}
  ];

  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (page === '') page = 'index.html';

  function topActive(group) {
    return group.children.some(function (c) { return c[0] === page; });
  }

  var BRAND = ''
    + '<a href="index.html" class="brand" aria-label="Urban IQ Connect home">'
    + '<img class="brand__mark brand__mark--cream" src="assets/logo-mark-cream.png" alt="" width="42" />'
    + '<img class="brand__mark brand__mark--black" src="assets/logo-mark-black.png" alt="" width="42" />'
    + '<span class="brand__name">URBAN&nbsp;<b style="color:var(--color-primary)">IQ</b>'
    + '<span class="brand__sub">Connect</span></span>'
    + '</a>';

  var CARET = '<svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';
  var GLOBE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></svg>';
  var PIN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>';

  /* ---------- Header ---------- */
  function headerHTML() {
    var topbar = ''
      + '<div class="topbar"><div class="topbar__inner">'
      + '<button class="icon-btn menu-toggle" type="button" aria-label="Menu openen" aria-expanded="false">'
      + '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>'
      + '<a class="topbar__link" href="dealer.html">' + GLOBE + '<span>Word dealer</span></a>'
      + '<span class="topbar__sep">·</span>'
      + '<a class="topbar__link" href="contact.html">' + PIN + '<span>Vind een dealer</span></a>'
      + '</div></div>';

    var headbar = ''
      + '<div class="headbar">' + BRAND
      + '<div class="headbar__right">'
      + '<button class="icon-btn" data-theme-toggle type="button" aria-label="Wissel thema"></button>'
      + '<a class="btn btn--primary header-cta" href="contact.html">Demo aanvragen</a>'
      + '</div></div>';

    var items = NAV.map(function (g) {
      var act = topActive(g) ? ' is-active' : '';
      var sub = g.children.map(function (c) {
        return '<a href="' + c[0] + '"><strong>' + c[1] + '</strong><span>' + c[2] + '</span></a>';
      }).join('');
      return '<div class="nav-item">'
        + '<a class="nav__link' + act + '" href="' + g.top + '">' + g.label + CARET + '</a>'
        + '<div class="megamenu">' + sub + '</div>'
        + '</div>';
    }).join('');
    var navbar = '<div class="navbar"><nav class="navbar__inner" aria-label="Hoofdnavigatie">' + items + '</nav></div>';

    return '<header class="site-header">' + topbar + headbar + navbar + '</header>' + mobileNavHTML();
  }

  /* ---------- Mobiel menu ---------- */
  function mobileNavHTML() {
    var groups = NAV.map(function (g) {
      var open = topActive(g) ? ' is-open' : '';
      var sub = g.children.map(function (c) {
        return '<a href="' + c[0] + '">' + c[1] + '</a>';
      }).join('');
      return '<div class="mobile-nav__group' + open + '">'
        + '<button class="mobile-nav__head" type="button">' + g.label + CARET + '</button>'
        + '<div class="mobile-nav__sub">' + sub + '</div>'
        + '</div>';
    }).join('');
    return '<nav class="mobile-nav" aria-label="Mobiele navigatie">' + groups
      + '<a class="btn btn--primary mobile-nav__cta" href="contact.html">Demo aanvragen</a></nav>';
  }

  /* ---------- Footer ---------- */
  function footerHTML() {
    return ''
      + '<footer class="site-footer">'
      + '<div class="wrap">'
      + '<div class="footer-grid">'
      + '<div class="footer-brand">' + BRAND
      + '<p>Compacte, slimme mini-laders voor de stedelijke omgeving. Gebouwd voor professionals die in de stad werken.</p>'
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
      + '<span>© ' + new Date().getFullYear() + ' Urban IQ Connect. Alle rechten voorbehouden.</span>'
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

  /* ---------- Mobiel menu (off-canvas + accordion) ---------- */
  var mobileNav = document.querySelector('.mobile-nav');
  var menuToggles = document.querySelectorAll('.menu-toggle');

  function setMenu(open) {
    if (!mobileNav) return;
    mobileNav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
    menuToggles.forEach(function (b) { b.setAttribute('aria-expanded', String(open)); });
  }

  if (mobileNav && menuToggles.length) {
    menuToggles.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setMenu(!mobileNav.classList.contains('is-open'));
      });
    });

    // Accordion: klik op groep-kop opent/sluit die groep
    mobileNav.addEventListener('click', function (e) {
      var head = e.target.closest('.mobile-nav__head');
      if (head) {
        var group = head.closest('.mobile-nav__group');
        if (group) group.classList.toggle('is-open');
        return;
      }
      // Klik op een link sluit het hele menu
      if (e.target.closest('a')) setMenu(false);
    });

    // Escape sluit het menu
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
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
