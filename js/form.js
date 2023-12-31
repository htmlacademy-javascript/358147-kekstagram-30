import { isEscapeKey } from './util.js';
import { resetEffect, onRadioClick } from './effect.js';
import { resetScale, onButtonSmallerClick, onButtonBiggerClick } from './scale.js';
import { sendPicrure } from './api.js';
import { showMessageSuccess, showMessageError } from './message.js';

const MAX_LENGHT_COMMENT = 140;
const MAX_COUNT_HASHTAG = 5;
const HASHTAG_VALID = /^#[a-zа-яё0-9]{1,19}$/i;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const body = document.querySelector('body');
const inputUpload = document.querySelector('.img-upload__input');
const inputHashtags = document.querySelector('.text__hashtags');
const inputDescription = document.querySelector('.text__description');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const effectList = document.querySelector('.effects__list');
const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectPreview = document.querySelectorAll('.effects__preview');
const submitButton = document.querySelector('.img-upload__submit');


const SubmintButtonCaption = {
  SUBMITING: 'Отправляю...',
  IDLE: 'Опубликовать',
};

let arrayTags = [];

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
}, false);


function modalOpen() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  resetEffect();
  resetScale();
  document.addEventListener('keydown', onEscapeKeydown);
  effectList.addEventListener('click', onRadioClick);
  buttonSmaller.addEventListener('click', onButtonSmallerClick);
  buttonBigger.addEventListener('click', onButtonBiggerClick);

  const file = inputUpload.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);
    effectPreview.forEach((item) => {
      item.style.backgroundImage = `url(${imgUploadPreview.src})`;
    });
  }
}

function modalClose() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeKeydown);
  document.removeEventListener('click', onRadioClick);
  buttonSmaller.removeEventListener('click', onButtonSmallerClick);
  buttonBigger.removeEventListener('click', onButtonBiggerClick);
  form.reset();
  pristine.reset();
}

function normalizeTags(tagString) {
  return tagString.trim().split(' ').filter((tag) => Boolean(tag.length));
}

function validateHashtag() {
  if (arrayTags.every((tag) => HASHTAG_VALID.test(tag))) {
    return true;
  }
  return false;
}

function validateUniqueHashtag() {
  const arrayTagsLowerCase = arrayTags.map((tag) => tag.toLowerCase());
  if (arrayTagsLowerCase.length === new Set(arrayTagsLowerCase).size) {
    return true;
  }
  return false;
}

function validateCountHashtag() {
  if (arrayTags.length <= MAX_COUNT_HASHTAG) {
    return true;
  }
  return false;
}

function validateComment() {
  if (inputDescription.value.length <= MAX_LENGHT_COMMENT) {
    return true;
  }
  return false;
}

pristine.addValidator(inputHashtags, validateCountHashtag, 'превышено количество хэш-тегов', 1, true);
pristine.addValidator(inputHashtags, validateHashtag, 'введён невалидный хэш-тег', 2, true);
pristine.addValidator(inputHashtags, validateUniqueHashtag, 'хэш-теги повторяются', 3, true);

pristine.addValidator(inputDescription, validateComment, 'длина комментария больше 140 символов');


async function onFormSubmit(evt) {
  arrayTags = normalizeTags(inputHashtags.value);
  const isValid = pristine.validate();
  evt.preventDefault();

  if (isValid) {

    try {
      toggleSubmitButton(true);
      await sendPicrure(new FormData(evt.target));
      modalClose();
      showMessageSuccess();
    } catch {
      showMessageError();
    } finally {
      toggleSubmitButton(false);
    }
  }
}

function toggleSubmitButton(isDisabled) {
  submitButton.disabled = isDisabled;

  if (isDisabled) {
    submitButton.textContent = SubmintButtonCaption.SUBMITING;
  } else {
    submitButton.textContent = SubmintButtonCaption.IDLE;
  }
}

function onInputChange() {
  modalOpen();
}

function onClickCancel() {
  modalClose();
}


function isOpenError() {
  if (body.querySelector('.error__inner')) {
    return false;
  }
  return true;
}

function onEscapeKeydown(evt) {
  if (isEscapeKey(evt) && !(document.activeElement === inputHashtags || document.activeElement === inputDescription) && isOpenError()) {
    evt.preventDefault();
    modalClose();
  }
}

inputUpload.addEventListener('change', onInputChange);
form.addEventListener('submit', onFormSubmit);
uploadCancel.addEventListener('click', onClickCancel);
