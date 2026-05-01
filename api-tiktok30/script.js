/* =========================================
   BIRTHDAY ADEE UTI — JS
   ========================================= */

// ===== MUSIC TOGGLE =====
const bgMusic      = document.getElementById('bgMusic');
const musicToggle  = document.getElementById('musicToggle');
const musicIcon    = musicToggle.querySelector('.music-icon');
let   musicPlaying = false;

musicToggle.addEventListener('click', toggleMusic);

document.addEventListener('click', function autoPlay() {
  if (!musicPlaying) {
    bgMusic.volume = 0.6;
    bgMusic.play().then(() => {
      musicPlaying = true;
      musicToggle.classList.add('playing');
      musicIcon.textContent = '♫';
    }).catch(() => {});
  }
  document.removeEventListener('click', autoPlay);
}, { once: true });

function toggleMusic() {
  if (musicPlaying) {
    bgMusic.pause();
    musicPlaying = false;
    musicToggle.classList.remove('playing');
    musicIcon.textContent = '♪';
  } else {
    bgMusic.play();
    musicPlaying = true;
    musicToggle.classList.add('playing');
    musicIcon.textContent = '♫';
  }
}

// ===== FLOATING PETALS =====
const petalsContainer = document.getElementById('petals');
const petalEmojis     = ['🌸', '🌺', '✿', '❀', '🌷', '✦', '❋'];

function createPetal() {
  const el   = document.createElement('span');
  el.className = 'petal';
  el.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
  el.style.left     = Math.random() * 100 + 'vw';
  el.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
  el.style.animationDuration  = (6 + Math.random() * 8) + 's';
  el.style.animationDelay     = (Math.random() * 5) + 's';
  el.style.opacity = 0.3 + Math.random() * 0.5;
  petalsContainer.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

setInterval(createPetal, 600);
for (let i = 0; i < 10; i++) {
  setTimeout(createPetal, i * 200);
}

// ===== PARTICLE CANVAS =====
const canvas = document.getElementById('particleCanvas');
const ctx    = canvas.getContext('2d');

let W, H, particles = [];

function resizeCanvas() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x    = Math.random() * W;
    this.y    = Math.random() * H;
    this.r    = 0.5 + Math.random() * 1.5;
    this.alpha= 0.05 + Math.random() * 0.25;
    this.vx   = (Math.random() - 0.5) * 0.3;
    this.vy   = -0.1 - Math.random() * 0.3;
    this.life = 1;
    this.decay= 0.002 + Math.random() * 0.003;
    const colors = ['201,150,58','194,88,106','232,192,122'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.x   += this.vx;
    this.y   += this.vy;
    this.life -= this.decay;
    if (this.life <= 0 || this.y < -10) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.alpha * this.life})`;
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== SCROLL ANIMATIONS =====
const observerConfig = { threshold: 0.15, rootMargin: '0px 0px -60px 0px' };

const sceneObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerConfig);

document.querySelectorAll('.scene-inner, .prose-block').forEach(el => {
  sceneObserver.observe(el);
});

// Timeline items
const tlObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 150);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.tl-item').forEach(el => tlObserver.observe(el));

// Wish cards — stagger
const wishObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.wish-card');
      cards.forEach((c, i) => {
        setTimeout(() => c.classList.add('visible'), i * 150);
      });
    }
  });
}, { threshold: 0.1 });

const wishGrid = document.querySelector('.wish-grid');
if (wishGrid) wishObserver.observe(wishGrid);

// ===== CELEBRATE BUTTON — HEART BURST =====
const celebrateBtn = document.getElementById('celebrateBtn');
const heartBurst   = document.getElementById('heartBurst');

celebrateBtn.addEventListener('click', () => {
  launchHearts(40);
  launchConfetti();
  celebrateBtn.textContent = '🎉 Happy Birthday! 🎉';
  setTimeout(() => {
    celebrateBtn.textContent = '🎊 Rayakan! 🎊';
  }, 3000);
});

function launchHearts(count) {
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'burst-heart';
    const angle = (i / count) * 2 * Math.PI + Math.random() * 0.5;
    const dist  = 150 + Math.random() * 250;
    const dx    = Math.cos(angle) * dist;
    const dy    = Math.sin(angle) * dist - 100;
    const emojis = ['❤️','🧡','💛','💚','💙','💜','🩷','✨','🌸','⭐'];
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = '50%';
    el.style.top  = '50%';
    el.style.setProperty('--dx', dx + 'px');
    el.style.setProperty('--dy', dy + 'px');
    el.style.animationDelay    = (Math.random() * 0.3) + 's';
    el.style.animationDuration = (1.5 + Math.random() * 1) + 's';
    heartBurst.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

// Mini confetti on canvas
function launchConfetti() {
  const colors = ['#c2586a','#c9963a','#e8c07a','#e8909a','#fff8f0'];
  const pieces = [];
  for (let i = 0; i < 120; i++) {
    pieces.push({
      x: W / 2,
      y: H / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.5) * 12 - 6,
      r: 3 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      life: 1,
      decay: 0.012 + Math.random() * 0.01,
      rot: Math.random() * Math.PI * 2,
      rotV: (Math.random() - 0.5) * 0.2,
    });
  }

  function drawConfetti() {
    pieces.forEach((p, i) => {
      p.x    += p.vx;
      p.y    += p.vy;
      p.vy   += 0.25; // gravity
      p.rot  += p.rotV;
      p.life -= p.decay;
      p.alpha = p.life;

      if (p.life > 0) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 2);
        ctx.restore();
      }
    });

    const alive = pieces.some(p => p.life > 0);
    if (alive) requestAnimationFrame(drawConfetti);
  }
  requestAnimationFrame(drawConfetti);
}

// ===== TYPEWRITER on climax =====
const climaxSub = document.querySelector('.climax-sub');
const climaxObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'none';
      climaxObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
if (climaxSub) climaxObserver.observe(climaxSub);
