const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '×' : '☰';
});

document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = '☰';
}));

document.getElementById('quote-form').addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const request = document.getElementById('request').value.trim();
  const message = encodeURIComponent(`Hello BrightBite! I'm ${name}. I would like to book an appointment for: ${request}`);
  window.open(`https://wa.me/919876543210?text=${message}`, '_blank', 'noopener,noreferrer');
});

document.getElementById('year').textContent = new Date().getFullYear();

const hero = document.querySelector('.luxury-hero');
const scenes = [...document.querySelectorAll('.hero-scene')];
const progressButtons = [...document.querySelectorAll('.sequence-progress button')];
let activeScene = 0;
let sceneTimer;

function showScene(index) {
  activeScene = index;
  scenes.forEach((scene, sceneIndex) => scene.classList.toggle('is-active', sceneIndex === index));
  progressButtons.forEach((button, buttonIndex) => button.classList.toggle('is-active', buttonIndex === index));
}

function startSequence() {
  clearInterval(sceneTimer);
  sceneTimer = setInterval(() => showScene((activeScene + 1) % scenes.length), 6000);
}

progressButtons.forEach(button => button.addEventListener('click', () => {
  showScene(Number(button.dataset.go));
  startSequence();
}));

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) startSequence();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .16 });

document.querySelectorAll('.reveal').forEach(item => revealObserver.observe(item));

const header = document.querySelector('.site-header');
const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 30);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

/* ============================
   CLINIC OPEN / CLOSED STATUS
============================ */

function updateClinicStatus() {

    const status = document.getElementById("clinicStatus");
    const text = document.getElementById("statusText");

    if (!status || !text) return;

    const now = new Date();

    const day = now.getDay();     // 0 = Sunday
    const hour = now.getHours();
    const minute = now.getMinutes();

    const current = hour + minute / 60;

    // Monday (1) to Saturday (6)
    const isWorkingDay = day >= 1 && day <= 6;

    // Clinic Hours
    const openTime = 9;
    const closeTime = 19;

    if (isWorkingDay && current >= openTime && current < closeTime) {

        text.textContent = "Open Now";

        status.style.background = "#e8fff2";
        status.style.color = "#10884d";

        status.querySelector(".status-dot").style.background = "#19c463";

    } else {

        text.textContent = "Closed Now";

        status.style.background = "#fff3f3";
        status.style.color = "#d13b3b";

        status.querySelector(".status-dot").style.background = "#d13b3b";

    }

}

updateClinicStatus();

/* ============================
   LOCATION SECTION ANIMATION
============================ */

const locationSection = document.querySelector(".location-section");

if (locationSection) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                locationSection.classList.add("show-location");

            }

        });

    }, {
        threshold: 0.2
    });

    observer.observe(locationSection);

}

/* ============================
   FLOATING CARD EFFECT
============================ */

const mapWrapper = document.querySelector(".map-wrapper");

if(mapWrapper){

    mapWrapper.addEventListener("mousemove",(e)=>{

        const rect = mapWrapper.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width)-0.5)*8;
        const rotateX = ((y / rect.height)-0.5)*-8;

        mapWrapper.style.transform =
        `perspective(1200px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         scale(1.01)`;

    });

    mapWrapper.addEventListener("mouseleave",()=>{

        mapWrapper.style.transform =
        "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)";

    });

}



