const navLinks = [...document.querySelectorAll(".nav-links a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  {
    rootMargin: "-35% 0px -50% 0px",
    threshold: [0.05, 0.2, 0.45],
  }
);

sections.forEach((section) => observer.observe(section));

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const typewriterText = document.querySelector("[data-typewriter]");

if (typewriterText && !reduceMotion) {
  const message = typewriterText.dataset.typewriter || typewriterText.textContent.trim();
  typewriterText.textContent = "";

  [...message].forEach((char, index) => {
    window.setTimeout(() => {
      const letter = document.createElement("span");
      letter.className = char === " " ? "typing-char is-space" : "typing-char";
      letter.textContent = char;
      typewriterText.append(letter);
    }, 70 * index + 260);
  });
}

const spotlightTargets = [
  ...document.querySelectorAll(
    ".skill-pill, .project-row, .education-card, .award-list article, .contact-panel"
  ),
];

const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (supportsHover && !reduceMotion) {
  spotlightTargets.forEach((target) => {
    target.addEventListener("pointermove", (event) => {
      const rect = target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      target.style.setProperty("--spotlight-x", `${x.toFixed(2)}%`);
      target.style.setProperty("--spotlight-y", `${y.toFixed(2)}%`);
    });
  });
}
