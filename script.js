/* ============================================================
   SYNCRA — SCI-FI TEAM PORTFOLIO
   script.js
   ============================================================ */

'use strict';

/* ── Team Data ──────────────────────────────────────────── */
const MEMBERS = [
  {
    id:        '001',
    firstName: 'MARK DWAYNE',
    lastName:  'DELA CRUZ',
    fullName:  'Mark Dwayne Dela Cruz',
    age:       '20',
    role:      'Full Stack Developer',
    school:    'National University Manila',
    bio:       'A passionate developer and valued member of Team Syncra. Dedicated to building innovative solutions for the capstone project.',
    linkedin:  'https://www.linkedin.com/in/markdwaynedelacruz/',
    github:    'https://github.com/cwossant',
    email:     'mailto:#',
    // To use a real photo, replace the placeholder below with the image path or URL.
    // Example: photo: 'photos/mark.jpg'
    photo:     null,
    avatarSeed:'Mark+Dela+Cruz',
  },
  {
    id:        '002',
    firstName: 'YHVHAN',
    lastName:  'SUBA',
    fullName:  'Yhvhan Suba',
    age:       '20',
    role:      'Full Stack Developer',
    school:    'National University Manila',
    bio:       'A passionate developer and valued member of Team Syncra. Dedicated to building innovative solutions for the capstone project.',
    linkedin:  'https://www.linkedin.com/in/yhvhan-suba-4b985339b/',
    github:    '#',
    email:     'mailto:#',
    // To use a real photo, replace the placeholder below with the image path or URL.
    // Example: photo: 'photos/yhvhan.jpg'
    photo:     null,
    avatarSeed:'Yhvhan+Suba',
  },
  {
    id:        '003',
    firstName: 'KYLE',
    lastName:  'ZOLETA',
    fullName:  'Kyle Zoleta',
    age:       '20',
    role:      'Full Stack Developer',
    school:    'National University Manila',
    bio:       'A passionate developer and valued member of Team Syncra. Dedicated to building innovative solutions for the capstone project.',
    linkedin:  'https://www.linkedin.com/in/kyle-zoleta-moesoft/',
    github:    '#',
    email:     'mailto:#',
    // To use a real photo, replace the placeholder below with the image path or URL.
    // Example: photo: 'photos/kyle.jpg'
    photo:     null,
    avatarSeed:'Kyle+Zoleta',
  },
  {
    id:        '004',
    firstName: 'HARRY',
    lastName:  'LAGTO',
    fullName:  'Harry Lagto',
    age:       '20',
    role:      'Full Stack Developer',
    school:    'National University Manila',
    bio:       'A passionate developer and valued member of Team Syncra. Dedicated to building innovative solutions for the capstone project.',
    linkedin:  'https://www.linkedin.com/in/harry-nielsen-lagto-5a6776307/',
    github:    'https://github.com/hakkai-asf',
    email:     'mailto:#',
    // To use a real photo, replace the placeholder below with the image path or URL.
    // Example: photo: 'photos/harry.jpg'
    photo:     null,
    avatarSeed:'Harry+Lagto',
  },
  {
    id:        '005',
    firstName: 'BRUCE',
    lastName:  'CUEVAS',
    fullName:  'Bruce Cuevas',
    age:       '20',
    role:      'Full Stack Developer',
    school:    'National University Manila',
    bio:       'A passionate developer and valued member of Team Syncra. Dedicated to building innovative solutions for the capstone project.',
    linkedin:  'https://www.linkedin.com/in/wilhem-bruce-cuevas-452554379/',
    github:    '#',
    email:     'mailto:#',
    // To use a real photo, replace the placeholder below with the image path or URL.
    // Example: photo: 'photos/bruce.jpg'
    photo:     null,
    avatarSeed:'Bruce+Cuevas',
  },
  {
    id:        '006',
    firstName: 'DAVID',
    lastName:  'JAMANDRE',
    fullName:  'David Jamandre',
    age:       '21',
    role:      'Full Stack Developer',
    school:    'National University Manila',
    bio:       'A passionate developer and valued member of Team Syncra. Dedicated to building innovative solutions for the capstone project.',
    linkedin:  'https://www.linkedin.com/in/david-jamandre-57ab2a278/',
    github:    '#',
    email:     'mailto:#',
    // To use a real photo, replace the placeholder below with the image path or URL.
    // Example: photo: 'photos/david.jpg'
    photo:     null,
    avatarSeed:'David+Jamandre',
  },
];

