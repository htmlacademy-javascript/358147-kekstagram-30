import { createPicture } from './create-picture';

function renderGallery(pictures) {

  createPicture(pictures);

  const template = document.querySelector('.big-picture');
  const container = document.querySelector('.pictures');
  const socialList = document.querySelector('.social__comments');
  const body = document.querySelector('body');

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
    if (evt.key === 'Escape') {
      evt.preventDefault();
      clouseModal();
    }
  }

  container.addEventListener('click', openModal);


  function clouseModal() {
    template.classList.add('hidden');
    document.removeEventListener('keydown', onEscapeKeydown);
    body.classList.remove('modal-open');
  }

  template.querySelector('.big-picture__cancel').addEventListener('click', clouseModal);

}

export {renderGallery};
