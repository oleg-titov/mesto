/* Константы */
const buttonEdit = document.querySelector('.profile__edit-button'); // Кпопка редактирования профиля
const buttonAdd = document.querySelector('.profile__add-button'); // Кнопка открытия окна добавления карточки
const formEditClose = document.querySelector('.popup__close-icon'); // Ссылка на закрытие окна редактирования профиля
const addElementClose = document.querySelector('#add-form-close-icon'); // Ссылка на закрытие окна добавления карточки
const formEdit = document.querySelector('.popup'); // Модальное окно
const formElement = document.querySelector('.popup__edit-form'); // Форма редактирования профиля в DOM
const addElement = document.querySelector('#addCard'); // Форма добавления карточки в DOM

const showImage = document.querySelector('#showImage'); // Форма для вывода увеличенного изображения
const popupImage = showImage.querySelector('.popup__image'); // Изображение в увеличенном виде
const popupSubtitle = showImage.querySelector('.popup__subtitle-image'); // Подпись к изображению в увеличенном виде
const cardImageClose = document.querySelector('#cardImageClose'); // Кнопка зактытия формы увеличенного изображения

const elements = document.querySelector(".elements"); // Секция с карточками
const buttonAddCard = document.querySelector("#buttonCreate"); // Кнопка "Создать" в модальном окне добавления карточек
const placeName = document.querySelector("#placeName"); // Поле ввода с названием места новой карточки 
const imageLink = document.querySelector("#imageLink"); // Поле ввода ссылки на изображение новой карточки
const templateCard = document.querySelector("#templateCard"); // Заготовка для вставки новой карточки

/* Переменные */
let nameElement = document.querySelector('.profile__title'); // Значение имени в HTML
let jobElement = document.querySelector('.profile__description'); // Значение описания в HTML
let buttonsDelete = document.querySelectorAll(".elements__delete"); // Массив кнопок удаления карточек
let buttonsLike = document.querySelectorAll('.elements__like'); // Выбор всех кнопок like

let cardImages = document.querySelectorAll('.elements__image'); // Выбор всех изображений в карточках

// Находим поля формы в DOM
let nameInput =  document.querySelector('#name'); // Поле имени в модальном окне
let jobInput = document.querySelector('#about'); // Поле описания в модальном окне

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

function removeEditForm() {// Функция удаления класса "видимости" модального окна редактирования профиля
  formEdit.classList.remove('popup_opened');
}
function removeAddForm() {// Функция удаления класса "видимости" модального окна добавления карточки
  addElement.classList.remove('popup_opened');
}

function removeImageCard() {// Функция удаления класса "видимости" мвывода изображения
  showImage.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    removeEditForm(); // Закрытие модального окна после нажатия на кнопку "Сохранить"
}
function addCard(evt) { // Функция добавления новой карточки
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    let templateCardText = templateCard.content.querySelector("#templateCardText");
    templateCardText.textContent = placeName.value;
    let templateCardLink = templateCard.content.querySelector("#templateCardLink");
    templateCardLink.src = imageLink.value;
    let newCode = templateCard.content.cloneNode(true); // Дублирование заготовки
    elements.prepend(newCode); // Добавление дублированной заготовки в начало секции
    removeAddForm(); // Закрытие модального окна
}
function deleteElement() { // Фукция удаления карточки
  this.closest(".elements__element").remove();
}

/* События */
buttonEdit.addEventListener('click', addEditForm); // Нажатие на кнопку редактирования
formEditClose.addEventListener('click', removeEditForm); // Нажатие на крест модального окна
formElement.addEventListener('submit', handleFormSubmit); // Нажатие на кнопку "Сохранить"
buttonAdd.addEventListener('click', addAddForm); // Нажатие на кнопку добавления карточки
addElementClose.addEventListener('click', removeAddForm); // Нажатие на крест модального окна добавления карточки
addElement.addEventListener('submit', addCard); // Нажатие на кнопку "Создать"

buttonsDelete.forEach(function(button) { // Нажатие на кнопку удалить
  button.addEventListener("click", deleteElement);
});

buttonsLike.forEach(function (btn) { // Нажатие на кнопку Like
  btn.addEventListener('click', function () { 
    btn.classList.toggle("elements__like_active"); 
  }) 
});

cardImages.forEach(function(img) { // Нажатие на изображение в карточке
  img.addEventListener("click", function () {
    popupImage.src = img.src;
    popupSubtitle.textContent = img.alt;
  })
  img.addEventListener("click", showImageCard);
})

cardImageClose.addEventListener('click', removeImageCard); // Нажатие на крест модального окна добавления карточки