/* ============================================================
   RANDY KIMBI — site behaviour
   Builds the premium responsive header + full-screen mobile menu
   on every page from the existing <header> markup. Also keeps the
   contact form handler, smooth scrolling and helpers.
   ============================================================ */

// ---- PREMIUM HEADER + MOBILE MENU (runs on every page) ----
function buildHeader() {
  var header = document.querySelector('header');
  if (!header) return;

  var links = Array.prototype.map.call(header.querySelectorAll('nav a'), function (a) {
    return { text: a.textContent.trim(), href: a.getAttribute('href') || '#' };
  });
  if (!links.length) return;

  var path = window.location.pathname.replace(/\/index\.html$/, '/');
  var isCurrent = function (href) {
    var h = href.replace(/\/index\.html$/, '/');
    if (h === '/') return path === '/';
    return path === h || path === h.replace(/\/$/, '');
  };

  var navDesk = links.map(function (l) {
    return '<a href="' + l.href + '"' + (isCurrent(l.href) ? ' aria-current="page"' : '') + '>' + l.text + '</a>';
  }).join('');

  header.className = 'site-head';
  header.innerHTML =
    '<div class="head-inner">' +
      '<a class="brand" href="/"><span class="monogram">RK</span><span class="brand-name">Randy Kimbi</span></a>' +
      '<nav class="nav-desk">' + navDesk + '</nav>' +
      '<button class="burger" id="rk-burger" aria-label="Open menu" aria-expanded="false">' +
        '<span></span><span></span><span></span>' +
      '</button>' +
    '</div>';

  var overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'rk-overlay';
  overlay.innerHTML =
    '<div class="overlay-top">' +
      '<a class="brand" href="/"><span class="monogram">RK</span></a>' +
      '<button class="overlay-close" id="rk-close" aria-label="Close menu"></button>' +
    '</div>' +
    '<nav>' + links.map(function (l) {
      return '<a href="' + l.href + '"' + (isCurrent(l.href) ? ' aria-current="page"' : '') + '>' + l.text + '</a>';
    }).join('') + '</nav>' +
    '<div class="overlay-foot">' +
      '<span>Enterprise AI Strategist</span>' +
      '<a href="mailto:contact@randykimbi.com">contact@randykimbi.com</a>' +
    '</div>';
  document.body.appendChild(overlay);

  var burger = document.getElementById('rk-burger');
  var openMenu = function () { overlay.classList.add('open'); burger.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; };
  var closeMenu = function () { overlay.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; };

  burger.addEventListener('click', openMenu);
  document.getElementById('rk-close').addEventListener('click', closeMenu);
  overlay.querySelectorAll('nav a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
}

document.addEventListener('DOMContentLoaded', buildHeader);

// ---- CONTACT FORM HANDLER ----
async function handleContactForm(event) {
  event.preventDefault();
  var form = event.target;
  var formData = new FormData(form);
  var data = {
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    title: formData.get('title'),
    enquiry: formData.get('enquiry'),
    message: formData.get('message'),
    timestamp: new Date().toISOString()
  };
  try {
    console.log('Form submitted:', data);
    var statusDiv = document.getElementById('form-status');
    var statusMessage = document.getElementById('status-message');
    if (statusMessage) statusMessage.textContent = 'Thank you. Your message has been received. I will get back to you within 24 hours.';
    if (statusDiv) { statusDiv.style.display = 'block'; statusDiv.style.borderColor = '#B08D4F'; }
    form.reset();
    setTimeout(function () { if (statusDiv) statusDiv.style.display = 'none'; }, 5000);
  } catch (error) {
    console.error('Form submission error:', error);
    var d = document.getElementById('form-status');
    var m = document.getElementById('status-message');
    if (m) m.textContent = 'There was an error submitting your message. Please try again or reach me on WhatsApp.';
    if (d) { d.style.display = 'block'; d.style.borderColor = '#C0392B'; }
  }
}

// ---- SMOOTH SCROLLING for same-page anchors ----
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
});

// ---- HELPERS ----
function validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
function trackEvent(eventName, eventData) { if (window.gtag) { gtag('event', eventName, eventData); } console.log('Event tracked:', eventName, eventData); }
