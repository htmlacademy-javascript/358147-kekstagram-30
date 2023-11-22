const imgPreview = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectValue = document.querySelector('.effect-level__value');
const slider = document.querySelector('.effect-level__slider');


const sliderOptions = {
  none: {
    effect: 'none',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },

  chrome: {
    effect: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    effect: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    effect: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    effect: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    effect: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

let curentEffect = 'none';

function resetEffect () {
  sliderContainer.classList.add('hidden');
  imgPreview.style.filter = 'none';
}


noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 10,
  connect: 'lower',
});

slider.noUiSlider.on('update', () => {
  imgPreview.style.filter = sliderOptions[curentEffect].effect;
  const sliderValue = slider.noUiSlider.get();
  effectValue.value = +sliderValue;
  imgPreview.style.filter = `${sliderOptions[curentEffect].effect}(${sliderValue}${sliderOptions[curentEffect].unit})`;
});


function changeEffect(evt) {
  const element = evt.target.closest('.effects__radio');

  if (element) {
    curentEffect = element.value;
    if (curentEffect === 'none') {
      imgPreview.style.filter = 'none';
      sliderContainer.classList.add('hidden');
      effectValue.value = 100;
    } else {
      sliderContainer.classList.remove('hidden');
      imgPreview.style.filter = `${sliderOptions[curentEffect].effect}(${sliderOptions[curentEffect].max}${sliderOptions[curentEffect].unit})`;
      effectValue.value = sliderOptions[curentEffect].max;

      slider.noUiSlider.updateOptions({
        range: {
          min: sliderOptions[curentEffect].min,
          max: sliderOptions[curentEffect].max,
        },
        step: sliderOptions[curentEffect].step,
        start: sliderOptions[curentEffect].max,
      });
    }
  }
}

function onRadioClick (evt) {
  changeEffect(evt);
}

export { resetEffect, onRadioClick };

