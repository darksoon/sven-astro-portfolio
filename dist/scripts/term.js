// Live Homelab Stats - fetcht stats.json und aktualisiert Terminal-Widget
const LiveStats = {
  statsUrl: '/manifest.json',
  
  async init() {
    try {
      const res = await fetch(this.statsUrl + '?t=' + Date.now());
      if (!res.ok) return;
      const data = await res.json();
      this.updateNeofetch(data.system);
      this.updateDocker(data.containers);
      this.updateLiveIndicator(data.timestamp);
    } catch (e) {
      // Daten nicht verfügbar - statische Werte bleiben
    }
  },
  
  updateNeofetch(sys) {
    if (!sys) return;
    const grid = document.querySelector('.status-grid');
    if (!grid) return;
    
    const values = grid.querySelectorAll('.status-value');
    if (values.length >= 5) {
      values[0].textContent = sys.os;
      values[1].textContent = sys.uptime;
      values[2].textContent = sys.storage_total + ' / ' + sys.storage_percent + '%';
      values[3].textContent = sys.ram_used + ' / ' + sys.ram_percent + '%';
      
      const running = sys.containers_running ?? 0;
      const total = sys.containers_total ?? 0;
      const allUp = running === total && total > 0;
      values[4].textContent = running + '/' + total + ' ' + (allUp ? '🟢' : '🟡');
    }
  },
  
  updateDocker(containers) {
    if (!containers || !containers.length) return;
    const list = document.querySelector('.docker-list');
    if (!list) return;
    
    list.innerHTML = '';
    containers.forEach(c => {
      const item = document.createElement('div');
      item.className = 'docker-item';
      const statusClass = c.status === 'running' ? 'running' : 'stopped';
      item.innerHTML = 
        '<span class="docker-name">' + c.name + '</span>' +
        '<span class="docker-status ' + statusClass + '">' + c.uptime + '</span>';
      list.appendChild(item);
    });
  },
  
  updateLiveIndicator(timestamp) {
    const el = document.getElementById('terminal-live');
    if (!el || !timestamp) return;
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffH = Math.floor((now - date) / 3600000);
    
    const lang = document.documentElement.getAttribute('lang') || 'de';
    let text;
    
    if (diffH < 1) {
      text = 'Live';
    } else if (diffH < 24) {
      text = lang === 'de' ? 'vor ' + diffH + 'h aktualisiert' : 'updated ' + diffH + 'h ago';
    } else {
      const d = date.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
      text = lang === 'de' ? 'Update: ' + d : 'Updated: ' + d;
    }
    
    el.classList.add('active');
    el.querySelector('.live-text').textContent = text;
  }
};

document.addEventListener('DOMContentLoaded', () => LiveStats.init());
