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
  preloader.style.opacity = "0";
  setTimeout(() => {
    preloader.style.display = "none";
  }, 500); // hides after fade out
});
