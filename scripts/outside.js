const outside = (e) => {
  const blocks = document.querySelectorAll(".outside");

  blocks?.forEach((block) => {
    if (
      !e.target.closest(".outside") &&
      !e.target.closest("button") &&
      !e.target.closest(".sausages") && !e.target.closest(".ogogon")
    ) {
      block.classList.remove("active");
    }
  });
};

document.addEventListener("click", outside);
