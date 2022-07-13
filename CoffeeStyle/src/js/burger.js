document.getElementsByClassName('icon-menu')[0].addEventListener('click', function addClass() {
  if (document.getElementsByClassName('icon-menu')[0].classList.contains('_active')) {
    document.getElementsByClassName('icon-menu')[0].classList.remove('_active')
    document.getElementsByClassName('menu__body')[0].classList.remove('_active')
  } else {
    document.getElementsByClassName('icon-menu')[0].classList.add('_active')
    document.getElementsByClassName('menu__body')[0].classList.add('_active')
  }
})
menu__link