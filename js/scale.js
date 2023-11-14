const control = document.querySelector('.scale__control--value');
const previewImg = document.querySelector('.img-upload__preview img');

const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;

function resetScale () {
  previewImg.style.transform = 'scale(1)';
  control.value = '100%';
}

function scaleImg (value) {
  previewImg.style.transform = `scale(${value / 100})`;
  control.value = `${value}%`;
}

function onButtonSmallerClick () {
  scaleImg(Math.max(parseInt(control.value ,10) - SCALE_STEP, MIN_SCALE));
}

function onButtonBiggerClick () {
  scaleImg(Math.min(parseInt(control.value ,10) + SCALE_STEP, MAX_SCALE));
}


export { resetScale, onButtonSmallerClick, onButtonBiggerClick };
