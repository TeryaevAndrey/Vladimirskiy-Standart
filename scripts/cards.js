const openCard = (cardName) => {
  const card = document.querySelector(`.card[data-card="${cardName}"]`);
  card.classList.toggle("active");

  if (window.innerWidth > 1024) {
    const block = document.querySelector(`#${cardName}`);
    const blockHeight = block.clientHeight;

    card.style.height = blockHeight + "px";

    return;
  }

  if (card.classList.contains("active")) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "auto";
  }
};

const closeCard = (cardName) => {
  const card = document.querySelector(`.card[data-card="${cardName}"]`);
  card.classList.remove("active");

  document.body.style.overflowY = "auto";
};

const openCardMore = (cardName) => {
  const card = document.querySelector(`.card-more[data-card="${cardName}"]`);
  card.classList.toggle("active");

  if (card.classList.contains("active")) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "auto";
  }
};

const closeCardMore = (cardName) => {
  const card = document.querySelector(`.card-more[data-card="${cardName}"]`);
  card.classList.remove("active");

  document.body.style.overflowY = "auto";
};
