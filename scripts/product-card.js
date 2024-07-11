const openProductCard = (title, description, сomposition, img) => {
  const card = document.querySelector(".product-card");
  const titleBlock = document.querySelector("#productTitle");
  const descriptionBlock = document.querySelector("#productDescription");
  const compositionBlock = document.querySelector("#productComposition");
  const blockImg = document.querySelector(".product-card__img");

  titleBlock.textContent = title;
  descriptionBlock.textContent = description;
  compositionBlock.textContent = сomposition;
  blockImg.src = img;

  card.classList.add("active");

  document.body.style.overflowY = "hidden";
};

document.querySelector(".product-card__close").addEventListener("click", () => {
  const card = document.querySelector(".product-card");
  card.classList.remove("active");

  document.body.style.overflowY = "auto";
});
