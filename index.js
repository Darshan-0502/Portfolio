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
const content = document.getElementById('content');
const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let matches = [];
let currentIndex = -1;

searchForm.addEventListener('submit', function(e) {
  e.preventDefault();

  removeHighlights(content);
  matches = [];
  currentIndex = -1;
  updateButtons();

  const searchTerm = searchInput.value.trim();
  if (!searchTerm) return;

  highlightText(content, searchTerm);

  if (matches.length > 0) {
    currentIndex = 0;
    setActiveMatch(currentIndex);
    updateButtons();
  } else {
    alert('No results found');
  }
});

prevBtn.addEventListener('click', () => {
  if (matches.length === 0) return;

  currentIndex = (currentIndex - 1 + matches.length) % matches.length;
  setActiveMatch(currentIndex);
  updateButtons();
});

nextBtn.addEventListener('click', () => {
  if (matches.length === 0) return;

  currentIndex = (currentIndex + 1) % matches.length;
  setActiveMatch(currentIndex);
  updateButtons();
});

function removeHighlights(element) {
  const highlighted = element.querySelectorAll('span.highlight');
  highlighted.forEach(span => {
    span.outerHTML = span.textContent;
  });
}

function highlightText(element, searchTerm) {
  const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');

  function walk(node) {
    if (node.nodeType === 3) {
      if (regex.test(node.data)) {
        const frag = document.createDocumentFragment();
        let lastIndex = 0;

        node.data.replace(regex, (match, p1, offset) => {
          if (offset > lastIndex) {
            frag.appendChild(document.createTextNode(node.data.substring(lastIndex, offset)));
          }

          const highlightSpan = document.createElement('span');
          highlightSpan.className = 'highlight';
          highlightSpan.textContent = match;
          frag.appendChild(highlightSpan);

          matches.push(highlightSpan);

          lastIndex = offset + match.length;
        });

        if (lastIndex < node.data.length) {
          frag.appendChild(document.createTextNode(node.data.substring(lastIndex)));
        }

        node.parentNode.replaceChild(frag, node);
      }
    } else if (node.nodeType === 1 && node.childNodes && !['SCRIPT', 'STYLE'].includes(node.tagName)) {
      for (let i = 0; i < node.childNodes.length; i++) {
        walk(node.childNodes[i]);
      }
    }
  }

  walk(element);
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function setActiveMatch(index) {
  matches.forEach((el, i) => {
    if (i === index) {
      el.classList.add('active-match');
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      el.classList.remove('active-match');
    }
  });
}

function updateButtons() {
  if (matches.length === 0) {
    // No matches — hide buttons
    prevBtn.parentElement.style.display = 'none';
  } else {
    // Show buttons container
    prevBtn.parentElement.style.display = 'block';

    // Disable prev if at start, disable next if at end
    prevBtn.disabled = currentIndex <= 0;
    nextBtn.disabled = currentIndex >= matches.length - 1;
  }
}







const toggleBtn = document.getElementById("darkModeToggle");

toggleBtn.addEventListener("click", () => {
  const body = document.body;
  const isDark = body.getAttribute("data-bs-theme") === "dark";

  body.setAttribute("data-bs-theme", isDark ? "light" : "dark");
  toggleBtn.innerHTML = isDark ? "🌙 Dark Mode" : "☀️ Light Mode";
});


