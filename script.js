// ===== DarkVeil Background =====
const canvas = document.getElementById("darkveil");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00FFAA"; // color of letters
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
  requestAnimationFrame(draw);
}
draw();

// ===== Animated Text Typing =====
const texts = ["Aspiring Data Scientist", "Developer", "ML Enthusiast"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";
let isDeleting = false;
const animatedText = document.getElementById("animated-text");

function type() {
  if (count === texts.length) count = 0;
  currentText = texts[count];

  if (isDeleting) {
    letter = currentText.slice(0, --index);
    if (letter.length === 0) {
      isDeleting = false;
      count++;
      if (count === texts.length) count = 0;
      currentText = texts[count];
      setTimeout(type, 500);
      return;
    }
    animatedText.textContent = letter;
    setTimeout(type, 50);
  } else {
    letter = currentText.slice(0, ++index);
    animatedText.textContent = letter;
    if (letter.length === currentText.length) {
      isDeleting = true;
      setTimeout(type, 2000);
    } else {
      setTimeout(type, 150);
    }
  }
}

type();

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== Scroll Animation =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections except header
document.querySelectorAll('section').forEach(section => {
  if (section.id !== 'home') {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  }
});
