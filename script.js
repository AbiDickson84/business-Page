// ======= Mobile Menu Toggle =======
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// ======= Contact Form (Formspree Integration + Validation) =======
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // === Inline Validation ===
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
      status.innerHTML = "<p style='color: red;'>⚠️ Please fill in all fields.</p>";
      return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
    if (!email.match(emailPattern)) {
      status.innerHTML = "<p style='color: red;'>⚠️ Please enter a valid email address.</p>";
      return;
    }

    // === Send Data to Formspree ===
    const formData = new FormData(form);

    try {
      let response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        status.innerHTML = "<p style='color: green;'>✅ Thank you! Your message has been sent.</p>";
        form.reset();

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          status.innerHTML = "";
        }, 5000);
      } else {
        status.innerHTML = "<p style='color: red;'>⚠️ Oops! Something went wrong. Please try again.</p>";
      }
    } catch (error) {
      status.innerHTML = "<p style='color: red;'>⚠️ Network error. Please check your connection.</p>";
    }
  });
}

// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ===== Sticky Navbar =====
const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== Scroll-to-Top Button =====
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ===== Fade-in on Scroll =====
const fadeEls = document.querySelectorAll(".fade-in");

const fadeInOnScroll = () => {
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", fadeInOnScroll);
window.addEventListener("load", fadeInOnScroll);

// ===== Preloader =====
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.opacity = "0";      // fade out
    setTimeout(() => {
      preloader.style.display = "none"; // hide completely
    }, 500);
  }
});

// Safety: Auto-hide preloader after 2s in case load is slow
setTimeout(() => {
  if (preloader && preloader.style.display !== "none") {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 300);
  }
}, 2000);

// ===== Testimonial Carousel =====
const slides = document.querySelectorAll(".testimonial-slide");
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("visible");
  });
  slides[index].classList.add("visible");
}

// Initial slide
showSlide(currentIndex);

// Next / Prev buttons
document.getElementById("next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
});

document.getElementById("prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
});

// Auto-slide every 5 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}, 5000);


// ===== Testimonial Carousel =====
const track = document.querySelector(".testimonial-track");
const slides = document.querySelectorAll(".testimonial-slide");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
let currentIndex = 0;

// Number of slides visible based on screen width
function getSlidesToShow() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

function updateSlidePosition() {
  const slidesToShow = getSlidesToShow();
  const slideWidth = slides[0].getBoundingClientRect().width;
  const offset = slideWidth * currentIndex;
  track.style.transform = `translateX(-${offset}px)`;
}

// Next button
nextBtn.addEventListener("click", () => {
  const slidesToShow = getSlidesToShow();
  currentIndex = (currentIndex + 1) % slides.length;
  if (currentIndex > slides.length - slidesToShow) currentIndex = 0;
  updateSlidePosition();
});

// Prev button
prevBtn.addEventListener("click", () => {
  const slidesToShow = getSlidesToShow();
  currentIndex = currentIndex - 1;
  if (currentIndex < 0) currentIndex = slides.length - slidesToShow;
  updateSlidePosition();
});

// Auto-slide every 5s
setInterval(() => {
  const slidesToShow = getSlidesToShow();
  currentIndex = (currentIndex + 1) % slides.length;
  if (currentIndex > slides.length - slidesToShow) currentIndex = 0;
  updateSlidePosition();
}, 5000);

// Update on window resize
window.addEventListener("resize", updateSlidePosition);

// Initialize position
updateSlidePosition();
