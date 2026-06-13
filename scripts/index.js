/* ============================================
   INDEX.JS — логика главной страницы
   ============================================ */

'use strict';

/* --- Запуск анимаций после загрузчика --- */

// Инициализируем музыку сразу — чтобы браузер успел загрузить аудио
// до того как пользователь кликнет (взаимодействие с лоадером = разрешение)
if (window.MusicManager) {
  MusicManager.initIndex();
}

function launchHero() {
  const content    = document.getElementById('heroContent');
  const photos     = document.getElementById('heroPhotos');
  const badge      = document.getElementById('heroBadge');
  const scrollInd  = document.getElementById('scrollIndicator');
  const marquee    = document.getElementById('heroMarquee');

  if (content)   content.classList.add('visible');
  if (photos)    photos.classList.add('visible');
  if (badge)     badge.classList.add('visible');
  if (scrollInd) scrollInd.classList.add('visible');
  if (marquee)   setTimeout(() => marquee.classList.add('visible'), 400);

  // Запускаем фоновый слайдер
  startBgSlider();

  // Запускаем музыку — пользователь уже взаимодействовал с лоадером
  if (window.MusicManager) {
    const fromInternalNav = localStorage.getItem('victoria_music_internal_nav') === 'true';
    MusicManager.play({ instant: fromInternalNav, duration: fromInternalNav ? 0 : 1200 });
  }
}

/* --- Фоновый слайдер фото --- */

function startBgSlider() {
  const photos = document.querySelectorAll('.hero-bg-photo');
  if (!photos.length) return;

  let current = 0;
  photos[0].classList.add('active');

  setInterval(() => {
    photos[current].classList.remove('active');
    current = (current + 1) % photos.length;
    photos[current].classList.add('active');
  }, 5000);
}

/* --- Слушаем событие от загрузчика --- */

document.addEventListener('loaderDone', launchHero);

// Если загрузчик уже был убран (повторный визит)
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (!loader || loader.style.display === 'none') {
    launchHero();
  }
});

/* --- Параллакс для стопки фото --- */

(function initPhotoTilt() {
  const photosWrap = document.getElementById('heroPhotos');
  if (!photosWrap) return;

  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx; // -1 до 1
    const dy = (e.clientY - cy) / cy;

    const photos = photosWrap.querySelectorAll('.hero-photo');
    photos.forEach((photo, i) => {
      const depth = (i + 1) * 0.4;
      photo.style.transform = photo.style.transform.replace(/translate\([^)]*\)/, '') +
        ` translate(${dx * depth * 6}px, ${dy * depth * 4}px)`;
    });
  });
})();

/* --- Smooth reveal для секций --- */

(function initSectionReveal() {
  // Hero subtitle строки — набираются по одной
  const subtitleTexts = document.querySelectorAll('.hero-subtitle-text');
  subtitleTexts.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    el.style.transition = `opacity 0.4s ease ${0.6 + i * 0.12}s, transform 0.4s ease ${0.6 + i * 0.12}s`;
  });

  document.addEventListener('loaderDone', () => {
    subtitleTexts.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });
})();
