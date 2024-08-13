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

const contactsImagesArr = [
  "./images/contacts/slider-3.png",
  "./images/contacts/slider-2.png",
];
const contactsImage = document.querySelector("#contactsImage");
let currentIndex = 0;

function changeImage() {
  contactsImage.src = contactsImagesArr[currentIndex];

  currentIndex = (currentIndex + 1) % contactsImagesArr.length;
}

setInterval(changeImage, 5000);
