if (document.querySelector('.main-slider__body')) {
  new Swiper('.main-slider__swiper', {
    slidesPerView: 'auto',
    //watchOverFlow: true,
    loop: true,

    //Dotts
    pagination: {
      el: '.controls-slider-main__dotts',
      clickable: true
    }
  })
}

if (document.querySelector('.products-slider__body')) {
  new Swiper('.products-slider__swiper', {
    observer: true,
    observeParents: true,
    slidesPerView: "auto", //slider will not add width to slide
    spaceBetween: 30,
    watchOverFlow: true,
    speed: 800,
    loop: true,
    loopAdditionalSlides: 5,
    preloadImages: false,
    parallax: true,
    centeredSlides: true,

    //Arrows
    navigation: {
      nextEl: '.products-slider .slider-arrow_next',
      prevEl: '.products-slider .slider-arrow_prev'
    }
  })
}
