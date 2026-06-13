/* premium-enhancements.js
   Drop-in layer for Victoria Birthday project.
   Add before </body> after app.js on every page. */
'use strict';

(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  document.documentElement.classList.toggle('reduced-motion', prefersReduced);
  document.documentElement.classList.toggle('touch-device', !isFinePointer);

  // 1) Prevent layout shifts and improve image decoding/lazy loading.
  const tuneImages = () => {
    document.querySelectorAll('img').forEach((img, index) => {
      img.decoding = 'async';
      if (!img.hasAttribute('loading')) img.loading = index < 2 ? 'eager' : 'lazy';
      if (index === 0 && !img.hasAttribute('fetchpriority')) img.setAttribute('fetchpriority', 'high');

      if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
        const setSize = () => {
          if (!img.naturalWidth || !img.naturalHeight) return;
          img.setAttribute('width', img.naturalWidth);
          img.setAttribute('height', img.naturalHeight);
        };
        if (img.complete) setSize();
        else img.addEventListener('load', setSize, { once: true });
      }
    });
  };

  // 2) Cinematic section progress: gives user a sense of moving through chapters.
  const initStoryProgress = () => {
    if (document.querySelector('.story-progress')) return;

    const bar = document.createElement('div');
    bar.className = 'story-progress';
    bar.setAttribute('aria-hidden', 'true');
    bar.innerHTML = '<span></span>';
    document.body.appendChild(bar);

    let ticking = false;
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      const progress = Math.min(1, Math.max(0, scrollY / max));
      bar.firstElementChild.style.transform = `scaleX(${progress})`;
      ticking = false;
    };

    addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });

    update();
  };

  // 3) Ambient spotlight, desktop only. It creates luxury depth without moving layout.
  const initAmbientSpotlight = () => {
    if (!isFinePointer || prefersReduced) return;
    const glow = document.createElement('div');
    glow.className = 'ambient-spotlight';
    glow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glow);

    let x = innerWidth / 2;
    let y = innerHeight / 2;
    let raf = 0;

    addEventListener('pointermove', (event) => {
      x = event.clientX;
      y = event.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          glow.style.setProperty('--mx', `${x}px`);
          glow.style.setProperty('--my', `${y}px`);
          raf = 0;
        });
      }
    }, { passive: true });
  };

  // 4) Emotional bookmarks: save the last chapter and offer continuation.
  const initMemoryResume = () => {
    const key = 'victoria_last_chapter';
    const path = location.pathname;
    const title = document.title.replace('— Вікторія', '').trim();
    localStorage.setItem(key, JSON.stringify({ path, title, ts: Date.now() }));

    if (!/index\.html$|\/$/.test(path)) return;
    const saved = JSON.parse(localStorage.getItem(key) || 'null');
    if (!saved || saved.path === path) return;

    const cta = document.createElement('a');
    cta.className = 'resume-card';
    cta.href = saved.path;
    cta.innerHTML = `<span>Продовжити історію</span><strong>${saved.title || 'з останньої глави'}</strong>`;
    document.body.appendChild(cta);
  };

  // 5) Safer mobile menu accessibility.
  const improveMobileNav = () => {
    const burger = document.querySelector('.nav-burger');
    const menu = document.querySelector('.mobile-menu');
    if (!burger || !menu) return;

    burger.setAttribute('aria-controls', 'mobileMenu');
    burger.setAttribute('aria-expanded', menu.classList.contains('open') ? 'true' : 'false');

    burger.addEventListener('click', () => {
      requestAnimationFrame(() => {
        burger.setAttribute('aria-expanded', menu.classList.contains('open') ? 'true' : 'false');
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || !menu.classList.contains('open')) return;
      menu.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      burger.focus();
    });
  };

  const boot = () => {
    tuneImages();
    initStoryProgress();
    initAmbientSpotlight();
    initMemoryResume();
    improveMobileNav();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
