const setupCardAnimation = () => {
  const cards = document.querySelectorAll(".card__project");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  cards.forEach((card) => {
    observer.observe(card);
  });
};

// document.addEventListener("DOMContentLoaded", setupCardAnimation);
document.addEventListener("astro:page-load", setupCardAnimation);
