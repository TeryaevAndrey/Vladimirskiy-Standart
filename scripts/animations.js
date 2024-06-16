document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".about__text.left", {
    x: -100,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
      trigger: ".about",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  gsap.from(".about__text.right", {
    x: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
      trigger: ".about",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  gsap.to(".about__content-img", {
    scale: 0.8,
    scrollTrigger: {
      trigger: ".about",
      start: "top 80%",
      end: "bottom top",
      scrub: true,
    },
  });

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

  const scrollingText = gsap.utils.toArray(".rail h4");

  const tl = horizontalLoop(scrollingText, {
    repeat: -1,
  });

  Observer.create({
    onChangeY(self) {
      let factor = 2.5;
      if (self.deltaY < 0) {
        factor *= -1;
      }
      gsap
        .timeline({
          defaults: {
            ease: "none",
          },
        })
        .to(tl, { timeScale: factor * 2.5, duration: 0.2 })
        .to(tl, { timeScale: factor / 2.5, duration: 1 }, "+=0.3");
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
        start: "top 80%", // когда верхняя часть блока .sausages__images достигает 80% высоты окна просмотра
        end: "bottom 20%", // когда нижняя часть блока .sausages__images достигает 20% высоты окна просмотра
        toggleActions: "play none none none", // запуск анимации, никаких действий при прокрутке назад
        markers: false, // установить в true для отладки
      },
    })
    .from(".greens-1", { duration: 0.8, y: 200, opacity: 0 })
    .from(".greens-2", { duration: 0.8, y: 200, opacity: 0 }, "-=0.5")
    .from(".greens-3", { duration: 0.8, y: 200, opacity: 0 }, "-=0.5")
    .from(".pepper-1", { duration: 0.8, y: 200, opacity: 0 }, "-=0.5")
    .from(".pepper-2", { duration: 0.8, y: 200, opacity: 0 }, "-=0.5")
    .from(".sausage.desktop", { duration: 0.8, y: 200, opacity: 0 }, "-=0.5")
    .from(".sausage.mob", { duration: 0.8, y: 200, opacity: 0 }, "-=0.5");
});
