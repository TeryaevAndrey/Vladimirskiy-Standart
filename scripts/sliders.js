const swiper = new Swiper(".swiper.contacts-slider", {
  loop: true,
  autoplay: {
    delay: 1000,
  },
  slidesPerView: 1,
  effect: "cards",
  grabCursor: true,

  cardsEffect: {
    perSlideRotate: 1,
  },
  allowSlidePrev: false,
  speed: 600,
});

new Swiper(".product-slider-1", {
  loop: true,
  slidesPerView: 3,
  autoplay: {
    delay: 1000,
  },
  spaceBetween: 16,

  breakpoints: {
    1024: {
      slidesPerView: 5,
      spaceBetween: 35,
    },
  },

  speed: 600,
});

new Swiper(".product-slider-2", {
  loop: true,
  slidesPerView: 3,
  autoplay: {
    delay: 1000,
  },
  spaceBetween: 16,

  breakpoints: {
    1024: {
      slidesPerView: 5,
      spaceBetween: 35,
    },
  },

  speed: 600,
});

new Swiper(".product-slider-3", {
  loop: true,
  slidesPerView: 3,
  autoplay: {
    delay: 1000,
  },
  spaceBetween: 16,

  breakpoints: {
    1024: {
      slidesPerView: 5,
      spaceBetween: 35,
    },
  },

  speed: 600,
});

new Swiper(".swiper.sausages-slider", {
  loop: true,
  autoplay: {
    delay: 2000,
  },
  slidesPerView: 1,
  speed: 600,
});

new Swiper(".swiper.dumplings-slider", {
  loop: true,
  autoplay: {
    delay: 2000,
  },
  slidesPerView: 1,
  speed: 600,
});

new Swiper(".swiper.ogogon-slider", {
  loop: true,
  autoplay: {
    delay: 2000,
  },
  slidesPerView: 1,
  speed: 600,
});
