import { createPicture } from './create-picture';
import { isEscapeKey } from './util';
import { createData } from './data';

const template = document.querySelector('.big-picture');
const container = document.querySelector('.pictures');
const socialList = document.querySelector('.social__comments');
const body = document.querySelector('body');

const pictures = createData(25);

createPicture(pictures);

function openModal(evt) {

  const element = evt.target.closest('.picture');

  if (element) {
    evt.preventDefault();
    template.classList.remove('hidden');
    template.querySelector('.big-picture__img img').src = evt.target.src;
    body.classList.add('modal-open');

    const elementId = +element.dataset.id;
    const elementData = pictures.find(({ id }) => id === elementId);

    template.querySelector('.likes-count').textContent = elementData.likes;
    // template.querySelector('.social__comment-shown-count').textContent = '5';
    template.querySelector('.social__comment-total-count').textContent = elementData.comments.length;
    template.querySelector('.social__caption').textContent = elementData.description;

    const comments = elementData.comments;
    const commentTemplate = template.querySelector('.social__comment');
    const fragment = document.createDocumentFragment();

    comments.forEach((item) => {
      const comment = commentTemplate.cloneNode(true);

      comment.querySelector('.social__picture').src = item.avatar;
      comment.querySelector('.social__picture').alt = item.name;
      comment.querySelector('.social__text').textContent = item.message;

      fragment.appendChild(comment);
    });

    socialList.innerHTML = '';
    socialList.appendChild(fragment);


    template.querySelector('.social__comment-count').classList.add('hidden');
    template.querySelector('.comments-loader').classList.add('hidden');


    document.addEventListener('keydown', onEscapeKeydown);
  }

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
}

function renderGallery() {
  container.addEventListener('click', openModal);
  template.querySelector('.big-picture__cancel').addEventListener('click', closeModal);
}

export { renderGallery };