/* ── Theme accent colours for particle canvas ───────────── */
const THEME_COLORS = {
  cyan:   { r: 0,   g: 240, b: 255 },
  purple: { r: 191, g: 0,   b: 255 },
  green:  { r: 0,   g: 255, b: 65  },
  red:    { r: 255, g: 0,   b: 60  },
  gold:   { r: 255, g: 215, b: 0   },
};

/* ═══════════════════════════════════════════════════════════
   PARTICLE SYSTEM
   ═══════════════════════════════════════════════════════════ */
const ParticleSystem = (() => {
  const canvas  = document.getElementById('particle-canvas');
  const ctx     = canvas.getContext('2d');

  let W, H, particles, animId;
  let currentColor = THEME_COLORS.cyan;

  /* Resize handler */
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  /* Particle factory */
  function createParticle() {
    const speed  = Math.random() * 0.4 + 0.1;
    const angle  = Math.random() * Math.PI * 2;
    return {
      x:     Math.random() * W,
      y:     Math.random() * H,
      vx:    Math.cos(angle) * speed,
      vy:    Math.sin(angle) * speed,
      size:  Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,   // phase offset
      type:  Math.random() < 0.08 ? 'star' : 'dot',
    };
  }

  /* Init particles */
  function init() {
    resize();
    const count = Math.min(Math.floor((W * H) / 8000), 200);
    particles   = Array.from({ length: count }, createParticle);
  }

  /* Draw a 4-point star */
  function drawStar(x, y, r, alpha) {
    const { r: cr, g: cg, b: cb } = currentColor;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = `rgba(${cr},${cg},${cb},1)`;
    ctx.shadowColor = `rgba(${cr},${cg},${cb},0.8)`;
    ctx.shadowBlur  = 6;
    ctx.beginPath();
    ctx.moveTo(x, y - r * 2.5);
    ctx.lineTo(x + r * 0.4, y - r * 0.4);
    ctx.lineTo(x + r * 2.5, y);
    ctx.lineTo(x + r * 0.4, y + r * 0.4);
    ctx.lineTo(x, y + r * 2.5);
    ctx.lineTo(x - r * 0.4, y + r * 0.4);
    ctx.lineTo(x - r * 2.5, y);
    ctx.lineTo(x - r * 0.4, y - r * 0.4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  /* Draw connection lines between close particles */
  function drawConnections() {
    const { r: cr, g: cg, b: cb } = currentColor;
    const maxDist = 120;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.12;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha})`;
          ctx.lineWidth   = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  /* Main animation loop */
  function animate(t = 0) {
    animId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, W, H);

    const { r: cr, g: cg, b: cb } = currentColor;

    drawConnections();

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += 0.02;

      /* wrap around edges */
      if (p.x < 0)  p.x = W;
      if (p.x > W)  p.x = 0;
      if (p.y < 0)  p.y = H;
      if (p.y > H)  p.y = 0;

      const alpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));

      if (p.type === 'star') {
        drawStar(p.x, p.y, p.size * 0.8, alpha);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle   = `rgba(${cr},${cg},${cb},${alpha})`;
        ctx.shadowColor = `rgba(${cr},${cg},${cb},${alpha * 1.5})`;
        ctx.shadowBlur  = 6;
        ctx.fill();
        ctx.shadowBlur  = 0;
      }
    }
  }

  /* Public API */
  function start() {
    init();
    animate();
    window.addEventListener('resize', () => {
      resize();
      init();
    });
  }

  function setColor(themeName) {
    currentColor = THEME_COLORS[themeName] || THEME_COLORS.cyan;
  }

  return { start, setColor };
})();

/* ═══════════════════════════════════════════════════════════
   TYPING EFFECT
   ═══════════════════════════════════════════════════════════ */
const TypingEffect = (() => {
  const lines = [
    'CAPSTONE PROJECT TEAM',
    'NATIONAL UNIVERSITY MANILA',
    'SIX MEMBERS. ONE VISION.',
    'BUILDING THE FUTURE.',
  ];

  let lineIdx   = 0;
  let charIdx   = 0;
  let deleting  = false;
  let pauseTick = 0;
  const PAUSE   = 60;   // frames to pause at end of word

  const el = document.getElementById('typingText');

  function tick() {
    if (!el) return;
    const current = lines[lineIdx];

    if (pauseTick > 0) {
      pauseTick--;
      setTimeout(tick, 16);
      return;
    }

    if (!deleting) {
      charIdx++;
      el.textContent = current.slice(0, charIdx);
      if (charIdx >= current.length) {
        deleting  = true;
        pauseTick = PAUSE;
      }
      setTimeout(tick, 80);
    } else {
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if (charIdx <= 0) {
        deleting = false;
        lineIdx  = (lineIdx + 1) % lines.length;
      }
      setTimeout(tick, 40);
    }
  }

  return { start: tick };
})();

/* ═══════════════════════════════════════════════════════════
   MODAL
   ═══════════════════════════════════════════════════════════ */
const Modal = (() => {
  const overlay   = document.getElementById('modalOverlay');
  const backdrop  = document.getElementById('modalBackdrop');
  const closeBtn  = document.getElementById('modalClose');
  const avatar    = document.getElementById('modalAvatar');
  const idEl      = document.getElementById('modalId');
  const nameEl    = document.getElementById('modalName');
  const roleEl    = document.getElementById('modalRole');
  const roleDetail= document.getElementById('modalRoleDetail');
  const ageEl     = document.getElementById('modalAge');
  const schoolEl  = document.getElementById('modalSchool');
  const bioEl     = document.getElementById('modalBio');
  const linkedinEl= document.getElementById('modalLinkedIn');
  const githubEl  = document.getElementById('modalGitHub');
  const emailEl   = document.getElementById('modalEmail');

  let isOpen = false;

  /* Get current theme accent colour hex */
  function getAccentHex() {
    const theme = document.body.getAttribute('data-theme') || 'cyan';
    const map   = {
      cyan:   '00f0ff',
      purple: 'bf00ff',
      green:  '00ff41',
      red:    'ff003c',
      gold:   'ffd700',
    };
    return map[theme] || '00f0ff';
  }

  function open(index) {
    const m     = MEMBERS[index];
    const color = getAccentHex();

    /* Use real photo if provided, otherwise fall back to generated avatar */
    avatar.src = m.photo
      ? m.photo
      : `https://ui-avatars.com/api/?name=${m.avatarSeed}&background=0a0e1a&color=${color}&size=200&bold=true&format=png`;
    avatar.alt   = m.fullName;
    idEl.textContent      = `[ ID:${m.id} ]`;
    nameEl.textContent    = m.fullName;
    roleEl.textContent    = m.role;
    roleDetail.textContent= m.role;
    ageEl.textContent     = m.age;
    schoolEl.textContent  = m.school;
    bioEl.textContent     = m.bio;

    /* Links */
    linkedinEl.href = m.linkedin;
    githubEl.href   = m.github;
    emailEl.href    = m.email;

    /* Disable dead links visually */
    [linkedinEl, githubEl, emailEl].forEach(link => {
      if (link.getAttribute('href') === '#' || link.getAttribute('href') === 'mailto:#') {
        link.style.opacity = '0.4';
        link.style.pointerEvents = 'none';
        link.title = 'Link not available';
      } else {
        link.style.opacity = '';
        link.style.pointerEvents = '';
        link.title = '';
      }
    });

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    isOpen = true;

    /* Announce for accessibility */
    overlay.setAttribute('aria-label', `Profile of ${m.fullName}`);
    closeBtn.focus();
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    isOpen = false;
  }

  /* Close on backdrop click */
  backdrop.addEventListener('click', close);

  /* Close button */
  closeBtn.addEventListener('click', close);

  /* Escape key */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) close();
  });

  /* Trap focus inside modal */
  overlay.addEventListener('keydown', e => {
    if (!isOpen || e.key !== 'Tab') return;
    const focusable = overlay.querySelectorAll(
      'button, a[href], [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  });

  return { open, close };
})();

/* ═══════════════════════════════════════════════════════════
   CARD INTERACTIONS
   ═══════════════════════════════════════════════════════════ */
function initCards() {
  const cards = document.querySelectorAll('.member-card');

  cards.forEach(card => {
    /* Click */
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-member'), 10);
      Modal.open(idx);
      card.classList.add('card-clicked');
      setTimeout(() => card.classList.remove('card-clicked'), 300);
    });

    /* Keyboard: Enter / Space */
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });

    /* 3D tilt on mouse move */
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const tiltX  = dy * -8;
      const tiltY  = dx *  8;
      card.style.transform = `translateY(-8px) perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   THEME SWITCHER
   ═══════════════════════════════════════════════════════════ */
function initTheme() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const panel     = document.getElementById('themePanel');
  const themeBtns = document.querySelectorAll('.theme-btn');

  /* Load saved theme */
  const saved = localStorage.getItem('syncra-theme') || 'cyan';
  applyTheme(saved);

  /* Toggle panel */
  toggleBtn.addEventListener('click', e => {
    e.stopPropagation();
    panel.classList.toggle('open');
  });

  /* Close panel on outside click */
  document.addEventListener('click', e => {
    if (!panel.contains(e.target) && e.target !== toggleBtn) {
      panel.classList.remove('open');
    }
  });

  /* Theme buttons */
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      applyTheme(theme);
      panel.classList.remove('open');
    });
  });

  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('syncra-theme', theme);
    ParticleSystem.setColor(theme);

    /* Update active button state */
    themeBtns.forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-theme') === theme);
    });

    /* Update avatar colours in cards */
    updateAvatarColors(theme);
  }

  function updateAvatarColors(theme) {
    const colorMap = {
      cyan:   '00f0ff',
      purple: 'bf00ff',
      green:  '00ff41',
      red:    'ff003c',
      gold:   'ffd700',
    };
    const color = colorMap[theme] || '00f0ff';

    document.querySelectorAll('.avatar-img').forEach((img, i) => {
      const member = MEMBERS[i];
      if (!member) return;
      /* Only update if still using the generated placeholder, not a real photo */
      if (!member.photo) {
        img.src = `https://ui-avatars.com/api/?name=${member.avatarSeed}&background=0a0e1a&color=${color}&size=200&bold=true&format=png`;
      }
    });
  }
}

