import { createPictures } from './create-picture.js';
import { getRandomInteger, debounce } from './util.js';

const QUANTITY_RANDOM_PICTURE = 10;

const filter = document.querySelector('.img-filters');
const buttonDefault = document.querySelector('#filter-default');
const buttonRandom = document.querySelector('#filter-random');
const buttonDiscussed = document.querySelector('#filter-discussed');


function filterButtonToggler(curentButtom) {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  curentButtom.classList.add('img-filters__button--active');
}

function initFilter(data) {
  filter.classList.remove('img-filters--inactive');

  const debounceRepaint = debounce(repaint);

  function getRandom() {
    const randomIndexList = [];
    const lengthArrey = Math.min(QUANTITY_RANDOM_PICTURE, data.length);
    while (randomIndexList.length < lengthArrey) {
      const index = getRandomInteger(0, data.length - 1);
      if (!randomIndexList.includes(index)) {
        randomIndexList.push(index);
      }
    }

    createPictures(randomIndexList.map((index) => data[index]));
  }

  function getDiscussed() {
    function sorting(item1, item2) {
      return item2.comments.length - item1.comments.length;
    }

    createPictures([...data].sort(sorting));
  }

  function repaint(evt) {
    const pictures = document.querySelectorAll('.picture');
    pictures.forEach((item) => {
      item.remove();
    });

    switch (evt.target.id) {
      case 'filter-default':
        return createPictures(data);
      case 'filter-random':
        return getRandom();
      case 'filter-discussed':
        return getDiscussed();
    }
  }


  buttonDefault.addEventListener('click', (evt) => {
    filterButtonToggler(buttonDefault);
    debounceRepaint(evt);
  });

  buttonRandom.addEventListener('click', (evt) => {
    filterButtonToggler(buttonRandom);
    debounceRepaint(evt);
  });

  buttonDiscussed.addEventListener('click', (evt) => {
    filterButtonToggler(buttonDiscussed);
    debounceRepaint(evt);
  });
}

export { initFilter };
