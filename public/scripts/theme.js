// Theme & Language Toggle - läuft auf allen Seiten
// Optimiert für Astro View Transitions
const ThemeManager = {
  init() {
    this.darkMode = localStorage.getItem('theme') !== 'light';
    this.lang = localStorage.getItem('lang') || 'de';
    this.apply();
    this.setupListeners();
  },
  
  apply() {
    document.documentElement.setAttribute('data-theme', this.darkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('lang', this.lang);
    
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) themeIcon.textContent = this.darkMode ? '☀️' : '🌙';
    
    const langText = document.querySelector('.lang-text');
    if (langText) langText.textContent = this.lang.toUpperCase();
    
    document.querySelectorAll('[data-de][data-en]').forEach(el => {
      const text = this.lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-de');
      if (text) el.textContent = text;
    });
  },
  
  setupListeners() {
    // Entferne alte Event-Listener um Duplikate zu vermeiden
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle = document.getElementById('lang-toggle');
    
    if (themeToggle) {
      themeToggle.replaceWith(themeToggle.cloneNode(true));
      document.getElementById('theme-toggle')?.addEventListener('click', () => {
        this.darkMode = !this.darkMode;
        localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
        this.apply();
      });
    }
    
    if (langToggle) {
      langToggle.replaceWith(langToggle.cloneNode(true));
      document.getElementById('lang-toggle')?.addEventListener('click', () => {
        this.lang = this.lang === 'en' ? 'de' : 'en';
        localStorage.setItem('lang', this.lang);
        this.apply();
      });
    }
  }
};

// Initialisierung bei normalem Seitenladen
document.addEventListener('DOMContentLoaded', () => ThemeManager.init());

// Re-Initialisierung bei Astro View Transitions
document.addEventListener('astro:page-load', () => ThemeManager.init());
