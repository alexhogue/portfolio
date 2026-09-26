function setupCarousel(itemSelector, nextId, prevId) {
  const items = document.querySelectorAll(itemSelector);
  const nextBtn = document.getElementById(nextId);
  const prevBtn = document.getElementById(prevId);
  if (!items.length) return;

  let currentIndex = 0;

  function showSlide(index) {
    items.forEach((item, i) => {
      item.style.display = i === index ? "block" : "none";
      item.setAttribute("aria-hidden", String(i !== index));
    });
  }

  function bind(button, step) {
    if (!button) return;
    const go = () => {
      currentIndex = (currentIndex + step + items.length) % items.length;
      showSlide(currentIndex);
    };
    button.addEventListener("click", go);
    if (button.tagName !== "BUTTON") {
      button.setAttribute("role", "button");
      button.setAttribute("tabindex", "0");
      button.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          go();
        }
      });
    }
  }

  showSlide(currentIndex);
  bind(nextBtn, 1);
  bind(prevBtn, -1);
}

setupCarousel(".carousel-item", "nextBtn", "prevBtn");
setupCarousel(".carousel-item2", "nextBtn2", "prevBtn2");
