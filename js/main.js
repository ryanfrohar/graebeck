/* ============================================================
   Graebeck Construction — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  function initAll() {
    initNavigation();
    initAnimations();
    initInteractions();
  }

  /* ── Navigation ─────────────────────────────────────────── */
  function initNavigation() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      const onScroll = () => navbar.classList.toggle('nav-scrolled', window.scrollY > 60);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    markActiveLinks();

    const hamburger    = document.getElementById('hamburger');
    const navOverlay   = document.getElementById('nav-overlay');
    const overlayClose = document.getElementById('overlay-close');

    function openOverlay() {
      if (!navOverlay) return;
      navOverlay.classList.add('open');
      navOverlay.setAttribute('aria-hidden', 'false');
      if (hamburger) {
        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.classList.add('active');
      }
      document.body.style.overflow = 'hidden';
      if (overlayClose) overlayClose.focus();
    }

    function closeOverlay() {
      if (!navOverlay) return;
      navOverlay.classList.remove('open');
      navOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (hamburger) {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('active');
        hamburger.focus();
      }
    }

    if (hamburger)    hamburger.addEventListener('click', openOverlay);
    if (overlayClose) overlayClose.addEventListener('click', closeOverlay);
    if (navOverlay)   navOverlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeOverlay));

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && navOverlay && navOverlay.classList.contains('open')) closeOverlay();
    });
  }

  function markActiveLinks() {
    const pathname = window.location.pathname;

    // Project detail pages (/projects/project-*.html) all highlight "Projects"
    let activePage;
    if (pathname.includes('/projects/') && pathname.split('/').pop() !== 'projects.html') {
      activePage = 'projects.html';
    } else {
      activePage = pathname.split('/').pop() || 'index.html';
    }

    document.querySelectorAll('.nav-link').forEach(link => {
      const slug = link.getAttribute('href').split('/').pop();
      link.classList.toggle('active', slug === activePage);
    });

    document.querySelectorAll('.overlay-link').forEach(link => {
      const slug = link.getAttribute('href').split('/').pop();
      link.classList.toggle('active-page', slug === activePage);
    });

    // Highlight the CTA button when on contact page
    const overlayCta = document.querySelector('.overlay-cta');
    if (overlayCta) overlayCta.classList.toggle('active-page', activePage === 'contact.html');
  }

  /* ── Animations ─────────────────────────────────────────── */
  function initAnimations() {
    // Ken Burns on inner-page heroes
    window.addEventListener('load', () => {
      document.querySelectorAll('.page-hero-bg').forEach(el => el.classList.add('loaded'));
    });

    // Animated counters — requestAnimationFrame-based
    const counters = document.querySelectorAll('[data-target]');
    if (counters.length) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          animateCounter(entry.target);
        });
      }, { threshold: 0.5 });
      counters.forEach(el => observer.observe(el));
    }

  }

  function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  /* ── Interactions ───────────────────────────────────────── */
  function initInteractions() {
    initProjectFilter();
    initContactForm();
    initLightbox();
  }

  function initProjectFilter() {
    const filterBtns   = document.querySelectorAll('[data-filter]');
    const projectCards = document.querySelectorAll('[data-category]');
    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        projectCards.forEach(card => {
          const visible = filter === 'all' || card.getAttribute('data-category') === filter;
          if (visible) {
            card.classList.remove('card-hidden');
          } else {
            card.classList.add('card-hidden');
          }
        });
      });
    });
  }

  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Record when the form was loaded so the submit handler can check elapsed time
    const loadTimeField = document.getElementById('form-load-time');
    if (loadTimeField) loadTimeField.value = Date.now().toString();

    const MIN_SUBMIT_MS = 3000;

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]');
      const errorMsg  = document.getElementById('form-error');
      const successMsg = document.getElementById('form-success');

      // Timing guard: reject submissions that arrive faster than a human can type
      const loadTime = parseInt(loadTimeField ? loadTimeField.value : '0', 10);
      if (!loadTime || Date.now() - loadTime < MIN_SUBMIT_MS) {
        return;
      }

      // Consent guard: must accept privacy terms before submitting
      const consentBox = form.querySelector('#consent');
      if (!consentBox || !consentBox.checked) {
        alert('Please accept the privacy terms before submitting.');
        return;
      }

      // hCaptcha guard: block submission if captcha wasn't solved
      const hCaptchaResponse = form.querySelector('textarea[name="h-captcha-response"]');
      if (!hCaptchaResponse || !hCaptchaResponse.value) {
        alert('Please complete the captcha before submitting.');
        return;
      }

      const originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: new FormData(form),
        });

        const data = await res.json();

        if (res.ok) {
          form.style.display = 'none';
          if (successMsg) successMsg.classList.remove('hidden');
        } else {
          throw new Error(data.message || 'Server returned ' + res.status);
        }
      } catch {
        if (errorMsg) errorMsg.classList.remove('hidden');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }
    });
  }

  function initLightbox() {
    const thumbs = document.querySelectorAll('[data-lightbox]');
    if (!thumbs.length) return;

    const lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Image lightbox');
    lb.innerHTML = `
      <div id="lb-backdrop">
        <button id="lb-close" aria-label="Close lightbox">&times;</button>
        <button id="lb-prev" aria-label="Previous image">&#8249;</button>
        <img id="lb-img" src="" alt="" />
        <button id="lb-next" aria-label="Next image">&#8250;</button>
      </div>
    `;
    lb.style.display = 'none';
    document.body.appendChild(lb);

    const images = Array.from(thumbs).map(t => ({
      src: t.getAttribute('data-lightbox'),
      alt: t.querySelector('img') ? t.querySelector('img').getAttribute('alt') : '',
    }));
    let current = 0;
    const lbImg = lb.querySelector('#lb-img');

    const open  = i => { current = i; lbImg.src = images[i].src; lbImg.alt = images[i].alt; lb.style.display = 'block'; document.body.style.overflow = 'hidden'; lb.querySelector('#lb-close').focus(); };
    const close = () => { lb.style.display = 'none'; document.body.style.overflow = ''; };
    const prev  = () => { current = (current - 1 + images.length) % images.length; lbImg.src = images[current].src; lbImg.alt = images[current].alt; };
    const next  = () => { current = (current + 1) % images.length;                  lbImg.src = images[current].src; lbImg.alt = images[current].alt; };

    thumbs.forEach((t, i) => t.addEventListener('click', () => open(i)));
    lb.querySelector('#lb-close').addEventListener('click', close);
    lb.querySelector('#lb-prev').addEventListener('click', prev);
    lb.querySelector('#lb-next').addEventListener('click', next);
    lb.querySelector('#lb-backdrop').addEventListener('click', e => { if (e.target === lb.querySelector('#lb-backdrop')) close(); });

    document.addEventListener('keydown', e => {
      if (lb.style.display === 'none') return;
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    });
  }

})();
