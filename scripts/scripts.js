// Переменные и константы
const editButton = document.querySelector('.profile__edit-button'); // Кпопка редактировать профиль
const closeEditForm = document.querySelector('.popup__close'); // Ссылка на закрытие окна редактирования профиля
const editForm = document.querySelector('.popup'); // Модальное окно
const buttonSubmit = document.querySelector('.popup__button-submit'); // Кнопка "сохранить"

// Блок заполнения полей ввода в модальном окне значениями из HTML
let profileName = document.querySelector('.profile__title').innerHTML;
let profileDescription = document.querySelector('.profile__description').innerHTML;
document.querySelector('#name').value = profileName 
document.querySelector('#about').value = profileDescription 

// Функция добавления класса "видимости" модальному окну
function addEditForm() {
	editForm.classList.add('popup_visible');
}

// Функция удаления класса "видимости" модальному окну
function removeEditForm() {
	editForm.classList.remove('popup_visible');
}

// Функция изменения отображения значка like по нажатию на него
function like(x) {
    x.classList.toggle('elements__like_active');
}

// Функция записи в HTML значения из полей ввода в модальном окне
function changeNameAndAbout() {
    document.querySelector('.profile__title').innerHTML = document.querySelector('#name').value
    document.querySelector('.profile__description').innerHTML = document.querySelector('#about').value
}

// Событие: нажатие на кнопку редактирования
editButton.addEventListener('click', addEditForm);

// Событие: нажатие на крест модального окна
closeEditForm.addEventListener('click', removeEditForm);

// Событие: нажатие на кнопку сохранения
buttonSubmit.addEventListener('click', function buttonSubmitPress() {
    changeNameAndAbout();
    removeEditForm();
});