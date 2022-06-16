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

const popupLinks = document.querySelectorAll('.popup-link')
const body = document.querySelector('body')
const lockPadding = document.querySelectorAll('.lock-padding')

let unlock = true

const timeout = 800

if (popupLinks.length > 0) {
  for (let i = 0; i < popupLinks.length; i++) {
    const popupLink = popupLinks[i]
    popupLink.addEventListener('click', function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '')
      const currentPopup = document.getElementById(popupName)
      popupOpen(currentPopup)
      e.preventDefault()
    })
  }
}

const popupCloseIcon = document.querySelectorAll('.close-popup')
if (popupCloseIcon.length > 0) {
  for (let i = 0; i < popupCloseIcon.length; i++) {
    const el = popupCloseIcon[i]
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'))
      e.preventDefault()
    })
  }
}

function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open')
    if (popupActive) {
      popupClose(popupActive, false)
    } else {
      bodyLock()
    }
    currentPopup.classList.add('open')
    currentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'))
      }
    })
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open')
    if (doUnlock) {
      bodyUnlock()
    }
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'

  for (let i = 0; i < lockPadding.length; i++) {
    const el = lockPadding[i]
    el.style.paddingRight = lockPaddingValue
  }

  body.style.paddingRight = lockPaddingValue
  body.classList.add('lock')

  unlock = false
  setTimeout(function () {
    unlock = true
  }, timeout)
}

function bodyUnlock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let i = 0; i < lockPadding.length; i++) {
        const el = lockPadding[i]
        el.style.paddingRight = '0px'
      }
    }
    body.style.paddingRight = '0px'
    body.classList.remove('lock')
  }, timeout)

  unlock = false
  setTimeout(function () {
    unlock = true
  }, timeout)
}

let elements = Array.from(document.getElementsByClassName('icon-description'))

for (let i = 0; i < elements.length; i++) {
  document.getElementsByClassName('icon-description')[i].addEventListener('click', function () {
    if (document.getElementsByClassName('icon-description')[i].classList.contains('_active')) {
      document.getElementsByClassName('icon-description')[i].classList.remove('_active')
      document.getElementsByClassName('description_body')[i].classList.remove('_active')
    } else {
      document.getElementsByClassName('icon-description')[i].classList.add('_active')
      document.getElementsByClassName('description_body')[i].classList.add('_active')
    }
  })
}

document.getElementsByClassName('icon-menu')[0].addEventListener('click', addClass)
document.getElementsByClassName('_products')[0].addEventListener('mousedown', addClass)

function addClass() {
  if (document.getElementsByClassName('icon-menu')[0].classList.contains('_active')) {
    document.getElementsByClassName('icon-menu')[0].classList.remove('_active')
    document.getElementsByClassName('_products')[0].classList.remove('_active')
    document.getElementsByClassName('menu__body')[0].classList.remove('_active')
  } else {
    document.getElementsByClassName('icon-menu')[0].classList.add('_active')
    document.getElementsByClassName('menu__body')[0].classList.add('_active')
    document.getElementsByClassName('_products')[0].classList.add('_active')
  }
}

document.addEventListener(
  'scroll',
  setInterval(function () {
    let scrolled = window.pageYOffset || document.documentElement.scrollTop
    let active = document.getElementsByClassName('_products')[0].classList.contains('_active')
    let main = document.getElementsByTagName('main')[0].classList.contains('main')
    if (scrolled >= 100) {
      document.getElementById('header').style.background = '#F6F6F6'
      document.getElementsByClassName('header__logo')[0].style.color = '#181818'
      document.getElementsByClassName('header__links')[0].style.color = '#181818'
      document.getElementsByClassName('header__links')[1].style.color = '#181818'
      document.getElementsByClassName('icon-menu')[0].children[0].style.background = '#181818'
      document.getElementsByClassName('icon-menu')[0].children[1].style.background = '#181818'
      document.getElementsByClassName('icon-menu')[0].children[2].style.background = '#181818'
    }
    if (100 > scrolled && active) {
      document.getElementById('header').style.background = '#F6F6F6'
      document.getElementsByClassName('header__logo')[0].style.color = '#181818'
      document.getElementsByClassName('header__links')[0].style.color = '#181818'
      document.getElementsByClassName('header__links')[1].style.color = '#181818'
      document.getElementsByClassName('icon-menu')[0].children[0].style.background = '#181818'
      document.getElementsByClassName('icon-menu')[0].children[1].style.background = '#181818'
      document.getElementsByClassName('icon-menu')[0].children[2].style.background = '#181818'
    }
    if (100 > scrolled && !active && main) {
      document.getElementById('header').style.background = '#181818'
      document.getElementsByClassName('header__logo')[0].style.color = '#FFFFFF'
      document.getElementsByClassName('header__links')[0].style.color = '#FFFFFF'
      document.getElementsByClassName('header__links')[1].style.color = '#FFFFFF'
      document.getElementsByClassName('icon-menu')[0].children[0].style.background = '#FFFFFF'
      document.getElementsByClassName('icon-menu')[0].children[1].style.background = '#FFFFFF'
      document.getElementsByClassName('icon-menu')[0].children[2].style.background = '#FFFFFF'
    }
  }),
  1000
)

document.addEventListener(
  'click',
  setInterval(function () {
    let active = document.getElementsByClassName('_products')[0].classList.contains('_active')
    if (active) {
      document.getElementById('header').style.background = '#F6F6F6'
      document.getElementsByClassName('header__logo')[0].style.color = '#181818'
      document.getElementsByClassName('header__links')[0].style.color = '#181818'
      document.getElementsByClassName('header__links')[1].style.color = '#181818'
    }
    if (!active) {
      document.getElementById('header').style.background = '#181818'
      document.getElementsByClassName('header__logo')[0].style.color = '#FFFFFF'
      document.getElementsByClassName('header__links')[0].style.color = '#FFFFFF'
      document.getElementsByClassName('header__links')[1].style.color = '#FFFFFF'
    }
  }),
  1000
)


