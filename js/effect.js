const imgPreview = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectValue = document.querySelector('.effect-level__value');
const slider = document.querySelector('.effect-level__slider');

let curentEffect = 'none';

const effects = {
  none: 'none',
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness'
};

const sliderOptions = {
  none: {
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },

  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

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
  imgPreview.style.filter = effects[curentEffect];
  const sliderValue = slider.noUiSlider.get();
  effectValue.value = +sliderValue;
  imgPreview.style.filter = `${effects[curentEffect]}(${sliderValue}${sliderOptions[curentEffect].unit})`;
});


function effect(evt) {
  const element = evt.target.closest('.effects__radio');

  if (element) {
    curentEffect = element.value;
    if (curentEffect === 'none') {
      imgPreview.style.filter = 'none';
      sliderContainer.classList.add('hidden');
      effectValue.value = 100;
    } else {
      sliderContainer.classList.remove('hidden');
      imgPreview.style.filter = `${effects[curentEffect]}(${sliderOptions[curentEffect].max}${sliderOptions[curentEffect].unit})`;
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
  effect(evt);
}

export { resetEffect, onRadioClick };

