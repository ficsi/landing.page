function setupSwiper(swiperContainer, speed, direction) {
  const swiperTrack = swiperContainer.querySelector(".swiper-track");
  let translateX = 0;
  let paused = false;
  let isDragging = false;
  let startX = 0;
  let lastX = 0;
  const getTrackWidth = () => swiperTrack.scrollWidth / 2;
  function animate() {
    if (!paused && !isDragging) {
      translateX += direction === "left" ? -speed : speed;
      const width = getTrackWidth();
      if (translateX > 0) translateX -= width;
      if (Math.abs(translateX) >= width) translateX = 0;
      swiperTrack.style.transform = `translateX(${translateX}px)`;
    }
    requestAnimationFrame(animate);
  }
  swiperTrack.addEventListener("mouseover", (e) => {
    if (e.target.closest(".swiper-logo")) paused = true;
  });
  swiperTrack.addEventListener("mouseout", (e) => {
    if (e.target.closest(".swiper-logo")) paused = false;
  });
  // Mouse drag
  swiperContainer.addEventListener("mousedown", (e) => {
    isDragging = true;
    paused = true;
    startX = e.clientX;
    lastX = translateX;
    swiperContainer.style.cursor = "grabbing";
  });
  window.addEventListener("mousemove", (e) => {
    if (isDragging) {
      let dx = e.clientX - startX;
      translateX = lastX + dx; // FIXED: natural drag
      const width = getTrackWidth();
      if (translateX > 0) translateX -= width;
      if (Math.abs(translateX) >= width) translateX += width;
      swiperTrack.style.transform = `translateX(${translateX}px)`;
    }
  });
  window.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      paused = false;
      swiperContainer.style.cursor = "pointer";
    }
  });
  // Touch drag
  swiperContainer.addEventListener("touchstart", (e) => {
    isDragging = true;
    paused = true;
    startX = e.touches[0].clientX;
    lastX = translateX;
  });
  swiperContainer.addEventListener("touchmove", (e) => {
    if (isDragging) {
      let dx = e.touches[0].clientX - startX;
      translateX = lastX + dx; // FIXED: natural drag
      const width = getTrackWidth();
      if (translateX > 0) translateX -= width;
      if (Math.abs(translateX) >= width) translateX += width;
      swiperTrack.style.transform = `translateX(${translateX}px)`;
    }
  });
  swiperContainer.addEventListener("touchend", () => {
    if (isDragging) {
      isDragging = false;
      paused = false;
    }
  });
  animate();
}

setupSwiper(document.getElementById("swiper1"), 0.25, "left");
setupSwiper(document.getElementById("swiper2"), 0.25, "right");
