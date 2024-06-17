const openMenu = () => {
  const menu = document.querySelector(".mob-menu");

  menu.classList.add("active");
};

const closeMenu = () => {
  const menu = document.querySelector(".mob-menu");

  menu.classList.remove("active");
};

const menuLinksHandler = () => {
  document.querySelectorAll(".mob-menu__item")?.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });
};

menuLinksHandler();
