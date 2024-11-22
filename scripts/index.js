//поиск всех элементов
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const editProfileBtn = document.querySelector('.profile__edit-button');
const closePopup = document.querySelectorAll('.popup__close');

const newCardPopup = document.querySelector('.profile__add-button');
const formCardElement = document.forms['new-place'];
const cardLoc = document.querySelector('.popup__input_type_card-name');
const cardUrl = document.querySelector('.popup__input_type_url');

const imagePopupSrcAlt = document.querySelector('.popup__image');
const imagePopupName = document.querySelector('.popup__caption');

const profileFormElement = document.forms['edit-profile'];
const nameInput = profileFormElement.elements.name;
const jobInput = profileFormElement.elements.description;

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

//создание карточки
function createCard(name, link) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    const likeCard = card.querySelector('.card__like-button');
    const deleteCard = card.querySelector('.card__delete-button');

    //кнопка лайка
    likeCard.addEventListener('click', () => {
        likeCard.classList.toggle('card__like-button_is-active');
    });

    //кнопка удаления карточки
    deleteCard.addEventListener('click', () => {
        card.remove();
    });

    //кнопка просмотра карточки
    cardImage.addEventListener('click', () => {
        imagePopupSrcAlt.src = link;
        imagePopupName.textContent = name;
        imagePopupSrcAlt.alt = name;

        openModal(imagePopup);
    });

    return card;
}

//загрузка изначальных карточек
initialCards.forEach(function (card) {
    placesList.append(createCard(card.name, card.link));
});

//открытие всплывающего окна
function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

//закрытие всплывающего окна
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

//отправка формы пользователя
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    const name = nameInput.value;
    const job = jobInput.value;

    profileName.textContent = name;
    profileJob.textContent = job;

    closeModal(profilePopup);
}

//принятие изменений профиля
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

//кнопка формы пользователя
editProfileBtn.addEventListener('click', function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

    openModal(profilePopup);
});

//закрытие всплывающего окна
closePopup.forEach(function (popup) {
    popup.addEventListener('click', () => {
        const pop = popup.closest('.popup');
        closeModal(pop);
    });
});

//кнопка создания карточки
newCardPopup.addEventListener('click', () => {
    openModal(cardPopup);
});

//отправка формы карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const location = cardLoc.value;
    const url = cardUrl.value;

    const newCard = createCard(location, url);

    placesList.prepend(newCard);

    closeModal(cardPopup);
    formCardElement.reset();
}

formCardElement.addEventListener('submit', handleCardFormSubmit);