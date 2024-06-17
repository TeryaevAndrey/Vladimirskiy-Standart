const openCard = (cardName) => {
  const card = document.querySelector(`.card[data-card="${cardName}"]`);
  card.classList.toggle("active");
};

const closeCard = (cardName) => {
  const card = document.querySelector(`.card[data-card="${cardName}"]`);
  card.classList.remove("active");
};

const openCardMore = (cardName) => {
  const card = document.querySelector(`.card-more[data-card="${cardName}"]`);
  card.classList.toggle("active");
};

const closeCardMore = (cardName) => {
  const card = document.querySelector(`.card-more[data-card="${cardName}"]`);
  card.classList.remove("active");
};
