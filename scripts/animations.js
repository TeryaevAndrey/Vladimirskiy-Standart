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

  const lines = document.querySelectorAll(".running-line");

  function setSpeed() {
    lines.forEach((line) => {
      console.log(line);
      line.setAttribute("scrollamount", "1");
    });
  }

  window.addEventListener("scroll", function () {
    setSpeed();
  });
});
