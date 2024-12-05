const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

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

function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener("keydown", closeByEsc);
}
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener("keydown", closeByEsc);
}

// Обработчик событий для кнопок закрытия попапов
const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup');
        closeModal(popup);
    });
});


function closeByEsc(evt) {
	if (evt.key == "Escape") {
		closeModal(document.querySelector(".popup_is-opened"));
	}
}

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
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_visible');
  };
  

  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
  };


  function checkInputValidity(formElement, inputElement) {
	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage);
	} else {
		hideInputError(formElement, inputElement);
	}
}



const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    
    toggleButtonState(inputList, buttonElement);
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });

      setEventListeners(formElement);
      
    });
  };
  

  
  
  function hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    }); 
  }
  
  function toggleButtonState(inputList, buttonElement){
    if (hasInvalidInput(inputList)){
      buttonElement.setAttribute("disabled", "true");
      buttonElement.classList.add('popup__button_disabled');
    }else{
      buttonElement.removeAttribute("disabled");
      buttonElement.classList.remove('popup__button_disabled');
    }
  }

  enableValidation();