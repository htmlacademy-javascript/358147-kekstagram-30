import { createPicture } from './create-picture';
import { isEscapeKey } from './util';
import { createData } from './data';

const template = document.querySelector('.big-picture');
const commentTemplate = template.querySelector('.social__comment');
const container = document.querySelector('.pictures');
const socialList = document.querySelector('.social__comments');
const body = document.querySelector('body');

let commentCounter = 0;
let commentShownCount = 0;

const fragment = document.createDocumentFragment();
const pictures = createData(25);

createPicture(pictures);

let comments = [];

function openModal(evt) {

  const element = evt.target.closest('.picture');

  if (element) {
    evt.preventDefault();
    template.classList.remove('hidden');
    template.querySelector('.big-picture__img img').src = evt.target.src;
    body.classList.add('modal-open');

    const elementId = +element.dataset.id;
    const elementData = pictures.find(({ id }) => id === elementId);
    const quantityComents = elementData.comments.length;

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


function createComent(item, i) {
  const comment = commentTemplate.cloneNode(true);

  comment.querySelector('.social__picture').src = item[i].avatar;
  comment.querySelector('.social__picture').alt = item[i].name;
  comment.querySelector('.social__text').textContent = item[i].message;

  fragment.appendChild(comment);
  commentShownCount = commentShownCount + 1;
}

function renderComents(array) {
  commentCounter = commentCounter + 5;

  if (commentCounter < array.length) {
    template.querySelector('.comments-loader').classList.remove('hidden');
  } else {
    template.querySelector('.comments-loader').classList.add('hidden');
  }

  if (commentCounter >= array.length) {
    for (let i = 0; i < array.length; i++) {
      createComent(array, i);
    }
  } else {
    for (let i = 0; i < commentCounter; i++) {
      createComent(array, i);
    }
  }

  socialList.innerHTML = '';
  socialList.appendChild(fragment);
  template.querySelector('.social__comment-shown-count').textContent = commentShownCount;
  commentShownCount = 0;
}


function onEscapeKeydown(evt) {
  if (isEscapeKey) {
    evt.preventDefault();
    closeModal();
  }
}

function closeModal() {
  template.classList.add('hidden');
  document.removeEventListener('keydown', onEscapeKeydown);
  body.classList.remove('modal-open');
  commentCounter = 0;
  commentShownCount = 0;
}

function renderGallery() {
  container.addEventListener('click', openModal);
  template.querySelector('.big-picture__cancel').addEventListener('click', closeModal);
}

export { renderGallery };
