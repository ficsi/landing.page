const wrapper = document.getElementById('promoCard');
    const btn = document.getElementById('seeMoreBtn');
    let expanded = false;

document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", function () {
    this.parentElement.classList.toggle("expanded");
  });
});

function updateHeight() {
  if (expanded) {
    // Set max-height to full scrollHeight for a smooth open
    wrapper.style.maxHeight = wrapper.scrollHeight + 90 + "px";
  } else {
    // Collapse with animation
    if (window.innerWidth >= 1420) wrapper.style.maxHeight = "210px";
    else wrapper.style.maxHeight = "426px";
  }
}

btn.addEventListener("click", function () {
  expanded = !expanded;
  wrapper.classList.toggle("expanded", expanded);
  btn.textContent = expanded ? "See Less" : "See More";
  updateHeight();
});

window.addEventListener("resize", function () {
  if (expanded) updateHeight();
});

document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", function () {
    const currentAccordion = this.parentElement;
    const isActive = currentAccordion.getAttribute("aria-expanded") === "true";
    // Close all
    document
      .querySelectorAll(".accordion")
      .forEach((acc) => acc.setAttribute("aria-expanded", "false"));
    // Open current if it wasn't open
    if (!isActive) currentAccordion.setAttribute("aria-expanded", "true");
  });
  // Accessibility: open/close with Enter/Space
  header.addEventListener("keydown", function (e) {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      this.click();
    }
  });
});
