/* Начальные данные для составления первых карточек */
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Южный урал',
    link: 'https://kartinkin.net/pics/uploads/posts/2022-08/1660348995_43-kartinkin-net-p-stolitsa-yuzhnogo-urala-krasivo-foto-45.jpg'
  },
  {
    name: 'Эльбрус',
    link: 'https://static.tildacdn.com/tild6561-6466-4538-b365-303161626264/elbrus.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://damion.club/uploads/posts/2022-09/1663813736_19-damion-club-p-kamchatka-priroda-priroda-oboi-25.jpg'
  },
  {
    name: 'Хибины',
    link: 'https://content-18.foto.my.mail.ru/community/supercards/_groupsphoto/h-20383.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/* Константы */
const buttonEdit = document.querySelector('.profile__edit-button'); // Кпопка редактирования профиля
const buttonAdd = document.querySelector('.profile__add-button'); // Кнопка открытия окна добавления карточки
const profilePopup = document.querySelector('.popup-edit'); // Модальное окно редактирования профиля
const profileForm = document.querySelector('.popup__edit-form'); // Форма редактирования профиля в DOM
const addElement = document.querySelector('#addCard'); // Форма добавления карточки в DOM

const popupList = document.querySelectorAll('.popup'); // Массив попапов

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

const nameInput = document.querySelector('#name'); // Поле имени в модальном окне
const jobInput = document.querySelector('#about'); // Поле описания в модальном окне

//const buttonsHide = document.querySelectorAll('.popup__close-icon'); // Массив кнопок закрытия модальных окон

addStartCards(initialCards); // Вызов функции добавления изначальных карточек

/* Функции */

function handleEscape(evt) { // Нажатие на клавишу esc
  if (evt.key === 'Escape') {
    popupList.forEach(el => {
      if (el.classList.contains('popup_opened')) {
        closePopup(el);
      }
    })
  }
}

function openPopup(element) { // Функция добавления видимости модальному окну
  element.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
}
function closePopup(element) { // Функция удаления видимости модальному окну
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
}

function openProfilePopup() { // Функция добавления класса "видимости" модальному окну редактирования профиля
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
  openPopup(profilePopup);
}
function openAddForm() { // Функция добавления класса "видимости" модальному окну добавления карточки
  openPopup(addElement);
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
  closePopup(profilePopup);
}
function addCard(evt) { // Функция добавления новой карточки
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const cardElement = createCard(placeName.value, imageLink.value);
  elements.prepend(cardElement);
  evt.target.reset()
  // placeName.value = '';
  // imageLink.value = '';
  closePopup(addElement);
}
function deleteElement(btn) { // Фукция удаления карточки
  btn.closest(".elements__element").remove();
}
function toggleLike(card) { // Функция активации / деактивации кнопки like
  card.classList.toggle("elements__like_active");
}
function showImagePopup (image, name) { // Функция показа выбранного изображения
    popupImage.src = image.src;
    popupImage.alt = image.alt;
    popupSubtitle.textContent = image.alt;
    openPopup(showImage);
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
  const el = templateCard.content.querySelector('.elements__element').cloneNode(true);

  const cardDelete = el.querySelector('.elements__delete');
  const cardLike = el.querySelector('.elements__like');
  const cardTitle = el.querySelector('.elements__text');
  const cardImage = el.querySelector('.elements__image');

  cardTitle.textContent = name;
  cardImage.alt = name;
  cardImage.src = link;

  cardDelete.addEventListener('click', () => deleteElement(cardDelete));
  cardLike.addEventListener('click', () => toggleLike(cardLike));
  cardImage.addEventListener('click', () => showImagePopup(cardImage, name));

  return el;
}
/* События */
buttonEdit.addEventListener('click', openProfilePopup); // Нажатие на кнопку редактирования
profileForm.addEventListener('submit', handleProfileFormSubmit); // Нажатие на кнопку "Сохранить"
buttonAdd.addEventListener('click', openAddForm); // Нажатие на кнопку добавления карточки
addElement.addEventListener('submit', addCard); // Нажатие на кнопку "Создать"

// buttonsHide.forEach(function (btn) { // Нажатие на любую из 3-х кнопок закрытия модального окна
//   btn.addEventListener('click', function () {
//     const popupForm = btn.closest('.popup');
//     closePopup(popupForm);
//   })
// })

popupList.forEach(function (el) {
  el.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup__content')) { // Закрытие попапа кликом на оверлей 
      closePopup(el);
    }
    if (evt.target.classList.contains('popup__close-icon')) { // Нажатие на любую из 3-х кнопок закрытия модального окна
      closePopup(el);
    }
  });
})