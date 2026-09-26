// ========================================
// MEDIA LOADING
// Videos marked data-autoplay only load and play while on screen.
// Visitors who prefer reduced motion get the poster plus controls instead.
// ========================================

(function () {
  const videos = document.querySelectorAll("video[data-autoplay]");
  if (!videos.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function play(video) {
    const attempt = video.play();
    if (attempt && attempt.catch) attempt.catch(() => {});
  }

  function applyMotionPreference() {
    videos.forEach((video) => {
      if (reducedMotion.matches) {
        video.pause();
        video.setAttribute("controls", "");
      } else if (!video.hasAttribute("data-controls")) {
        video.removeAttribute("controls");
      }
    });
  }

  videos.forEach((video) => {
    video.muted = true;
    video.playsInline = true;
    if (video.hasAttribute("controls")) video.setAttribute("data-controls", "");
  });
  applyMotionPreference();
  reducedMotion.addEventListener("change", applyMotionPreference);

  if (!("IntersectionObserver" in window)) {
    if (!reducedMotion.matches) videos.forEach(play);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          if (!reducedMotion.matches) play(video);
        } else if (!video.paused) {
          video.pause();
        }
      });
    },
    { rootMargin: "200px 0px" }
  );

  videos.forEach((video) => observer.observe(video));
})();
