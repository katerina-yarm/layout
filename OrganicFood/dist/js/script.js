function testWebP(callback) {
  var webP = new Image()
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2)
  }
  webP.src =
    'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector('body').classList.add('webp')
  } else {
    document.querySelector('body').classList.add('no-webp')
  }
})

document.getElementsByClassName('icon-menu')[0].addEventListener('click', function addClass() {
  if (document.getElementsByClassName('icon-menu')[0].classList.contains('_active')) {
    document.getElementsByClassName('icon-menu')[0].classList.remove('_active')
    document.getElementsByClassName('menu__body')[0].classList.remove('_active')
  } else {
    document.getElementsByClassName('icon-menu')[0].classList.add('_active')
    document.getElementsByClassName('menu__body')[0].classList.add('_active')
  }
})

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

