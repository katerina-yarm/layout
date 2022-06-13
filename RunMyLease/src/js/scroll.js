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
