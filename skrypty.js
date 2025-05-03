// Animacje fade-in dla sekcji i kart projektów
document.addEventListener('DOMContentLoaded', () => {
  // Fade-in dla hero
  document.querySelector('.hero').style.opacity = 0;
  setTimeout(() => {
    document.querySelector('.hero').style.transition = 'opacity 1.2s';
    document.querySelector('.hero').style.opacity = 1;
  }, 100);

  // Fade-in dla kart projektów
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card, i) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.7s ' + (0.2 + i * 0.08) + 's, transform 0.7s ' + (0.2 + i * 0.08) + 's';
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }, 300);
  });
});
