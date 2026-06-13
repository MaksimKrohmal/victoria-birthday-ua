/* ============================================
   APP.JS — общая логика для всех страниц
   ============================================ */

'use strict';

/* --- КАСТОМНЫЙ КУРСОР --- */

(function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;
  let rafId = null;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.13;
    ringY += (mouseY - ringY) * 0.13;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    rafId = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover-состояние
  document.addEventListener('mouseover', e => {
    const el = e.target.closest('a, button, .btn, .photo-card, .chapter-card, .quiz-option, [data-hover]');
    if (el) document.body.classList.add('cursor-hover');
    else    document.body.classList.remove('cursor-hover');
  });

  // Скрываем курсор за пределами окна
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
})();

/* --- НАВИГАЦИЯ --- */

(function initNav() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  // Scrolled-состояние
  const onScroll = () => {
    if (window.scrollY > 60) nav.classList.add('scrolled');
    else                     nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Активный пункт меню
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPage)) {
      link.classList.add('active');
    }
  });

  // Мобильное меню
  const burger = document.querySelector('.nav-burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (burger && mobileMenu) {
    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const setMenuState = (isOpen) => {
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      burger.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      burger.setAttribute('aria-label', isOpen ? 'Закрити меню' : 'Відкрити меню');
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));

      // Анимация бургера
      const spans = burger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(6px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-6px) rotate(-45deg)';
      } else {
        spans.forEach(s => {
          s.style.transform = '';
          s.style.opacity   = '';
        });
      }
    };

    burger.addEventListener('click', () => {
      setMenuState(!mobileMenu.classList.contains('open'));
    });

    // Закрытие по клику на ссылку
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenuState(false));
    });

    // Закрытие по Escape и базовое удержание фокуса внутри открытого меню
    document.addEventListener('keydown', e => {
      if (!mobileMenu.classList.contains('open')) return;

      if (e.key === 'Escape') {
        setMenuState(false);
        burger.focus();
        return;
      }

      if (e.key !== 'Tab') return;
      const focusable = Array.from(mobileMenu.querySelectorAll(focusableSelector));
      if (!focusable.length) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }
})();

/* --- ОБРОБКА МЕДІА --- */

(function initImageFallbacks() {
  document.addEventListener('error', e => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement)) return;

    const fallback = img.dataset.fallback;
    if (fallback === 'parent-no-photo' && img.parentElement) {
      img.parentElement.classList.add('no-photo');
      return;
    }

    if (fallback === 'hide') {
      img.style.display = 'none';
    }
  }, true);
})();

/* --- SCROLL REVEAL --- */

(function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  els.forEach(el => observer.observe(el));
})();

/* --- ПАРАЛЛАКС --- */

(function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (!parallaxEls.length) return;

  const onScroll = () => {
    const scrollY = window.scrollY;
    parallaxEls.forEach(el => {
      const speed  = parseFloat(el.dataset.parallax) || 0.3;
      const rect   = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = (window.innerHeight / 2 - center) * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* --- ПЛАВНЫЙ ПЕРЕХОД МЕЖДУ СТРАНИЦАМИ --- */

(function initPageTransitions() {
  const overlay = document.getElementById('page-overlay');
  if (!overlay) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fadeDuration = reduceMotion ? 120 : 450;
  let isNavigating = false;

  const showOverlay = (duration = fadeDuration) => {
    overlay.style.pointerEvents = 'all';
    overlay.style.transition = `opacity ${duration}ms ease`;
    overlay.style.opacity = '1';
  };

  const hideOverlay = () => {
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'none';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.style.transition = `opacity ${reduceMotion ? 120 : 500}ms ease`;
        overlay.style.opacity = '0';
      });
    });
  };

  const isModifiedClick = (event) => event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

  const isInternalNavigation = (link) => {
    if (!link) return false;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
    if (link.target && link.target !== '_self') return false;
    if (link.hasAttribute('download')) return false;

    let url;
    try {
      url = new URL(href, window.location.href);
    } catch (e) {
      return false;
    }

    if (url.origin !== window.location.origin) return false;
    if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash) return false;
    return true;
  };

  hideOverlay();

  window.addEventListener('pageshow', () => {
    isNavigating = false;
    hideOverlay();
  });

  window.navigateWithTransition = function(href) {
    if (!href || isNavigating) return;
    isNavigating = true;
    if (window.MusicManager) {
      MusicManager.prepareForNavigation();
    }
    showOverlay();
    setTimeout(() => {
      window.location.assign(href);
    }, fadeDuration);
  };

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!isInternalNavigation(link) || isModifiedClick(event)) return;

    event.preventDefault();
    if (isNavigating) return;

    const href = link.getAttribute('href');
    window.navigateWithTransition(href);
  });
})();

