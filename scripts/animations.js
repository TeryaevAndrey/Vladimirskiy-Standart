document.addEventListener("DOMContentLoaded", function () {
  window.location.hash = "";

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
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

    scrollTrigger: {
      trigger: ".about",
      start: "top 0%",
      end: "bottom 20%",
      scrub: window.innerWidth >= 1024,
    },
  });

  gsap.from(".about__text.right", {
    x: 300,
    opacity: 0,

    scrollTrigger: {
      trigger: ".about",
      start: "top 20%",
      end: "bottom 10%",
      scrub: window.innerWidth >= 1024,
    },
  });

  if (window.innerWidth >= 1024) {
    gsap.to(".about__content-img", {
      scale: 0.9,
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
    start: "top 0%",
    end: "bottom 90%",
    scrub: true,
    onUpdate: (self) => {
      const aboutBg = document.querySelector(".about-bg");
      // Если прокрутка вниз
      if (self.direction === 1) {
        aboutBg.style.filter = "blur(10px)";
        aboutBg.style.transform = "scale(1.2)";
      }
      // Если прокрутка вверх
      else if (self.direction === -1) {
        aboutBg.style.filter = "blur(0px)";
        aboutBg.style.transform = "scale(1)";
      }
    },
    onLeaveBack: () => {
      const aboutBg = document.querySelector(".about-bg");
      aboutBg.style.filter = "blur(0px)";
      aboutBg.style.transform = "scale(1)";
    },
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
    onComplete: () => {
      document.querySelectorAll(".geography__item").forEach((item) => {
        item.classList.add("transition-enabled");
      });
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
        ease: "power1.inOut",
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

  gsap.registerPlugin(Observer);

  let baseSpeed = window.innerWidth >= 1024 ? 1 : 0.7; // исходная скорость

  let runningLines = [
    horizontalLoop(".running-line:first-child .rail h4", {
      repeat: -1,
      paddingRight: 0,
      speed: baseSpeed,
      reversed: true,
    }),
    horizontalLoop(".running-line:nth-child(2) .rail h4", {
      repeat: -1,
      paddingRight: 0,
      speed: baseSpeed,
      reversed: true,
    }),
    horizontalLoop(".running-line:last-child .rail h4", {
      repeat: -1,
      paddingRight: 0,
      speed: baseSpeed,
      reversed: false,
    }),
  ];

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
        config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
      totalWidth,
      curX,
      distanceToStart,
      distanceToLoop,
      item,
      i;
    gsap.set(items, {
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

  const sausagesAnimations = gsap
    .timeline({
      scrollTrigger: {
        trigger: ".sausages__images",
        start: "top 90%", // когда верхняя часть блока .sausages__images достигает 80% высоты окна просмотра
        end: "bottom 10%", // когда нижняя часть блока .sausages__images достигает 20% высоты окна просмотра
        markers: false, // установить в true для отладки
      },
    })
    .from(".sausage.desktop", { duration: 1, y: 200, opacity: 0 }, "-=0.5")
    .from(".sausage.mob", { duration: 1, y: 200, opacity: 0 }, "-=0.5")
    .from([".sausages__info-img", ".sausages-best-img"], {
      duration: 1,
      x: -100,
      opacity: 0,
    })
    .from(
      [
        ".sausages__info-text",
        ".greens-1",
        ".greens-2",
        ".greens-3",
        ".pepper-1",
        ".pepper-2",
      ],
      {
        duration: 1,
        y: 200,
        opacity: 0,
      }
    );

  sausagesAnimations.eventCallback("onComplete", () => {
    if (window.innerWidth < 1024) return;

    document
      .querySelector(`.card[data-card="sausages"]`)
      .classList.add("active");
  });

  ScrollTrigger.create({
    trigger: ".dumplings",
    start: "top 50%",
    end: "bottom 10%",
    scrub: window.innerWidth >= 1024,
    onUpdate: () => {
      document.querySelector(".dumplings-bg").style.opacity = 1;
    },
  });

  let mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    // Анимация для экранов шире 1024px (выдвижение сверху)
    const dumplingsAnimation = gsap.from(".dumplings__info", {
      scrollTrigger: {
        trigger: ".dumplings",
        start: "top 100%",
        end: "bottom 0%",
        markers: false,
      },
      duration: 2,
      y: -40, // начальная позиция блока по оси Y (выдвижение сверху)
      opacity: 0,
      delay: 0.5,
    });

    dumplingsAnimation.eventCallback("onComplete", () => {
      if (window.innerWidth < 1024) return;

      document
        .querySelector(`.card[data-card="dumplings"]`)
        .classList.add("active");
    });
  });

  mm.add("(max-width: 1023px)", () => {
    // Анимация для экранов уже 1024px (выдвижение слева)
    gsap.from(".dumplings__info", {
      scrollTrigger: {
        trigger: ".dumplings",
        start: "top 100%",
        end: "bottom 10%",
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

    const ogogonAnimation = gsap.from(image, {
      ...direction,
      duration: 2,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".ogogon",
        start: "top 100%",
        end: "bottom 0%",
        markers: false,
      },
    });

    ogogonAnimation.eventCallback("onComplete", () => {
      if (window.innerWidth < 1024) return;

      document
        .querySelector(`.card[data-card="ogogon"]`)
        .classList.add("active");
    });
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
      });
    });
  });
});
