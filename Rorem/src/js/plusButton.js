const icon = document.getElementsByClassName('icon-description')
const elements = Array.from(icon)
const descriptionBody = document.getElementsByClassName('description_body')

for (let i = 0; i < elements.length; i++) {
  icon[i].addEventListener('click', function () {
    if (icon[i].classList.contains('_active')) {
      icon[i].classList.remove('_active')
      descriptionBody[i].classList.remove('_active')
    } else {
      icon[i].classList.add('_active')
      descriptionBody[i].classList.add('_active')
    }
  })
}
