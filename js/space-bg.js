const canvas = document.getElementById("space-bg");
const ctx = canvas.getContext("2d");

let w, h;
let t = 0;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

/* -----------------------------
   STAR LAYERS
------------------------------ */

function createStars(count, speedMin, speedMax, radiusMin, radiusMax, alpha) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * (radiusMax - radiusMin) + radiusMin,
      s: Math.random() * (speedMax - speedMin) + speedMin,
      a: alpha
    });
  }
  return arr;
}

const starsFar = createStars(200, 0.02, 0.05, 0.3, 0.8, 0.3);
const starsMid = createStars(150, 0.06, 0.12, 0.6, 1.2, 0.5);
const starsNear = createStars(80, 0.15, 0.3, 1, 1.8, 0.8);

function drawStarLayer(stars) {
  stars.forEach(star => {
    star.x += star.s;
    if (star.x > w) star.x = 0;

    ctx.fillStyle = `rgba(255,255,255,${star.a})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  });
}

/* -----------------------------
   NEBULA
------------------------------ */

function drawNebula() {
  t += 0.0008;

  // Base space
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);

  // Stars (depth order)
  drawStarLayer(starsFar);
  drawStarLayer(starsMid);
  drawStarLayer(starsNear);

  // Nebula (SCREEN blend)
  ctx.globalCompositeOperation = "screen";

  for (let i = 0; i < 3; i++) {
    const x = w * (0.5 + 0.35 * Math.sin(t + i * 2));
    const y = h * (0.5 + 0.35 * Math.cos(t * 1.3 + i * 3));
    const r = Math.max(w, h) * 0.9;

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0, "rgba(140,180,255,0.25)");
    gradient.addColorStop(0.4, "rgba(180,120,255,0.15)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalCompositeOperation = "source-over";

  requestAnimationFrame(drawNebula);
}

drawNebula();
