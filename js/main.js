const descriptions = [
  'автомобиль ',
  'кот',
  'пейзаж',
  'закат',
  'город',
  'завтрак',
  'море',
  'люди',
  'мотоцикл',
  'яхта',
  'лес',
  'велосипед',
  'река',
  'мост'
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = [
  'Андрей',
  'Мария',
  'Иван',
  'Анна',
  'Дмитрий'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const generateId = createIdGenerator();

const createComments = () => {
  const comment = [];

  for (let i = 0; i < getRandomInteger(1, 30); i++) {

    comment[i] = {
      id: generateId(),
      avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
      message: getRandomArrayElement(messages),
      name: getRandomArrayElement(names)
    };
  }

  return comment;
};


const createDate = (nom) => {
  const arrayPhotos = [];

  for (let i = 0; i < nom; i++) {

    arrayPhotos[i] = {
      id: generateId(),
      url: 'photos/' + (i + 1) + '.jpg',
      description: getRandomArrayElement(descriptions),
      likes: getRandomInteger(15, 200),
      comments: createComments()
    };
  }

  return arrayPhotos;
};


console.log(createDate(25));