/* --- УТИЛИТЫ --- */

// Форматирование числа с правильным склонением
window.formatYears = function(n) {
  const mod10  = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 19) return `${n} років`;
  if (mod10 === 1)  return `${n} рік`;
  if (mod10 >= 2 && mod10 <= 4) return `${n} роки`;
  return `${n} років`;
};

// Простой дебаунс
window.debounce = function(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
};

// Случайное число в диапазоне
window.randomBetween = function(min, max) {
  return Math.random() * (max - min) + min;
};

// Конфетти 🎉
window.launchConfetti = function(count = 80) {
  const colors = ['#C8445A', '#F0A0B4', '#C9A84C', '#F4EEE8', '#8B2438'];
  const shapes = ['●', '■', '▲', '★', '✦'];

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.style.cssText = `
      position: fixed;
      top: -20px;
      left: ${Math.random() * 100}vw;
      font-size: ${randomBetween(8, 16)}px;
      color: ${colors[Math.floor(Math.random() * colors.length)]};
      pointer-events: none;
      z-index: 9999;
      animation: confettiFall ${randomBetween(2, 4)}s ease-in ${Math.random() * 0.8}s forwards;
    `;
    el.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  }
};

/* ============================================
   ГЛОБАЛЬНЫЙ МУЗЫКАЛЬНЫЙ МЕНЕДЖЕР
   Работает на всех страницах сайта
   ============================================ */

