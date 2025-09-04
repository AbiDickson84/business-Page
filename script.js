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

// ===== Portfolio Filter with Animation =====
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");

    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    // Show/hide items with fade effect
    portfolioItems.forEach(item => {
      item.style.transition = "all 0.5s ease";
      if (category === "all" || item.getAttribute("data-category") === category) {
        item.style.opacity = "1";
        item.style.transform = "scale(1)";
        item.style.display = "block";
      } else {
        item.style.opacity = "0";
        item.style.transform = "scale(0.8)";
        setTimeout(() => { item.style.display = "none"; }, 500);
      }
    });
  });
});


// ===== Portfolio Modal =====
const modal = document.getElementById("portfolio-modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalLinks = document.getElementById("modal-links");
const modalClose = document.querySelector(".modal-close");

// Sample data for portfolio items (update links as needed)
const projectsData = [
  {
    title: "Personal Website",
    description: "A responsive portfolio website built with HTML, CSS, and JS.",
    image: "project1.png",
    links: [
      { text: "View Code", url: "https://github.com/username/project1" },
      { text: "Live Demo", url: "https://username.github.io/project1" }
    ]
  },
  {
    title: "Logo Design",
    description: "Creative logo designs made for small businesses using Illustrator.",
    image: "project2.png",
    links: [
      { text: "View Project", url: "#" }
    ]
  },
  {
    title: "Data Analysis Script",
    description: "Python script to analyze sales data and generate visual reports.",
    image: "project3.png",
    links: [
      { text: "View Code", url: "https://github.com/username/project3" }
    ]
  }
];

// Open modal when clicking a portfolio item
document.querySelectorAll(".portfolio-item").forEach((item, index) => {
  item.addEventListener("click", () => {
    const project = projectsData[index];
    modalImage.src = project.image;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;

    // Clear previous links
    modalLinks.innerHTML = "";
    project.links.forEach(link => {
      const a = document.createElement("a");
      a.href = link.url;
      a.target = "_blank";
      a.textContent = link.text;
      a.classList.add("btn");
      modalLinks.appendChild(a);
    });

    modal.style.display = "block";
  });
});

// Close modal
modalClose.addEventListener("click", () => { modal.style.display = "none"; });
window.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });


