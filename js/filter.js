import { createPicture } from './create-picture.js';
import { getRandomInteger, debounce } from './util.js';

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

function filterButtonToggler (curentButton) {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  curentButton.classList.add('img-filters__button--active');
}

const debounceRepaint = debounce(repaint);

function initFilter(data) {
  filter.classList.remove('img-filters--inactive');

  buttonDefault.addEventListener('click', () => {
    debounceRepaint(data);

    filterButtonToggler (buttonDefault);
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

    debounceRepaint(randomIndexList.map((index) => data[index]));


    filterButtonToggler (buttonRandom);
  });

  buttonDiscussed.addEventListener('click', () => {
    function sorting(item1, item2) {
      return item2.comments.length - item1.comments.length;
    }

    debounceRepaint([...data].sort(sorting));


    filterButtonToggler (buttonDiscussed);
  });
}

export { initFilter };
