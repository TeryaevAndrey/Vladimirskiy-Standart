const bannerVideo = document.querySelector("#bannerVideo");
const playsBtns = document.querySelectorAll(".play-btn");

playsBtns.forEach((playBtn) => {
  playBtn.addEventListener("click", () => {
    if (bannerVideo.paused) { // Проверяем, находится ли видео на паузе
        bannerVideo.play();
        playBtn.textContent = "Поставить на паузу";
      } else { // Если видео воспроизводится
        bannerVideo.pause();
        playBtn.textContent = "Проиграть ролик"; // Меняем текст кнопки на "Запустить"
      }
  });
});
