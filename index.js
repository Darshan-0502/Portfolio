// ===============================
// PORTFOLIO JAVASCRIPT
// ===============================

// -------------------------------
// Smooth Scrolling
// -------------------------------

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// -------------------------------
// Dark Mode
// -------------------------------

const darkToggle = document.getElementById("darkModeToggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// -------------------------------
// Search
// -------------------------------

const searchInput = document.getElementById("searchInput");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const context = document.querySelector("#content");

const instance = new Mark(context);

let matches = [];
let current = -1;

function goToMatch() {
  if (matches.length === 0) return;

  matches.forEach((m) => m.classList.remove("current-highlight"));

  matches[current].classList.add("current-highlight");

  matches[current].scrollIntoView({
    behavior: "smooth",

    block: "center",
  });
}

let timer;

searchInput.addEventListener("input", () => {
  clearTimeout(timer);

  timer = setTimeout(() => {
    const keyword = searchInput.value.trim();

    instance.unmark({
      done: function () {
        matches = [];
        current = -1;

        if (keyword === "") {
          document.querySelector(".navigation-buttons").style.display = "none";
          return;
        }

        instance.mark(keyword, {
          separateWordSearch: false,

          done: function () {
            matches = [...document.querySelectorAll("mark")];

            if (matches.length) {
              current = 0;

              goToMatch();

              document.querySelector(".navigation-buttons").style.display =
                "block";
            } else {
              document.querySelector(".navigation-buttons").style.display =
                "none";
            }
          },
        });
      },
    });
  }, 250);
});

nextBtn.addEventListener("click", () => {
  if (!matches.length) return;

  current++;

  if (current >= matches.length) current = 0;

  goToMatch();
});

prevBtn.addEventListener("click", () => {
  if (!matches.length) return;

  current--;

  if (current < 0) current = matches.length - 1;

  goToMatch();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.2,
  },
);

document.querySelectorAll("section").forEach((section) => {
  section.classList.add("hidden");

  observer.observe(section);
});

// -------------------------------
// Navbar Background
// -------------------------------

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 50) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});

// -------------------------------
// Active Navigation
// -------------------------------

const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop - 120;

    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// -------------------------------
// Back To Top Button
// -------------------------------

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });
});

// -------------------------------
// Typing Effect (Hero)
// -------------------------------

const roles = [
  "Aspiring Data Scientist",

  "Machine Learning Enthusiast",

  "Python Developer",

  "AI Enthusiast",
];

const typingElement = document.getElementById("typing");

let roleIndex = 0;

let charIndex = 0;

let deleting = false;

function typeEffect() {
  if (!typingElement) return;

  const currentRole = roles[roleIndex];

  if (!deleting) {
    typingElement.textContent = currentRole.substring(0, charIndex++);

    if (charIndex > currentRole.length) {
      deleting = true;

      setTimeout(typeEffect, 1500);

      return;
    }
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex--);

    if (charIndex < 0) {
      deleting = false;

      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, deleting ? 50 : 100);
}

typeEffect();
