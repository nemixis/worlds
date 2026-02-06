document.addEventListener('DOMContentLoaded', () => {
  const transition = document.getElementById('transition');

  // Start with black screen, then fade in
  if (transition) {
    transition.classList.add('active');
    requestAnimationFrame(() => {
      transition.classList.remove('active');
    });
  }

  // Intercept internal links
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');

    if (!href.startsWith('http') && !href.startsWith('#')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        transition.classList.add('active');

        setTimeout(() => {
          window.location.href = href;
        }, 600);
      });
    }
  });
});
