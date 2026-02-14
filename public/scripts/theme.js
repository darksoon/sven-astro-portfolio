// Sprach-Manager - läuft auf allen Seiten
// Optimiert für Astro View Transitions
const LangManager = {
  init() {
    this.lang = localStorage.getItem('lang') || 'de';
    this.apply();
    this.setupListeners();
  },
  
  apply() {
    document.documentElement.setAttribute('lang', this.lang);
    
    const langText = document.querySelector('.lang-text');
    if (langText) langText.textContent = this.lang.toUpperCase();
    
    document.querySelectorAll('[data-de][data-en]').forEach(el => {
      const text = this.lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-de');
      if (text) el.textContent = text;
    });
  },
  
  setupListeners() {
    const langToggle = document.getElementById('lang-toggle');
    
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
document.addEventListener('DOMContentLoaded', () => LangManager.init());

// Re-Initialisierung bei Astro View Transitions
document.addEventListener('astro:page-load', () => LangManager.init());
