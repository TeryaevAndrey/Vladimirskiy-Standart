document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // gsap.from(".about-bg", {
  //   height: '300vh',
  //   stagger: 0.3,
  //   scrollTrigger: {
  //     trigger: ".about",
  //     start: "top 80%",
  //     end: "bottom top",
  //     scrub: window.innerWidth >= 1024,
  //   },
  // });

  gsap.from(".about__text.left", {
    x: -300,
    opacity: 0,
    stagger: 0.3,
    scrollTrigger: {
      trigger: ".about",
      start: "top 80%",
      end: "bottom top",
      scrub: window.innerWidth >= 1024,
    },
  });

  gsap.from(".about__text.right", {
    x: 300,
    opacity: 0,
    stagger: 0.3,
    scrollTrigger: {
      trigger: ".about",
      start: "top 80%",
      end: "bottom top",
      scrub: window.innerWidth >= 1024,
    },
  });

  if (window.innerWidth >= 1024) {
    gsap.to(".about__content-img", {
      scale: 0.7,
      scrollTrigger: {
        trigger: ".about",
        start: "top 0",
        end: "bottom 20%",
        scrub: window.innerWidth >= 1024,
      },
    });
  }

  ScrollTrigger.create({
    trigger: ".about",
    start: "top 80%",
    end: "bottom top",
    scrub: true,
    onEnter: () => document.querySelector(".about").classList.add("change-bg"),
    onLeaveBack: () =>
      document.querySelector(".about").classList.remove("change-bg"),
  });

  gsap.from(".geography__item", {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "bounce.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".geography",
      start: "top 80%",
    },
  });

  // Counter animation for geography__item-count
  const counters = document.querySelectorAll(".geography__item-count");
  counters.forEach((counter) => {
    const targetCount = parseInt(counter.dataset.count);
    const sign = counter.dataset.sign || "";

    gsap.fromTo(
      counter,
      {
        innerText: 0,
      },
      {
        innerText: targetCount,
        duration: 3,
        ease: "power1.in",
        scrollTrigger: {
          trigger: counter,
          start: "top 80%",
        },
        snap: { innerText: 1 },
        onUpdate: function () {
          counter.innerText = `${Math.ceil(counter.innerText)}${sign}`;
        },
      }
    );
  });

  let lastScrollPosition = 0;
  gsap.registerPlugin(Observer);

  const scrollingText1 = gsap.utils.toArray(
    ".running-line:first-child .rail h4"
  );
  const scrollingText2 = gsap.utils.toArray(
    ".running-line:nth-child(2) .rail h4"
  );
  const scrollingText3 = gsap.utils.toArray(
    ".running-line:last-child .rail h4"
  );

  const tl1 = horizontalLoop(scrollingText1, {
    repeat: -1,
  });

  const tl2 = horizontalLoop(scrollingText3, {
    repeat: -1,
    reversed: true,
  });

  const tl3 = horizontalLoop(scrollingText2, {
    repeat: -1,
  });

  Observer.create({
    onChangeY(self) {
      let factor = window.innerWidth < 1024 ? 1.5 : 2.5;
      if (self.deltaY < 0) {
        factor *= -1;
      }
      gsap
        .timeline({
          defaults: {
            ease: "none",
          },
        })
        .to(tl1, { timeScale: factor * 2.5, duration: 0.2 })
        .to(tl1, { timeScale: factor / 2.5, duration: 1 }, "+=0.3");

      gsap
        .timeline({
          defaults: {
            ease: "none",
          },
        })
        .to(tl2, { timeScale: factor * -2.5, duration: 0.2 })
        .to(tl2, { timeScale: factor / -2.5, duration: 1 }, "+=0.3");

      gsap
        .timeline({
          defaults: {
            ease: "none",
          },
        })
        .to(tl3, { timeScale: factor * 2.5, duration: 0.2 })
        .to(tl3, { timeScale: factor / 2.5, duration: 1 }, "+=0.3");
    },
  });

  function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () =>
          tl.totalTime(tl.rawTime() + tl.duration() * 100),
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      xPercents = [],
      curIndex = 0,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap =
        config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
      totalWidth,
      curX,
      distanceToStart,
      distanceToLoop,
      item,
      i;
    gsap.set(items, {
      // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
      xPercent: (i, el) => {
        let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
            gsap.getProperty(el, "xPercent")
        );
        return xPercents[i];
      },
    });
    gsap.set(items, { x: 0 });
    totalWidth =
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth *
        gsap.getProperty(items[length - 1], "scaleX") +
      (parseFloat(config.paddingRight) || 0);
    for (i = 0; i < length; i++) {
      item = items[i];
      curX = (xPercents[i] / 100) * widths[i];
      distanceToStart = item.offsetLeft + curX - startX;
      distanceToLoop =
        distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
      tl.to(
        item,
        {
          xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
          duration: distanceToLoop / pixelsPerSecond,
        },
        0
      )
        .fromTo(
          item,
          {
            xPercent: snap(
              ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
            ),
          },
          {
            xPercent: xPercents[i],
            duration:
              (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
            immediateRender: false,
          },
          distanceToLoop / pixelsPerSecond
        )
        .add("label" + i, distanceToStart / pixelsPerSecond);
      times[i] = distanceToStart / pixelsPerSecond;
    }
    function toIndex(index, vars) {
      vars = vars || {};
      Math.abs(index - curIndex) > length / 2 &&
        (index += index > curIndex ? -length : length); // always go in the shortest direction
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex) {
        // if we're wrapping the timeline's playhead, make the proper adjustments
        vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      curIndex = newIndex;
      vars.overwrite = true;
      return tl.tweenTo(time, vars);
    }
    tl.next = (vars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    return tl;
  }

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".sausages__images",
        start: "top 90%", // когда верхняя часть блока .sausages__images достигает 80% высоты окна просмотра
        end: "bottom 10%", // когда нижняя часть блока .sausages__images достигает 20% высоты окна просмотра
        markers: false, // установить в true для отладки
      },
    })
    .from(".sausage.desktop", { duration: 0.8, y: 200, opacity: 0 }, "-=0.5")
    .from(".sausage.mob", { duration: 0.8, y: 200, opacity: 0 }, "-=0.5")
    .from([".sausages__info-img", ".sausages-best-img"], {
      duration: 0.8,
      x: -100,
      opacity: 0,
    })
    .from(".sausages__info-text", { duration: 0.8, y: 200, opacity: 0 })
    .from(".greens-1", { duration: 0.8, y: 200, opacity: 0 })
    .from(".greens-2", { duration: 0.8, y: 200, opacity: 0 }, "-=0.5")
    .from(".greens-3", { duration: 0.8, y: 200, opacity: 0 }, "-=0.5")
    .from(".pepper-1", { duration: 0.8, y: 200, opacity: 0 }, "-=0.5")
    .from(".pepper-2", { duration: 0.8, y: 200, opacity: 0 }, "-=0.5");

  // const tl4 = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".sausages__info",
  //     start: "top 90%",
  //     end: "bottom 10%",
  //     toggleActions: "play none none none",
  //     markers: false,
  //   },
  // });

  ScrollTrigger.create({
    trigger: ".dumplings",
    start: "top 0",
    end: "bottom 10%",
    scrub: window.innerWidth >= 1024,
    onEnter: () =>
      document.querySelector(".dumplings").classList.add("change-bg"),
    onLeaveBack: () =>
      document.querySelector(".dumplings").classList.remove("change-bg"),
  });

  let mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    // Анимация для экранов шире 1024px (выдвижение сверху)
    gsap.from(".dumplings__info", {
      scrollTrigger: {
        trigger: ".dumplings",
        start: "top 90%",
        end: "bottom 10%",
        markers: false,
        scrub: true,
      },
      duration: 2,
      y: -100, // начальная позиция блока по оси Y (выдвижение сверху)
      opacity: 0,
    });
  });

  mm.add("(max-width: 1023px)", () => {
    // Анимация для экранов уже 1024px (выдвижение слева)
    gsap.from(".dumplings__info", {
      scrollTrigger: {
        trigger: ".dumplings",
        start: "top 0",
        end: "bottom 10%",
        toggleActions: "play none none none",
        markers: false,
      },
      duration: 1,
      x: -200, // начальная позиция блока по оси X (выдвижение слева)
      opacity: 0,
    });
  });

  const images = document.querySelectorAll(".ogogon__image");
  gsap.registerPlugin(ScrollTrigger);

  // Animate each image from a different direction
  images.forEach((image, index) => {
    let direction;
    switch (index) {
      case 0:
        direction = { x: 100, opacity: 0 };
        break;
      case 1:
        direction = { y: 100, opacity: 0 };
        break;
      case 2:
        direction = { x: 100, opacity: 0 };
        break;
      case 3:
        direction = { y: -100, opacity: 0 };
        break;
      case 4:
        direction = { x: -200, opacity: 0 };
        break;
      case 5:
        direction = { opacity: 0 };
        break;
      default:
        direction = { opacity: 0 };
    }

    gsap.from(image, {
      ...direction,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: image,
        start: "top 80%", // Start the animation when the image is 80% from the top of the viewport
        toggleActions: "play none none none",
      },
    });
  });

  // const sects = document.querySelectorAll(".sect");
  // let currentIndex = 0;

  // function scrollToSection(index) {
  //   gsap.to(window, {
  //     scrollTo: sects[index],
  //     duration: 1,
  //     onComplete: () => (currentIndex = index),
  //   });
  // }

  // document.addEventListener(
  //   "wheel",
  //   (event) => {
  //     if (event.deltaY > 0 && currentIndex < sects.length - 1) {
  //       scrollToSection(currentIndex + 1);
  //     } else if (event.deltaY < 0 && currentIndex > 0) {
  //       scrollToSection(currentIndex - 1);
  //     }
  //     event.preventDefault();
  //   },
  //   { passive: false }
  // );

  // document.addEventListener("keydown", (event) => {
  //   if (event.key === "ArrowDown" && currentIndex < sects.length - 1) {
  //     scrollToSection(currentIndex + 1);
  //   } else if (event.key === "ArrowUp" && currentIndex > 0) {
  //     scrollToSection(currentIndex - 1);
  //   }
  // });

  // gsap.utils.toArray(".with-sticky").forEach((section) => {
  //   ScrollTrigger.create({
  //     trigger: section,
  //     start: "top top",
  //     end: "bottom top",
  //     pinSpacing: false,
  //   });
  // });
});

const greens = document.querySelectorAll(".greens");

window.addEventListener("mousemove", (event) => {
  const offsetX = (event.clientX - window.innerWidth / 2) * 0.05;
  const offsetY = (event.clientY - window.innerHeight / 2) * 0.05;
  greens.forEach((green) => {
    gsap.to(green, {
      x: offsetX,
      y: offsetY,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});
