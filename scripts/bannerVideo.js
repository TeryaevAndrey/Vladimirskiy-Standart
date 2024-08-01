const bannerVideo = document.querySelector("#bannerVideo");
const playsBtns = document.querySelectorAll(".play-btn");

const bannerVideoHandler = () => {
  const bannerImages = document.querySelectorAll(".banner-img");
  const header = document.querySelector(".header");

  playsBtns.forEach((playBtn) => {
    playBtn.addEventListener("click", () => {
      if (bannerVideo.paused) {
        // Проверяем, находится ли видео на паузе
        bannerVideo.play();
        bannerVideo.setAttribute("controls", true);
        playBtn.textContent = "Поставить на паузу";
        playBtn.remove();
        bannerVideo.style.zIndex = 10;

        bannerImages.forEach((img) => {
          img.style.display = "none";
        });

        header.style.display = "none";
      } else {
        // Если видео воспроизводится
        bannerVideo.pause();
        playBtn.textContent = "Проиграть ролик"; // Меняем текст кнопки на "Запустить"

        bannerImages.forEach((img) => {
          img.style.display = "flex";
        });

        header.style.display = "block";
      }
    });
  });
};

bannerVideoHandler();
