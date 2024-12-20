import '../pages/index.css';
import { initialCards } from "./cards.js";
import { enableValidation } from "./validation.js";
import { createCardElement } from "./card.js";
import { openModal, closeModal } from "./modal.js";

import { getUserInfo, getInitialCards, updateUserInfo, updateAvatar, createCard } from "./api.js"; 
let currentUser = null


export const cardsContainer = document.querySelector('.places__list');
export const cardTemplate = document.querySelector('#card-template').content;

export const imagePopup = document.querySelector('.popup_type_image');
export const popupImage = imagePopup.querySelector('.popup__image');
export const popupCaption = imagePopup.querySelector('.popup__caption');



// @todo: Функция удаления карточки

/*
// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
    const cardElement = createCardElement(card);
    cardsContainer.append(cardElement);
});
*/

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
/*function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;

    closeModal(profilePopup); 
}*/

// Прикрепляем обработчик к форме редактирования профиля
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// ФОРМА КАРТОЧКИ
const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardFormElement.querySelector('.popup__input_type_url');
const cardSubmitButton = cardFormElement.querySelector('.popup__button');
const profileSubmitButton = profileFormElement.querySelector('.popup__button');

document.querySelector('.profile__add-button').addEventListener('click', () => {
    cardNameInput.value = '';
    cardLinkInput.value = '';
    openModal(cardPopup); 
});

// Обработчик отправки формы добавления карточки
/*function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const cardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
    };

    const newCardElement = createCardElement(cardData);
    cardsContainer.prepend(newCardElement);

    closeModal(cardPopup);
}*/

// Прикрепляем обработчик к форме добавления карточки
cardFormElement.addEventListener('submit', handleCardFormSubmit);


popups.forEach(popup => {
  popup.classList.add('popup_is-animated'); 
});







//new

enableValidation();






const userAvatar = document.querySelector(".profile__image");
const editAvatarButton = document.querySelector(".profile__image");
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = avatarPopup.querySelector(".popup__form");
const avatarUrl = avatarForm.querySelector(".popup__input_type_url");
const closeAvatarButton = avatarPopup.querySelector('.popup__close');
const submitAvatarButton = avatarPopup.querySelector('.popup__button');

editAvatarButton.addEventListener('click', () => {
    if (userAvatar.src){
        avatarUrl.value = userAvatar.src
    }
    openModal(avatarPopup);
})
closeAvatarButton.addEventListener('click', () => closeModal(avatarPopup));
avatarForm.addEventListener('submit', handleAvatarFormSubmit);


function handleAvatarFormSubmit(event) {
    event.preventDefault();

    submitAvatarButton.textContent = 'Сохранение...'; 
    submitAvatarButton.disabled = true; 

    const avatar = avatarUrl.value

    updateAvatar(avatar)
    .then(u=>{
        userAvatar.style.backgroundImage = "url("+u.avatar+")"
        closeModal(avatarPopup)
    })
    .catch(err => console.error(err))
    .finally(() => { 
        submitAvatarButton.textContent = 'Сохранить'; 
        submitAvatarButton.disabled = false; 
    }); 
}


function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    profileSubmitButton.textContent = 'Сохранение...'; 
    profileSubmitButton.disabled = true; 

    updateUserInfo(nameValue, jobValue)
        .then(updatedUser => {
            profileTitle.textContent = updatedUser.name;
            profileDescription.textContent = updatedUser.about;
            closeModal(profilePopup);
        })
        .catch(err => console.error(err))
        .finally(() => { 
            profileSubmitButton.textContent = 'Сохранить'; 
            profileSubmitButton.disabled = false; 
        }); 
}



function handleCardFormSubmit(evt) {
    evt.preventDefault();

    cardSubmitButton.textContent = 'Сохранение...'; 
    cardSubmitButton.disabled = true; 

    const cardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
    };

    createCard(cardData.name, cardData.link)
        .then(newCard => {
            const newCardElement = createCardElement(newCard);
            cardsContainer.prepend(newCardElement);
            closeModal(cardPopup);
        })
        .catch(err => console.error(err))
        .finally(() => { 
            cardSubmitButton.textContent = 'Сохранить'; 
            cardSubmitButton.disabled = false; 
        }); 
}



Promise.all([getUserInfo(), getInitialCards()])
    .then(([user, cards]) => {
        currentUser = user;
        profileTitle.textContent = user.name;
        profileDescription.textContent = user.about;
        userAvatar.style.backgroundImage = `url(${user.avatar})`;

        // Загрузка карточек
        cards.forEach(cardData => {
            const cardElement = createCardElement(cardData);
            cardsContainer.append(cardElement);
        });
    })
    .catch(err => console.error('Ошибка при загрузке данных:', err));




export { currentUser };