/* ============================================
   GAME.JS — Флокі бежит к колонке
   Полная версия с цветочками и музыкой
   ============================================ */

'use strict';

/* ============================================
   ВИКТОРИНА — без изменений
   ============================================ */

const QUIZ_QUESTIONS = [
  {
    q: 'Віка прорвалася до діджейського пульта на вечірці. Які наслідки для психіки оточуючих?',
    options: ['Важкий німецький Rammstein', 'Запальний верка-сердючківський денс', 'Воровайки на повну потужність', 'Вишуканий Моцарт для поціновувачів високого'],
    correct: 2,
    comment: 'Саме так. «Не воровка...» вмикається миттєво, без оголошення війни й права на капітуляцію.',
    wrong_comment: 'Серйозно?',
  },
  {
    q: 'Віці лагідно запропонували «провести тихий суботній вечір вдома». Її реакція?',
    options: ['З радістю погодилася й одягла піжаму', 'Запитала: «Чудовий тост, а куди ми врешті їдемо?»', 'Заснула о 21:00 від нудьги', 'Увімкнула серіал і заварила ромашковий чай'],
    correct: 1,
    comment: 'Вбудоване у Віку шило фізично не здатне перебувати в горизонтальному положенні по суботах.',
    wrong_comment: 'Ха',
  },
  {
    q: 'На горизонті Віки зʼявилися красиві квіти. Який план?',
    options: ['Гордо пройшла повз', 'Подивилася на цінник і зітхнула', 'Просто зробила естетичне фото для сторіс', 'Вони вже в неї в руках і їдуть додому'],
    correct: 3,
    comment: 'Бачу ціль — не бачу перешкод. Абсолютно будь-які квіти, у будь-який час доби, законно чи ні — вони будуть удома.',
    wrong_comment: 'Ну майже поруч',
  },
  {
    q: 'Віка збирає валізу. Яка стадія дедлайну?',
    options: ['За три години до вильоту, у стані паніки й криків «Де мій паспорт?!', 'За місяць, акуратно викреслюючи пункти з блокнота', 'За добу, розмірено й під музику', 'Вона завжди живе на валізах'],
    correct: 0,
    comment: 'Класичне: «Та встигну я!».',
    wrong_comment: 'Це точно не про Віку',
  },
  {
    q: 'Скільки гуртків, секцій і таємних орденів відвідувала маленька Віка?',
    options: ['Ходила тільки на один, найулюбленіший', 'Усі, до яких змогла дотягнутися.', 'Скромні два гуртки для галочки', 'Віддавала перевагу самотності й сидінню вдома'],
    correct: 1,
    comment: 'Їй треба було протестувати це життя на 100%.',
    wrong_comment: 'Ні, ні і ні',
  },
  {
    q: 'Перша сакральна дія Віки одразу після відкриття очей зранку:',
    options: ['Просвітлювальна медитація і планка', 'Варіння ідеальної кави', 'Приготування правильного сніданку', 'Судомне намацування телефона заради дози ранкових пліток'],
    correct: 3,
    comment: 'Світ не може функціонувати, поки Віка не перевірить, що там нового викотив Instagram.',
    wrong_comment: 'Думай краще',
  },
  {
    q: 'Ідеальна кількість одягу у Вікіній шафі:',
    options: ['Лаконічний капсульний гардероб із 5 речей', '«Мені абсолютно нічого вдягти, вішалки порожні (при забитій до стелі шафі).', 'Величезна гардеробна кімната, де все вміщається', 'Дві сукні на зміну'],
    correct: 1,
    comment: 'Шафа тріщить по швах, двері не зачиняються, але вдягти все одно нічого. Потрібна нова шафа. І нові речі.',
    wrong_comment: 'Серйозно?',
  },
  {
    q: 'Хтось поруч з Вікою збирається зі швидкістю пораненого равлика. Що відбувається з атмосферою?',
    options: ['Віка дзен-буддистка, вона покірно чекає', 'Тихо й по-англійськи йде сама', 'Оголошується штормове попередження!!! Зараз когось рознесе', 'Мовчки й розуміюче усміхається'],
    correct: 2,
    comment: 'У повітрі починає пахнути грозою. Час пішов на секунди, краще бігти або збиратися швидше.',
    wrong_comment: 'Ха',
  },
  {
    q: 'Віка зайшла в магазин «просто подивитися». З чим вона вийде?',
    options: ['З порожніми руками і відчуттям виконаного обовʼязку', 'З однією маленькою шоколадкою', 'З трьома пакетами, чеком на річну зарплату та спонтанним кредитом', 'Вона взагалі туди не зайде, якщо нічого не потрібно'],
    correct: 2,
    comment: '«Просто подивитися» у виконанні Віки — це найдорожчий атракціон у її житті.',
    wrong_comment: 'Це точно не про Віку',
  },
  {
    q: 'Віка почула фразу: «Нам потрібно серйозно поговорити». Що відбувається в її голові?',
    options: ['Спалах, буря, безумство. Згадала всі гріхи співрозмовника за останні 5 років.', 'Повний спокій і готовність до діалогу', 'Вона просто забуде про це за хвилину', 'Щире здивування'],
    correct: 0,
    comment: 'Найкращий захист — це напад. Поки ви збираєтеся з думками, Віка вже подумки виграла цей суд.',
    wrong_comment: 'Ні, ні і ні',
  },  
  {
    q: 'У ресторані принесли страву, яка виглядає неймовірно естетично. Дії Віки?',
    options: ['Влаштовує тридцятихвилинну фотосесію з пʼяти ракурсів. Їжа охолола, зате сторіс ідеальна.', 'Одразу починає їсти, поки не охололо', 'Їй байдуже на вигляд їжі', 'Просить запакувати з собою'],
    correct: 0,
    comment: 'Спочатку телефон «їсть» очима, потім підписники в соцмережах, і тільки в самому кінці — холодну їжу їсть сама Віка.',
    wrong_comment: 'Ну майже поруч',
  },  
  {
    q: 'Яке кодове слово найкраще описує стиль водіння Віки?',
    options: ['Розміреність і обережність', 'Сонний равлик', 'Форсаж: Токійський дрифт. Дорогу королеві.', 'Велосипедист на прогулянці'],
    correct: 2,
    comment: 'Гальма придумали боягузи, а Віка народжена для швидкості й маневрів.',
    wrong_comment: 'Думай краще',
  },  
  {
    q: 'Який девіз ідеально підходить до Вікіного підходу до будь-яких життєвих труднощів?',
    options: ['Сім разів відмір, один раз відріж', 'Головне — не висовуватися', 'Послухай усіх і зроби так, як сказали розумні люди', 'Безумство і відвага! Розберемося по ходу пʼєси!'],
    correct: 3,
    comment: 'Спочатку вплутатися в бійку/пригоду/ремонт, а про наслідки подумаємо завтра. Зате не нудно!',
    wrong_comment: 'Ха',
  }  
];

const RESULTS = [
  { min: 0, max: 3, score: '0–3', title: '«Віко, це ти?»', desc: 'Здається, тебе викрали інопланетяни й стерли памʼять. Спойлер: у тебе не вийшло. Терміново перездай тест.' },
  { min: 4, max: 7, score: '4–7', title: '«Віка на мінімалках»', desc: 'Ти памʼятаєш, як тебе звати, і приблизно уявляєш, під яку пісню готова увірватися на танцпол. Але рівень хаосу явно недооцінений.' },
  { min: 8, max: 12, score: '8–12', title: '«Небезпечна штучка»', desc: 'Чудовий результат! Ти прекрасно себе знаєш і не соромишся своєї полумʼяної натури.' },
  { min: 13, max: 13, score: '13/13', title: '«Королева Хаосу і Сторіс»', desc: 'Абсолютне комбо! Ти — це ти на всі сто відсотків, без фільтрів і сорому.' }
];

(function initQuiz() {
  let current = 0, score = 0, answered = false;
  const card = document.getElementById('quizCard');
  const questionEl = document.getElementById('quizQuestion');
  const optionsEl = document.getElementById('quizOptions');
  const resultEl = document.getElementById('quizResult');
  const fillEl = document.getElementById('progressFill');
  const textEl = document.getElementById('progressText');
  const restartBtn = document.getElementById('quizRestart');
  if (!card) return;

  function renderQuestion() {
    const q = QUIZ_QUESTIONS[current];
    answered = false;
    fillEl.style.width = ((current + 1) / QUIZ_QUESTIONS.length * 100) + '%';
    textEl.textContent = `${current + 1} із ${QUIZ_QUESTIONS.length}`;
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    setTimeout(() => {
      questionEl.textContent = q.q;
      optionsEl.innerHTML = '';
      q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = opt;
        btn.addEventListener('click', () => handleAnswer(i));
        optionsEl.appendChild(btn);
      });
      card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 200);
  }

  function handleAnswer(index) {
    if (answered) return;
    answered = true;
    const q = QUIZ_QUESTIONS[current];
    const buttons = optionsEl.querySelectorAll('.quiz-option');
    buttons.forEach(b => b.classList.add('disabled'));

    const isCorrect = index === q.correct;
    if (isCorrect) { score++; buttons[index].classList.add('correct'); }
    else { buttons[index].classList.add('wrong'); buttons[q.correct].classList.add('correct'); }

    // Показываем комментарий
    const commentText = isCorrect ? q.comment : q.wrong_comment;
    const holdTime    = isCorrect ? 2500 : 1800;

    let commentEl = document.getElementById('quizComment');
    if (!commentEl) {
      commentEl = document.createElement('div');
      commentEl.id = 'quizComment';
      commentEl.style.cssText = `
        margin-top: 16px;
        padding: 12px 18px;
        font-family: var(--font-body);
        font-size: 14px;
        font-style: italic;
        line-height: 1.6;
        border-left: 2px solid;
        opacity: 0;
        transform: translateY(8px);
        transition: opacity 0.3s ease, transform 0.3s ease;
      `;
      optionsEl.after(commentEl);
    }

    commentEl.style.borderColor = isCorrect ? '#52b788' : 'var(--rose)';
    commentEl.style.color       = isCorrect ? '#52b788' : 'var(--pink)';
    commentEl.style.background  = isCorrect ? 'rgba(82,183,136,0.08)' : 'rgba(200,68,90,0.08)';
    commentEl.textContent       = (isCorrect ? '✓ ' : '✗ ') + commentText;

    // Анимация появления
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        commentEl.style.opacity   = '1';
        commentEl.style.transform = 'translateY(0)';
      });
    });

    setTimeout(() => {
      commentEl.style.opacity   = '0';
      commentEl.style.transform = 'translateY(8px)';
      setTimeout(() => {
        current++;
        current < QUIZ_QUESTIONS.length ? renderQuestion() : showResult();
      }, 300);
    }, holdTime);
  }

  function showResult() {
    card.style.display = 'none';
    document.getElementById('quizProgress').style.display = 'none';
    resultEl.classList.remove('hidden');
    const res = RESULTS.find(r => score >= r.min && score <= r.max);
    document.getElementById('resultScore').textContent = `${score} із ${QUIZ_QUESTIONS.length}`;
    document.getElementById('resultTitle').textContent = res.title;
    document.getElementById('resultDesc').textContent = res.desc;
    if (score >= 7) setTimeout(() => launchConfetti(60), 300);
  }

  restartBtn?.addEventListener('click', () => {
    current = 0; score = 0; answered = false;
    resultEl.classList.add('hidden');
    card.style.display = '';
    document.getElementById('quizProgress').style.display = '';
    renderQuestion();
  });

  renderQuestion();
})();


