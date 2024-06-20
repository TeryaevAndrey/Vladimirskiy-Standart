const openProductCard = (title, description, сomposition) => {
  const card = document.querySelector(".product-card");
  const titleBlock = document.querySelector("#productTitle");
  const descriptionBlock = document.querySelector("#productDescription");
  const compositionBlock = document.querySelector("#productComposition");

  titleBlock.textContent = title;
  descriptionBlock.textContent = description;
  compositionBlock.textContent = сomposition;

  card.classList.add("active");

  document.body.style.overflowY = 'hidden';
};

document.querySelector(".product-card__close").addEventListener("click", () => {
  const card = document.querySelector(".product-card");
  card.classList.remove("active");

  document.body.style.overflowY = 'auto';
});
