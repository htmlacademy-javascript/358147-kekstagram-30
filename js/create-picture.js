function createPicture (data) {
  const tamplate = document.querySelector('#picture');
  const pictures = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  data.forEach((item) => {
    const picture = tamplate.content.querySelector('.picture');
    const photo = picture.cloneNode(true);

    photo.querySelector('.picture__img').alt = item.description;
    photo.querySelector('.picture__img').src = item.url;
    photo.querySelector('.picture__comments').textContent = item.comments.length;
    photo.querySelector('.picture__likes').textContent = item.likes;

    photo.dataset.id = item.id;

    fragment.appendChild(photo);
  });

  pictures.appendChild(fragment);
}

export {createPicture};
