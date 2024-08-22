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

const contactsImages = document.querySelectorAll(".contacts-slider-img");
let currentIndex = 0;

function changeImage() {
  contactsImages.forEach((img, index) => {
    img.style.opacity = 0;
  });

  contactsImages[currentIndex].style.opacity = 1;

  currentIndex = (currentIndex + 1) % contactsImages.length;
}

changeImage();

setInterval(changeImage, 5000);
