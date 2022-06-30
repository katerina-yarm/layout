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
    /*breakpoints: {
      320: {},
      768: {  },
      992: {
        width: 758
      },
      1240: {
        width: 966
      }
    },*/

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
