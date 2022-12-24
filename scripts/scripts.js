/* Константы */
const buttonEdit = document.querySelector('.profile__edit-button'); // Кпопка редактирования профиля
const formEditClose = document.querySelector('.popup__close-icon'); // Ссылка на закрытие окна редактирования профиля
const formEdit = document.querySelector('.popup'); // Модальное окно
const formElement = document.querySelector('.popup__edit-form'); // Форма в DOM

/* Переменные */
let nameElement = document.querySelector('.profile__title'); // Значение имени в HTML
let jobElement = document.querySelector('.profile__description'); // Значение описания в HTML
// Находим поля формы в DOM
let nameInput =  document.querySelector('#name'); // Поле имени в модальном окне
let jobInput = document.querySelector('#about'); // Поле описания в модальном окне

/* Функции */
function addEditForm() { // Функция добавления класса "видимости" модальному окну
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;
    formEdit.classList.add('popup_opened');
}
function removeEditForm() {// Функция удаления класса "видимости" модального окна
  formEdit.classList.remove('popup_opened');
}
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    removeEditForm(); // Закрытие модального окна после нажатия на кнопку "Сохранить"
}

/* События */
buttonEdit.addEventListener('click', addEditForm); // Нажатие на кнопку редактирования
formEditClose.addEventListener('click', removeEditForm); // Нажатие на крест модального окна
formElement.addEventListener('submit', handleFormSubmit); // Нажатие на кнопку "Сохранить"