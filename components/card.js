import { cardTemplate, imagePopup, popupImage, popupCaption } from "./index.js";
import { openModal } from "./modal.js";


// @todo: Функция создания карточки
export function createCard(cardData) {
    const newCard = cardTemplate.cloneNode(true);

    const cardImage = newCard.querySelector('.card__image');
    const cardTitle = newCard.querySelector('.card__title');
    const deleteButton = newCard.querySelector('.card__delete-button');
    const likeButton = newCard.querySelector('.card__like-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    cardImage.addEventListener('click', () => {
        popupImage.src = cardData.link;
        popupImage.alt = cardData.name;
        popupCaption.textContent = cardData.name;
        openModal(imagePopup);
    });

    deleteButton.addEventListener('click', (evt) => {
        removeCard(evt);
    });

    likeButton.addEventListener('click', (evt) => {
        toggleLike(evt);
    });

    return newCard;
}