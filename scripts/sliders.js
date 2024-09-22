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

let isScrolling = false;  // Флаг, который блокирует дальнейший скролл до окончания текущего
let targetSection = null;  // Секция, к которой будет выполнен скролл

document.addEventListener('wheel', (event) => {
  if (isScrolling) return;  // Если прокрутка уже выполняется, блокируем
  isScrolling = true;

  const sections = document.querySelectorAll('.scroll-section');
  const currentScroll = window.pageYOffset;
  let currentIndex = 0;

  // Определяем текущую секцию
  sections.forEach((section, index) => {
    if (currentScroll >= section.offsetTop && currentScroll < section.offsetTop + section.offsetHeight) {
      currentIndex = index;
    }
  });

  if (event.deltaY > 0) {
    // Скролл вниз
    if (currentIndex < sections.length - 1) {
      targetSection = sections[currentIndex + 1];
    }
  } else {
    // Скролл вверх
    if (currentIndex > 0) {
      targetSection = sections[currentIndex - 1];
    }
  }

  // Если targetSection определен, скроллим к следующей/предыдущей секции
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
});

// Отслеживаем завершение скролла через событие "scroll"
document.addEventListener('scroll', () => {
  if (!targetSection) return; // Если нет целевой секции, выходим

  const targetPosition = targetSection.offsetTop;
  const currentScroll = window.pageYOffset;

  // Проверяем, достигли ли мы целевого блока
  if (Math.abs(currentScroll - targetPosition) < 1) {
    // Если достигли целевого блока, разрешаем дальнейший скролл
    isScrolling = false;
    targetSection = null;  // Сбрасываем целевую секцию
  }
});
