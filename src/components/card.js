import { cardTemplate, imagePopup, popupImage, popupCaption, cardsContainer } from "./index.js";
import { openModal } from "./modal.js";
import { deleteCard, likeCard, dislikeCard } from './api.js';  
import { currentUser } from './index.js'; // Импорт переменной


// @todo: Функция создания карточки
export function createCardElement(cardData) {
    const newCard = cardTemplate.cloneNode(true);

    const cardImage = newCard.querySelector('.card__image');
    const cardTitle = newCard.querySelector('.card__title');
    const deleteButton = newCard.querySelector('.card__delete-button');
    const likeButton = newCard.querySelector('.card__like-button');
    const likesNum = newCard.querySelector('.card__likes-num');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    cardImage.addEventListener('click', () => {
        popupImage.src = cardData.link;
        popupImage.alt = cardData.name;
        popupCaption.textContent = cardData.name;
        openModal(imagePopup);
    });

    // Отображение количества лайков
    likesNum.textContent = cardData.likes.length; // Количество лайков

    // Проверка, является ли текущий пользователь владельцем карточки
    if (cardData.owner._id === currentUser._id) {
        deleteButton.style.display = 'block'; // Показываем кнопку удаления
    } else {
        deleteButton.style.display = 'none'; // Скрываем кнопку удаления
    }

    // Проверка, есть ли текущий пользователь в массиве likes
    if (cardData.likes.some(user => user._id === currentUser._id)) {
        likeButton.classList.add('card__like-button_is-active'); // Активируем кнопку лайка
    } else {
        likeButton.classList.remove('card__like-button_is-active'); // Деактивируем кнопку лайка
    }

    deleteButton.addEventListener('click', (evt) => {
        const cardId = cardData._id; // Получаем ID карточки из данных
        deleteCard(cardId) // Передаем ID в функцию deleteCard
            .then(() => {
                removeCard(evt); // Удаляем карточку из интерфейса
            })
            .catch(err => console.error('Ошибка при удалении карточки:', err));
    });

    /*likeButton.addEventListener('click', (evt) => {
        toggleLike(evt);
    });*/

    // Обработчик для кнопки лайка
    likeButton.addEventListener('click', () => {
        if (likeButton.classList.contains('card__like-button_is-active')) {
            dislikeCard(cardData._id)
                .then(() => {
                    likeButton.classList.remove('card__like-button_is-active');
                    likesNum.textContent = cardData.likes.length - 1; // Обновляем количество лайков
                })
                .catch(err => console.error('Ошибка при удалении лайка:', err));
        } else {
            likeCard(cardData._id)
                .then(() => {
                    likeButton.classList.add('card__like-button_is-active');
                    likesNum.textContent = cardData.likes.length + 1; // Обновляем количество лайков
                })
                .catch(err => console.error('Ошибка при добавлении лайка:', err));
        }
    });

    return newCard;
}


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