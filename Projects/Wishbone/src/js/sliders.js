if (document.querySelector('.slider-firm__body')) {
  new Swiper('.swiper', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    loop: true,
    preloadImages: false,
    slidesPerView: 'auto'
  })
}
