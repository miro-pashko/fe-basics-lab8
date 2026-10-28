// Лабораторна робота №8: невеликі інтерактивні елементи сайту Locksmith

// ---------- Мобільне меню ----------
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.getElementById("main-nav");

function setMenu(open) {
    mainNav.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

navToggle.addEventListener("click", function () {
    setMenu(!mainNav.classList.contains("open"));
});

// Закриваємо меню після вибору пункту та при збільшенні вікна
mainNav.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
        setMenu(false);
    }
});

window.addEventListener("resize", function () {
    if (window.innerWidth > 900) {
        setMenu(false);
    }
});

// ---------- Слайдер у верхньому блоці (змінюється текст, фото одне) ----------
const slides = [
    { eyebrow: "Best Locksmith", title: "We Provide Best Locksmith Services All Over World" },
    { eyebrow: "24/7 Emergency", title: "Fast Lock Opening And Replacement Any Time Of Day" },
    { eyebrow: "Security Systems", title: "Reliable Alarms, Cameras And Access Control For You" }
];

const heroCard = document.querySelector(".hero-card");
const heroEyebrow = document.getElementById("hero-eyebrow");
const heroTitle = document.getElementById("hero-title");
const hero = document.querySelector(".hero");
let current = 0;
let timer = null;

function showSlide(index) {
    current = (index + slides.length) % slides.length;
    heroCard.classList.add("is-changing");
    setTimeout(function () {
        heroEyebrow.textContent = slides[current].eyebrow;
        heroTitle.textContent = slides[current].title;
        heroCard.classList.remove("is-changing");
    }, 300);
}

function startAutoplay() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }
    stopAutoplay();
    timer = setInterval(function () {
        showSlide(current + 1);
    }, 7000);
}

function stopAutoplay() {
    clearInterval(timer);
}

document.querySelector(".hero-arrow--prev").addEventListener("click", function () {
    showSlide(current - 1);
    startAutoplay();
});

document.querySelector(".hero-arrow--next").addEventListener("click", function () {
    showSlide(current + 1);
    startAutoplay();
});

hero.addEventListener("mouseenter", stopAutoplay);
hero.addEventListener("mouseleave", startAutoplay);
startAutoplay();

// ---------- Форма «Get a quote» ----------
const quoteForm = document.getElementById("quote-form");
const formStatus = document.getElementById("form-status");

quoteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = quoteForm.elements.name.value.trim();
    const phone = quoteForm.elements.phone.value.trim();
    const phoneOk = /^[0-9+()\-\s]{7,}$/.test(phone);

    formStatus.classList.remove("error");

    if (name.length < 2) {
        formStatus.textContent = "Please enter your name.";
        formStatus.classList.add("error");
        quoteForm.elements.name.focus();
        return;
    }

    if (!phoneOk) {
        formStatus.textContent = "Please enter a valid phone number.";
        formStatus.classList.add("error");
        quoteForm.elements.phone.focus();
        return;
    }

    formStatus.textContent = "Thank you, " + name + "! We will call you back soon.";
    quoteForm.reset();
});
