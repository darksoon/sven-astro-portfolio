// Portfolio-Seite: Background FX, Scroll Animations, Card Tilt

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
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  BackgroundFX.init();
  ScrollAnimations.init();
  CardTilt.init();
  console.log('✨ Portfolio initialized');
});
