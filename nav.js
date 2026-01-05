document.addEventListener("DOMContentLoaded", function () {
  const navBar = document.getElementById("nav-bar");

  let viewportHeight = window.innerHeight;
  window.addEventListener("scroll", () => {
    const currentScrollPos = window.scrollY;
    if (
      currentScrollPos >= viewportHeight / 3 ||
      navBar.classList.contains("expanded")
    ) {
      navBar.style.backgroundColor = "rgba(247, 246, 243, 1)";
    } else {
      navBar.style.backgroundColor = "transparent";
    }
  });

  // Handle window resize - close menu if window expands beyond 1024px
  window.addEventListener("resize", () => {
    const viewportWidth = window.innerWidth;
    if (viewportWidth > 768 && navBar.classList.contains("expanded")) {
      navBar.classList.remove("expanded");
      if (menuIcon) {
        menuIcon.classList.remove("open");
      }
      // Update background color based on scroll position
      const currentScrollPos = window.scrollY;
      if (currentScrollPos >= viewportHeight / 3) {
        navBar.style.backgroundColor = "rgba(247, 246, 243, 1)";
      } else {
        navBar.style.backgroundColor = "transparent";
      }
    }
  });
});