/* ============================================
   РАННЕР — ФЛОКИ БЕЖИТ К КОЛОНКЕ
   ============================================ */

(function initRunner() {
  const canvas   = document.getElementById('runnerCanvas');
  const overlay  = document.getElementById('runnerOverlay');
  const startBtn = document.getElementById('runnerStart');
  const replayBtn = document.createElement('button');
  replayBtn.type = 'button';
  replayBtn.className = 'btn btn-secondary runner-replay-btn hidden';
  replayBtn.textContent = 'Повторити момент';
  startBtn?.insertAdjacentElement('afterend', replayBtn);
  const scoreEl  = document.getElementById('runnerScore');
  const titleEl  = document.getElementById('runnerTitle');
  const descEl   = document.getElementById('runnerDesc');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // --- РАЗМЕРЫ ---
  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); });

  // --- КОНСТАНТЫ ---
  const GRAVITY      = 0.55;
  const JUMP_FORCE   = -14;
  const BASE_SPEED   = 3.5;
  const FLOWERS_NEED  = 9;
  const PHASE1_END    = 30;   // метров
  const PHASE2_END    = 80;
  const BONUS_CHANCE  = 0.22; // вероятность бонусного цветка-розы

  // --- СОСТОЯНИЕ ---
  let state       = 'idle'; // idle | running | dead | win | speakerIgnition | finale
  let currentPhase = 1;    // текущая фаза сложности
  let bestScore    = parseInt(localStorage.getItem('victoria_best_score') || '0');
  let frameCount  = 0;
  let speed       = BASE_SPEED;
  let score       = 0;
  let flowersGot  = 0;
  let rafId;
  let musicLoaded = false;

  // --- ЩИТ (бонусная роза) ---
  let shieldActive  = false;
  let shieldTimer   = 0;
  const SHIELD_DURATION = 180; // 3 сек при 60fps

  // --- ФАЗОВЫЙ ПЕРЕХОД ---
  let prevPhase     = 1;
  let phaseFreeze   = 0; // кадры паузы спавна при смене фазы

  // --- ФИНАЛЬНЫЙ СПРИНТ ---
  let sprintTimer   = 0;
  const SPRINT_LIMIT = 240; // ~4 сек до начала уплывания

  // --- SQUASH & STRETCH ---
  let squashY       = 1; // вертикальный масштаб
  let squashX       = 1; // горизонтальный масштаб

  // --- ТРЯСКА КАМЕРЫ ---
  let shakeTimer    = 0;

  // --- FLOAT-UP ТЕКСТ (+1 🌸 над головой) ---
  let floatUps      = [];

  // --- ФИНАЛЬНАЯ СЦЕНА ---
  let finaleTimer    = 0;
  let finaleFlokiX   = 0;
  let bouquetScale   = 0;
  let textAlpha      = 0;

  // --- МОМЕНТ ВКЛЮЧЕНИЯ КОЛОНКИ ---
  // Отдельная микросцена перед финалом: пауза, свечение, волны и музыкальный drop.
  let ignitionTimer   = 0;
  let ignitionStarted = false;
  const FINALE_DURATION    = 9999; // бесконечно — закрывается по окончании песни
  const SONG_DURATION_SEC  = 165;  // длина happy-birthday.mp3 в секундах

  // --- ЗАГРУЗКА МУЗЫКИ ---
  let birthdayMusic = null;

  function loadMusic() {
    birthdayMusic        = new Audio('../assets/audio/happy-birthday.mp3');
    birthdayMusic.loop   = false;
    birthdayMusic.volume = 0.9;
    birthdayMusic.load();
  }
  loadMusic();

  // --- ФЛОКИ ---
  const floki = {
    x: 90,
    y: 0,
    w: 48,
    h: 48,
    vy: 0,
    onGround: true,
    doubleJump: false,
    invincible: 0,   // кадры неуязвимости после удара
    lives: 3,
    jump() {
      if (this.onGround) {
        this.vy = JUMP_FORCE;
        this.onGround = false;
        this.doubleJump = true;
        squashY = 0.6; squashX = 1.4; // сжатие при отталкивании
        spawnJumpParticles(this.x + this.w / 2, this.y + this.h);
      } else if (this.doubleJump) {
        this.vy = JUMP_FORCE * 0.8;
        this.doubleJump = false;
        squashY = 0.7; squashX = 1.3;
        spawnJumpParticles(this.x + this.w / 2, this.y + this.h);
      }
    },
    get ground() { return groundY() - this.h; }
  };

  function groundY() { return canvas.height - 55; }

  // --- ПРЕПЯТСТВИЯ ---
  let obstacles    = [];
  let spawnTimer   = 0;
  let nextSpawn    = 80;

  const OBSTACLE_TYPES = [
    { type: 'person',  w: 28, h: 52, color: '#3A3038', label: '🚶' },
    { type: 'tall',    w: 24, h: 68, color: '#2A2028', label: '🧍' },
    { type: 'cat',     w: 36, h: 30, color: '#5A5060', label: '🐱' },
    { type: 'double',  w: 24, h: 52, color: '#3A3038', label: '🚶🚶', gap: 40 }
  ];

  function spawnObstacle() {
    const lvl = Math.floor(score / 15);
    // На высоких уровнях добавляем сложные типы
    const pool = lvl < 2
      ? OBSTACLE_TYPES.slice(0, 2)
      : lvl < 4
        ? OBSTACLE_TYPES.slice(0, 3)
        : OBSTACLE_TYPES;

    const tpl = pool[Math.floor(Math.random() * pool.length)];

    if (tpl.type === 'double') {
      // Двойное препятствие
      obstacles.push({ x: canvas.width + 10, y: groundY() - tpl.h, w: tpl.w, h: tpl.h, type: tpl.type });
      obstacles.push({ x: canvas.width + 10 + tpl.w + (tpl.gap || 40), y: groundY() - tpl.h, w: tpl.w, h: tpl.h, type: 'person' });
    } else {
      obstacles.push({ x: canvas.width + 10, y: groundY() - tpl.h, w: tpl.w, h: tpl.h, type: tpl.type });
    }
  }

  // --- ЦВЕТОЧКИ ---
  let flowers = [];
  let flowerTimer = 0;
  let nextFlower  = 120;

  const FLOWER_SYMBOLS = ['🌸', '🌺', '🌼', '🌻', '💐'];

  function spawnFlower() {
    if (flowersGot >= FLOWERS_NEED) return;
    const x = canvas.width + 20 + Math.random() * 200;
    const y = groundY() - 60 - Math.random() * (canvas.height * 0.45);
    // Шанс на бонусный цветок после фазы 1
    const isBonus = currentPhase > 1 && Math.random() < BONUS_CHANCE;
    flowers.push({
      x, y,
      targetY: groundY() - 45,
      vy: 1.2 + Math.random() * 0.8,
      symbol: isBonus ? '🌹' : FLOWER_SYMBOLS[flowersGot % FLOWER_SYMBOLS.length],
      collected: false,
      scale: 1,
      pulse: Math.random() * Math.PI * 2,
      bobY: y,
      isBonus
    });
  }

  // --- КОЛОНКА ---
  let speaker = null;
  let speakerSpawned = false;

  function spawnSpeaker() {
    speaker = {
      x: canvas.width + 20,  // ближе к краю
      y: groundY() - 80,
      w: 50,
      h: 80,
      reached: false
    };
    speakerSpawned = true;
  }

  function placeSpeakerOnFinalStage() {
    if (!speaker) {
      speaker = {
        x: canvas.width * 0.64,
        y: groundY() - 80,
        w: 50,
        h: 80,
        reached: true
      };
      speakerSpawned = true;
    }

    speaker.reached = true;
    speaker.y = groundY() - speaker.h;

    // Фиксируем колонку в кадре: она больше не зависит от старого runner-scroll.
    const preferredX = canvas.width < 560 ? canvas.width * 0.66 : canvas.width * 0.62;
    speaker.x = Math.max(22, Math.min(preferredX, canvas.width - speaker.w - 22));
  }


  // --- ЧАСТИЦЫ ---
  let particles = [];

  function spawnJumpParticles(x, y) {
    for (let i = 0; i < 6; i++) {
      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 4,
        vy: -1 - Math.random() * 2,
        size: 3 + Math.random() * 4,
        color: '#C8445A',
        life: 20, maxLife: 20,
        type: 'circle'
      });
    }
  }

  function spawnCollectParticles(x, y, symbol) {
    for (let i = 0; i < 10; i++) {
      const angle = (Math.PI * 2 / 10) * i;
      particles.push({
        x, y,
        vx: Math.cos(angle) * (2 + Math.random() * 3),
        vy: Math.sin(angle) * (2 + Math.random() * 3) - 2,
        size: 10 + Math.random() * 8,
        symbol: symbol || '✨',
        life: 35, maxLife: 35,
        type: 'emoji'
      });
    }
    // Большой всплеск
    particles.push({
      x, y,
      vx: 0, vy: -4,
      size: 24,
      symbol: '🌟',
      life: 25, maxLife: 25,
      type: 'emoji'
    });
  }

  // Ноты летят от колонки
  function spawnMusicNotes(x, y) {
    const notes = ['♪', '♫', '🎵', '🎶'];
    for (let i = 0; i < 4; i++) {
      const angle = -Math.PI * 0.3 - Math.random() * Math.PI * 0.4;
      particles.push({
        x, y,
        vx: Math.cos(angle) * (2 + Math.random() * 3),
        vy: Math.sin(angle) * (2 + Math.random() * 3) - 1,
        size: 14 + Math.random() * 8,
        symbol: notes[Math.floor(Math.random() * notes.length)],
        life: 50 + Math.random() * 30,
        maxLife: 80,
        type: 'emoji',
        gravity: -0.03
      });
    }
  }

  function spawnVictoryParticles() {
    const symbols = ['♪', '♫', '🎵', '🎶', '✦', '★', '🌸'];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 5,
        vy: -4 - Math.random() * 6,
        size: 14 + Math.random() * 12,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        life: 60, maxLife: 60,
        type: 'emoji',
        gravity: -0.05
      });
    }
  }

  // --- ПАРАЛЛАКС ФОН ---
  const bgLayers = [
    { x: 0, speed: 0.3, items: [] },
    { x: 0, speed: 0.6, items: [] },
    { x: 0, speed: 1.0, items: [] }
  ];

  function initBgLayers() {
    // Дальний слой — огни на потолке
    for (let i = 0; i < 12; i++) {
      bgLayers[0].items.push({ x: i * (canvas.width / 6), y: 8 + Math.random() * 12, r: 2 + Math.random() * 2, phase: Math.random() * Math.PI * 2 });
    }
    // Средний слой — декорации
    for (let i = 0; i < 6; i++) {
      bgLayers[1].items.push({ x: i * (canvas.width / 3) + Math.random() * 80, y: groundY() - 80 - Math.random() * 60, w: 8 + Math.random() * 16, h: 40 + Math.random() * 40 });
    }
    // Ближний — детали пола
    for (let i = 0; i < 8; i++) {
      bgLayers[2].items.push({ x: i * (canvas.width / 4), y: groundY() + 12, w: 20 + Math.random() * 30, h: 4 });
    }
  }
  initBgLayers();

  // --- РЕНДЕР ФОНА ---
  function drawBackground() {
    // Основной фон
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#0A0810');
    grad.addColorStop(0.6, '#130F18');
    grad.addColorStop(1, '#1A1520');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Дальний слой — пульсирующие прожекторы с лучами на пол
    const t = frameCount * 0.04;
    bgLayers[0].items.forEach(item => {
      const alpha = 0.25 + 0.18 * Math.sin(t + item.phase);
      // Фонарик
      ctx.fillStyle = `rgba(200,68,90,${alpha})`;
      ctx.shadowColor = '#C8445A';
      ctx.shadowBlur  = 8;
      ctx.beginPath();
      ctx.arc(item.x, item.y, item.r + 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      // Луч прожектора до пола — трапеция с градиентом
      const beamW = 10 + item.r * 3;
      const grad = ctx.createLinearGradient(item.x, item.y, item.x, groundY());
      grad.addColorStop(0,   `rgba(200,68,90,${alpha * 0.35})`);
      grad.addColorStop(1,   `rgba(200,68,90,0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(item.x - item.r, item.y + item.r);
      ctx.lineTo(item.x - beamW, groundY());
      ctx.lineTo(item.x + beamW, groundY());
      ctx.lineTo(item.x + item.r, item.y + item.r);
      ctx.closePath();
      ctx.fill();
    });

    // Средний слой — тёмные силуэты танцующих людей
    bgLayers[1].items.forEach(item => {
      const sway = Math.sin(t * 1.2 + item.x * 0.01) * 3;
      ctx.fillStyle = 'rgba(30,25,35,0.8)';
      // Тело
      ctx.fillRect(item.x + sway - item.w / 2, item.y, item.w, item.h);
      // Голова
      ctx.beginPath();
      ctx.arc(item.x + sway, item.y - 8, item.w * 0.5, 0, Math.PI * 2);
      ctx.fill();
      // Руки — двигаются
      const armAngle = Math.sin(t * 1.5 + item.x) * 0.6;
      ctx.strokeStyle = 'rgba(30,25,35,0.8)';
      ctx.lineWidth = item.w * 0.35;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(item.x + sway - item.w * 0.5, item.y + item.h * 0.3);
      ctx.lineTo(item.x + sway - item.w * 1.2, item.y + item.h * 0.3 - Math.sin(armAngle) * 20);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(item.x + sway + item.w * 0.5, item.y + item.h * 0.3);
      ctx.lineTo(item.x + sway + item.w * 1.2, item.y + item.h * 0.3 + Math.sin(armAngle) * 20);
      ctx.stroke();
    });

    // Пол с паркетным эффектом
    const floorGrad = ctx.createLinearGradient(0, groundY(), 0, canvas.height);
    floorGrad.addColorStop(0, '#2A2030');
    floorGrad.addColorStop(1, '#1A1520');
    ctx.fillStyle = floorGrad;
    ctx.fillRect(0, groundY(), canvas.width, canvas.height - groundY());

    // Линия пола с свечением
    ctx.shadowColor = '#C8445A';
    ctx.shadowBlur  = 8;
    ctx.strokeStyle = '#C8445A';
    ctx.lineWidth   = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, groundY());
    ctx.lineTo(canvas.width, groundY());
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Паркетные плитки
    const tileW = 60;
    const offset = (frameCount * speed * 0.5) % tileW;
    ctx.strokeStyle = 'rgba(200,68,90,0.08)';
    ctx.lineWidth = 1;
    for (let x = -offset; x < canvas.width + tileW; x += tileW) {
      ctx.beginPath();
      ctx.moveTo(x, groundY());
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Отражение на полу
    ctx.fillStyle = `rgba(200,68,90,${0.03 + 0.01 * Math.sin(t)})`;
    ctx.fillRect(0, groundY(), canvas.width, 6);

    // Вспышка при смене фазы
    if (phaseFreeze > 0 && phaseFreeze > 100) {
      const flashAlpha = (phaseFreeze - 100) / 20 * 0.18;
      const flashColor = currentPhase === 2
        ? `rgba(255,160,50,${flashAlpha})`
        : `rgba(200,68,90,${flashAlpha})`;
      ctx.fillStyle = flashColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  // --- РЕНДЕР ФЛОКИ ---
  function drawFloki() {
    const { x, y, w, h, invincible } = floki;

    // Мигание при неуязвимости
    if (invincible > 0 && Math.floor(invincible / 4) % 2 === 0) return;

    const bob = floki.onGround ? Math.sin(frameCount * 0.25) * 1.5 : 0;
    const cx  = x + w / 2;
    const cy  = y + h / 2 + bob;

    ctx.save();
    ctx.translate(cx, cy);

    // Squash & stretch
    ctx.scale(squashX, squashY);

    // Щит-ореол вокруг Флокі
    if (shieldActive) {
      const shieldPulse = 0.7 + 0.3 * Math.sin(frameCount * 0.25);
      const shieldFade  = shieldTimer < 60 ? shieldTimer / 60 : 1;
      ctx.save();
      ctx.globalAlpha = shieldPulse * shieldFade * 0.55;
      ctx.strokeStyle = '#FF4D8F';
      ctx.lineWidth   = 3;
      ctx.shadowColor = '#FF4D8F';
      ctx.shadowBlur  = 14;
      ctx.beginPath();
      ctx.arc(0, -4, 28, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = shieldPulse * shieldFade * 0.15;
      ctx.fillStyle = '#FF4D8F';
      ctx.beginPath();
      ctx.arc(0, -4, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    // Тень под Флокі
    if (floki.onGround) {
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.beginPath();
      ctx.ellipse(0, h / 2 - bob + 4, w * 0.55 * squashX, 5, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Тело
    ctx.fillStyle = '#4A3E44';
    ctx.beginPath();
    ctx.ellipse(2, 5, 20, 15, 0, 0, Math.PI * 2);
    ctx.fill();

    // Голова
    ctx.fillStyle = '#5C4E54';
    ctx.beginPath();
    ctx.arc(-2, -12, 15, 0, Math.PI * 2);
    ctx.fill();

    // Уши стоячие
    ctx.fillStyle = '#3A3038';
    ctx.beginPath();
    ctx.moveTo(-16, -22); ctx.lineTo(-10, -8); ctx.lineTo(-20, -12);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(12, -22); ctx.lineTo(6, -8); ctx.lineTo(16, -12);
    ctx.fill();

    // Внутри ушей
    ctx.fillStyle = '#C8445A';
    ctx.globalAlpha = 0.4;
    ctx.beginPath();
    ctx.moveTo(-15, -20); ctx.lineTo(-11, -10); ctx.lineTo(-18, -13);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(11, -20); ctx.lineTo(7, -10); ctx.lineTo(15, -13);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Морда — светлее
    ctx.fillStyle = '#7A6870';
    ctx.beginPath();
    ctx.ellipse(0, -8, 10, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Нос
    ctx.fillStyle = '#2A2020';
    ctx.beginPath();
    ctx.ellipse(0, -12, 5, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ноздри
    ctx.fillStyle = '#1A1010';
    ctx.beginPath();
    ctx.ellipse(-2.5, -12, 1.5, 1, 0, 0, Math.PI * 2);
    ctx.ellipse(2.5, -12, 1.5, 1, 0, 0, Math.PI * 2);
    ctx.fill();

    // Глаза
    ctx.fillStyle = '#F4EEE8';
    ctx.beginPath();
    ctx.arc(-6, -16, 4, 0, Math.PI * 2);
    ctx.arc(6, -16, 4, 0, Math.PI * 2);
    ctx.fill();

    // Зрачки — смотрит вперёд
    ctx.fillStyle = '#1A1010';
    ctx.beginPath();
    ctx.arc(-5, -16, 2.5, 0, Math.PI * 2);
    ctx.arc(7, -16, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Блик в глазах
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(-4, -17, 1, 0, Math.PI * 2);
    ctx.arc(8, -17, 1, 0, Math.PI * 2);
    ctx.fill();

    // Улыбка
    ctx.strokeStyle = '#2A2020';
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(0, -6, 4, 0.2, Math.PI - 0.2);
    ctx.stroke();

    // Золотая цепь
    ctx.strokeStyle = '#C9A84C';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#C9A84C';
    ctx.shadowBlur = 4;
    ctx.beginPath();
    ctx.arc(0, -2, 11, 0.7, Math.PI - 0.7);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Телефон с музыкой 🎵
    ctx.fillStyle = '#C8445A';
    ctx.beginPath();
    ctx.roundRect(16, -4, 10, 16, 2);
    ctx.fill();
    ctx.fillStyle = '#F4EEE8';
    ctx.font = 'bold 8px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('♪', 21, 7);

    // Лапы — галоп бульдога: передние и задние попарно
    const legPhase = frameCount * 0.38;
    ctx.fillStyle = '#4A3E44';
    ctx.lineCap = 'round';

    if (floki.onGround) {
      // Передняя пара — синхронно
      const frontSwing = Math.sin(legPhase) * 9;
      // Задняя пара — в противофазе к передней (галоп)
      const backSwing  = Math.sin(legPhase + Math.PI) * 9;

      // Передние лапы
      ctx.save();
      ctx.translate(-12, 14 + frontSwing);
      ctx.beginPath(); ctx.ellipse(0, 0, 5, 7, -0.2, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.translate(10, 14 - frontSwing);
      ctx.beginPath(); ctx.ellipse(0, 0, 5, 7, 0.2, 0, Math.PI * 2); ctx.fill();
      ctx.restore();

      // Задние лапы
      ctx.fillStyle = '#3E3440';
      ctx.save();
      ctx.translate(-10, 16 + backSwing);
      ctx.beginPath(); ctx.ellipse(0, 0, 5, 6, -0.15, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.translate(8, 16 - backSwing);
      ctx.beginPath(); ctx.ellipse(0, 0, 5, 6, 0.15, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    } else {
      // В прыжке — лапы поджаты и расставлены в стороны
      ctx.fillStyle = '#4A3E44';
      ctx.save(); ctx.translate(-14, 6); ctx.beginPath(); ctx.ellipse(0, 0, 5, 7, -0.6, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      ctx.save(); ctx.translate(12, 6);  ctx.beginPath(); ctx.ellipse(0, 0, 5, 7,  0.6, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      ctx.fillStyle = '#3E3440';
      ctx.save(); ctx.translate(-12, 9); ctx.beginPath(); ctx.ellipse(0, 0, 5, 6, -0.4, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      ctx.save(); ctx.translate(10, 9);  ctx.beginPath(); ctx.ellipse(0, 0, 5, 6,  0.4, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }

    // Хвост — виляет
    const tailWag = Math.sin(frameCount * 0.3) * 12;
    ctx.strokeStyle = '#5C4E54';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(20, 2);
    ctx.quadraticCurveTo(28, -4 + tailWag, 24, -12 + tailWag * 0.5);
    ctx.stroke();

    ctx.restore();
  }

  // --- РЕНДЕР ПРЕПЯТСТВИЙ ---
  function drawObstacle(obs) {
    ctx.save();
    ctx.translate(obs.x + obs.w / 2, obs.y + obs.h);

    const bob = Math.sin(frameCount * 0.15 + obs.x * 0.01) * 2;

    if (obs.type === 'cat') {
      // КОТ
      ctx.translate(0, bob);
      // Тело
      ctx.fillStyle = '#6A5868';
      ctx.beginPath();
      ctx.ellipse(0, -obs.h * 0.3, obs.w * 0.5, obs.h * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();
      // Голова
      ctx.beginPath();
      ctx.arc(0, -obs.h * 0.75, obs.h * 0.28, 0, Math.PI * 2);
      ctx.fill();
      // Уши
      ctx.fillStyle = '#5A4858';
      ctx.beginPath();
      ctx.moveTo(-obs.h * 0.25, -obs.h * 0.95);
      ctx.lineTo(-obs.h * 0.08, -obs.h * 0.7);
      ctx.lineTo(-obs.h * 0.32, -obs.h * 0.78);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(obs.h * 0.25, -obs.h * 0.95);
      ctx.lineTo(obs.h * 0.08, -obs.h * 0.7);
      ctx.lineTo(obs.h * 0.32, -obs.h * 0.78);
      ctx.fill();
      // Глаза
      ctx.fillStyle = '#90C050';
      ctx.beginPath();
      ctx.ellipse(-obs.h * 0.1, -obs.h * 0.78, obs.h * 0.07, obs.h * 0.05, 0, 0, Math.PI * 2);
      ctx.ellipse(obs.h * 0.1, -obs.h * 0.78, obs.h * 0.07, obs.h * 0.05, 0, 0, Math.PI * 2);
      ctx.fill();
      // Хвост
      const tw = Math.sin(frameCount * 0.2 + obs.x) * 10;
      ctx.strokeStyle = '#6A5868';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(obs.w * 0.4, -obs.h * 0.2);
      ctx.quadraticCurveTo(obs.w * 0.9, -obs.h * 0.2 + tw, obs.w * 0.7, -obs.h * 0.6 + tw * 0.5);
      ctx.stroke();
    } else {
      // ЧЕЛОВЕК
      const sway = Math.sin(frameCount * 0.2 + obs.x * 0.02) * 2;
      const legSwing = Math.sin(frameCount * 0.3 + obs.x * 0.02) * 6;

      // Ноги
      ctx.fillStyle = '#2A2028';
      ctx.fillRect(-obs.w * 0.35 + sway + legSwing, -obs.h * 0.42, obs.w * 0.28, obs.h * 0.42);
      ctx.fillRect(obs.w * 0.07 + sway - legSwing, -obs.h * 0.42, obs.w * 0.28, obs.h * 0.42);

      // Тело
      ctx.fillStyle = obs.type === 'tall' ? '#3A2A38' : '#3A3038';
      ctx.fillRect(-obs.w * 0.4 + sway, -obs.h * 0.78, obs.w * 0.8, obs.h * 0.38);

      // Руки
      const armSwing = Math.sin(frameCount * 0.2 + obs.x * 0.02 + Math.PI) * 10;
      ctx.strokeStyle = obs.type === 'tall' ? '#3A2A38' : '#3A3038';
      ctx.lineWidth = obs.w * 0.22;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-obs.w * 0.4 + sway, -obs.h * 0.68);
      ctx.lineTo(-obs.w * 0.8 + sway, -obs.h * 0.55 + armSwing);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(obs.w * 0.4 + sway, -obs.h * 0.68);
      ctx.lineTo(obs.w * 0.8 + sway, -obs.h * 0.55 - armSwing);
      ctx.stroke();

      // Голова
      ctx.fillStyle = '#8A7880';
      ctx.beginPath();
      ctx.arc(sway, -obs.h * 0.9, obs.w * 0.3, 0, Math.PI * 2);
      ctx.fill();

      // Лицо
      ctx.fillStyle = '#2A2028';
      ctx.beginPath();
      ctx.arc(sway - obs.w * 0.08, -obs.h * 0.93, obs.w * 0.06, 0, Math.PI * 2);
      ctx.arc(sway + obs.w * 0.08, -obs.h * 0.93, obs.w * 0.06, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  // --- РЕНДЕР ЦВЕТОЧКА ---
  function drawFlower(f) {
    if (f.collected) return;
    const pulse = 1 + 0.08 * Math.sin(frameCount * 0.15 + f.pulse);
    const bob   = Math.sin(frameCount * 0.08 + f.pulse) * 5;

    ctx.save();
    ctx.translate(f.x, f.y + bob);
    ctx.scale(pulse, pulse);

    // Свечение
    const glow = ctx.createRadialGradient(0, 0, 2, 0, 0, 22);
    glow.addColorStop(0, 'rgba(240,160,180,0.4)');
    glow.addColorStop(1, 'rgba(240,160,180,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(0, 0, 22, 0, Math.PI * 2);
    ctx.fill();

    // Цветок emoji
    ctx.font = '22px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(f.symbol, 0, 0);

    // Счётчик если несобранных больше 0
    ctx.restore();
  }

  // --- РЕНДЕР КОЛОНКИ ---
  function drawSpeaker() {
    // После касания колонка НЕ исчезает: в ignition/finale она становится частью сцены.
    if (!speaker || (speaker.reached && state !== 'speakerIgnition' && state !== 'finale')) return;
    const { x, y, w, h } = speaker;
    const t = frameCount * 0.12;

    // Bass-reactive motion: когда музыка уже включена, колонка чуть подпрыгивает и дышит.
    const bassKick = state === 'finale'
      ? Math.max(0, Math.sin(finaleTimer * 0.42)) * 3.6 + Math.max(0, Math.sin(finaleTimer * 0.84)) * 1.4
      : 0;
    const bassScale = state === 'finale' ? 1 + bassKick * 0.006 : 1;
    const pulse = Math.sin(t) * 4 + bassKick;

    ctx.save();
    ctx.translate(x + w / 2, y + h / 2 - bassKick);
    ctx.scale(bassScale, bassScale);

    // Свечение колонки
    ctx.shadowColor = '#C8445A';
    ctx.shadowBlur  = 20 + pulse * 2;

    // Корпус
    const grad = ctx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2);
    grad.addColorStop(0, '#3A1020');
    grad.addColorStop(0.5, '#C8445A');
    grad.addColorStop(1, '#8B2438');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(-w / 2, -h / 2, w, h, 6);
    ctx.fill();

    ctx.shadowBlur = 0;

    // Решётка динамика
    ctx.fillStyle = '#1A0810';
    ctx.beginPath();
    ctx.arc(0, -h * 0.05, w * 0.35, 0, Math.PI * 2);
    ctx.fill();

    // Динамик — концентрические окружности
    for (let r = w * 0.28; r > w * 0.06; r -= w * 0.08) {
      ctx.strokeStyle = `rgba(200,68,90,${0.3 + 0.2 * Math.sin(t + r)})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, -h * 0.05, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Центр динамика
    ctx.fillStyle = '#C8445A';
    ctx.beginPath();
    ctx.arc(0, -h * 0.05, w * 0.07, 0, Math.PI * 2);
    ctx.fill();

    // Маленький динамик сверху
    ctx.fillStyle = '#1A0810';
    ctx.beginPath();
    ctx.arc(0, -h * 0.38, w * 0.15, 0, Math.PI * 2);
    ctx.fill();

    // Кнопки снизу
    ctx.fillStyle = '#8B2438';
    ctx.fillRect(-w * 0.35, h * 0.3, w * 0.18, h * 0.08);
    ctx.fillRect(-w * 0.1, h * 0.3, w * 0.18, h * 0.08);
    ctx.fillRect(w * 0.15, h * 0.3, w * 0.18, h * 0.08);

    // Нота летит из колонки
    const noteAlpha = 0.5 + 0.5 * Math.sin(t * 1.5);
    ctx.fillStyle = `rgba(240,160,180,${noteAlpha})`;
    ctx.font = `${14 + pulse}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText('♪', w * 0.6 + Math.sin(t) * 4, -h * 0.2 - Math.sin(t * 0.8) * 8);
    ctx.fillText('♫', w * 0.5 + Math.cos(t * 0.7) * 6, -h * 0.4 - Math.cos(t) * 6);

    ctx.restore();
  }

  // --- РЕНДЕР ЧАСТИЦ ---
  function drawParticles() {
    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => {
      const alpha = p.life / p.maxLife;
      ctx.save();
      ctx.globalAlpha = alpha;
      if (p.type === 'emoji') {
        ctx.font = `${p.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.symbol, p.x, p.y);
      } else {
        ctx.fillStyle = p.color || '#C8445A';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      p.x  += p.vx;
      p.y  += p.vy;
      p.vy += p.gravity !== undefined ? p.gravity : 0.15;
      p.life--;
    });
  }

  // --- HUD (интерфейс) ---
  function drawHUD() {
    const isMobile = canvas.width < 480;
    const hudScale = isMobile ? 0.85 : 1;

    // Очки
    ctx.fillStyle = 'rgba(244,238,232,0.5)';
    ctx.font = `bold ${Math.round(13 * hudScale)}px "DM Mono", monospace`;
    ctx.textAlign = 'left';
    ctx.fillText(`${score} м`, 12, 22);

    // Жизни — только 3 сердечка
    ctx.font = `${Math.round(15 * hudScale)}px Arial`;
    ctx.textAlign = 'left';
    for (let i = 0; i < 3; i++) {
      ctx.globalAlpha = i < floki.lives ? 1 : 0.15;
      ctx.fillText(i < floki.lives ? '❤️' : '🖤', 12 + i * 22, 40);
    }
    ctx.globalAlpha = 1;

    // Щит-индикатор рядом с сердечками
    if (shieldActive) {
      const shieldFade = shieldTimer < 60 ? shieldTimer / 60 : 1;
      ctx.globalAlpha = shieldFade;
      ctx.font = `${Math.round(14 * hudScale)}px Arial`;
      ctx.fillText('🛡', 12 + 3 * 22, 40);
      ctx.globalAlpha = 1;
    }

    // Фаза — компактно
    const phaseLabel = currentPhase === 1 ? '⚡' : currentPhase === 2 ? '🔥' : '💀';
    ctx.font = `${Math.round(11 * hudScale)}px "DM Mono", monospace`;
    ctx.fillStyle = currentPhase === 1
      ? 'rgba(82,183,136,0.7)'
      : currentPhase === 2
        ? 'rgba(255,160,50,0.8)'
        : 'rgba(200,68,90,0.9)';
    ctx.fillText(phaseLabel, 12, 56);

    // Рекорд
    if (bestScore > 0) {
      ctx.fillStyle = 'rgba(201,168,76,0.6)';
      ctx.font = `${Math.round(11 * hudScale)}px "DM Mono", monospace`;
      ctx.textAlign = 'right';
      ctx.fillText(`🏆 ${bestScore} м`, canvas.width - 12, 40);
    }

    // Цветочки
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(244,238,232,0.8)';
    ctx.font = `bold ${Math.round(13 * hudScale)}px "DM Mono", monospace`;
    ctx.fillText(`🌸 ${flowersGot} / ${FLOWERS_NEED}`, canvas.width - 12, 22);

    // Прогресс-бар цветочков
    const barW = isMobile ? 70 : 90;
    const barX = canvas.width - 12 - barW;
    const barY = 28;
    ctx.fillStyle = 'rgba(244,238,232,0.1)';
    ctx.beginPath();
    ctx.roundRect(barX, barY, barW, 4, 2);
    ctx.fill();
    ctx.fillStyle = '#F0A0B4';
    ctx.beginPath();
    ctx.roundRect(barX, barY, barW * (flowersGot / FLOWERS_NEED), 4, 2);
    ctx.fill();

    // Таймер финального спринта — мерцающий обратный отсчёт над колонкой
    if (speaker && !speaker.reached && speakerSpawned && sprintTimer > 0) {
      const remaining = Math.max(0, SPRINT_LIMIT - sprintTimer);
      const secs = Math.ceil(remaining / 60);
      const urgency = sprintTimer > SPRINT_LIMIT * 0.6;
      if (secs <= 3 || urgency) {
        const blink = urgency ? (Math.floor(frameCount / 8) % 2 === 0) : true;
        if (blink) {
          const sx = Math.min(speaker.x + speaker.w / 2, canvas.width - 30);
          const sy = speaker.y - 18;
          ctx.save();
          ctx.textAlign = 'center';
          ctx.font = `bold ${urgency ? 18 : 15}px "DM Mono", monospace`;
          ctx.fillStyle = urgency ? '#FF4D8F' : '#F0A0B4';
          ctx.shadowColor = '#FF4D8F';
          ctx.shadowBlur = urgency ? 12 : 6;
          ctx.fillText(sprintTimer < SPRINT_LIMIT ? `${secs}…` : '💨', sx, sy);
          ctx.shadowBlur = 0;
          ctx.restore();
        }
      }
    }

    // Стрелка к колонке когда все цветочки собраны
    if (speaker && !speaker.reached && speaker.x < canvas.width) {
      const arrowX = Math.min(speaker.x - 20, canvas.width - 40);
      const arrowY = canvas.height * 0.15;
      // Мигающая стрелка
      if (Math.floor(frameCount / 15) % 2 === 0) {
        ctx.fillStyle = '#FF4D8F';
        ctx.font = 'bold 22px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('→', arrowX, arrowY);
        ctx.font = '11px "DM Mono", monospace';
        ctx.fillStyle = 'rgba(255,160,200,0.8)';
        ctx.fillText('КОЛОНКА', arrowX, arrowY + 18);
      }
    }

    // Подсказка прыжка (первые 3 секунды)
    if (frameCount < 180) {
      const alpha = Math.max(0, 1 - frameCount / 180);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = 'rgba(244,238,232,0.6)';
      ctx.font = '11px "DM Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('ПРОБІЛ / ТАП — стрибок   |   подвійний стрибок теж працює', canvas.width / 2, canvas.height - 12);
      ctx.globalAlpha = 1;
    }
  }

  // --- ЭФФЕКТ УРОНА ---
  let damageFlash = 0;

  function drawDamageFlash() {
    if (damageFlash <= 0) return;
    ctx.fillStyle = `rgba(200,68,90,${damageFlash / 15 * 0.3})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    damageFlash--;
  }

  // --- ТРЯСКА КАМЕРЫ ---
  function applyShake() {
    if (shakeTimer <= 0) return;
    const intensity = shakeTimer * 0.8;
    const sx = (Math.random() - 0.5) * intensity;
    const sy = (Math.random() - 0.5) * intensity;
    ctx.translate(sx, sy);
  }

  // --- FLOAT-UP ТЕКСТ ---
  function drawFloatUps() {
    floatUps = floatUps.filter(f => f.life > 0);
    floatUps.forEach(f => {
      const alpha = f.life / f.maxLife;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.font = 'bold 14px "DM Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = f.text.includes('ЩИТ') ? '#FF4D8F' : '#F0A0B4';
      ctx.shadowColor = f.text.includes('ЩИТ') ? '#FF4D8F' : '#C8445A';
      ctx.shadowBlur = 8;
      ctx.fillText(f.text, f.x, f.y);
      ctx.shadowBlur = 0;
      ctx.restore();
      f.y  -= 1.2;
      f.life--;
    });
  }

  // --- ОБНОВЛЕНИЕ ИГРЫ ---
  function update() {
    if (state !== 'running') return;
    frameCount++;
    score = Math.floor(frameCount / 8);
    scoreEl.textContent = score + ' м';
    // Фазы сложности
    if (score < PHASE1_END) {
      currentPhase = 1;
      speed = BASE_SPEED + score * 0.01;
    } else if (score < PHASE2_END) {
      currentPhase = 2;
      speed = BASE_SPEED + 0.3 + (score - PHASE1_END) * 0.025;
    } else {
      currentPhase = 3;
      speed = BASE_SPEED + 1.8 + (score - PHASE2_END) * 0.015;
    }
    speed = Math.min(speed, 8);

    // Ритм-момент при смене фазы
    if (currentPhase !== prevPhase) {
      prevPhase = currentPhase;
      phaseFreeze = 120; // 2 секунды без препятствий
      const phaseMsg = currentPhase === 2 ? '🔥 Гаряче! Тримайся!' : '💀 Небезпечно!';
      showMessage(phaseMsg, 2000);
    }
    if (phaseFreeze > 0) phaseFreeze--;

    // Флокі физика
    floki.vy += GRAVITY;
    floki.y  += floki.vy;
    if (floki.y >= floki.ground) {
      if (!floki.onGround) {
        squashY = 1.35; squashX = 0.72; // расплющивание при приземлении
      }
      floki.y = floki.ground;
      floki.vy = 0;
      floki.onGround = true;
      floki.doubleJump = false;
    }
    if (floki.invincible > 0) floki.invincible--;

    // Squash & stretch — плавный возврат к нейтральному масштабу
    squashY += (1 - squashY) * 0.22;
    squashX += (1 - squashX) * 0.22;

    // Щит — таймер
    if (shieldActive) {
      shieldTimer--;
      if (shieldTimer <= 0) { shieldActive = false; shieldTimer = 0; }
    }

    // Тряска камеры
    if (shakeTimer > 0) { shakeTimer--; }

    // Обновляем фон
    bgLayers.forEach(layer => {
      layer.items.forEach(item => {
        item.x -= speed * layer.speed;
        if (item.x < -100) item.x += canvas.width + 200;
      });
    });

    // Препятствия — не спавним если все цветочки собраны или идёт пауза фазы
    if (flowersGot < FLOWERS_NEED && phaseFreeze <= 0) {
      spawnTimer++;
      const spawnInterval = currentPhase === 1
        ? Math.max(75, 110 - score * 0.5)
        : currentPhase === 2
          ? Math.max(55, 90 - score * 0.3)
          : Math.max(40, 75 - score * 0.2);
      if (spawnTimer >= spawnInterval) {
        spawnObstacle();
        spawnTimer = 0;
      }
    }
    obstacles = obstacles.filter(o => o.x > -80);
    obstacles.forEach(o => {
      o.x -= speed;
      if (floki.invincible <= 0 && checkCollision(floki, o, 10)) {
        if (shieldActive) {
          // Щит поглощает удар
          shieldActive = false;
          shieldTimer  = 0;
          floki.invincible = 45;
          shakeTimer = 8;
          showMessage('🛡 Щит захистив!', 1200);
          spawnCollectParticles(floki.x + floki.w / 2, floki.y + floki.h / 2, '✨');
        } else {
          floki.lives--;
          floki.invincible = 60;
          damageFlash = 15;
          shakeTimer  = 10;
          squashY = 0.8; squashX = 1.2;
          spawnJumpParticles(floki.x + floki.w / 2, floki.y);
          if (floki.lives <= 0) {
            state = 'dead';
            shakeTimer = 20;
            squashY = 0.5; squashX = 1.5;
            if (score > bestScore) {
              bestScore = score;
              localStorage.setItem('victoria_best_score', bestScore);
            }
            setTimeout(() => showEndOverlay(false), 700);
          }
        }
      }
    });

    // Цветочки
    flowerTimer++;
    if (flowerTimer >= nextFlower && flowersGot < FLOWERS_NEED) {
      spawnFlower();
      flowerTimer = 0;
      nextFlower = 100 + Math.floor(Math.random() * 80);
    }
    flowers.forEach(f => {
      f.x -= speed * 0.85;
      // Плавное опускание
      if (f.y < f.targetY) f.y += f.vy;
      else f.y = f.targetY;

      if (!f.collected && checkCollision(floki, { x: f.x - 16, y: f.y - 16, w: 32, h: 32 }, 0)) {
        f.collected = true;
        flowersGot++;
        spawnCollectParticles(f.x, f.y, f.symbol);

        // Float-up: +1 над головой
        floatUps.push({
          x: floki.x + floki.w / 2,
          y: floki.y - 10,
          text: f.isBonus ? '🌹 ЩИТ!' : '+1 🌸',
          life: 50, maxLife: 50
        });

        // Бонусная роза — активируем щит
        if (f.isBonus) {
          shieldActive = true;
          shieldTimer  = SHIELD_DURATION;
          showMessage('🌹 Бонусна троянда! Щит активовано!', 1800);
        }

        // Все собраны — спавним колонку и убираем препятствия
        if (flowersGot >= FLOWERS_NEED && !speakerSpawned) {
          spawnSpeaker();
          obstacles = [];
          spawnTimer = -9999;
          sprintTimer = 0; // запускаем финальный спринт
          showMessage('🌸 Біжи до колонки!', 2500);
        }
      }
    });
    flowers = flowers.filter(f => f.x > -40);

    // Колонка — финальный спринт с таймером
    if (speaker && !speaker.reached) {
      sprintTimer++;

      // После SPRINT_LIMIT — колонка начинает уплывать вправо
      if (sprintTimer < SPRINT_LIMIT) {
        speaker.x -= speed * 0.8;
      } else {
        // Уплывает вправо — нарастающая скорость
        const escapeSpeed = speed * 0.4 * ((sprintTimer - SPRINT_LIMIT) / 60 + 1);
        speaker.x += escapeSpeed;
        // Если ушла за экран — проигрыш
        if (speaker.x > canvas.width + 100) {
          state = 'dead';
          if (score > bestScore) {
            bestScore = score;
            localStorage.setItem('victoria_best_score', bestScore);
          }
          setTimeout(() => showEndOverlay(false), 500);
          return;
        }
      }

      // Широкая зона касания — margin отрицательный расширяет зону
      if (checkCollision(floki, speaker, -20)) {
        speaker.reached = true;
        placeSpeakerOnFinalStage();

        // Вместо мгновенного финала запускаем кинематографичную микросцену:
        // Флокі касается колонки -> пауза -> колонка просыпается -> music drop -> финальные титры.
        state = 'speakerIgnition';
        ignitionTimer = 0;
        ignitionStarted = false;

        finaleTimer  = 0;
        finaleFlokiX = floki.x;
        bouquetScale = 0;
        textAlpha    = 0;
		
		localStorage.setItem('victoria_game_won', 'true');

        // Сохраняем рекорд
        if (score > bestScore) {
          bestScore = score;
          localStorage.setItem('victoria_best_score', bestScore);
        }
      }
    }
  }

  // --- СООБЩЕНИЕ НА ЭКРАНЕ ---
  let message = null;
  let messageTimer = 0;

  function showMessage(text, duration) {
    message = text;
    messageTimer = Math.floor(duration / (1000 / 60));
  }

  function drawMessage() {
    if (!message || messageTimer <= 0) { message = null; return; }
    const alpha = Math.min(1, messageTimer / 30);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = 'rgba(12,10,11,0.75)';
    ctx.beginPath();
    ctx.roundRect(canvas.width / 2 - 200, canvas.height / 2 - 24, 400, 48, 8);
    ctx.fill();
    ctx.fillStyle = '#F0A0B4';
    ctx.font = 'bold 14px "DM Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(message, canvas.width / 2, canvas.height / 2);
    ctx.restore();
    messageTimer--;
  }

  // --- МУЗЫКА ---
  function playBirthdayMusic() {
    if (!birthdayMusic) return;

    // Полностью глушим background.mp3 и запрещаем ему восстановиться,
    // пока играет happy-birthday.mp3.
    if (window.MusicManager) {
      if (MusicManager.silenceLock) {
        MusicManager.silenceLock(1500);
      } else if (MusicManager.fadeTo) {
        MusicManager.fadeTo(0, 1500);
      }
    }

    birthdayMusic.currentTime = 0;
    birthdayMusic.play().catch(() => {
      document.addEventListener('click', () => birthdayMusic.play(), { once: true });
    });

    // Когда песня закончится — показываем кнопку продолжить
    birthdayMusic.addEventListener('ended', onSongEnd, { once: true });
  }

  function onSongEnd() {
    // После песни можно вернуть background.mp3.
    if (window.MusicManager) {
      if (MusicManager.unlockAndRestore) {
        MusicManager.unlockAndRestore(1500);
      } else if (MusicManager.restore) {
        MusicManager.restore();
      }
    }

    // Показываем оверлей после окончания песни
    showEndOverlay(true);
  }

  function stopMusic() {
    if (birthdayMusic) { birthdayMusic.pause(); birthdayMusic.currentTime = 0; }
    // Восстанавливаем фоновую музыку, если песня была прервана
    if (window.MusicManager) {
      if (MusicManager.unlockAndRestore) {
        MusicManager.unlockAndRestore(1000);
      } else if (MusicManager.restore) {
        MusicManager.restore();
      }
    }
  }

  // --- КОЛЛИЗИЯ ---
  function checkCollision(a, b, margin = 8) {
    return (
      a.x + margin       < b.x + b.w &&
      a.x + a.w - margin > b.x &&
      a.y + margin       < b.y + b.h &&
      a.y + a.h - margin > b.y
    );
  }

  // --- СЦЕНА ВКЛЮЧЕНИЯ КОЛОНКИ ---
  function updateSpeakerIgnition() {
    ignitionTimer++;
    placeSpeakerOnFinalStage();

    // Флокі плавно становится рядом с колонкой, будто специально нажал кнопку.
    const targetX = canvas.width * 0.34;
    finaleFlokiX += (targetX - finaleFlokiX) * 0.045;
    floki.x = finaleFlokiX;
    floki.y = floki.ground;
    floki.onGround = true;

    // Маленькая искра перед музыкальным запуском.
    if (ignitionTimer === 34) {
      spawnVictoryParticles();
    }

    // На этом кадре начинается birthday music — после кинематографичной паузы примерно 2 секунды.
    if (ignitionTimer === 120 && !ignitionStarted) {
      ignitionStarted = true;
      playBirthdayMusic();
      launchConfetti(120);
      showMessage('🎵 Вечірку увімкнено!', 1800);
    }

    // После drop переходим в основной финал с танцем и поздравлением.
    if (ignitionTimer > 152) {
      state = 'finale';
      finaleTimer = 0;
    }
  }

  function drawSpeakerIgnition() {
    drawBackground();

    const darkness = Math.min(0.46, ignitionTimer / 88 * 0.46);

    // Кино-пауза: мир темнеет, внимание концентрируется на колонке.
    ctx.save();
    ctx.fillStyle = `rgba(0, 0, 0, ${darkness})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    if (speaker) {
      const cx = speaker.x + speaker.w / 2;
      const cy = speaker.y + speaker.h / 2;
      const pulse = 1 + Math.sin(ignitionTimer * 0.22) * 0.045;

      drawSpeakerAura(cx, cy, ignitionTimer);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(pulse, pulse);
      ctx.translate(-cx, -cy);
      drawSpeaker();
      ctx.restore();

      drawSpeakerWaves(cx, cy, ignitionTimer);
    }

    // Флокі остаётся героем кадра — лёгкий bob создаёт ощущение ожидания музыки.
    const bob = Math.sin(ignitionTimer * 0.16) * 1.8;
    ctx.save();
    ctx.translate(0, bob);
    drawFloki();
    ctx.restore();

    drawParticles();

    const line1Alpha = Math.min(1, ignitionTimer / 36);
    const line2Alpha = Math.min(1, Math.max(0, (ignitionTimer - 48) / 24));
    const isMobile = canvas.width < 520;

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(255,77,143,0.45)';
    ctx.shadowBlur = 18;

    ctx.globalAlpha = line1Alpha;
    ctx.fillStyle = 'rgba(255,209,225,0.92)';
    ctx.font = `600 ${isMobile ? 11 : 13}px "DM Mono", monospace`;
    ctx.fillText('Флокі знайшов кнопку настрою...', canvas.width / 2, canvas.height * 0.27);

    ctx.globalAlpha = line2Alpha;
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `900 italic ${isMobile ? 22 : 30}px "Helvetica Neue", Arial, sans-serif`;
    ctx.fillText('Зараз почнеться магія', canvas.width / 2, canvas.height * 0.34);
    ctx.restore();
  }

  function drawSpeakerAura(x, y, timer) {
    const glowSize = 90 + Math.sin(timer * 0.14) * 18;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
    gradient.addColorStop(0, 'rgba(255,143,184,0.42)');
    gradient.addColorStop(0.46, 'rgba(255,77,143,0.18)');
    gradient.addColorStop(1, 'rgba(255,77,143,0)');

    ctx.save();
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, glowSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawSpeakerWaves(x, y, timer) {
    ctx.save();

    const maxRadius = canvas.width < 520 ? 105 : 155;
    const bass = state === 'finale'
      ? Math.max(0, Math.sin(finaleTimer * 0.42)) * 0.55 + Math.max(0, Math.sin(finaleTimer * 0.84)) * 0.25
      : 0.25;

    for (let i = 0; i < 5; i++) {
      const progress = ((timer * 0.026) + i * 0.2) % 1;
      const radius = 16 + progress * maxRadius;
      const alpha = (1 - progress) * (0.34 + bass * 0.22);
      const spread = 0.52 + progress * 0.36;

      ctx.globalAlpha = alpha;
      ctx.strokeStyle = 'rgba(255,143,184,0.94)';
      ctx.lineWidth = 1.35 + bass * 1.1 + i * 0.08;
      ctx.lineCap = 'round';

      // Правая сторона — звук уходит вперёд по движению Флокі.
      ctx.beginPath();
      ctx.arc(x, y, radius, -spread, spread);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, radius * 0.66, -spread * 0.78, spread * 0.78);
      ctx.stroke();

      // Левая сторона — теперь колонка ощущается как настоящий источник музыки в пространстве.
      ctx.beginPath();
      ctx.arc(x, y, radius, Math.PI - spread, Math.PI + spread);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, radius * 0.66, Math.PI - spread * 0.78, Math.PI + spread * 0.78);
      ctx.stroke();
    }

    ctx.restore();
  }

  // --- ФИНАЛЬНАЯ СЦЕНА ---
  function updateFinale() {
    finaleTimer++;


    // Фаза 1 (0-50): Флокі бежит к центру экрана и останавливается
    const targetX = canvas.width * 0.38;
    if (finaleTimer < 60) {
      finaleFlokiX += (targetX - finaleFlokiX) * 0.07;
    }
    floki.x = finaleFlokiX;
    floki.y = floki.ground;
    floki.onGround = true;

    // Фаза 2 (50-90): Букет появляется над Флокі с пружиной
    if (finaleTimer > 50 && bouquetScale < 1) {
      bouquetScale = Math.min(1, bouquetScale + 0.05);
    }

    // Фаза 3 (100+): поздравительная карточка мягко появляется сверху.
    // Она больше не всплывает снизу и не перекрывает Флокі.
    if (finaleTimer > 100 && textAlpha < 1) {
      textAlpha = Math.min(1, textAlpha + 0.03);
    }

    // Конфетти — взрыв на кадре 55 когда букет появляется
    if (finaleTimer === 55) {
      spawnVictoryParticles();
      launchConfetti(80);
    }

    // Повторные конфетти
    if (finaleTimer % 90 === 0 && finaleTimer > 55) {
      spawnVictoryParticles();
    }

    // Оверлей показывается только когда песня закончится (см. onSongEnd)
    // FINALE_DURATION = 9999 — финал идёт до конца песни
  }

  // --- РЕНДЕР ФИНАЛЬНОЙ СЦЕНЫ ---
  function drawFinale() {
    placeSpeakerOnFinalStage();
    drawBackground();

    // Колонка остаётся в кадре после старта песни: волны + bass-jump.
    if (speaker) {
      const sx = speaker.x + speaker.w / 2;
      const sy = speaker.y + speaker.h / 2;
      drawSpeakerAura(sx, sy, finaleTimer + 120);
      drawSpeakerWaves(sx, sy, finaleTimer + 120);
      drawSpeaker();
    }

    // === ФЛОКИ танцует — усиленная анимация ===
    const happyBob  = floki.danceBob || Math.sin(finaleTimer * 0.13) * 3;
    // Пританцовывает — лёгкий наклон влево-вправо
    const happyTilt = Math.sin(finaleTimer * 0.18) * 0.12;

    // Сохраняем позицию до зеркалирования
    const flokiCX = floki.x + floki.w / 2;
    const flokiCY = floki.y + floki.h / 2;

    ctx.save();
      ctx.translate(flokiCX, flokiCY + happyBob);
      ctx.rotate(happyTilt);
      ctx.scale(-1, 1);             // зеркало
      ctx.translate(-flokiCX, -flokiCY);
      drawFloki();
    ctx.restore();
    // После restore координаты полностью восстановлены

    // Частицы — в нормальных координатах
    drawParticles();

    // === БУКЕТ над Флокі ===
    if (bouquetScale > 0) {
      const spring = 1 + Math.sin(finaleTimer * 0.18) * 0.04;
      const finalScale = bouquetScale < 1 ? bouquetScale : spring;
      // Рисуем строго в нормальных координатах
      const bx = floki.x + floki.w / 2;
      const by = floki.y - 35;
      drawBouquet(bx, by, finalScale);
    }

    // === ТЕКСТ — верхняя birthday-card, не закрывает Флокі ===
    if (textAlpha > 0) {
      drawBirthdayText(textAlpha, finaleTimer);
    }
  }

  // --- РЕНДЕР БУКЕТА ---
  function drawBouquet(x, y, scale) {
    const flowerEmojis = ['🌸', '🌺', '🌼', '🌻', '💐'];
    const R = 32; // радиус круга цветков

    ctx.save();
    ctx.translate(x, y);

    // Покачивание всего букета
    const sway = Math.sin(finaleTimer * 0.07) * 6;
    ctx.translate(sway, 0);
    ctx.scale(scale, scale);

    // Свечение — большой мягкий круг
    const glow = ctx.createRadialGradient(0, -R * 0.3, 0, 0, -R * 0.3, R * 2.5);
    glow.addColorStop(0,   'rgba(255,160,200,0.45)');
    glow.addColorStop(0.6, 'rgba(200,68,90,0.15)');
    glow.addColorStop(1,   'rgba(200,68,90,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(0, -R * 0.3, R * 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';

    // 4 цветка по кругу
    for (let i = 1; i <= 4; i++) {
      const angle = (Math.PI * 2 / 4) * i - Math.PI / 4;
      const fx    = Math.cos(angle) * R;
      const fy    = Math.sin(angle) * R - R * 0.8;
      const pulse = 1 + 0.07 * Math.sin(finaleTimer * 0.11 + i * 1.4);
      ctx.save();
      ctx.translate(fx, fy);
      ctx.scale(pulse, pulse);
      ctx.font = '22px Arial';
      ctx.fillText(flowerEmojis[i], 0, 0);
      ctx.restore();
    }

    // Центральный цветок — крупнее, поверх остальных
    const centerPulse = 1 + 0.1 * Math.sin(finaleTimer * 0.14);
    ctx.save();
    ctx.translate(0, -R * 1.1);
    ctx.scale(centerPulse, centerPulse);
    ctx.font = '30px Arial';
    ctx.fillText(flowerEmojis[0], 0, 0);
    ctx.restore();

    // Стебли / обёртка
    ctx.strokeStyle = 'rgba(240,160,180,0.7)';
    ctx.lineWidth   = 3;
    ctx.lineCap     = 'round';
    ctx.beginPath();
    ctx.moveTo(-12, 10);
    ctx.quadraticCurveTo(0, 20, 12, 10);
    ctx.stroke();

    // Бант — две петли и узел
    const bx = 0, by = 22;
    ctx.fillStyle   = '#FF4D8F';
    ctx.strokeStyle = '#C8445A';
    ctx.lineWidth   = 1;
    // Левая петля
    ctx.save();
    ctx.translate(bx - 10, by);
    ctx.beginPath();
    ctx.ellipse(0, 0, 9, 6, -0.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,77,143,0.85)';
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    // Правая петля
    ctx.save();
    ctx.translate(bx + 10, by);
    ctx.beginPath();
    ctx.ellipse(0, 0, 9, 6, 0.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,77,143,0.85)';
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    // Узел по центру
    ctx.fillStyle = '#FF2D6B';
    ctx.beginPath();
    ctx.arc(bx, by, 4, 0, Math.PI * 2);
    ctx.fill();
    // Хвостики банта
    ctx.strokeStyle = '#FF4D8F';
    ctx.lineWidth   = 2;
    ctx.beginPath();
    ctx.moveTo(bx - 3, by + 4);
    ctx.quadraticCurveTo(bx - 10, by + 16, bx - 6, by + 22);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(bx + 3, by + 4);
    ctx.quadraticCurveTo(bx + 10, by + 16, bx + 6, by + 22);
    ctx.stroke();

    ctx.restore();
  }

  // --- ПОЗДРАВИТЕЛЬНЫЙ ТЕКСТ — верхняя birthday-card без перекрытия Флокі ---
  function drawBirthdayText(alpha, timer) {
    const isMobile = canvas.width < 520;
    const cx = canvas.width / 2;

    // Карточка появляется в верхней безопасной зоне canvas.
    // Нижняя часть остаётся свободной для Флокі, букета и колонки.
    const finalY  = isMobile ? Math.max(56, canvas.height * 0.20) : Math.max(62, canvas.height * 0.22);
    const startY  = -90;
    const t       = Math.min(1, Math.max(0, (timer - 100) / 70));
    const eased   = 1 - Math.pow(1 - t, 3);
    const currentY = startY + (finalY - startY) * eased;

    const pulse = 1 + Math.sin(timer * 0.075) * 0.012;
    const pw = Math.min(canvas.width * (isMobile ? 0.90 : 0.72), isMobile ? 360 : 500);
    const ph = isMobile ? 70 : 82;
    const px = cx - pw / 2;
    const py = currentY - ph / 2;
    const radius = isMobile ? 14 : 18;

    ctx.save();
    ctx.globalAlpha = alpha;

    // Лёгкий кинематографичный верхний свет: сцена читается, но Флокі не затемняется.
    const halo = ctx.createRadialGradient(cx, currentY, 0, cx, currentY, Math.max(pw, 260));
    halo.addColorStop(0, 'rgba(255,77,143,0.20)');
    halo.addColorStop(0.45, 'rgba(200,68,90,0.08)');
    halo.addColorStop(1, 'rgba(200,68,90,0)');
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, canvas.width, Math.min(canvas.height, currentY + ph * 1.8));

    // Музыкальные волны от колонки к поздравлению — текст становится частью сцены.
    if (speaker) {
      const waveAlpha = alpha * (0.20 + 0.10 * Math.sin(timer * 0.12));
      ctx.save();
      ctx.globalAlpha = waveAlpha;
      ctx.strokeStyle = 'rgba(255,160,200,0.75)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 3; i++) {
        const waveT = (timer * 0.018 + i * 0.32) % 1;
        const sx = speaker.x + speaker.w * 0.52;
        const sy = speaker.y + speaker.h * 0.30;
        const ex = cx + Math.sin(timer * 0.03 + i) * pw * 0.18;
        const ey = currentY + Math.sin(timer * 0.05 + i) * ph * 0.14;
        const mx = sx + (ex - sx) * waveT;
        const my = sy + (ey - sy) * waveT - Math.sin(waveT * Math.PI) * 38;
        ctx.beginPath();
        ctx.arc(mx, my, 6 + i * 3 + waveT * 10, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    }

    ctx.translate(cx, currentY);
    ctx.scale(pulse, pulse);
    ctx.translate(-cx, -currentY);

    // Тень под карточкой
    ctx.shadowColor = 'rgba(200,68,90,0.46)';
    ctx.shadowBlur  = 28;

    // Стеклянная карточка
    const bg = ctx.createLinearGradient(px, py, px + pw, py + ph);
    bg.addColorStop(0, 'rgba(28,12,24,0.86)');
    bg.addColorStop(0.55, 'rgba(10,6,14,0.92)');
    bg.addColorStop(1, 'rgba(44,16,32,0.86)');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.roundRect(px, py, pw, ph, radius);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Верхний блик
    const shine = ctx.createLinearGradient(px, py, px, py + ph);
    shine.addColorStop(0, 'rgba(255,255,255,0.18)');
    shine.addColorStop(0.34, 'rgba(255,255,255,0.04)');
    shine.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = shine;
    ctx.beginPath();
    ctx.roundRect(px + 1, py + 1, pw - 2, ph * 0.48, radius - 2);
    ctx.fill();

    // Неоновая рамка
    const grad = ctx.createLinearGradient(px, py, px + pw, py + ph);
    grad.addColorStop(0,   '#FF4D8F');
    grad.addColorStop(0.45, '#FFD1E1');
    grad.addColorStop(1,   '#C8445A');
    ctx.strokeStyle = grad;
    ctx.lineWidth   = 2;
    ctx.beginPath();
    ctx.roundRect(px, py, pw, ph, radius);
    ctx.stroke();

    // Маленькие искры по краям карточки
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${isMobile ? 14 : 17}px Arial`;
    ctx.shadowColor = '#FF4D8F';
    ctx.shadowBlur = 12;
    ctx.fillText('✨', px + 22, py + 20 + Math.sin(timer * 0.08) * 2);
    ctx.fillText('✨', px + pw - 22, py + ph - 20 + Math.cos(timer * 0.08) * 2);
    ctx.shadowBlur = 0;

    // Главный текст
    const fs = Math.min(pw * (isMobile ? 0.072 : 0.078), isMobile ? 25 : 31);
    ctx.font         = `900 italic ${fs}px "Helvetica Neue", Arial, sans-serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor  = '#FF4D8F';
    ctx.shadowBlur   = 18;
    ctx.fillStyle    = '#FFFFFF';
    ctx.fillText('З днем народження, Віко!', cx, py + ph * 0.38);
    ctx.shadowBlur   = 0;

    // Подпись
    const fs2     = Math.min(pw * (isMobile ? 0.046 : 0.048), isMobile ? 15 : 17);
    ctx.font      = `600 ${fs2}px "DM Mono", monospace`;
    ctx.fillStyle = 'rgba(255,190,215,0.95)';
    ctx.fillText('від Максима і Люби  🩷', cx, py + ph * 0.72);

    ctx.restore();
  }

  // --- ГЛАВНЫЙ ЦИКЛ ---
  function loop() {
    // Микросцена включения колонки — отдельный update/render перед финалом.
    if (state === 'speakerIgnition') {
      try {
        updateSpeakerIgnition();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSpeakerIgnition();
        drawHUD();
      } catch(e) {
        console.warn('Finale scene effect failed:', e);
      }
      rafId = requestAnimationFrame(loop);
      return;
    }

    // Финальная сцена — свой update и render
    if (state === 'finale') {
      try {
        updateFinale();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFinale();
        drawHUD();
      } catch(e) {
        console.warn('Ignition effect failed:', e);
      }
      rafId = requestAnimationFrame(loop);
      return;
    }

    update();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    applyShake();
    drawBackground();
    drawDamageFlash();

    flowers.forEach(drawFlower);
    if (speaker) drawSpeaker();
    obstacles.forEach(drawObstacle);
    drawFloki();
    drawParticles();
    drawFloatUps();
    ctx.restore();
    drawMessage();
    drawHUD();

    // Продолжаем цикл пока running або только что стал finale
    if (state === 'running' || state === 'speakerIgnition' || state === 'finale') {
      rafId = requestAnimationFrame(loop);
    }
  }

  // --- СТАРТ / РЕСТАРТ ---
  function startGame() {
    stopMusic(); // останавливаем happy-birthday если играла

    // Сброс всего
    floki.y          = floki.ground;
    floki.vy         = 0;
    floki.onGround   = true;
    floki.doubleJump = false;
    floki.invincible = 0;
    floki.lives      = 3;
    currentPhase    = 1;

    obstacles      = [];
    flowers        = [];
    particles      = [];
    spawnTimer     = 0;
    flowerTimer    = 0;
    nextFlower     = 120;
    frameCount     = 0;
    score          = 0;
    flowersGot     = 0;
    speaker        = null;
    speakerSpawned = false;
    damageFlash    = 0;
    message        = null;
    messageTimer   = 0;
    state          = 'running';
    finaleTimer    = 0;
    bouquetScale   = 0;
    textAlpha      = 0;
    ignitionTimer  = 0;
    ignitionStarted = false;

    shieldActive   = false;
    shieldTimer    = 0;
    prevPhase      = 1;
    phaseFreeze    = 0;
    sprintTimer    = 0;
    squashY        = 1;
    squashX        = 1;
    shakeTimer     = 0;
    floatUps       = [];

    // Инициализируем фон заново под новый размер
    bgLayers.forEach(layer => { layer.items = []; });
    bgLayers[0].items = Array.from({ length: 12 }, (_, i) => ({
      x: i * (canvas.width / 6), y: 8 + Math.random() * 12,
      r: 2 + Math.random() * 2, phase: Math.random() * Math.PI * 2
    }));
    bgLayers[1].items = Array.from({ length: 6 }, (_, i) => ({
      x: i * (canvas.width / 3) + Math.random() * 80,
      y: groundY() - 80 - Math.random() * 60,
      w: 8 + Math.random() * 16, h: 40 + Math.random() * 40
    }));
    bgLayers[2].items = Array.from({ length: 8 }, (_, i) => ({
      x: i * (canvas.width / 4), y: groundY() + 12, w: 20 + Math.random() * 30, h: 4
    }));

    overlay.classList.remove('runner-overlay-final');
    replayBtn.classList.add('hidden');
    startBtn.dataset.action = 'restart';
    overlay.classList.add('hidden');
    cancelAnimationFrame(rafId);
    loop();
  }

  // --- КОНЕЦ ИГРЫ ---
  function showEndOverlay(win) {
    cancelAnimationFrame(rafId);
    overlay.classList.remove('hidden');
    overlay.classList.toggle('runner-overlay-final', !!win);

    if (win) {
      titleEl.textContent  = 'Пісня закінчилася, але магія залишилася';
      descEl.innerHTML     = `
        <span class="final-card-line">Один маленький герой, одна пісня — і ще один спогад, який тепер залишиться в цій історії.</span>
        <span class="final-card-line final-card-line-spaced">Тепер час відкрити фінальну главу.</span>
      `;
      startBtn.textContent = 'Відкрити фінальну главу';
      startBtn.dataset.action = 'finale';
      replayBtn.classList.remove('hidden');
      launchConfetti(140);
      // Победная карточка теперь работает как нижнее cinematic-послесловие.
    } else {
      overlay.classList.remove('runner-overlay-final');
      titleEl.textContent  = `💔 Флокі втомився (${score} м)`;
      descEl.innerHTML     = `Зібрано квітів: ${flowersGot} / ${FLOWERS_NEED}<br>До колонки потрібно дійти за будь-яку ціну! Спробуй ще!`;
      startBtn.textContent = 'Ще раз!';
      startBtn.dataset.action = 'restart';
      replayBtn.classList.add('hidden');
    }
  }

  // --- УПРАВЛЕНИЕ ---
  function jump() {
    if (state === 'running') floki.jump();
  }

  document.addEventListener('keydown', e => {
    if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); jump(); }
  });

  canvas.addEventListener('click', jump);
  canvas.addEventListener('touchstart', e => { e.preventDefault(); jump(); }, { passive: false });
  startBtn?.addEventListener('click', () => {
    if (startBtn.dataset.action === 'finale') {
      if (window.navigateWithTransition) {
        window.navigateWithTransition('finale.html');
      } else {
        window.location.href = 'finale.html';
      }
      return;
    }
    startGame();
  });

  replayBtn?.addEventListener('click', () => {
    overlay.classList.add('hidden');
    overlay.classList.remove('runner-overlay-final');
    replayBtn.classList.add('hidden');
    startBtn.dataset.action = 'restart';
    if (birthdayMusic) {
      birthdayMusic.pause();
      birthdayMusic.currentTime = 0;
    }
    placeSpeakerOnFinalStage();
    state = 'speakerIgnition';
    ignitionTimer = 0;
    ignitionStarted = false;
    finaleTimer = 0;
    finaleFlokiX = canvas.width * 0.34;
    bouquetScale = 0;
    textAlpha = 0;
    floki.x = canvas.width * 0.34;
    floki.y = floki.ground;
    floki.vx = 0;
    floki.vy = 0;
    floki.onGround = true;
    cancelAnimationFrame(rafId);
    loop();
  });

  // --- ПЕРВЫЙ РЕНДЕР (до старта) ---
  function drawIdle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    // Флокі стоит на месте
    floki.y = floki.ground;
    floki.onGround = true;
    drawFloki();
    frameCount++;
    if (state === 'idle') requestAnimationFrame(drawIdle);
  }
  drawIdle();

})();
