if (document.querySelector('.slider-customers__body')) {
}

new Swiper('.swiper', {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination'
  },

  // Navigation arrows
  navigation: {
    nextEl: '.slider-arrow_next',
    prevEl: '.slider-arrow_prev'
  }
})