/* ═══════════════════════════════════════════════════════════
   SCROLL-TRIGGERED ANIMATIONS (IntersectionObserver)
   ═══════════════════════════════════════════════════════════ */
function initScrollAnimations() {
  const targets = document.querySelectorAll('.member-card, .section-header');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => {
    /* Pause entrance animation until in view */
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
}

/* ═══════════════════════════════════════════════════════════
   GLITCH FLICKER (random hero title glitch)
   ═══════════════════════════════════════════════════════════ */
function initGlitch() {
  const glitch = document.querySelector('.glitch');
  if (!glitch) return;

  setInterval(() => {
    if (Math.random() < 0.15) {
      glitch.classList.add('glitch-active');
      setTimeout(() => glitch.classList.remove('glitch-active'), 120 + Math.random() * 180);
    }
  }, 1800);
}

/* ═══════════════════════════════════════════════════════════
   HUD LIVE CLOCK (top-left corner decoration)
   ═══════════════════════════════════════════════════════════ */
function initHUDClock() {
  const hudTL = document.querySelector('.hero .hud-tl');
  if (!hudTL) return;

  const clock = document.createElement('div');
  clock.style.cssText = `
    position: absolute;
    top: 24px; left: 60px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.55rem;
    letter-spacing: 0.15em;
    color: var(--accent-dim);
    opacity: 0.6;
    pointer-events: none;
    white-space: nowrap;
  `;
  document.querySelector('.hero').appendChild(clock);

  function tick() {
    const now  = new Date();
    const pad  = n => String(n).padStart(2, '0');
    clock.textContent = `SYS:${now.getFullYear()}.${pad(now.getMonth()+1)}.${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  }
  tick();
  setInterval(tick, 1000);
}

/* ═══════════════════════════════════════════════════════════
   SMOOTH SCROLL for any anchor links
   ═══════════════════════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   RIPPLE EFFECT on card click
   ═══════════════════════════════════════════════════════════ */
function initRipple() {
  document.querySelectorAll('.member-card').forEach(card => {
    card.addEventListener('click', e => {
      const ripple = document.createElement('span');
      const rect   = card.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height) * 2;
      const x      = e.clientX - rect.left - size / 2;
      const y      = e.clientY - rect.top  - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(var(--accent-rgb), 0.25) 0%, transparent 60%);
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
        animation: rippleAnim 0.6s ease-out forwards;
        z-index: 10;
      `;

      card.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  /* Inject ripple keyframe dynamically */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleAnim {
      to { transform: scale(1); opacity: 0; }
    }
    .card-clicked {
      filter: brightness(1.3);
    }
  `;
  document.head.appendChild(style);
}

/* ═══════════════════════════════════════════════════════════
   MATRIX RAIN EFFECT (subtle, on hero section only)
   ═══════════════════════════════════════════════════════════ */
function initMatrixRain() {
  const hero   = document.querySelector('.hero');
  const canvas = document.createElement('canvas');
  const ctx    = canvas.getContext('2d');

  canvas.style.cssText = `
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none;
    opacity: 0.04;
    z-index: 1;
  `;
  hero.appendChild(canvas);

  const chars  = 'SYNCRA01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモ';
  let cols, drops;

  function resize() {
    canvas.width  = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
    cols  = Math.floor(canvas.width / 16);
    drops = Array(cols).fill(1);
  }

  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.fillStyle = 'rgba(2,6,16,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const theme = document.body.getAttribute('data-theme') || 'cyan';
    const colorMap = {
      cyan:   '#00f0ff', purple: '#bf00ff',
      green:  '#00ff41', red:    '#ff003c', gold: '#ffd700',
    };
    ctx.fillStyle = colorMap[theme] || '#00f0ff';
    ctx.font      = '13px Share Tech Mono, monospace';

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * 16, drops[i] * 16);
      if (drops[i] * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  setInterval(draw, 60);
}

/* ═══════════════════════════════════════════════════════════
   BOOT SEQUENCE (one-time startup flash)
   ═══════════════════════════════════════════════════════════ */
function initBootSequence() {
  const boot = document.createElement('div');
  boot.style.cssText = `
    position: fixed; inset: 0; z-index: 99999;
    background: #020610;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 12px;
    font-family: 'Share Tech Mono', monospace;
    color: var(--accent, #00f0ff);
    transition: opacity 0.5s ease;
  `;

  const lines = [
    '> INITIALIZING SYNCRA OS...',
    '> LOADING PERSONNEL DATABASE...',
    '> ESTABLISHING SECURE CONNECTION...',
    '> RENDERING INTERFACE...',
    '> SYSTEM READY.',
  ];

  let html = '';
  lines.forEach((l, i) => {
    html += `<div style="
      font-size: 0.7rem;
      letter-spacing: 0.2em;
      opacity: 0;
      animation: bootLine 0.3s ${i * 0.25}s forwards;
    ">${l}</div>`;
  });

  /* Progress bar */
  html += `<div style="
    margin-top: 24px;
    width: 260px; height: 2px;
    background: rgba(0,240,255,0.15);
    border-radius: 1px;
    overflow: hidden;
  ">
    <div style="
      height: 100%;
      background: var(--accent, #00f0ff);
      box-shadow: 0 0 8px var(--accent, #00f0ff);
      width: 0%;
      animation: bootBar 1.2s 0.2s forwards ease-out;
    "></div>
  </div>`;

  boot.innerHTML = html;
  document.body.appendChild(boot);

  /* Inject keyframes */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes bootLine {
      from { opacity: 0; transform: translateX(-10px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes bootBar {
      from { width: 0%; }
      to   { width: 100%; }
    }
  `;
  document.head.appendChild(style);

  /* Fade out after boot */
  setTimeout(() => {
    boot.style.opacity = '0';
    setTimeout(() => boot.remove(), 500);
  }, 1800);
}

/* ═══════════════════════════════════════════════════════════
   INIT — Run everything on DOMContentLoaded
   ═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initBootSequence();

  /* Delay main init slightly so boot screen shows */
  setTimeout(() => {
    ParticleSystem.start();
    TypingEffect.start();
    initTheme();
    initCards();
    initRipple();
    initGlitch();
    initHUDClock();
    initMatrixRain();
    initScrollAnimations();
    initSmoothScroll();
  }, 100);
});
