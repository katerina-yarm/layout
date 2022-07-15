const headerLinks = document.getElementsByClassName('header__links')
const burger = document.getElementsByClassName('icon-menu')[0].children
const header = document.getElementById('header')
const headerLogo = document.getElementsByClassName('header__logo')[0]
const productsLink = document.getElementsByClassName('_products')[0]

document.addEventListener(
  'scroll',
  setInterval(function () {
    let scrolled = window.pageYOffset || document.documentElement.scrollTop
    let main = document.getElementsByTagName('main')[0].classList.contains('main')
    let active = productsLink.classList.contains('_active')
    if (scrolled >= 100) {
      Array.from(headerLinks).forEach((link) => {
        link.style.color = '#181818'
      })
      Array.from(burger).forEach((line) => {
        line.style.background = '#181818'
      })
      header.style.background = '#F6F6F6'
      headerLogo.style.color = '#181818'
    }
    if (100 > scrolled && active) {
      Array.from(headerLinks).forEach((link) => {
        link.style.color = '#181818'
      })
      Array.from(burger).forEach((line) => {
        line.style.background = '#181818'
      })
      header.style.background = '#F6F6F6'
      headerLogo.style.color = '#181818'
    }
    if (100 > scrolled && !active && main) {
      Array.from(headerLinks).forEach((link) => {
        link.style.color = '#FFFFFF'
      })
      Array.from(burger).forEach((line) => {
        line.style.background = '#FFFFFF'
      })
      header.style.background = '#181818'
      headerLogo.style.color = '#FFFFFF'
    }
  }),
  1000
)

document.addEventListener(
  'click',
  setInterval(function () {
    let active = productsLink.classList.contains('_active')
    if (active) {
      Array.from(headerLinks).forEach((link) => {
        link.style.color = '#181818'
      })
      header.style.background = '#F6F6F6'
      headerLogo.style.color = '#181818'
    }
    if (!active) {
      Array.from(headerLinks).forEach((link) => {
        link.style.color = '#FFFFFF'
      })
      header.style.background = '#181818'
      headerLogo.style.color = '#FFFFFF'
    }
  }),
  1000
)
