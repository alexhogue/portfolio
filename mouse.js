document.addEventListener("DOMContentLoaded", function () {
  const follower = document.querySelector(".mouse-follower");
  if (!follower) return;

  const finePointer = window.matchMedia("(pointer: fine)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!finePointer.matches || reducedMotion.matches) {
    follower.style.display = "none";
    return;
  }

  let frame = null;
  document.addEventListener("mousemove", (event) => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      follower.style.transform = `translate(${event.clientX - 500}px, ${event.clientY - 500}px)`;
      frame = null;
    });
  });
});
