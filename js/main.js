/* ============================================================
   Graebeck Construction — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ── Navbar scroll behaviour ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const scrollHandler = () => {
      if (window.scrollY > 60) {
        navbar.classList.add('nav-scrolled');
      } else {
        navbar.classList.remove('nav-scrolled');
      }
    };
    window.addEventListener('scroll', scrollHandler, { passive: true });
    scrollHandler(); // run on load
  }

  /* ── Active nav link highlight ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Mobile hamburger toggle ── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ── Hero background load animation ── */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    // Trigger scale-in after a short delay
    requestAnimationFrame(() => {
      setTimeout(() => heroBg.classList.add('loaded'), 100);
    });
  }

  /* ── Animated counter ── */
  function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const fps      = 60;
    const steps    = (duration / 1000) * fps;
    const increment = target / steps;
    let   current  = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 1000 / fps);
  }

  const counters = document.querySelectorAll('[data-target]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
  }

  /* ── Scroll reveal ── */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // stagger children when parent has data-stagger
          const delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, Number(delay));
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ── Project filter (projects.html) ── */
  const filterBtns  = document.querySelectorAll('[data-filter]');
  const projectCards = document.querySelectorAll('[data-category]');

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update active button state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Show / hide cards with a fade
        projectCards.forEach(card => {
          const match = filter === 'all' || card.getAttribute('data-category') === filter;
          if (match) {
            card.style.opacity = '0';
            card.style.display = 'block';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.4s ease';
              card.style.opacity   = '1';
            });
          } else {
            card.style.transition = 'opacity 0.3s ease';
            card.style.opacity    = '0';
            setTimeout(() => { card.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }

  /* ── Contact form validation (contact.html) ── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const successMsg = document.getElementById('form-success');
      if (successMsg) {
        contactForm.style.display = 'none';
        successMsg.classList.remove('hidden');
      }
    });
  }

  /* ── Lightbox for project gallery ── */
  const galleryThumbs = document.querySelectorAll('[data-lightbox]');
  if (galleryThumbs.length) {
    // Create lightbox overlay
    const lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.innerHTML = `
      <div id="lb-backdrop" style="position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;">
        <button id="lb-close" style="position:absolute;top:20px;right:24px;background:none;border:none;color:#fff;font-size:2rem;cursor:pointer;z-index:10;">&times;</button>
        <button id="lb-prev" style="position:absolute;left:20px;background:rgba(255,255,255,0.1);border:none;color:#fff;font-size:2rem;cursor:pointer;padding:8px 16px;z-index:10;">&#8249;</button>
        <img id="lb-img" src="" alt="" style="max-width:90vw;max-height:85vh;object-fit:contain;border:2px solid #D4AF37;" />
        <button id="lb-next" style="position:absolute;right:60px;background:rgba(255,255,255,0.1);border:none;color:#fff;font-size:2rem;cursor:pointer;padding:8px 16px;z-index:10;">&#8250;</button>
      </div>
    `;
    lb.style.display = 'none';
    document.body.appendChild(lb);

    const images   = Array.from(galleryThumbs).map(t => t.getAttribute('data-lightbox'));
    let   current  = 0;
    const lbImg    = lb.querySelector('#lb-img');

    function openLb(index) {
      current = index;
      lbImg.src = images[current];
      lb.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
    function closeLb() {
      lb.style.display = 'none';
      document.body.style.overflow = '';
    }
    function showPrev() { current = (current - 1 + images.length) % images.length; lbImg.src = images[current]; }
    function showNext() { current = (current + 1) % images.length; lbImg.src = images[current]; }

    galleryThumbs.forEach((thumb, i) => thumb.addEventListener('click', () => openLb(i)));
    lb.querySelector('#lb-close').addEventListener('click', closeLb);
    lb.querySelector('#lb-prev').addEventListener('click', showPrev);
    lb.querySelector('#lb-next').addEventListener('click', showNext);
    lb.querySelector('#lb-backdrop').addEventListener('click', e => { if (e.target === lb.querySelector('#lb-backdrop')) closeLb(); });
    document.addEventListener('keydown', e => {
      if (lb.style.display !== 'none') {
        if (e.key === 'Escape') closeLb();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
      }
    });
  }

  /* ── Ken Burns for page hero backgrounds ── */
  window.addEventListener('load', function () {
    document.querySelectorAll('.page-hero-bg').forEach(function (el) {
      el.classList.add('loaded');
    });
  });

})();
