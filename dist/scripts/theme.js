// Theme & Language Toggle - läuft auf allen Seiten
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
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      this.darkMode = !this.darkMode;
      localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
      this.apply();
    });
    
    document.getElementById('lang-toggle')?.addEventListener('click', () => {
      this.lang = this.lang === 'en' ? 'de' : 'en';
      localStorage.setItem('lang', this.lang);
      this.apply();
    });
  }
};

document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
