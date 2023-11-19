import { createPicture } from './create-picture';
import { getRandomInteger } from './util';

const filter = document.querySelector('.img-filters');
const buttonDefault = document.querySelector('#filter-default');
const buttonRandom = document.querySelector('#filter-random');
const buttonDiscussed = document.querySelector('#filter-discussed');

const QUANTITY_RANDOM_PICTURE = 10;

function clearPicture() {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => {
    item.remove();
  });
}

function initFilter(data) {
  filter.classList.remove('img-filters--inactive');

  buttonDefault.addEventListener('click', () => {
    clearPicture();
    createPicture(data);

    buttonDefault.classList.add('img-filters__button--active');
    buttonRandom.classList.remove('img-filters__button--active');
    buttonDiscussed.classList.remove('img-filters__button--active');
  });

  buttonRandom.addEventListener('click', () => {
    clearPicture();

    const randomIndexList = [];
    const lengthArrey = Math.min(QUANTITY_RANDOM_PICTURE, data.length);
    while (randomIndexList.length < lengthArrey) {
      const index = getRandomInteger(0, data.length - 1);
      if (!randomIndexList.includes(index)) {
        randomIndexList.push(index);
      }
    }

    function random(index) {
      return data[index];
    }
    createPicture(randomIndexList.map(random));

    buttonDefault.classList.remove('img-filters__button--active');
    buttonRandom.classList.add('img-filters__button--active');
    buttonDiscussed.classList.remove('img-filters__button--active');
  });

  buttonDiscussed.addEventListener('click', () => {
    clearPicture();

    function sorting(item1, item2) {
      return item2.comments.length - item1.comments.length;
    }
    createPicture([...data].sort(sorting));

    buttonDefault.classList.remove('img-filters__button--active');
    buttonRandom.classList.remove('img-filters__button--active');
    buttonDiscussed.classList.add('img-filters__button--active');
  });

  // console.log(data);
}

export { initFilter };
