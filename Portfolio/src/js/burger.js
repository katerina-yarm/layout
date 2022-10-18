window.onload = function () {
  document.addEventListener('click', documentActions)

  function documentActions(e) {
    const targetElement = e.target
    console.log(targetElement)
    if (targetElement.classList.contains('icon-menu') || targetElement.closest('.icon-menu')) {
      if (document.getElementsByClassName('icon-menu')[0].classList.contains('_active')) {
        document.getElementsByClassName('icon-menu')[0].classList.remove('_active')
        document.getElementsByClassName('menu__body')[0].classList.remove('_active')
      } else {
        document.getElementsByClassName('icon-menu')[0].classList.add('_active')
        document.getElementsByClassName('menu__body')[0].classList.add('_active')
      }
    } else if (
      targetElement.classList.contains('menu__list') ||
      document.getElementsByClassName('menu__body')[0].classList.contains('_active')
    ) {
      document.getElementsByClassName('icon-menu')[0].classList.remove('_active')
      document.getElementsByClassName('menu__body')[0].classList.remove('_active')
    }
  }
}
