import {createData} from'./data';

const tamplate = document.querySelector('#picture');
const pictures = document.querySelector('.pictures');

const data = createData(25);
const fragment = document.createDocumentFragment();

for (let i = 0; i < data.length; i++) {
  const item = tamplate.content.querySelector('.picture');
  const photo = item.cloneNode(true);

  photo.querySelector('.picture__img').alt = data[i].description;
  photo.querySelector('.picture__img').src = data[i].url;
  photo.querySelector('.picture__comments').textContent = data[i].likes;
  photo.querySelector('.picture__likes').textContent = data[i].comments.length;

  fragment.appendChild(photo);
}

pictures.appendChild(fragment);
