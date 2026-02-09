const star = document.querySelector('.star');
const space = document.getElementById('space');

// Idle floating motion
gsap.to(star, {
  y: "-=10",
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

// Slow pulse
gsap.to(star, {
  boxShadow: "0 0 40px rgba(180,220,255,0.8)",
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

// Mouse parallax
space.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  gsap.to(star, {
    x,
    y,
    duration: 1.2,
    ease: "power3.out"
  });
});

gsap.to("#space-bg", {
  x: -20,
  y: -10,
  duration: 60,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});
