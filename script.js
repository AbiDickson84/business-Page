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

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      status.innerHTML = "<p style='color:red;'>⚠️ Please fill in all fields.</p>";
      return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
    if (!email.match(emailPattern)) {
      status.innerHTML = "<p style='color:red;'>⚠️ Please enter a valid email address.</p>";
      return;
    }

    const formData = new FormData(form);

    try {
      let response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        status.innerHTML = "<p style='color:green;'>✅ Thank you! Your message has been sent.</p>";
        form.reset();
        setTimeout(() => { status.innerHTML = ""; }, 5000);
      } else {
        status.innerHTML = "<p style='color:red;'>⚠️ Oops! Something went wrong. Please try again.</p>";
      }
    } catch (error) {
      status.innerHTML = "<p style='color:red;'>⚠️ Network error. Please check your connection.</p>";
    }
  });
}

// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href"))?.scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ===== Sticky Navbar =====
const navbar = document.querySelector("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) navbar?.classList.add("scrolled");
  else navbar?.classList.remove("scrolled");
});

// ===== Scroll-to-Top Button =====
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (!scrollTopBtn) return;
  scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollTopBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== Fade-in on Scroll =====
const fadeEls = document.querySelectorAll(".fade-in");
const fadeInOnScroll = () => {
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) el.classList.add("visible");
  });
};
window.addEventListener("scroll", fadeInOnScroll);
window.addEventListener("load", fadeInOnScroll);

// ===== Preloader =====
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => { preloader.style.display = "none"; }, 500);
  }
});
setTimeout(() => {
  const preloader = document.getElementById("preloader");
  if (preloader && preloader.style.display !== "none") {
    preloader.style.opacity = "0";
    setTimeout(() => { preloader.style.display = "none"; }, 300);
  }
}, 2000);

// ===== Testimonial Carousel =====
const track = document.querySelector(".testimonial-track");
const carouselSlides = document.querySelectorAll(".testimonial-slide");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
let carouselIndex = 0;

function getSlidesToShow() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

function updateSlidePosition() {
  if (!track || carouselSlides.length === 0) return;
  const slidesToShow = getSlidesToShow();
  const slideWidth = carouselSlides[0].getBoundingClientRect().width;
  const offset = slideWidth * carouselIndex;
  track.style.transform = `translateX(-${offset}px)`;
}

nextBtn?.addEventListener("click", () => {
  carouselIndex++;
  if (carouselIndex > carouselSlides.length - getSlidesToShow()) carouselIndex = 0;
  updateSlidePosition();
});

prevBtn?.addEventListener("click", () => {
  carouselIndex--;
  if (carouselIndex < 0) carouselIndex = carouselSlides.length - getSlidesToShow();
  updateSlidePosition();
});

setInterval(() => {
  carouselIndex++;
  if (carouselIndex > carouselSlides.length - getSlidesToShow()) carouselIndex = 0;
  updateSlidePosition();
}, 5000);

window.addEventListener("resize", updateSlidePosition);
updateSlidePosition();

// ===== Portfolio Filter =====
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");

    // Remove active from all buttons
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    // Show/hide portfolio items
    portfolioItems.forEach(item => {
      if (category === "all" || item.getAttribute("data-category") === category) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});
