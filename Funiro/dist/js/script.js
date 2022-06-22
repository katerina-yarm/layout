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

var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i)
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i)
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i)
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i)
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i)
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    )
  }
}

const iconMenu = document.getElementsByClassName('icon-menu')[0]
const menuBody = document.getElementsByClassName('menu__body')[0]

iconMenu.addEventListener('click', addClass)

function addClass() {
  if (iconMenu.classList.contains('_active')) {
    iconMenu.classList.remove('_active')
    menuBody.classList.remove('_active')
  } else {
    iconMenu.classList.add('_active')
    menuBody.classList.add('_active')
  }
}

window.onload = function () {
  document.addEventListener('click', documentActions)

  function documentActions(e) {
    const targetElement = e.target
    if (window.innerWidth >= 768 && isMobile.any() != null) {
      if (targetElement.classList.contains('menu__arrow')) {
        if (document.querySelectorAll('.menu__item._hover').length > 0) {
          removeClass(document.querySelectorAll('.menu__item._hover'), '_hover')
        }
        targetElement.closest('.menu__item').classList.add('_hover')
      }
      if (
        !targetElement.closest('.menu__item') &&
        document.querySelectorAll('.menu__item._hover').length > 0
      ) {
        removeClass(document.querySelectorAll('.menu__item._hover'), '_hover')
      }
    }
  }
}

function removeClass(items, className) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    item.classList.remove(className)
  }
}

