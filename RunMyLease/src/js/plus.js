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
