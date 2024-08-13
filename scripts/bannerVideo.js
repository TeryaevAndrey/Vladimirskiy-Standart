const bannerVideo = document.querySelector("#bannerVideo");
const playsBtns = document.querySelectorAll(".play-btn");

const bannerVideoHandler = () => {
  const bannerImages = document.querySelectorAll(".banner-img");
  const header = document.querySelector(".header");

  playsBtns.forEach((playBtn) => {
    playBtn.addEventListener("click", () => {
      if (bannerVideo.paused) {
        bannerVideo.play();
        bannerVideo.setAttribute("controls", true);
        playBtn.textContent = "Поставить на паузу";
        playBtn.style.opacity = 0;
        bannerVideo.style.zIndex = 10;

        bannerImages.forEach((img) => {
          img.style.display = "none";
        });

        header.style.display = "none";
      } else {
        bannerVideo.pause();
        playBtn.textContent = "Проиграть ролик";

        bannerImages.forEach((img) => {
          img.style.display = "flex";
        });

        header.style.display = "block";
      }
    });
  });

  bannerVideo.addEventListener("ended", () => {
    bannerVideo.removeAttribute("controls");
    bannerVideo.src = "./videos/video.mp4";
    bannerVideo.style.zIndex = "unset";
    playsBtns.forEach((playBtn) => {
      playBtn.textContent = "Проиграть ролик";
      playBtn.style.opacity = 1;
    });

    bannerImages.forEach((img) => {
      img.style.display = "flex";
    });

    header.style.display = "block";
  });
};

bannerVideoHandler();
