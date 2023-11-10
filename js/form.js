import { isEscapeKey } from './util';

const body = document.querySelector('body');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const inputHashtags = document.querySelector('.text__hashtags');
const inputDescription = document.querySelector('.text__description');
const form = document.querySelector('.img-upload__form');

const MAX_LENGHT_COMMENT = 140;

function modalOpen() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscapeKeydown);
}

function modalClose() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeKeydown);
  // TODO сбросить значения полей формы
}

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы
  errorClass: 'img-upload__field-wrapper--error', // Класс, обозначающий невалидное поле
  // successClass: '', // Класс, обозначающий валидное поле
  errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
  // errorTextTag: '', // Тег, который будет обрамлять текст ошибки
  // errorTextClass: '' // Класс для элемента с текстом ошибки
}, false);

// function validateHashTags () {

// }

function validateComment() {
  if (inputDescription.value.length <= MAX_LENGHT_COMMENT) {
    return true;
  }
  return false;
}


// pristine.addValidator(inputHashtags, validateHashTags);
pristine.addValidator(inputDescription, validateComment, 'длина комментария больше 140 символов');


form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
  // console.log();
});




function onInputChange() {
  modalOpen();
}

function onClickCancel() {
  modalClose();
}

function onEscapeKeydown(evt) {
  // FIXME не закрывать если в фокусе input
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    modalClose();
  }
}

uploadInput.addEventListener('change', onInputChange);
uploadCancel.addEventListener('click', onClickCancel);
