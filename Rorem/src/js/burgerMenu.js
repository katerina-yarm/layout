const iconMenu = document.getElementsByClassName('icon-menu')[0]
const products = document.getElementsByClassName('_products')[0]
const menuBody = document.getElementsByClassName('menu__body')[0]

iconMenu.addEventListener('click', addClass)
products.addEventListener('mousedown', addClass)

function addClass() {
  if (iconMenu.classList.contains('_active')) {
    iconMenu.classList.remove('_active')
    products.classList.remove('_active')
    menuBody.classList.remove('_active')
  } else {
    iconMenu.classList.add('_active')
    menuBody.classList.add('_active')
    products.classList.add('_active')
  }
}
