// ============================================
// SNAKE GAME - CRT TERMINAL EDITION
// ============================================

(function() {
  const GRID = 28;
  const SPEED = 70;
  const RESTART_DELAY = 1800;
  
  const canvas = document.getElementById('snakeCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const scoreEl = document.getElementById('score');
  const hiEl = document.getElementById('hiScore');
  const lenEl = document.getElementById('lenVal');
  const tickEl = document.getElementById('tickVal');
  const sysEl = document.getElementById('sysInfo');
  const crtScreen = document.getElementById('crtScreen');
  const deathOverlay = document.getElementById('deathOverlay');
  
  let snake, dir, food, score, hiScore = 0, cell, loop, ticks = 0;
  let particles = [];
  let trail = [];
  
  function resize() {
    const w = canvas.parentElement.clientWidth;
    canvas.width = w;
    canvas.height = w;
    cell = w / GRID;
  }
  
  function init() {
    resize();
    const mid = Math.floor(GRID / 2);
    snake = [
      { x: mid, y: mid },
      { x: mid - 1, y: mid },
      { x: mid - 2, y: mid }
    ];
    dir = { x: 1, y: 0 };
    score = 0;
    ticks = 0;
    particles = [];
    trail = [];
    scoreEl.textContent = '0';
    lenEl.textContent = '3';
    tickEl.textContent = '0';
    deathOverlay.classList.remove('active');
    placeFood();
  }
  
  function placeFood() {
    let p;
    do {
      p = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
    } while (snake.some(s => s.x === p.x && s.y === p.y));
    food = p;
  }
  
  // AI
  function ai() {
    const h = snake[0];
    const moves = [{ x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 }];
    const valid = moves.filter(m => !(m.x === -dir.x && m.y === -dir.y));
    
    function safe(m) {
      const nx = h.x + m.x, ny = h.y + m.y;
      if (nx < 0 || nx >= GRID || ny < 0 || ny >= GRID) return false;
      for (let i = 0; i < snake.length - 1; i++) 
        if (snake[i].x === nx && snake[i].y === ny) return false;
      return true;
    }
    
    function flood(sx, sy) {
      const vis = new Set();
      const q = [{ x: sx, y: sy }];
      vis.add(`${sx},${sy}`);
      let c = 0;
      const max = Math.floor(GRID * GRID * 0.5);
      while (q.length && c < max) {
        const cur = q.shift();
        c++;
        for (const d of moves) {
          const nx = cur.x + d.x, ny = cur.y + d.y;
          const k = `${nx},${ny}`;
          if (nx >= 0 && nx < GRID && ny >= 0 && ny < GRID && !vis.has(k) && 
              !snake.some((s, i) => i < snake.length - 1 && s.x === nx && s.y === ny)) {
            vis.add(k);
            q.push({ x: nx, y: ny });
          }
        }
      }
      return c;
    }
    
    const safeMoves = valid.filter(m => safe(m));
    if (!safeMoves.length) return dir;
    
    let best = safeMoves[0], bestSc = -Infinity;
    for (const m of safeMoves) {
      const nx = h.x + m.x, ny = h.y + m.y;
      const dist = Math.abs(nx - food.x) + Math.abs(ny - food.y);
      const space = flood(nx, ny);
      const sc = space >= snake.length + 2 ? 1000 - dist : space;
      if (sc > bestSc) {
        bestSc = sc;
        best = m;
      }
    }
    return best;
  }
  
  // Particles
  function spawn(x, y, color, count = 10) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3;
      particles.push({
        x: (x + 0.5) * cell,
        y: (y + 0.5) * cell,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        size: 1 + Math.random() * 3,
        color
      });
    }
  }
  
  function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.96;
      p.vy *= 0.96;
      p.life -= 0.03;
      if (p.life <= 0) particles.splice(i, 1);
    }
  }
  
  function drawParticles() {
    for (const p of particles) {
      ctx.globalAlpha = p.life * 0.8;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }
  
  // Update
  function update() {
    dir = ai();
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
    ticks++;
    tickEl.textContent = ticks;
    
    if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID ||
        snake.some(s => s.x === head.x && s.y === head.y)) {
      die();
      return;
    }
    
    trail.push({ x: snake[0].x, y: snake[0].y, life: 1 });
    snake.unshift(head);
    
    if (head.x === food.x && head.y === food.y) {
      score += 10;
      scoreEl.textContent = score;
      if (score > hiScore) {
        hiScore = score;
        hiEl.textContent = hiScore;
      }
      lenEl.textContent = snake.length;
      spawn(food.x, food.y, '#00ff88', 12);
      spawn(food.x, food.y, '#00d9ff', 6);
      placeFood();
    } else {
      snake.pop();
    }
    
    if (ticks % 20 === 0) {
      const pid = 7700 + Math.floor(Math.random() * 100);
      const mem = (12 + Math.random() * 8).toFixed(1);
      sysEl.textContent = `PID:${pid} MEM:${mem}MB`;
    }
  }
  
  function die() {
    clearInterval(loop);
    crtScreen.classList.add('glitch');
    deathOverlay.classList.add('active');
    setTimeout(() => crtScreen.classList.remove('glitch'), 300);
    for (const s of snake) {
      if (Math.random() < 0.5) spawn(s.x, s.y, '#ff00aa', 4);
    }
    setTimeout(() => {
      init();
      start();
    }, RESTART_DELAY);
  }
  
  // Draw
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Grid
    ctx.strokeStyle = 'rgba(0, 255, 136, 0.025)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cell, 0);
      ctx.lineTo(i * cell, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cell);
      ctx.lineTo(canvas.width, i * cell);
      ctx.stroke();
    }
    
    // Trail
    for (let i = trail.length - 1; i >= 0; i--) {
      const t = trail[i];
      t.life -= 0.025;
      if (t.life <= 0) {
        trail.splice(i, 1);
        continue;
      }
      ctx.fillStyle = `rgba(0, 255, 136, ${t.life * 0.08})`;
      ctx.fillRect(t.x * cell, t.y * cell, cell, cell);
    }
    
    // Snake
    for (let i = snake.length - 1; i >= 0; i--) {
      const s = snake[i];
      const prog = 1 - i / snake.length;
      const pad = 1;
      
      if (i === 0) {
        ctx.fillStyle = '#00ffcc';
        ctx.shadowColor = '#00d9ff';
        ctx.shadowBlur = 14;
      } else {
        const r = Math.floor(prog * 10);
        const g = Math.floor(120 + prog * 135);
        const b = Math.floor(60 + prog * 40);
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.shadowColor = `rgba(0, 255, 136, ${0.05 + prog * 0.2})`;
        ctx.shadowBlur = 6;
      }
      
      ctx.fillRect(s.x * cell + pad, s.y * cell + pad, cell - pad * 2, cell - pad * 2);
      
      if (i === 0) {
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        const es = Math.max(2, cell * 0.22);
        if (dir.x === 1) {
          ctx.fillRect(s.x * cell + cell * 0.6, s.y * cell + cell * 0.2, es, es);
          ctx.fillRect(s.x * cell + cell * 0.6, s.y * cell + cell * 0.62, es, es);
        } else if (dir.x === -1) {
          ctx.fillRect(s.x * cell + cell * 0.18, s.y * cell + cell * 0.2, es, es);
          ctx.fillRect(s.x * cell + cell * 0.18, s.y * cell + cell * 0.62, es, es);
        } else if (dir.y === -1) {
          ctx.fillRect(s.x * cell + cell * 0.2, s.y * cell + cell * 0.18, es, es);
          ctx.fillRect(s.x * cell + cell * 0.62, s.y * cell + cell * 0.18, es, es);
        } else {
          ctx.fillRect(s.x * cell + cell * 0.2, s.y * cell + cell * 0.6, es, es);
          ctx.fillRect(s.x * cell + cell * 0.62, s.y * cell + cell * 0.6, es, es);
        }
      }
    }
    ctx.shadowBlur = 0;
    
    // Food
    const pulse = 0.7 + Math.sin(Date.now() * 0.006) * 0.3;
    const fp = 2;
    ctx.fillStyle = `rgba(255, 0, 170, ${pulse * 0.15})`;
    ctx.fillRect(food.x * cell - 2, food.y * cell - 2, cell + 4, cell + 4);
    ctx.fillStyle = `rgba(255, 0, 170, ${pulse})`;
    ctx.shadowColor = '#ff00aa';
    ctx.shadowBlur = 16;
    ctx.fillRect(food.x * cell + fp, food.y * cell + fp, cell - fp * 2, cell - fp * 2);
    ctx.fillStyle = `rgba(255, 150, 220, ${pulse * 0.5})`;
    ctx.shadowBlur = 0;
    const ip = cell * 0.3;
    ctx.fillRect(food.x * cell + ip, food.y * cell + ip, cell - ip * 2, cell - ip * 2);
    ctx.strokeStyle = `rgba(255, 0, 170, ${pulse * 0.3})`;
    ctx.lineWidth = 0.5;
    const cx = food.x * cell + cell / 2;
    const cy = food.y * cell + cell / 2;
    ctx.beginPath();
    ctx.moveTo(cx, food.y * cell - 4);
    ctx.lineTo(cx, food.y * cell + cell + 4);
    ctx.moveTo(food.x * cell - 4, cy);
    ctx.lineTo(food.x * cell + cell + 4, cy);
    ctx.stroke();
    
    updateParticles();
    drawParticles();
  }
  
  function start() {
    loop = setInterval(update, SPEED);
  }
  
  function render() {
    draw();
    requestAnimationFrame(render);
  }
  
  window.addEventListener('resize', resize);
  init();
  start();
  render();
  
  // Expose reset function for View Transitions
  window.snakeGame = { init, start, render };
})();

// View Transition Support
document.addEventListener('astro:page-load', () => {
  if (window.snakeGame && document.getElementById('snakeCanvas')) {
    window.snakeGame.init();
    window.snakeGame.start();
  }
});
