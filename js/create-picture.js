function createPicture (data) {
  const tamplate = document.querySelector('#picture');
  const pictures = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  data.forEach((i) => {
    const item = tamplate.content.querySelector('.picture');
    const photo = item.cloneNode(true);

    photo.querySelector('.picture__img').alt = i.description;
    photo.querySelector('.picture__img').src = i.url;
    photo.querySelector('.picture__comments').textContent = i.likes;
    photo.querySelector('.picture__likes').textContent = i.comments.length;

    fragment.appendChild(photo);
  });

  pictures.appendChild(fragment);
}

export {createPicture};
