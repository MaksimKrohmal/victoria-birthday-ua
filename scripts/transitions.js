/* ============================================
   TRANSITIONS.JS — Matrix loader
   Цифровой дождь + обратный отсчёт + поздравление
   ============================================ */

'use strict';

(function initMatrixLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  /* ---- КАНВАС ---- */
  const canvas = document.createElement('canvas');
  canvas.id = 'matrixCanvas';
  canvas.style.cssText = `
    position:absolute;inset:0;width:100%;height:100%;
    display:block;pointer-events:none;
  `;
  loader.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = loader.offsetWidth  || window.innerWidth;
    canvas.height = loader.offsetHeight || window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  /* ---- СИМВОЛЫ ДОЖДЯ ---- */
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  // Размер символа адаптируется под ширину экрана:
  // мобильный (≤480px) → 12px, планшет (≤768px) → 14px, десктоп → 16px
  function calcFontSize() {
    const w = canvas.width || window.innerWidth;
    if (w <= 480) return 12;
    if (w <= 768) return 14;
    return 16;
  }

  // FONT_SIZE — живое значение, пересчитывается при resize через initDrops()
  let FONT_SIZE = calcFontSize();

  // Для каждой колонки храним:
  // head  — позиция головы (в строках)
  // trail — длина светящегося хвоста
  // speed — скорость этой колонки
  let columns, streams;

  function initDrops() {
    FONT_SIZE = calcFontSize();
    columns = Math.floor(canvas.width / FONT_SIZE);
    streams = Array.from({ length: columns }, () => ({
      // Стартуем В РАЗНЫХ точках экрана — сразу плотно
      head   : Math.random() * (canvas.height / FONT_SIZE),
      // Длина яркого хвоста — от 6 до 20 символов
      trail  : 6 + Math.floor(Math.random() * 14),
      // Скорость: медленнее чем раньше, но с разбросом
      speed  : 0.28 + Math.random() * 0.22,
    }));
  }
  initDrops();
  window.addEventListener('resize', () => { resize(); initDrops(); });

  /* ---- ЦВЕТА ---- */
  const ROSE_BRIGHT  = '#FF4D8F';
  const ROSE_MID     = '#C8445A';
  const ROSE_DIM     = 'rgba(200,68,90,0.35)';
  const ROSE_GLOW    = 'rgba(255,77,143,0.08)';

  /* ---- СОСТОЯНИЕ ---- */
  // phase: 'rain' | 'countdown' | 'words' | 'outro'
  let phase        = 'rain';
  let phaseTimer   = 0;       // кадры внутри фазы
  let countdownNum = 3;       // текущая цифра
  let wordIndex    = 0;       // текущее слово
  let shake        = 0;       // интенсивность тряски
  let outroProgress = 0;      // 0..1 для финального эффекта
  let rafId;
  let done         = false;

  const WORDS = ['HAPPY', 'BIRTHDAY', 'TO', 'YOU', '🩷'];

  // Тайминги (кадры при 60fps)
  const RAIN_DURATION      = 90;   // 1.5 сек чистый дождь до старта
  const COUNTDOWN_HOLD     = 55;   // кадров на каждую цифру
  const WORD_HOLD          = 48;   // кадров на каждое слово
  const HEART_HOLD         = 80;   // дольше держим сердечко
  const OUTRO_DURATION     = 50;   // кадров на выход

  /* ---- ГЛИТЧ ---- */
  let glitchTimer  = 0;
  let glitchActive = false;

  function maybeGlitch() {
    glitchTimer--;
    if (glitchTimer <= 0) {
      glitchActive = Math.random() < 0.35;
      glitchTimer  = 4 + Math.floor(Math.random() * 8);
    }
  }

  /* ---- РЕНДЕР ДОЖДЯ ---- */
  function drawRain(alpha = 1) {
    // Очень тонкий затемняющий слой — длинный хвост, плотный столб
    // Чем меньше число, тем длиннее и ярче хвост
    ctx.fillStyle = `rgba(8,6,10,${0.07 * alpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `bold ${FONT_SIZE}px "Courier New", monospace`;

    for (let i = 0; i < streams.length; i++) {
      const s   = streams[i];
      const x   = i * FONT_SIZE;
      const col = canvas.height / FONT_SIZE; // строк на экране

      // Рисуем ВЕСЬ столб — от головы вверх на trail строк
      // Это делает колонку непрерывной, без пробелов
      for (let t = 0; t <= s.trail; t++) {
        const row = Math.floor(s.head) - t;
        if (row < 0 || row > col) continue;

        const y    = row * FONT_SIZE;
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];

        if (t === 0) {
          // Голова — белая с сильным свечением
          ctx.shadowColor = '#FF6FAF';
          ctx.shadowBlur  = 16;
          ctx.fillStyle   = `rgba(255, 235, 245, ${0.98 * alpha})`;
        } else if (t === 1) {
          // Второй символ — почти белый, мягкое свечение
          ctx.shadowColor = '#FF4D8F';
          ctx.shadowBlur  = 8;
          ctx.fillStyle   = `rgba(255, 180, 220, ${0.92 * alpha})`;
        } else {
          // Тело хвоста — затухает по яркости от головы вниз
          // t=2 → почти яркий, t=trail → почти прозрачный
          const fade  = 1 - (t - 1) / s.trail;
          // Мерцание — каждый символ чуть рандомный по яркости
          const flick = 0.75 + Math.random() * 0.25;
          const b     = Math.max(0.05, fade * flick);
          ctx.shadowBlur = 0;
          ctx.fillStyle  = `rgba(255, 40, 120, ${b * alpha})`;
        }

        ctx.fillText(char, x, y);
        ctx.shadowBlur = 0;
      }

      // Двигаем голову вниз
      s.head += s.speed;

      // Сброс без паузы — сразу новый столб
      if (s.head * FONT_SIZE > canvas.height + s.trail * FONT_SIZE) {
        s.head  = -Math.random() * 4;           // чуть выше экрана
        s.trail = 8 + Math.floor(Math.random() * 16);
        s.speed = 0.28 + Math.random() * 0.22;  // медленная скорость
      }
    }
  }

  /* ---- РЕНДЕР ЦИФРЫ ОБРАТНОГО ОТСЧЁТА ---- */
  function drawCountdown(num, progress) {
    // progress: 0..1
    // Появляется резко сверху — scale от 1.5 до 1
    const scale = progress < 0.2
      ? 1.5 - (progress / 0.2) * 0.5
      : 1.0;
    // Уходит вниз при смене
    const translateY = progress > 0.75
      ? (progress - 0.75) / 0.25 * canvas.height * 0.08
      : 0;
    const alpha = progress < 0.1
      ? progress / 0.1
      : progress > 0.82
        ? (1 - progress) / 0.18
        : 1;

    const cx = canvas.width  / 2;
    const cy = canvas.height / 2;
    // Цифра крупная — как на референсе
    const fs = Math.floor(Math.min(canvas.width, canvas.height) * 0.32);

    ctx.save();
    ctx.translate(cx, cy + translateY);
    ctx.scale(scale, scale);
    ctx.globalAlpha = alpha;

    ctx.font         = `900 ${fs}px "Arial Black", "Helvetica Neue", Arial, sans-serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';

    // Розовое свечение сзади
    ctx.shadowColor = '#FF2D78';
    ctx.shadowBlur  = 50;
    ctx.fillStyle   = '#FF2D78';
    ctx.fillText(String(num), 2, 2);
    ctx.shadowBlur  = 0;

    // Основная цифра — белая
    ctx.shadowColor = 'rgba(255,255,255,0.6)';
    ctx.shadowBlur  = 20;
    ctx.fillStyle   = '#FFFFFF';
    ctx.fillText(String(num), 0, 0);
    ctx.shadowBlur  = 0;

    ctx.globalAlpha = 1;
    ctx.restore();
  }

  /* ---- РЕНДЕР СЛОВА ---- */
  function drawWord(word, progress) {
    const cx = canvas.width  / 2;
    const cy = canvas.height / 2;

    // progress: 0..1
    const isAppearing  = progress < 0.25;
    const isLeaving    = progress > 0.75;
    const stableAlpha  = isAppearing ? progress / 0.25 : isLeaving ? (1 - progress) / 0.25 : 1;

    const isVictoria   = word === 'YOU';
    const isHeart      = word === '🩷';

    ctx.save();
    ctx.textAlign   = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalAlpha = stableAlpha;

    if (isHeart) {
      // Сердечко — большое, пульсирующее
      const pulse = 1 + 0.06 * Math.sin(phaseTimer * 0.25);
      const fs    = Math.floor(canvas.width * 0.18);
      ctx.font    = `${fs}px Arial`;
      ctx.scale !== undefined && ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(pulse, pulse);
      ctx.shadowColor = '#FF4D8F';
      ctx.shadowBlur  = 50;
      ctx.fillText('🩷', 0, 0);
      ctx.shadowBlur  = 0;
      ctx.restore();

    } else if (isVictoria) {
      // Victoria — неоново-розовая с глитчем
      const fs = Math.floor(canvas.width * 0.11);
      ctx.font = `900 italic ${fs}px "Helvetica Neue", Arial, sans-serif`;

      if (glitchActive) {
        // Хроматическая аберрация
        ctx.fillStyle = 'rgba(0,255,180,0.35)';
        ctx.fillText(word, cx + 4, cy + 2);
        ctx.fillStyle = 'rgba(255,0,100,0.35)';
        ctx.fillText(word, cx - 4, cy - 2);
      }

      ctx.shadowColor = ROSE_BRIGHT;
      ctx.shadowBlur  = 30;
      ctx.fillStyle   = ROSE_BRIGHT;
      ctx.fillText(word, cx, cy);
      ctx.shadowBlur  = 0;

      // Подчёркивание — рисуется постепенно
      const lineW  = ctx.measureText(word).width;
      const lineProgress = isAppearing ? progress / 0.25 : 1;
      ctx.strokeStyle = ROSE_BRIGHT;
      ctx.lineWidth   = 2;
      ctx.shadowColor = ROSE_BRIGHT;
      ctx.shadowBlur  = 10;
      ctx.beginPath();
      ctx.moveTo(cx - lineW / 2, cy + fs * 0.6);
      ctx.lineTo(cx - lineW / 2 + lineW * lineProgress, cy + fs * 0.6);
      ctx.stroke();
      ctx.shadowBlur = 0;

    } else {
      // Обычное слово — белое
      const fs = Math.floor(canvas.width * 0.09);
      ctx.font = `900 ${fs}px "Helvetica Neue", Arial, sans-serif`;

      // Тонкая розовая обводка
      ctx.strokeStyle = ROSE_DIM;
      ctx.lineWidth   = 2;
      ctx.strokeText(word, cx, cy);

      ctx.shadowColor = 'rgba(255,255,255,0.3)';
      ctx.shadowBlur  = 20;
      ctx.fillStyle   = '#FFFFFF';
      ctx.fillText(word, cx, cy);
      ctx.shadowBlur  = 0;
    }

    ctx.restore();
  }

  /* ---- АУТРО — занавес расходится ---- */
  function drawOutro(progress) {
    // Две половины разъезжаются вверх/вниз
    const h    = canvas.height;
    const w    = canvas.width;
    const move = h * 0.52 * progress;

    ctx.fillStyle = '#0A080C';
    // Верхняя половина уезжает вверх
    ctx.fillRect(0, -move, w, h / 2 + 2);
    // Нижняя половина уезжает вниз
    ctx.fillRect(0, h / 2 - 2 + move, w, h / 2 + 2);

    // Линия разрыва — светится
    const lineAlpha = 1 - progress;
    ctx.strokeStyle = `rgba(200,68,90,${lineAlpha})`;
    ctx.lineWidth   = 2;
    ctx.shadowColor = ROSE_BRIGHT;
    ctx.shadowBlur  = 20 * lineAlpha;
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  /* ---- ТРЯСКА ЭКРАНА ---- */
  function applyShake() {
    if (shake <= 0) return;
    const sx = (Math.random() - 0.5) * shake * 10;
    const sy = (Math.random() - 0.5) * shake * 6;
    ctx.translate(sx, sy);
    shake *= 0.75;
    if (shake < 0.02) shake = 0;
  }

  /* ---- ГЛАВНЫЙ ЦИКЛ ---- */
  function tick() {
    if (done) return;
    phaseTimer++;
    maybeGlitch();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Фон
    ctx.fillStyle = '#0A080C';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    applyShake();

    /* === ФАЗА: RAIN === */
    if (phase === 'rain') {
      drawRain(1);
      if (phaseTimer >= RAIN_DURATION) {
        phase = 'countdown';
        phaseTimer = 0;
        countdownNum = 3;
      }

    /* === ФАЗА: COUNTDOWN === */
    } else if (phase === 'countdown') {
      drawRain(0.5);

      const progress = phaseTimer / COUNTDOWN_HOLD;

      drawCountdown(countdownNum, Math.min(progress, 1));

      if (phaseTimer >= COUNTDOWN_HOLD) {
        // Тряска при смене цифры
        shake = 0.8;
        phaseTimer = 0;

        if (countdownNum > 1) {
          countdownNum--;
        } else {
          // После 1 → слова
          phase = 'words';
          wordIndex = 0;
        }
      }

    /* === ФАЗА: WORDS === */
    } else if (phase === 'words') {
      const hold     = wordIndex === WORDS.length - 1 ? HEART_HOLD : WORD_HOLD;
      const progress = phaseTimer / hold;

      // Дождь затухает к концу
      const rainAlpha = wordIndex === WORDS.length - 1
        ? Math.max(0, 0.3 - progress * 0.3)
        : 0.25;
      drawRain(rainAlpha);

      drawWord(WORDS[wordIndex], Math.min(progress, 1));

      if (phaseTimer >= hold) {
        phaseTimer = 0;
        wordIndex++;

        if (wordIndex >= WORDS.length) {
          phase = 'outro';
        }
      }

    /* === ФАЗА: OUTRO === */
    } else if (phase === 'outro') {
      outroProgress = phaseTimer / OUTRO_DURATION;
      drawRain(Math.max(0, 0.15 - outroProgress * 0.15));

      // Сердечко ещё немного видно
      if (outroProgress < 0.4) {
        drawWord('🩷', 1 - outroProgress / 0.4);
      }

      drawOutro(Math.min(outroProgress, 1));

      if (phaseTimer >= OUTRO_DURATION) {
        done = true;
        ctx.restore();
        // Скрываем лоадер
        loader.style.transition = 'opacity 0.3s ease';
        loader.style.opacity    = '0';
        setTimeout(() => {
          loader.style.display = 'none';
          document.body.style.overflow = '';
          document.dispatchEvent(new CustomEvent('loaderDone'));
        }, 320);
        return;
      }
    }

    ctx.restore();
    rafId = requestAnimationFrame(tick);
  }

  // Блокируем скролл
  document.body.style.overflow = 'hidden';

  // Небольшая задержка чтобы страница успела отрисоваться
  setTimeout(() => { rafId = requestAnimationFrame(tick); }, 100);

})();
