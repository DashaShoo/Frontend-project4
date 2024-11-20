const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;


// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(cardData) {
    const newCard = cardTemplate.cloneNode(true);

    const cardImage = newCard.querySelector('.card__image');
    const cardTitle = newCard.querySelector('.card__title');
    const deleteButton = newCard.querySelector('.card__delete-button');
    const likeButton = newCard.querySelector('.card__like-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', (evt) => {
        removeCard(evt);
    });


    likeButton.addEventListener('click', (evt) => {
        toggleLike(evt);
    });

    return newCard;
}


// @todo: Функция удаления карточки
function removeCard(evt) {
    const cardItem = evt.target.closest('.card'); 
    if (cardItem) {
        cardsContainer.removeChild(cardItem);
    }
  }

function toggleLike(evt) {
    const likeButton = evt.target;
    likeButton.classList.toggle('card__like-button_is-active');
}


// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
    const cardElement = createCard(card);
    cardsContainer.append(cardElement); // Добавляем новую карточку в список
  });
