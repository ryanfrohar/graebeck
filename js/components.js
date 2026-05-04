/* ============================================================
   Graebeck Construction — Shared Nav & Footer Components
   Injected at runtime to avoid duplicating markup across 13 pages.
   ============================================================ */

(function () {
  'use strict';

  // Detect whether we're one level deep (projects/ subdirectory)
  const inSubdir = window.location.pathname.includes('/projects/');
  const b = inSubdir ? '../' : '';   // base path prefix

  /* ── Arrow SVG reused in overlay CTA ── */
  const arrowSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;

  /* ── Navigation ── */
  const navHTML = `
<nav id="navbar" aria-label="Main navigation">
  <div class="container">
    <div class="nav-inner">
      <a href="${b}index.html" class="nav-logo">
        <img src="${b}images/logo.png" alt="Graebeck Construction Ltd." style="height:48px;width:auto;display:block;" />
      </a>
      <div class="nav-links">
        <a href="${b}index.html"    class="nav-link">Home</a>
        <a href="${b}projects.html" class="nav-link">Projects</a>
        <a href="${b}services.html" class="nav-link">Services</a>
        <a href="${b}about.html"    class="nav-link">About</a>
        <a href="${b}contact.html"  class="btn-primary nav-cta">Contact Us</a>
      </div>
      <button id="hamburger" class="hamburger" aria-label="Open navigation" aria-controls="nav-overlay" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>

<div id="nav-overlay" role="dialog" aria-modal="true" aria-label="Site navigation" aria-hidden="true">
  <div class="overlay-header">
    <a href="${b}index.html" class="overlay-logo">
      <img src="${b}images/logo-footer.png" alt="Graebeck Construction Ltd." />
    </a>
    <button id="overlay-close" class="overlay-close" aria-label="Close navigation">&times;</button>
  </div>
  <nav class="overlay-nav" aria-label="Mobile navigation">
    <a href="${b}index.html"    class="overlay-link">Home</a>
    <a href="${b}projects.html" class="overlay-link">Projects</a>
    <a href="${b}services.html" class="overlay-link">Services</a>
    <a href="${b}about.html"    class="overlay-link">About</a>
    <a href="${b}contact.html"  class="overlay-cta">Contact Us ${arrowSvg}</a>
  </nav>
  <div class="overlay-footer">
    <span class="overlay-tagline">Graebeck Construction Ltd.</span>
    <span class="overlay-tagline">Ottawa, ON &mdash; Est. 2000</span>
  </div>
</div>`;

  /* ── Footer ── */
  const footerHTML = `
<footer class="site-footer">
  <div class="container py-16">
    <div class="grid-footer">

      <div>
        <div class="mb-5">
          <img src="${b}images/logo-footer.png" alt="Graebeck Construction Ltd." style="height:40px;width:auto;display:block;" />
        </div>
        <p class="text-gray-500 text-sm font-inter leading-relaxed mb-6">
          Building the National Capital Region's most trusted structures since 2000.
        </p>
        <div class="social-links">
          <a href="https://www.linkedin.com/company/graebeck-construction" aria-label="Graebeck on LinkedIn" rel="noopener noreferrer" target="_blank" class="social-link-item">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        </div>
      </div>

      <div>
        <h4 class="font-montserrat font-bold text-white text-sm tracking-widest uppercase mb-5">Navigation</h4>
        <nav class="footer-nav" aria-label="Footer navigation">
          <a href="${b}index.html"    class="footer-link">Home</a>
          <a href="${b}projects.html" class="footer-link">Projects</a>
          <a href="${b}services.html" class="footer-link">Services</a>
          <a href="${b}about.html"    class="footer-link">About Us</a>
          <a href="${b}contact.html"  class="footer-link">Contact</a>
        </nav>
      </div>

      <div>
        <h4 class="font-montserrat font-bold text-white text-sm tracking-widest uppercase mb-5">Services</h4>
        <nav class="footer-nav" aria-label="Footer services">
          <a href="${b}services.html#general-contracting"      class="footer-link">General Contracting</a>
          <a href="${b}services.html#construction-management"  class="footer-link">Construction Management</a>
          <a href="${b}services.html#project-management"       class="footer-link">Project Management</a>
          <a href="${b}services.html#design-build"             class="footer-link">Design Build</a>
        </nav>
      </div>

      <div>
        <h4 class="font-montserrat font-bold text-white text-sm tracking-widest uppercase mb-5">Contact Us</h4>
        <address class="text-gray-500 font-inter text-sm leading-loose">
          6361 Fourth Line Road<br />
          North Gower, ON&nbsp; K0A 2T0
        </address>
        <a href="tel:6135919100" class="footer-contact-link mt-3">(613) 591-9100</a>
        <a href="mailto:gcl@graebeck.com" class="footer-contact-link">gcl@graebeck.com</a>
        <a href="${b}contact.html" class="btn-primary mt-6 inline-flex" style="padding:12px 20px;font-size:0.7rem;">Get a Quote</a>
      </div>

    </div>

    <div class="footer-bottom">
      <span>&copy; 2026 Graebeck Construction Ltd. All rights reserved.</span>
      <span>6361 Fourth Line Rd, North Gower, ON&nbsp; &middot;&nbsp; (613) 591-9100</span>
    </div>
  </div>
</footer>`;

  /* ── Inject ── */
  function inject(id, html) {
    const el = document.getElementById(id);
    if (!el) return;
    el.insertAdjacentHTML('afterend', html);
    el.remove();
  }

  inject('site-nav',    navHTML);
  inject('site-footer', footerHTML);

})();
