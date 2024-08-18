document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target && target.matches(".link-external")) {
    const elementA = target as HTMLAnchorElement;
    const href = elementA.getAttribute("href");
    if (href && href === "#") {
      e.preventDefault();
    }
  }
});

console.log("Links script loaded");
