if (document.querySelector('.portfolio-slider__body')) {
  new Swiper('.portfolio-slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 'auto',
    spaceBetween: 10,
    watchOverFlow: true,
    centeredSlides: true,
    speed: 800,
    loop: true,
    loopAdditionalSlides: 5,
    preloadImages: false,
    parallax: true,

    //Dotts
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  })
}
