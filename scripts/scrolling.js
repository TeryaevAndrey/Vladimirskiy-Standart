document.addEventListener("DOMContentLoaded", () => {
  $(function () {
    $.scrollify({
      section: ".scroll",
      interstitialSection: ".no-scroll",
      standardScrollElements : ".no-scroll",
      easing: "easeOutExpo",
      scrollSpeed: 1500,
      offset: 0,
      scrollbars: true,
      setHeights: true,
      overflowScroll: true,
      updateHash: true,
      touchScroll: true,
      before: function (i, sections) {},
      after: function (i, sections) {},
      afterResize: function () {},
      afterRender: function () {},
      overflowScroll: true,
    });
  });

  window.addEventListener(
    "scroll",
    function () {
      const geographyRect = $(".geography-wrapper")[0].getBoundingClientRect();

      if (geographyRect.bottom <= 0 && this.window.location.hash === "#3") {
        $.scrollify.next();
      }
    },
    true
  );
});
