const star = document.querySelector('.star');
const space = document.getElementById('space');

// Parallax à la souris
space.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  star.style.transform = `
    translate(-50%, -50%)
    translate(${x}px, ${y}px)
  `;
});

// Navigation vers le monde
star.addEventListener('click', () => {
  const link = star.dataset.link;
  window.location.href = link;
});
