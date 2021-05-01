const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const nav_links = document.querySelectorAll(".nav-links li");
  console.log("ajeet");
  // Toggle nav
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    burger.classList.toggle("toggle");
  });

  // animate links
  nav_links.forEach((links, index) => {
    links.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 2}s`;
  });
};
navSlide();
