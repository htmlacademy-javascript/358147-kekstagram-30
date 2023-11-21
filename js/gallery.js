import { createPicture } from './create-picture.js';
import { isEscapeKey } from './util.js';
import { loadPicrure } from './api.js';
import { showMessageloadError } from './message.js';
import { initFilter } from './filter.js';

const template = document.querySelector('.big-picture');
const commentTemplate = template.querySelector('.social__comment');
const container = document.querySelector('.pictures');
const socialList = document.querySelector('.social__comments');
const body = document.querySelector('body');

const CHANGE_STEP_COMMENT = 5;
let commentCounter = 0;

const fragment = document.createDocumentFragment();
let pictures = [];

try {
  pictures = await loadPicrure();
  createPicture(pictures);
  initFilter(pictures);
} catch {
  showMessageloadError();
}

let comments = [];

function openModal(evt) {

  const element = evt.target.closest('.picture');

  if (element) {
    evt.preventDefault();
    template.classList.remove('hidden');
    body.classList.add('modal-open');

    const elementId = +element.dataset.id;
    const elementData = pictures.find(({ id }) => id === elementId);
    const quantityComents = elementData.comments.length;

    template.querySelector('.big-picture__img img').src = elementData.url;
    template.querySelector('.likes-count').textContent = elementData.likes;
    template.querySelector('.social__comment-total-count').textContent = quantityComents;
    template.querySelector('.social__caption').textContent = elementData.description;

    comments = elementData.comments;

    renderComents(comments);

    document.addEventListener('keydown', onEscapeKeydown);
  }
}

document.querySelector('.comments-loader').addEventListener('click', () => {
  renderComents(comments);
});


function createComent(item) {
  const comment = commentTemplate.cloneNode(true);

  comment.querySelector('.social__picture').src = item.avatar;
  comment.querySelector('.social__picture').alt = item.name;
  comment.querySelector('.social__text').textContent = item.message;

  fragment.appendChild(comment);
}

function renderComents(array) {
  commentCounter = commentCounter + CHANGE_STEP_COMMENT;

  if (commentCounter < array.length) {
    template.querySelector('.comments-loader').classList.remove('hidden');
  } else {
    template.querySelector('.comments-loader').classList.add('hidden');

    commentCounter = array.length;
  }

  for (let i = 0; i < commentCounter; i++) {
    createComent(array[i]);
  }

  socialList.innerHTML = '';
  socialList.appendChild(fragment);
  template.querySelector('.social__comment-shown-count').textContent = commentCounter;
}


function onEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

function closeModal() {
  template.classList.add('hidden');
  document.removeEventListener('keydown', onEscapeKeydown);
  body.classList.remove('modal-open');
  commentCounter = 0;
}

function renderGallery() {
  container.addEventListener('click', openModal);
  template.querySelector('.big-picture__cancel').addEventListener('click', closeModal);
}

export { renderGallery };
