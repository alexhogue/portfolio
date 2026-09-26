// ========================================
// NAVIGATION
// Loads nav.html into #nav-bar, wires up the mobile menu,
// marks the current section, and adds a skip link.
// ========================================

(function () {
  const navBar = document.getElementById("nav-bar");
  if (!navBar) return;

  const root = navBar.dataset.root || "";
  const MOBILE_MAX = 700;
  const SOLID_BG = "rgba(247, 246, 243, 1)";

  const SECTION_BY_PAGE = {
    "index.html": "work",
    "adobe.html": "work",
    "adobe-protected.html": "work",
    "srch.html": "work",
    "hack.html": "work",
    "chatgpt.html": "work",
    "warp.html": "work",
    "voyage-vault.html": "work",
    "art.html": "sketchbook",
    "vis-comm.html": "sketchbook",
    "gd.html": "sketchbook",
    "data-narrative.html": "sketchbook",
    "vis-art.html": "sketchbook",
    "photography.html": "sketchbook",
    "about.html": "about",
  };

  addSkipLink();

  fetch(root + "nav.html")
    .then((response) => response.text())
    .then((html) => {
      navBar.innerHTML = html.replace(/\{\{root\}\}/g, root);
      markCurrentSection();
      setupMenu();
    });

  function addSkipLink() {
    const target =
      document.querySelector("main") ||
      document.querySelector("#titleArea, #title-cont, #about-page");
    if (!target) return;
    if (!target.id) target.id = "main-content";
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");

    const skip = document.createElement("a");
    skip.className = "skip-link";
    skip.href = "#" + target.id;
    skip.textContent = "Skip to content";
    document.body.insertBefore(skip, document.body.firstChild);
  }

  function markCurrentSection() {
    const page = location.pathname.split("/").pop() || "index.html";
    const section = SECTION_BY_PAGE[page];
    if (!section) return;
    const link = navBar.querySelector('[data-nav="' + section + '"]');
    if (link) link.setAttribute("aria-current", "page");
  }

  function updateBackground() {
    const scrolled = window.scrollY >= window.innerHeight / 3;
    navBar.style.backgroundColor =
      scrolled || navBar.classList.contains("expanded") ? SOLID_BG : "transparent";
  }

  function setupMenu() {
    const button = document.getElementById("menu-icon");
    const menu = document.getElementById("main-menu");
    if (!button || !menu) return;

    function setOpen(open) {
      navBar.classList.toggle("expanded", open);
      button.classList.toggle("open", open);
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      updateBackground();
    }

    button.addEventListener("click", () => {
      setOpen(!navBar.classList.contains("expanded"));
    });

    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navBar.classList.contains("expanded")) {
        setOpen(false);
        button.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > MOBILE_MAX && navBar.classList.contains("expanded")) {
        setOpen(false);
      }
    });
  }

  window.addEventListener("scroll", updateBackground, { passive: true });
})();
