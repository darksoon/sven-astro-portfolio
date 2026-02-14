// Portfolio-Seite: Background FX, Scroll Animations, Card Tilt
// Optimiert für Astro View Transitions

const BackgroundFX = {
  init() {
    const bgGrid = document.querySelector('.bg-grid');
    const bgGlow = document.querySelector('.bg-glow');
    if (!bgGrid || !bgGlow) return;
    
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      bgGrid.style.transform = `translate(${scrollY * 0.05}px, ${scrollY * 0.05}px)`;
      bgGlow.style.transform = `translate(0, ${scrollY * 0.1}px) scale(1)`;
    }, { passive: true });
  }
};

const ScrollAnimations = {
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('section').forEach(section => {
      section.classList.add('fade-in');
      observer.observe(section);
    });
  }
};

const CardTilt = {
  init() {
    document.querySelectorAll('.godot-card').forEach(card => {
      // Entferne alte Listener um Duplikate zu vermeiden
      const newCard = card.cloneNode(true);
      card.parentNode.replaceChild(newCard, card);
      
      newCard.addEventListener('mousemove', (e) => {
        const rect = newCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        newCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });
      
      newCard.addEventListener('mouseleave', () => {
        newCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }
};

function initPortfolio() {
  BackgroundFX.init();
  ScrollAnimations.init();
  CardTilt.init();
  console.log('✨ Portfolio initialized');
}

// Initialisierung bei normalem Seitenladen
document.addEventListener('DOMContentLoaded', initPortfolio);

// Re-Initialisierung bei Astro View Transitions
document.addEventListener('astro:page-load', initPortfolio);
