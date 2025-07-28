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