window.MusicManager = (function() {
  let bgMusic   = null;
  let isMuted   = false;
  let fadeTimer = null;
  let fadeFrame = null;
  let activeSrc = '';
  let hasUserGesture = false;
  let silentLock = false; // Блокировка восстановления фона, пока играет отдельная песня

  const BG_VOLUME  = 0.25;
  const DIM_VOLUME = 0.05;
  const POS_KEY    = 'victoria_music_pos';
  const MUTE_KEY   = 'victoria_music_muted';
  const USER_KEY   = 'victoria_music_allowed';
  const PLAY_KEY   = 'victoria_music_playing';
  const NAV_KEY    = 'victoria_music_internal_nav';

  // Сохраняем позицию перед уходом со страницы
  function savePosition() {
    if (!bgMusic) return;
    try {
      if (Number.isFinite(bgMusic.currentTime) && bgMusic.currentTime > 0) {
        localStorage.setItem(POS_KEY, String(bgMusic.currentTime));
      }
      localStorage.setItem(PLAY_KEY, String(!bgMusic.paused && !isMuted && !silentLock));
    } catch (e) {
      console.warn('Music position was not saved:', e);
    }
  }

  // Восстанавливаем позицию
  function restorePosition() {
    const saved = parseFloat(localStorage.getItem(POS_KEY) || '0');
    if (!bgMusic || !(saved > 0)) return;

    const apply = () => {
      try {
        if (Number.isFinite(saved)) bgMusic.currentTime = saved;
      } catch (e) {
        console.warn('Music position was not restored:', e);
      }
    };

    if (bgMusic.readyState >= 1) apply();
    else bgMusic.addEventListener('loadedmetadata', apply, { once: true });
  }

  function _setup(src) {
    isMuted = localStorage.getItem(MUTE_KEY) === 'true';
    hasUserGesture = localStorage.getItem(USER_KEY) === 'true';

    if (bgMusic && activeSrc === src) {
      renderButton();
      updateButton();
      return;
    }

    if (bgMusic) {
      savePosition();
      bgMusic.pause();
      bgMusic.src = '';
    }

    activeSrc          = src;
    bgMusic           = new Audio(src);
    bgMusic.loop      = true;
    bgMusic.volume    = 0;
    bgMusic.preload   = 'metadata';
    bgMusic.playsInline = true;
    bgMusic.addEventListener('play', updateButton);
    bgMusic.addEventListener('pause', updateButton);
    bgMusic.addEventListener('ended', updateButton);
    bgMusic.addEventListener('volumechange', updateButton);
    bgMusic.addEventListener('timeupdate', () => {
      if (!bgMusic || bgMusic.paused) return;
      try { localStorage.setItem(POS_KEY, String(bgMusic.currentTime)); } catch (e) {}
    });

    // Сохраняем позицию при уходе
    window.addEventListener('beforeunload', savePosition);
    window.addEventListener('pagehide',     savePosition);

    // При уходе — сразу сохраняем позицию (iOS замораживает вкладку быстро).
    // При возврате — небольшая задержка: iOS требует время чтобы разблокировать аудио-контекст.
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        savePosition();
      } else {
        setTimeout(keepBackgroundAlive, 80);
      }
    });
    window.addEventListener('pageshow', () => setTimeout(keepBackgroundAlive, 80));
    window.addEventListener('focus',    () => setTimeout(keepBackgroundAlive, 80));

    renderButton();
    updateButton();
  }

  // Для внутренних страниц (pages/)
  function init() {
    _setup('../assets/audio/background.mp3');
  }

  // Для главной страницы
  function initIndex() {
    _setup('assets/audio/background.mp3');
  }

  function play(options = {}) {
    if (isMuted || !bgMusic || silentLock) return;

    const cameFromInternalNav = localStorage.getItem(NAV_KEY) === 'true';
    const instantResume = Boolean(options.instant || cameFromInternalNav);
    const targetVolume = options.volume ?? BG_VOLUME;
    const duration = instantResume ? 0 : (options.duration ?? 1200);

    const tryPlay = () => {
      if (!hasUserGesture && bgMusic.preload !== 'auto') bgMusic.preload = 'auto';
      if (instantResume) bgMusic.volume = targetVolume;

      // Восстанавливаем позицию ДО play() только если readyState позволяет.
      // На iOS currentTime нельзя установить до начала воспроизведения —
      // браузер сбросит его в 0. Поэтому устанавливаем позицию внутри .then().
      const savedPos = parseFloat(localStorage.getItem(POS_KEY) || '0');

      const promise = bgMusic.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            // Устанавливаем позицию после успешного play() — работает на iOS
            if (savedPos > 0 && Number.isFinite(savedPos)) {
              try { bgMusic.currentTime = savedPos; } catch (e) {}
            }
            localStorage.removeItem(NAV_KEY);
            if (!silentLock) {
              fadeTo(targetVolume, duration);
            } else {
              bgMusic.volume = 0;
              bgMusic.pause();
            }
          })
          .catch(() => {
            if (!silentLock) showClickPrompt();
          });
      } else if (!silentLock) {
        restorePosition();
        localStorage.removeItem(NAV_KEY);
        fadeTo(targetVolume, duration);
      }
    };

    if (bgMusic.readyState >= 2) {
      tryPlay();
    } else {
      bgMusic.addEventListener('canplay', tryPlay, { once: true });
    }
  }

  function showClickPrompt() {
    // Уже показан
    if (document.getElementById('musicPrompt')) return;

    const prompt = document.createElement('div');
    prompt.id = 'musicPrompt';
    prompt.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 20px;
      z-index: 600;
      background: rgba(12,10,11,0.92);
      border: 1px solid rgba(200,68,90,0.5);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      padding: 10px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.2em;
      color: rgba(244,238,232,0.7);
      text-transform: uppercase;
      cursor: pointer;
      animation: fadeInUp 0.4s ease;
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
      border-radius: 4px;
    `;
    prompt.setAttribute('role', 'button');
    prompt.setAttribute('tabindex', '0');
    prompt.setAttribute('aria-label', 'Увімкнути музику');
    prompt.innerHTML = '<span style="font-size:16px">🎵</span> Натисни для музики';

    const startMusic = () => {
      if (isMuted) return;
      hasUserGesture = true;
      localStorage.setItem(USER_KEY, 'true');
      restorePosition();
      if (silentLock) {
        bgMusic.volume = 0;
        bgMusic.pause();
        prompt.style.transition = 'opacity 0.4s ease';
        prompt.style.opacity = '0';
        setTimeout(() => prompt.remove(), 400);
        return;
      }

      bgMusic.play()
        .then(() => {
          if (!silentLock) {
            fadeTo(BG_VOLUME, 1200);
          } else {
            bgMusic.volume = 0;
            bgMusic.pause();
          }
          prompt.style.transition = 'opacity 0.4s ease';
          prompt.style.opacity = '0';
          setTimeout(() => prompt.remove(), 400);
        })
        .catch(() => {});
    };

    prompt.addEventListener('click', startMusic);
    prompt.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        startMusic();
      }
    });

    // Также запускаем при первом намеренном взаимодействии со страницей.
    const onFirstGesture = (event) => {
      if (event && event.target && event.target.closest && event.target.closest('#musicBtn')) return;
      startMusic();
      document.removeEventListener('pointerdown', onFirstGesture);
      document.removeEventListener('keydown', onFirstGesture);
    };
    document.addEventListener('pointerdown', onFirstGesture, { once: true });
    document.addEventListener('keydown', onFirstGesture, { once: true });

    document.body.appendChild(prompt);

    // Автоматически скрываем через 8 секунд
    setTimeout(() => {
      if (prompt.parentNode) {
        prompt.style.transition = 'opacity 0.4s ease';
        prompt.style.opacity = '0';
        setTimeout(() => prompt.remove(), 400);
      }
    }, 8000);
  }


  function cancelFade() {
    clearInterval(fadeTimer);
    if (fadeFrame) {
      cancelAnimationFrame(fadeFrame);
      fadeFrame = null;
    }
  }

  function fadeTo(targetVol, duration) {
    if (!bgMusic) return;
    cancelFade();
    targetVol = Math.max(0, Math.min(1, targetVol));

    if (!duration || duration <= 0) {
      bgMusic.volume = targetVol;
      updateButton();
      return;
    }

    const startVol = bgMusic.volume;
    const diff = targetVol - startVol;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - startTime) / duration);
      bgMusic.volume = Math.max(0, Math.min(1, startVol + diff * progress));
      updateButton();
      if (progress < 1) {
        fadeFrame = requestAnimationFrame(tick);
      } else {
        fadeFrame = null;
      }
    };

    fadeFrame = requestAnimationFrame(tick);
  }

  function ensurePlaying(targetVol = BG_VOLUME, duration = 800) {
    if (!bgMusic || isMuted) return;

    // Во время отдельной песни фоновый трек не должен оживать даже на нулевой громкости.
    if (silentLock) {
      clearInterval(fadeTimer);
      bgMusic.volume = 0;
      bgMusic.pause();
      return;
    }

    if (!hasUserGesture && bgMusic.preload !== 'auto') bgMusic.preload = 'auto';
    const promise = bgMusic.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          if (!silentLock) {
            localStorage.setItem(PLAY_KEY, 'true');
            fadeTo(targetVol, duration);
          }
        })
        .catch(() => {
          if (!silentLock) showClickPrompt();
        });
    } else if (!silentLock) {
      fadeTo(targetVol, duration);
    }
  }

  function keepBackgroundAlive() {
    if (!bgMusic || isMuted || document.hidden) return;

    // iOS: при возврате на вкладку bgMusic.paused === true после заморозки.
    // Пытаемся возобновить и восстановить позицию внутри .then() — как в play().
    if (bgMusic.paused && !silentLock) {
      const savedPos = parseFloat(localStorage.getItem(POS_KEY) || '0');
      const promise = bgMusic.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            if (savedPos > 0 && Number.isFinite(savedPos)) {
              try { bgMusic.currentTime = savedPos; } catch (e) {}
            }
            fadeTo(BG_VOLUME, 800);
          })
          .catch(() => { showClickPrompt(); });
      }
      return;
    }

    ensurePlaying(silentLock ? 0 : BG_VOLUME, silentLock ? 0 : 800);
  }

  function dim() { if (!silentLock) fadeTo(DIM_VOLUME, 800); }
  function restore(duration = 1500) { if (!isMuted && !silentLock) ensurePlaying(BG_VOLUME, duration); }
  function silence(duration = 1000) { fadeTo(0, duration); }
  function silenceLock(duration = 1000) {
    silentLock = true;
    if (!bgMusic) return;

    clearInterval(fadeTimer);
    fadeTo(0, duration);

    // После плавного затухания реально ставим фон на паузу.
    // Это защищает ПК и мобильные браузеры от одновременного звучания двух треков.
    setTimeout(() => {
      if (silentLock && bgMusic) {
        clearInterval(fadeTimer);
        bgMusic.volume = 0;
        bgMusic.pause();
      }
    }, duration + 80);
  }
  function unlockAndRestore(duration = 1500) { silentLock = false; restore(duration); }
  function forceBackgroundPlay() { ensurePlaying(silentLock ? 0 : BG_VOLUME, 800); }

  function toggleMute(event) {
    if (event && typeof event.preventDefault === 'function') event.preventDefault();
    if (event && typeof event.stopPropagation === 'function') event.stopPropagation();

    isMuted = !isMuted;
    localStorage.setItem(MUTE_KEY, String(isMuted));

    if (isMuted) {
      savePosition();
      silentLock = false;
      cancelFade();
      localStorage.setItem(PLAY_KEY, 'false');
      localStorage.removeItem(NAV_KEY);
      if (bgMusic) {
        bgMusic.volume = 0;
        bgMusic.pause();
      }
    } else {
      silentLock = false;
      hasUserGesture = true;
      localStorage.setItem(USER_KEY, 'true');
      localStorage.setItem(PLAY_KEY, 'true');
      ensurePlaying(BG_VOLUME, 350);
    }
    updateButton();
  }

  function renderMusicButtonStyles() {
    if (document.getElementById('musicBtnBreathingStyles')) return;

    const style = document.createElement('style');
    style.id = 'musicBtnBreathingStyles';
    style.textContent = `
      #musicBtn {
        overflow: visible;
        isolation: isolate;
      }

      #musicBtn .music-btn-icon {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 3px;
        width: 18px;
        height: 18px;
        line-height: 1;
        transition: filter 0.35s ease, opacity 0.35s ease;
      }

      #musicBtn .music-eq-bar {
        display: block;
        width: 3px;
        height: 10px;
        border-radius: 999px;
        background: linear-gradient(180deg, rgba(255, 232, 202, 0.96), rgba(232, 186, 153, 0.82), rgba(200, 68, 90, 0.72));
        box-shadow: 0 0 8px rgba(232, 186, 153, 0.18);
        transform-origin: 50% 100%;
        opacity: 0.86;
      }

      #musicBtn .music-eq-bar:nth-child(1) {
        height: 8px;
      }

      #musicBtn .music-eq-bar:nth-child(2) {
        height: 14px;
      }

      #musicBtn .music-eq-bar:nth-child(3) {
        height: 10px;
      }

      #musicBtn.is-muted .music-btn-icon {
        opacity: 0.48;
        filter: grayscale(0.35);
      }

      #musicBtn.is-muted .music-btn-icon::after {
        content: "";
        position: absolute;
        width: 23px;
        height: 1px;
        border-radius: 999px;
        background: rgba(255, 232, 202, 0.82);
        transform: rotate(-42deg);
        box-shadow: 0 0 6px rgba(232, 186, 153, 0.22);
      }

      #musicBtn.is-playing .music-eq-bar {
        animation: musicEqBreath 1.35s ease-in-out infinite;
      }

      #musicBtn.is-playing .music-eq-bar:nth-child(2) {
        animation-delay: -0.42s;
      }

      #musicBtn.is-playing .music-eq-bar:nth-child(3) {
        animation-delay: -0.82s;
      }

      #musicBtn.is-playing {
        border-color: rgba(232, 186, 153, 0.72) !important;
        box-shadow:
          0 6px 22px rgba(0, 0, 0, 0.32),
          0 0 18px rgba(232, 186, 153, 0.28),
          0 0 34px rgba(200, 68, 90, 0.16) !important;
        animation: musicButtonBreath 2.8s ease-in-out infinite;
      }

      #musicBtn.is-playing::after {
        content: "";
        position: absolute;
        inset: -6px;
        border-radius: 50%;
        border: 1px solid rgba(232, 186, 153, 0.38);
        opacity: 0.52;
        pointer-events: none;
        animation: musicButtonHalo 2.8s ease-in-out infinite;
      }

      #musicBtn.is-playing .music-btn-icon {
        filter: drop-shadow(0 0 8px rgba(232, 186, 153, 0.45));
      }

      @keyframes musicEqBreath {
        0%, 100% {
          transform: scaleY(0.62);
          opacity: 0.68;
        }
        45% {
          transform: scaleY(1);
          opacity: 1;
        }
      }

      @keyframes musicButtonBreath {
        0%, 100% {
          filter: brightness(1);
        }
        50% {
          filter: brightness(1.12);
        }
      }

      @keyframes musicButtonHalo {
        0%, 100% {
          transform: scale(0.96);
          opacity: 0.28;
        }
        50% {
          transform: scale(1.08);
          opacity: 0.64;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        #musicBtn.is-playing,
        #musicBtn.is-playing::after,
        #musicBtn.is-playing .music-eq-bar {
          animation: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function renderButton() {
    if (document.getElementById('musicBtn')) return;

    renderMusicButtonStyles();

    const btn = document.createElement('button');
    btn.id = 'musicBtn';
    btn.setAttribute('aria-label', 'Музика');
    btn.setAttribute('aria-pressed', String(!isMuted));
    btn.innerHTML = '<span class="music-btn-icon" aria-hidden="true"><span class="music-eq-bar"></span><span class="music-eq-bar"></span><span class="music-eq-bar"></span></span>';
    btn.style.cssText = `
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 500;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1px solid rgba(200,68,90,0.4);
      background: rgba(12,10,11,0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      transition: border-color 0.3s, transform 0.2s, box-shadow 0.3s, filter 0.3s;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    `;
    btn.addEventListener('mouseenter', () => {
      btn.style.borderColor = 'rgba(200,68,90,0.9)';
      btn.style.transform   = 'scale(1.1)';
      btn.style.boxShadow   = '0 4px 20px rgba(200,68,90,0.3)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.borderColor = 'rgba(200,68,90,0.4)';
      btn.style.transform   = 'scale(1)';
      btn.style.boxShadow   = '0 4px 20px rgba(0,0,0,0.3)';
    });
    btn.addEventListener('click', toggleMute);
    btn.addEventListener('touchend', (e) => {
      e.preventDefault();
      toggleMute(e);
    }, { passive: false });
    document.body.appendChild(btn);
  }

  function updateButton() {
    const btn = document.getElementById('musicBtn');
    if (!btn) return;

    const isActuallyPlaying = Boolean(bgMusic && !bgMusic.paused && !isMuted && !silentLock && bgMusic.volume > 0.01);

    btn.title = isMuted ? 'Увімкнути музику' : 'Вимкнути музику';
    btn.classList.toggle('is-playing', isActuallyPlaying);
    btn.classList.toggle('is-muted', isMuted);
    btn.setAttribute('aria-label', btn.title);
    btn.setAttribute('aria-pressed', String(!isMuted));
  }

  // Переключаемся на другой трек (для финала)
  function switchTo(trackSrc, vol) {
    if (!bgMusic) return;
    const targetVol = vol || BG_VOLUME;

    // Если что-то играет — заглушаем плавно
    if (!bgMusic.paused) {
      savePosition();
      fadeTo(0, 500);
      setTimeout(() => loadAndPlay(trackSrc, targetVol), 550);
    } else {
      // Ничего не играло — сразу загружаем
      savePosition();
      loadAndPlay(trackSrc, targetVol);
    }
  }

  function loadAndPlay(src, vol) {
    bgMusic.pause();
    activeSrc = src;
    bgMusic.src = src;
    bgMusic.volume = 0;
    bgMusic.load();
    bgMusic.addEventListener('canplay', () => {
      bgMusic.currentTime = 0;
      if (!isMuted) {
        bgMusic.play()
          .then(() => fadeTo(vol, 1200))
          .catch(() => {
            // Браузер заблокировал — показываем подсказку
            showClickPrompt();
          });
      }
    }, { once: true });
  }

  // Восстанавливаем основной трек

  function prepareForNavigation() {
    savePosition();
    try {
      localStorage.setItem(NAV_KEY, 'true');
      localStorage.setItem(PLAY_KEY, String(Boolean(bgMusic && !bgMusic.paused && !isMuted && !silentLock)));
    } catch (e) {
      console.warn('Music navigation state was not saved:', e);
    }
    // Не приглушаем фон при переходах между главами: следующая страница
    // восстановит позицию и громкость максимально быстро, без искусственного fade-out.
  }

  function switchBack(mainSrc) {
    if (!bgMusic) return;
    fadeTo(0, 600);
    setTimeout(() => {
      bgMusic.pause();
      activeSrc = mainSrc;
      bgMusic.src = mainSrc;
      bgMusic.load();
      bgMusic.addEventListener('canplay', () => {
        restorePosition(); // возвращаемся к сохранённой позиции
        if (!isMuted) {
          ensurePlaying(BG_VOLUME, 1200);
        }
      }, { once: true });
    }, 650);
  }

  return {
    init,
    initIndex,
    play,
    dim,
    restore,
    toggleMute,
    switchTo,
    switchBack,
    fadeTo,
    silence,
    silenceLock,
    unlockAndRestore,
    forceBackgroundPlay,
    prepareForNavigation
  };
})();

/* --- АВТОЗАПУСК МУЗЫКИ НА ВСЕХ СТРАНИЦАХ --- */
(function autoStartMusic() {
  const isIndex   = !window.location.pathname.includes('/pages/');
  const isFinale  = window.location.pathname.includes('finale');
  if (isIndex) return;
  if (isFinale) return;

  if (window.MusicManager) MusicManager.init();

  window.addEventListener('load', () => {
    if (!window.MusicManager) return;
    // Если пришли со страницы игры — фоновая была выключена, восстанавливаем
    const fromGame = document.referrer.includes('game.html');
    const fromInternalNav = localStorage.getItem('victoria_music_internal_nav') === 'true';
    setTimeout(() => MusicManager.play({ instant: fromInternalNav, duration: fromInternalNav ? 0 : 1200 }), fromGame ? 300 : 10);
  });
})();
