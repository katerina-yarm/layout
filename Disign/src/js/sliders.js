if (document.querySelector('.slider-main__body')) {
  new Swiper('.slider-main', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 32,
    watchOverFlow: true,
    speed: 800,
    loop: true,
    loopAdditionalSlides: 3,
    preloadImages: false,
    parallax: true,
    width: null,

    //Dotts
    pagination: {
      el: '.controls-slider-main__dotts',
      clickable: true
    },

    //Arrows
    navigation: {
      nextEl: '.slider-arrow_next',
      prevEl: '.slider-arrow_prev'
    }
  })
}

if (document.querySelector('.slider-rooms__body')) {
  new Swiper('.slider-rooms', {
    observer: true,
    observeParents: true,
    slidesPerView: 'auto', //slider will not add width to slide
    spaceBetween: 24,
    watchOverFlow: true,
    speed: 800,
    loop: true,
    loopAdditionalSlides: 5,
    preloadImages: false,
    parallax: true,

    //Dotts
    pagination: {
      el: '.slider-rooms__dotts',
      clickable: true
    },

    //Arrows
    navigation: {
      nextEl: '.slider-rooms .slider-arrow_next',
      prevEl: '.slider-rooms .slider-arrow_prev'
    }
  })
}

if (document.querySelector('.slider-tips__body')) {
  new Swiper('.slider-tips', {
    observer: true,
    observeParents: true,
    slidesPerView: 3,
    spaceBetween: 32,
    watchOverFlow: true,
    speed: 800,
    loop: true,
    //centeredSlides: true,

    //Dotts
    pagination: {
      el: '.slider-tips__dotts',
      clickable: true
    },

    //Arrows
    navigation: {
      nextEl: '.slider-tips .slider-arrow_next',
      prevEl: '.slider-tips .slider-arrow_prev'
    },

    breakpoints: {
      280: {
        slidesPerView: 1.1,
        spaceBetween: 15
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }
  })
}
