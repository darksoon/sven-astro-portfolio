// AI Snake Game - mit View Transition Support
(function() {
  'use strict';
  
  const GRID = 28;
  const SPEED = 70;
  const RESTART_DELAY = 1800;
  
  let gameState = null;
  let animationId = null;
  
  function getElements() {
    return {
      canvas: document.getElementById('snakeCanvas'),
      score: document.getElementById('score'),
      hiScore: document.getElementById('hiScore'),
      len: document.getElementById('lenVal'),
      tick: document.getElementById('tickVal'),
      sysInfo: document.getElementById('sysInfo'),
      crtScreen: document.getElementById('crtScreen'),
      deathOverlay: document.getElementById('deathOverlay')
    };
  }
  
  function initGame() {
    const el = getElements();
    if (!el.canvas) return false;
    
    // Altes Spiel aufräumen
    if (gameState) {
      if (gameState.loop) clearInterval(gameState.loop);
      gameState = null;
    }
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    
    const ctx = el.canvas.getContext('2d');
    const w = el.canvas.parentElement.clientWidth;
    el.canvas.width = w;
    el.canvas.height = w;
    const cell = w / GRID;
    
    const mid = Math.floor(GRID / 2);
    gameState = {
      el: el,
      ctx: ctx,
      cell: cell,
      snake: [{ x: mid, y: mid }, { x: mid - 1, y: mid }, { x: mid - 2, y: mid }],
      dir: { x: 1, y: 0 },
      food: null,
      score: 0,
      hiScore: parseInt(el.hiScore.textContent) || 0,
      ticks: 0,
      particles: [],
      trail: [],
      isRunning: true,
      loop: null
    };
    
    el.score.textContent = '0';
    el.len.textContent = '3';
    el.tick.textContent = '0';
    el.deathOverlay.classList.remove('active');
    el.crtScreen.classList.remove('glitch');
    
    placeFood();
    gameState.loop = setInterval(gameStep, SPEED);
    render();
    
    return true;
  }
  
  function placeFood() {
    if (!gameState) return;
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID),
        y: Math.floor(Math.random() * GRID)
      };
    } while (gameState.snake.some(s => s.x === newFood.x && s.y === newFood.y));
    gameState.food = newFood;
  }
  
  function ai() {
    if (!gameState) return { x: 0, y: 0 };
    const head = gameState.snake[0];
    const dirs = [{ x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 }];
    
    const safeDirs = dirs.filter(d => {
      if (d.x === -gameState.dir.x && d.y === -gameState.dir.y) return false;
      const nx = head.x + d.x, ny = head.y + d.y;
      if (nx < 0 || nx >= GRID || ny < 0 || ny >= GRID) return false;
      for (let i = 0; i < gameState.snake.length - 1; i++) {
        if (gameState.snake[i].x === nx && gameState.snake[i].y === ny) return false;
      }
      return true;
    });
    
    if (!safeDirs.length) return gameState.dir;
    
    let bestDir = safeDirs[0];
    let bestScore = -Infinity;
    
    for (const d of safeDirs) {
      const nx = head.x + d.x, ny = head.y + d.y;
      const dist = Math.abs(nx - gameState.food.x) + Math.abs(ny - gameState.food.y);
      const space = flood(nx, ny);
      const score = (space >= gameState.snake.length + 2 ? 1000 : 0) - dist;
      if (score > bestScore) {
        bestScore = score;
        bestDir = d;
      }
    }
    return bestDir;
  }
  
  function flood(sx, sy) {
    if (!gameState) return 0;
    const visited = new Set();
    const q = [{ x: sx, y: sy }];
    visited.add(`${sx},${sy}`);
    let count = 0;
    const maxCheck = 400;
    
    while (q.length && count < maxCheck) {
      const { x, y } = q.shift();
      count++;
      const dirs = [{ x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 }];
      for (const d of dirs) {
        const nx = x + d.x, ny = y + d.y;
        const key = `${nx},${ny}`;
        if (nx >= 0 && nx < GRID && ny >= 0 && ny < GRID && 
            !visited.has(key) && 
            !gameState.snake.some((s, i) => i < gameState.snake.length - 1 && s.x === nx && s.y === ny)) {
          visited.add(key);
          q.push({ x: nx, y: ny });
        }
      }
    }
    return count;
  }
  
  function spawnParticles(gx, gy, color, count = 10) {
    if (!gameState) return;
    const cx = (gx + 0.5) * gameState.cell;
    const cy = (gy + 0.5) * gameState.cell;
    for (let i = 0; i < count; i++) {
      const ang = Math.random() * Math.PI * 2;
      const spd = 1 + Math.random() * 3;
      gameState.particles.push({
        x: cx, y: cy,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        life: 1,
        size: 1 + Math.random() * 3,
        color: color
      });
    }
  }
  
  function gameStep() {
    if (!gameState || !gameState.isRunning) return;
    
    gameState.dir = ai();
    const head = { 
      x: gameState.snake[0].x + gameState.dir.x, 
      y: gameState.snake[0].y + gameState.dir.y 
    };
    
    gameState.ticks++;
    gameState.el.tick.textContent = gameState.ticks;
    
    // Kollision
    if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID ||
        gameState.snake.some(s => s.x === head.x && s.y === head.y)) {
      die();
      return;
    }
    
    gameState.trail.push({ x: gameState.snake[0].x, y: gameState.snake[0].y, life: 1 });
    gameState.snake.unshift(head);
    
    // Essen gefunden
    if (head.x === gameState.food.x && head.y === gameState.food.y) {
      gameState.score += 10;
      gameState.el.score.textContent = gameState.score;
      if (gameState.score > gameState.hiScore) {
        gameState.hiScore = gameState.score;
        gameState.el.hiScore.textContent = gameState.hiScore;
      }
      gameState.el.len.textContent = gameState.snake.length;
      spawnParticles(gameState.food.x, gameState.food.y, '#00ff88', 12);
      spawnParticles(gameState.food.x, gameState.food.y, '#00d9ff', 6);
      placeFood();
    } else {
      gameState.snake.pop();
    }
    
    // System Info aktualisieren
    if (gameState.ticks % 20 === 0) {
      const pid = 7700 + Math.floor(Math.random() * 100);
      const mem = (12 + Math.random() * 8).toFixed(1);
      gameState.el.sysInfo.textContent = `PID:${pid} MEM:${mem}MB`;
    }
  }
  
  function die() {
    if (!gameState || !gameState.isRunning) return;
    gameState.isRunning = false;
    clearInterval(gameState.loop);
    gameState.loop = null;
    
    gameState.el.crtScreen.classList.add('glitch');
    gameState.el.deathOverlay.classList.add('active');
    
    setTimeout(() => gameState.el.crtScreen.classList.remove('glitch'), 300);
    
    for (const s of gameState.snake) {
      if (Math.random() < 0.5) spawnParticles(s.x, s.y, '#ff00aa', 4);
    }
    
    setTimeout(() => {
      if (gameState) {
        gameState.el.deathOverlay.classList.remove('active');
        // Neustart
        gameState.snake = [{ x: 14, y: 14 }, { x: 13, y: 14 }, { x: 12, y: 14 }];
        gameState.dir = { x: 1, y: 0 };
        gameState.score = 0;
        gameState.ticks = 0;
        gameState.particles = [];
        gameState.trail = [];
        gameState.el.score.textContent = '0';
        gameState.el.len.textContent = '3';
        gameState.el.tick.textContent = '0';
        gameState.isRunning = true;
        placeFood();
        gameState.loop = setInterval(gameStep, SPEED);
      }
    }, RESTART_DELAY);
  }
  
  function render() {
    if (!gameState) {
      animationId = requestAnimationFrame(render);
      return;
    }
    
    const ctx = gameState.ctx;
    const cell = gameState.cell;
    
    ctx.clearRect(0, 0, gameState.el.canvas.width, gameState.el.canvas.height);
    
    // Grid
    ctx.strokeStyle = 'rgba(0, 255, 136, 0.025)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cell, 0);
      ctx.lineTo(i * cell, gameState.el.canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cell);
      ctx.lineTo(gameState.el.canvas.width, i * cell);
      ctx.stroke();
    }
    
    // Trail
    for (let i = gameState.trail.length - 1; i >= 0; i--) {
      const t = gameState.trail[i];
      t.life -= 0.025;
      if (t.life <= 0) {
        gameState.trail.splice(i, 1);
        continue;
      }
      ctx.fillStyle = `rgba(0, 255, 136, ${t.life * 0.08})`;
      ctx.fillRect(t.x * cell, t.y * cell, cell, cell);
    }
    
    // Snake
    for (let i = gameState.snake.length - 1; i >= 0; i--) {
      const s = gameState.snake[i];
      const prog = 1 - i / gameState.snake.length;
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
      
      // Augen für Kopf
      if (i === 0) {
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        const es = Math.max(2, cell * 0.22);
        if (gameState.dir.x === 1) {
          ctx.fillRect(s.x * cell + cell * 0.6, s.y * cell + cell * 0.2, es, es);
          ctx.fillRect(s.x * cell + cell * 0.6, s.y * cell + cell * 0.62, es, es);
        } else if (gameState.dir.x === -1) {
          ctx.fillRect(s.x * cell + cell * 0.18, s.y * cell + cell * 0.2, es, es);
          ctx.fillRect(s.x * cell + cell * 0.18, s.y * cell + cell * 0.62, es, es);
        } else if (gameState.dir.y === -1) {
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
    ctx.fillRect(gameState.food.x * cell - 2, gameState.food.y * cell - 2, cell + 4, cell + 4);
    ctx.fillStyle = `rgba(255, 0, 170, ${pulse})`;
    ctx.shadowColor = '#ff00aa';
    ctx.shadowBlur = 16;
    ctx.fillRect(gameState.food.x * cell + fp, gameState.food.y * cell + fp, cell - fp * 2, cell - fp * 2);
    ctx.fillStyle = `rgba(255, 150, 220, ${pulse * 0.5})`;
    ctx.shadowBlur = 0;
    const ip = cell * 0.3;
    ctx.fillRect(gameState.food.x * cell + ip, gameState.food.y * cell + ip, cell - ip * 2, cell - ip * 2);
    ctx.strokeStyle = `rgba(255, 0, 170, ${pulse * 0.3})`;
    ctx.lineWidth = 0.5;
    const cx = gameState.food.x * cell + cell / 2;
    const cy = gameState.food.y * cell + cell / 2;
    ctx.beginPath();
    ctx.moveTo(cx, gameState.food.y * cell - 4);
    ctx.lineTo(cx, gameState.food.y * cell + cell + 4);
    ctx.moveTo(gameState.food.x * cell - 4, cy);
    ctx.lineTo(gameState.food.x * cell + cell + 4, cy);
    ctx.stroke();
    
    // Particles
    for (let i = gameState.particles.length - 1; i >= 0; i--) {
      const p = gameState.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.02;
      p.vx *= 0.98;
      p.vy *= 0.98;
      if (p.life <= 0) {
        gameState.particles.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = p.life * 0.8;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    
    animationId = requestAnimationFrame(render);
  }
  
  // Initial start
  function tryStart() {
    if (document.getElementById('snakeCanvas')) {
      initGame();
    }
  }
  
  // Start on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryStart);
  } else {
    tryStart();
  }
  
  // View Transition Support - kompletter Neustart
  document.addEventListener('astro:page-load', () => {
    // Kurze Verzögerung damit DOM bereit ist
    setTimeout(() => {
      if (document.getElementById('snakeCanvas')) {
        initGame();
      }
    }, 50);
  });
  
})();
