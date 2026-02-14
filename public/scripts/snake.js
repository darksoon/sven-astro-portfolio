// AI Snake Game mit BFS Pathfinding
// Autoplaying Snake für das Portfolio-Widget

(function() {
    'use strict';
    
    // Konfiguration
    const GRID_SIZE = 28;
    const TICK_RATE = 120; // ms
    
    // DOM Elemente
    const canvas = document.getElementById('snakeCanvas');
    if (!canvas) return; // Nicht auf dieser Seite
    
    const ctx = canvas.getContext('2d');
    const scoreEl = document.getElementById('score');
    const hiScoreEl = document.getElementById('hiScore');
    const lenEl = document.getElementById('lenVal');
    const tickEl = document.getElementById('tickVal');
    const sysInfoEl = document.getElementById('sysInfo');
    const crtScreen = document.getElementById('crtScreen');
    const deathOverlay = document.getElementById('deathOverlay');
    
    // Spielzustand
    let snake = [];
    let food = {};
    let direction = { x: 1, y: 0 };
    let nextDirection = { x: 1, y: 0 };
    let cellSize = 0;
    let gameLoop = null;
    let tickCount = 0;
    let hiScore = 0;
    let particles = [];
    let trail = [];
    
    // Canvas Größe anpassen
    function resize() {
        const container = canvas.parentElement;
        const size = container.clientWidth;
        canvas.width = size;
        canvas.height = size;
        cellSize = size / GRID_SIZE;
    }
    
    // Spiel initialisieren
    function initGame() {
        resize();
        
        // Snake in der Mitte starten
        const startX = Math.floor(GRID_SIZE / 2);
        const startY = Math.floor(GRID_SIZE / 2);
        snake = [
            { x: startX, y: startY },
            { x: startX - 1, y: startY },
            { x: startX - 2, y: startY }
        ];
        
        direction = { x: 1, y: 0 };
        nextDirection = { x: 1, y: 0 };
        tickCount = 0;
        particles = [];
        trail = [];
        
        scoreEl.textContent = '0';
        lenEl.textContent = snake.length;
        tickEl.textContent = '0';
        deathOverlay.classList.remove('active');
        crtScreen.classList.remove('glitch');
        
        spawnFood();
        
        // Alten Loop stoppen wenn vorhanden
        if (gameLoop) clearInterval(gameLoop);
        gameLoop = setInterval(gameStep, TICK_RATE);
    }
    
    // Essen spawnen
    function spawnFood() {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE)
            };
        } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        
        food = newFood;
    }
    
    // BFS Pathfinding für AI
    function findPath() {
        const head = snake[0];
        const directions = [
            { x: 0, y: -1 }, // Up
            { x: 0, y: 1 },  // Down
            { x: -1, y: 0 }, // Left
            { x: 1, y: 0 }   // Right
        ];
        
        // Sichere Richtungen finden (nicht in Wand oder Schlange)
        const safeDirections = directions.filter(dir => {
            // Nicht rückwärts
            if (dir.x === -direction.x && dir.y === -direction.y) return false;
            
            const newX = head.x + dir.x;
            const newY = head.y + dir.y;
            
            // Wand check
            if (newX < 0 || newX >= GRID_SIZE || newY < 0 || newY >= GRID_SIZE) return false;
            
            // Eigener Körper check (außer Schwanz, der sich bewegt)
            for (let i = 0; i < snake.length - 1; i++) {
                if (snake[i].x === newX && snake[i].y === newY) return false;
            }
            
            return true;
        });
        
        if (safeDirections.length === 0) return direction; // Keine sichere Richtung
        
        // BFS für kürzesten Weg zum Essen
        let bestDir = safeDirections[0];
        let bestScore = -Infinity;
        
        for (const dir of safeDirections) {
            const newX = head.x + dir.x;
            const newY = head.y + dir.y;
            
            // Manhattan Distanz zum Essen
            const distToFood = Math.abs(newX - food.x) + Math.abs(newY - food.y);
            
            // BFS für verfügbaren Platz (Flood Fill)
            const openSpace = floodFill(newX, newY);
            
            // Score berechnen
            // Priorität: Nah am Essen, aber nur wenn genug Platz
            const spaceBonus = openSpace >= snake.length + 2 ? 1000 : 0;
            const score = spaceBonus - distToFood;
            
            if (score > bestScore) {
                bestScore = score;
                bestDir = dir;
            }
        }
        
        return bestDir;
    }
    
    // Flood Fill für verfügbaren Platz
    function floodFill(startX, startY) {
        const visited = new Set();
        const queue = [{ x: startX, y: startY }];
        visited.add(`${startX},${startY}`);
        
        let count = 0;
        const maxCheck = 400; // Limit für Performance
        
        while (queue.length > 0 && count < maxCheck) {
            const { x, y } = queue.shift();
            count++;
            
            const dirs = [{ x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 }];
            for (const dir of dirs) {
                const nx = x + dir.x;
                const ny = y + dir.y;
                const key = `${nx},${ny}`;
                
                if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE && 
                    !visited.has(key) && 
                    !snake.some((seg, i) => i < snake.length - 1 && seg.x === nx && seg.y === ny)) {
                    visited.add(key);
                    queue.push({ x: nx, y: ny });
                }
            }
        }
        
        return count;
    }
    
    // Spiel-Schritt
    function gameStep() {
        // AI Richtung berechnen
        nextDirection = findPath();
        direction = nextDirection;
        
        // Neue Kopfposition
        const head = snake[0];
        const newHead = {
            x: head.x + direction.x,
            y: head.y + direction.y
        };
        
        tickCount++;
        tickEl.textContent = tickCount;
        
        // Kollision mit Wand
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
            gameOver();
            return;
        }
        
        // Kollision mit sich selbst
        if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
            gameOver();
            return;
        }
        
        // Schlange bewegen
        snake.unshift(newHead);
        
        // Trail für Visual Effect
        trail.push({ x: newHead.x, y: newHead.y, life: 1.0 });
        if (trail.length > 20) trail.shift();
        
        // Essen gefressen?
        if (newHead.x === food.x && newHead.y === food.y) {
            // Partikel-Effekt
            createParticles(food.x, food.y, '#00d9ff');
            
            // Score aktualisieren
            const score = parseInt(scoreEl.textContent) + 10;
            scoreEl.textContent = score;
            if (score > hiScore) {
                hiScore = score;
                hiScoreEl.textContent = hiScore;
            }
            
            lenEl.textContent = snake.length;
            
            // Neues Essen
            spawnFood();
        } else {
            // Schwanz entfernen wenn kein Essen
            snake.pop();
        }
        
        // Zeichnen
        draw();
    }
    
    // Partikel erstellen
    function createParticles(gx, gy, color, count = 10) {
        const cx = (gx + 0.5) * cellSize;
        const cy = (gy + 0.5) * cellSize;
        
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 3;
            particles.push({
                x: cx,
                y: cy,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                size: 1 + Math.random() * 3,
                color: color
            });
        }
    }
    
    // Zeichnen
    function draw() {
        // Clear
        ctx.fillStyle = '#0a0a0f';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Trail zeichnen
        trail.forEach(t => {
            t.life -= 0.05;
            if (t.life > 0) {
                ctx.fillStyle = `rgba(0, 217, 255, ${t.life * 0.3})`;
                ctx.fillRect(t.x * cellSize, t.y * cellSize, cellSize, cellSize);
            }
        });
        trail = trail.filter(t => t.life > 0);
        
        // Gitter (subtil)
        ctx.strokeStyle = 'rgba(0, 217, 255, 0.05)';
        ctx.lineWidth = 0.5;
        for (let i = 0; i <= GRID_SIZE; i++) {
            ctx.beginPath();
            ctx.moveTo(i * cellSize, 0);
            ctx.lineTo(i * cellSize, canvas.height);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, i * cellSize);
            ctx.lineTo(canvas.width, i * cellSize);
            ctx.stroke();
        }
        
        // Schlange zeichnen
        snake.forEach((segment, i) => {
            const x = segment.x * cellSize;
            const y = segment.y * cellSize;
            
            if (i === 0) {
                // Kopf
                ctx.fillStyle = '#ff3366';
                ctx.shadowColor = '#ff3366';
                ctx.shadowBlur = 10;
            } else {
                // Körper
                const alpha = 1 - (i / snake.length) * 0.5;
                ctx.fillStyle = `rgba(0, 217, 255, ${alpha})`;
                ctx.shadowColor = '#00d9ff';
                ctx.shadowBlur = 5;
            }
            
            ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
            ctx.shadowBlur = 0;
        });
        
        // Essen zeichnen
        const fx = food.x * cellSize;
        const fy = food.y * cellSize;
        ctx.fillStyle = '#00ff41';
        ctx.shadowColor = '#00ff41';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(fx + cellSize/2, fy + cellSize/2, cellSize/2 - 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Partikel zeichnen
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02;
            p.vx *= 0.98;
            p.vy *= 0.98;
            
            if (p.life > 0) {
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        });
        particles = particles.filter(p => p.life > 0);
        
        // Scanline-Effekt
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        for (let i = 0; i < canvas.height; i += 4) {
            ctx.fillRect(0, i, canvas.width, 2);
        }
    }
    
    // Game Over
    function gameOver() {
        clearInterval(gameLoop);
        crtScreen.classList.add('glitch');
        deathOverlay.classList.add('active');
        
        // Nach 3 Sekunden neu starten
        setTimeout(() => {
            crtScreen.classList.remove('glitch');
            deathOverlay.classList.remove('active');
            initGame();
        }, 3000);
    }
    
    // Window Resize Handler
    window.addEventListener('resize', resize);
    
    // Initialisierung
    initGame();
    
    // Expose reset function for View Transitions
    window.snakeReset = initGame;
    
})();
