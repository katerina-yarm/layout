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
