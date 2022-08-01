if (document.querySelector('.main-slider__body')) {
  new Swiper('.swiper', {
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
