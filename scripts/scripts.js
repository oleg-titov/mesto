/* Начальные данные для составления первых карточек */
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/* Константы */
const buttonEdit = document.querySelector('.profile__edit-button'); // Кпопка редактирования профиля
const buttonAdd = document.querySelector('.profile__add-button'); // Кнопка открытия окна добавления карточки
const formEdit = document.querySelector('.popup'); // Модальное окно
const formElement = document.querySelector('.popup__edit-form'); // Форма редактирования профиля в DOM
const addElement = document.querySelector('#addCard'); // Форма добавления карточки в DOM

const showImage = document.querySelector('#showImage'); // Форма для вывода увеличенного изображения
const popupImage = showImage.querySelector('.popup__image'); // Изображение в увеличенном виде
const popupSubtitle = showImage.querySelector('.popup__subtitle-image'); // Подпись к изображению в увеличенном виде

const elements = document.querySelector(".elements"); // Секция с карточками
const buttonAddCard = document.querySelector("#buttonCreate"); // Кнопка "Создать" в модальном окне добавления карточек
const placeName = document.querySelector("#placeName"); // Поле ввода с названием места новой карточки 
const imageLink = document.querySelector("#imageLink"); // Поле ввода ссылки на изображение новой карточки
const templateCard = document.querySelector("#templateCard"); // Заготовка для вставки новой карточки

const nameElement = document.querySelector('.profile__title'); // Значение имени в HTML
const jobElement = document.querySelector('.profile__description'); // Значение описания в HTML

// Находим поля формы в DOM
const nameInput = document.querySelector('#name'); // Поле имени в модальном окне
const jobInput = document.querySelector('#about'); // Поле описания в модальном окне

const buttonsHide = document.querySelectorAll('.popup__close-icon'); // Массив кнопок закрытия модальных окон

addStartCards(initialCards); // Вызов функции добавления изначальных карточек

/* Функции */
function addEditForm() { // Функция добавления класса "видимости" модальному окну редактирования профиля
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
  formEdit.classList.add('popup_opened');
}
function addAddForm() { // Функция добавления класса "видимости" модальному окну добавления карточки
  addElement.classList.add('popup_opened');
  placeName.value = '';
  imageLink.value = '';
}
function showImageCard() { // Функция добавления класса "видимости" вывода изображения
  showImage.classList.add('popup_opened');
}
function removeImageCard() {// Функция удаления класса "видимости" вывода изображения
  showImage.classList.remove('popup_opened');
}
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
  formEdit.classList.remove('popup_opened'); // Закрытие модального окна после нажатия на кнопку "Сохранить"
}
function addCard(evt) { // Функция добавления новой карточки
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const cardElement = createCard(placeName.value, imageLink.value);
  elements.prepend(cardElement);
  addElement.classList.remove('popup_opened'); // Закрытие модального окна
}
function deleteElement(btn) { // Фукция удаления карточки
  btn.closest(".elements__element").remove();
}
function toggleLike(card) { // Функция активации / деактивации кнопки like
  card.classList.toggle("elements__like_active");
}
function showImagePopup (image, name) { // Функция показа выбранного изображения
    popupImage.src = image.src;
    popupSubtitle.textContent = image.alt;
    showImageCard();
}
function addStartCards(elements) { // Функция добавления изначальных карточек
  elements.forEach(({ name, link }) => {
    createStartCard(name, link);
  })
}
function createStartCard(name, link) { // Функция добавления одной изначальной карточки
  const cardElement = createCard(name, link);
  elements.prepend(cardElement); // Добавление дублированной заготовки в начало секции
}
function createCard(name, link) { // Функция создания новой карточки
  const el = templateCard.content.cloneNode(true);

  const cardDelete = el.querySelector('.elements__delete');
  const cardLike = el.querySelector('.elements__like');
  const cardImage = el.querySelector('.elements__image');

  el.querySelector("#templateCardText").textContent = name;
  el.querySelector("#templateCardLink").alt = name;
  el.querySelector("#templateCardLink").src = link;

  cardDelete.addEventListener('click', () => deleteElement(cardDelete));
  cardLike.addEventListener('click', () => toggleLike(cardLike));
  cardImage.addEventListener('click', () => showImagePopup(cardImage, name));

  return el;
}
/* События */
buttonEdit.addEventListener('click', addEditForm); // Нажатие на кнопку редактирования
formElement.addEventListener('submit', handleFormSubmit); // Нажатие на кнопку "Сохранить"
buttonAdd.addEventListener('click', addAddForm); // Нажатие на кнопку добавления карточки
addElement.addEventListener('submit', addCard); // Нажатие на кнопку "Создать"

buttonsHide.forEach(function (btn) { // Нажатие на любую из 3-х кнопок закрытия модального окна
  btn.addEventListener("click", function () {
    const popupForm = btn.closest(".popup");
    popupForm.classList.remove("popup_opened");
  })
})