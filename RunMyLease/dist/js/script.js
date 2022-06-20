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

'use strict'

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('popup-form')
  form.addEventListener('submit', formSend)

  async function formSend(e) {
    e.preventDefault()

    let error = formValidate()

    let formData = new FormData(form)
    formData.append('image', formImage.files[0])

    if (error === 0) {
      form.parentNode.classList.add('_sending')
      createRequest(formData)
    } else {
      document.getElementsByClassName('error-message')[0].classList.add('_active')
      setTimeout(function () {
        document.getElementsByClassName('error-message')[0].classList.remove('_active')
      }, 5000)
    }
  }

  //file-image upload function
  const formImage = document.getElementById('form-image')
  const imagePreview = document.getElementById('image-preview')
  formImage.addEventListener('change', () => {
    uploadFile(formImage.files[0])
  })
  function uploadFile(file) {
    if (!['image/jpg', 'image/png', 'image/gif'].includes(file.type)) {
      alert('разрешены только изображения')
      formImage.value = ''
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('файл должен быть меньше 2мб')
      formImage.value = ''
      return
    }
    var reader = new FileReader()
    reader.onload = function (e) {
      imagePreview.innerHTML = `<img src="${e.target.result}" alt="preview-image">`
    }
    reader.onerror = function (e) {
      alert('ошибка')
    }
    reader.readAsDataURL(file)
  }
})

/*const phone = document.getElementsByName('phone')[0]
phone.addEventListener('input', formatPhoneNumber)

function formatPhoneNumber(e) {
  if (phone.value.length == 3) {
    phone.value += ' '
  }
  if (phone.value.length == 6) {
    phone.value += ' '
  }
}*/

const baseURL = 'http://localhost:5000/api' //process.env.BASE_URL

async function createRequest(data) {
  let response = await fetch(`${baseURL}/request/create`, {
    method: 'POST',
    body: data
  })

  if (response.ok) {
    let result = await response.json()
    alert(result.message)
    imagePreview.innerHTML('')
    form.reset()
    form.parentNode.classList.remove('_sending')
    return result
  } else {
    form.parentNode.classList.remove('_sending')
    throw new Error(`${response.status}`)
  }
}

function formValidate() {
  let error = 0
  let formRequired = document.querySelectorAll('._required')

  for (let i = 0; i < formRequired.length; i++) {
    const input = formRequired[i]
    formRemoveError(input)

    if (input.classList.contains('_email')) {
      if (emailTest(input)) {
        formAddError(input)
        error++
      }
    } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
      formAddError(input)
      error++
    } else {
      if (input.value === '') {
        formAddError(input)
        error++
      }
    }
  }
  return error
}

function formAddError(input) {
  let inputs = input.parentElement.children
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i]
    input.classList.add('_error')
  }
}

function formRemoveError(input) {
  let inputs = input.parentElement.children
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i]
    input.classList.remove('_error')
  }
}

function emailTest(input) {
  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/
  return !emailReg.test(input.value)
}

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


