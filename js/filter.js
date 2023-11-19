import { createPicture } from './create-picture';
import { getRandomInteger, debounce } from './util';

const filter = document.querySelector('.img-filters');
const buttonDefault = document.querySelector('#filter-default');
const buttonRandom = document.querySelector('#filter-random');
const buttonDiscussed = document.querySelector('#filter-discussed');

const QUANTITY_RANDOM_PICTURE = 10;

function repaint(arrey) {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => {
    item.remove();
  });

  createPicture(arrey);
}

const debounceRepaint = debounce(repaint);

function initFilter(data) {
  filter.classList.remove('img-filters--inactive');

  buttonDefault.addEventListener('click', () => {
    debounceRepaint(data);

    buttonDefault.classList.add('img-filters__button--active');
    buttonRandom.classList.remove('img-filters__button--active');
    buttonDiscussed.classList.remove('img-filters__button--active');
  });

  buttonRandom.addEventListener('click', () => {
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

    debounceRepaint(randomIndexList.map(random));

    buttonDefault.classList.remove('img-filters__button--active');
    buttonRandom.classList.add('img-filters__button--active');
    buttonDiscussed.classList.remove('img-filters__button--active');
  });

  buttonDiscussed.addEventListener('click', () => {
    function sorting(item1, item2) {
      return item2.comments.length - item1.comments.length;
    }

    debounceRepaint([...data].sort(sorting));

    buttonDefault.classList.remove('img-filters__button--active');
    buttonRandom.classList.remove('img-filters__button--active');
    buttonDiscussed.classList.add('img-filters__button--active');
  });
}

export { initFilter };
