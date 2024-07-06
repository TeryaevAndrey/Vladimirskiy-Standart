const openMenu = () => {
  const bannerImages = document.querySelectorAll(".banner-img");
  const menu = document.querySelector(".mob-menu");
  const header = document.querySelector(".header");
  const playBtns = document.querySelectorAll(".play-btn");

  menu.classList.add("active");

  bannerImages.forEach((image) => {
    image.style.display = "none";
  });

  header.style.display = "none";

  playBtns.forEach((btn) => {
    btn.style.display = "none";
  });
};

const closeMenu = () => {
  const bannerImages = document.querySelectorAll(".banner-img");
  const menu = document.querySelector(".mob-menu");
  const header = document.querySelector(".header");
  const playBtns = document.querySelectorAll(".play-btn");

  menu.classList.remove("active");

  bannerImages.forEach((image) => {
    image.style.display = "flex";
  });

  header.style.display = "block";

  playBtns.forEach((btn) => {
    btn.style.display = "block";
  });
};

const menuLinksHandler = () => {
  document.querySelectorAll(".mob-menu__item")?.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });
};

menuLinksHandler();
