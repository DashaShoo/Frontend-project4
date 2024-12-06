
import { initialCards } from "./cards.js";
import { enableValidation } from "./validation.js";
import { createCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";



const cardsContainer = document.querySelector('.places__list');
export const cardTemplate = document.querySelector('#card-template').content;

export const imagePopup = document.querySelector('.popup_type_image');
export const popupImage = imagePopup.querySelector('.popup__image');
export const popupCaption = imagePopup.querySelector('.popup__caption');



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
    cardsContainer.append(cardElement);
});

// ПОПАПЫ!!!!!!!!!!!!
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');



// Обработчик событий для кнопок закрытия попапов
const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup');
        closeModal(popup);
    });
});




// Закрытие попапа при клике вне его содержимого
const popups = document.querySelectorAll('.popup');
popups.forEach(popup => {
    popup.addEventListener('click', (evt) => {
        if (evt.target === popup) {
            closeModal(popup);
        }
    });
});




// ФОРМА РЕДАКТИРОВАНИЯ
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

function fillProfileForm() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}

// Обработчик открытия попапа редактирования профиля
document.querySelector('.profile__edit-button').addEventListener('click', () => {
    fillProfileForm();
    openModal(profilePopup);
});

// Обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;

    closeModal(profilePopup); 
}

// Прикрепляем обработчик к форме редактирования профиля
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// ФОРМА КАРТОЧКИ
const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardFormElement.querySelector('.popup__input_type_url');

document.querySelector('.profile__add-button').addEventListener('click', () => {
    cardNameInput.value = '';
    cardLinkInput.value = '';
    openModal(cardPopup); 
});

// Обработчик отправки формы добавления карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const cardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
    };

    const newCardElement = createCard(cardData);
    cardsContainer.prepend(newCardElement);

    closeModal(cardPopup);
}

// Прикрепляем обработчик к форме добавления карточки
cardFormElement.addEventListener('submit', handleCardFormSubmit);


popups.forEach(popup => {
  popup.classList.add('popup_is-animated'); 
});



//new

  enableValidation();