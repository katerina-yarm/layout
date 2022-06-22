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
