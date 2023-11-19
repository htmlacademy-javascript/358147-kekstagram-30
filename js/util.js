const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function isEscapeKey(evt) {
  if (evt.key === 'Escape') {
    return true;
  }
}

export { getRandomInteger, isEscapeKey };
