import { isEscapeKey } from './util.js';

const TIMEOUT_SHOW_MESSAGE = 5000;

const body = document.querySelector('body');
const elementMessageDataError = document.querySelector('#data-error').content.querySelector('.data-error');
const elementMessageSuccess = document.querySelector('#success').content.querySelector('.success');
const elementMessageError = document.querySelector('#error').content.querySelector('.error');


function showMessageLoadError() {
  body.appendChild(elementMessageDataError);

  setTimeout(() => {
    elementMessageDataError.remove();
  }, TIMEOUT_SHOW_MESSAGE);
}

function showMessageSuccess() {
  const element = elementMessageSuccess.cloneNode(true);
  body.appendChild(element);
  const successButton = element.querySelector('.success__button');

  document.addEventListener('keydown', onEscapeKeydown);
  successButton.addEventListener('click', closeMessage);
  document.addEventListener('click', onClickDocument);
}

function showMessageError() {
  const element = elementMessageError.cloneNode(true);
  body.appendChild(element);
  const ErrorButton = element.querySelector('.error__button');

  document.addEventListener('keydown', onEscapeKeydown);
  ErrorButton.addEventListener('click', closeMessage);
  document.addEventListener('click', onClickDocument);
}


function closeMessage() {
  const message = document.querySelector('.success') || document.querySelector('.error');
  message.remove();
  document.removeEventListener('click', onClickDocument);
  document.removeEventListener('keydown', onEscapeKeydown);
}

function onEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}


function onClickDocument(evt) {
  if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
    closeMessage();
  }
}

export { showMessageLoadError, showMessageSuccess, showMessageError };
