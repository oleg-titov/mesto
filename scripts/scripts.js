/* Константы */
const buttonEdit = document.querySelector('.profile__edit-button'); // Кпопка редактирования профиля
const formEditClose = document.querySelector('.popup__close'); // Ссылка на закрытие окна редактирования профиля
const formEdit = document.querySelector('.popup'); // Модальное окно
const buttonLike = document.querySelectorAll('.elements__like'); // Выбор всех кнопок like

/* Функции */

// Функция добавления класса "видимости" модальному окну
function addEditForm() {
  formEdit.classList.add('popup_opened');
}
// Функция удаления класса "видимости" модальному окну
function removeEditForm() {
  formEdit.classList.remove('popup_opened');
}

/* События */

// Событие: нажатие на кнопку редактирования
buttonEdit.addEventListener('click', function () {
  // Форма в DOM
  let formElement = document.querySelector('.popup__edit-form');
  
  // Поля формы в DOM
  let nameElement = document.querySelector('.profile__title');
  let jobElement = document.querySelector('.profile__description');
  nameInput =  document.querySelector('#name');
  jobInput = document.querySelector('#about');
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;

  // Обработчик «отправки» формы
  function handleFormSubmit(evt) {
    evt.preventDefault(); // Отмена стандартной отправки формы

    // Значение полей jobInput и nameInput из свойства value
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;
    // Вставка новых значения с помощью textContent
    nameElement.textContent = nameInputValue;
    jobElement.textContent = jobInputValue;
  }

  addEditForm(); // Отображение модального окна

  // Прикрепление обработчика к форме:
  // он следит за событием “submit” - «отправка»
  formElement.addEventListener('submit', handleFormSubmit);
});

// Событие: нажатие на крест модального окна
formEditClose.addEventListener('click', removeEditForm);

// Событие: нажатие на кнопку like со встроенной функций смены класса
buttonLike.forEach(function (btn) {
  btn.addEventListener('click', function () {
    btn.classList.toggle("elements__like_active");
  })
}); 