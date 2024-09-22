document.addEventListener("DOMContentLoaded", () => {
  $(function () {
    $.scrollify({
      section: ".scroll",
      interstitialSection: "",
      easing: "easeOutExpo",
      scrollSpeed: 1100,
      offset: 0,
      scrollbars: true,
      setHeights: true,
      overflowScroll: true,
      updateHash: true,
      touchScroll: true,
      before: function () {},
      after: function () {},
      afterResize: function () {},
      afterRender: function () {},
      overflowScroll: true,
    });
  });

  window.addEventListener(
    "scroll",
    function () {
      const blockRect = $(".about")[0].getBoundingClientRect();
      const geographyRect = $(".geography-wrapper")[0].getBoundingClientRect();

      if (blockRect.bottom <= 0 && this.window.location.hash === "#2") {
        $.scrollify.next();
      }

      if (geographyRect.bottom <= 0 && this.window.location.hash === "#3") {
        $.scrollify.next();
      }
    },
    true
  );
});
