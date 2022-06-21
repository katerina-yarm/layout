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
      const message = document.getElementsByClassName('messages-02')[0].children[0]
      addMessage(message)
    }
  }

  const baseURL = 'https://jsonplaceholder.typicode.com'
  async function createRequest(data) {
    let response = await fetch(`${baseURL}/posts`, {
      method: 'POST',
      body: data
    })

    if (response.ok) {
      let result = await response.json()
      alert(`Request was succesfully created with status code ${response.status}`)
      imagePreview.innerHTML = ''
      form.reset()
      form.parentNode.classList.remove('_sending')
      return result
    } else {
      form.parentNode.classList.remove('_sending')
      throw new Error(`${response.status}`)
    }
  }

  function addMessage(message) {
    message.classList.add('_active')
    setTimeout(function () {
      message.classList.remove('_active')
    }, 5000)
  }

  //file-image upload function
  const formImage = document.getElementById('form-image')
  const imagePreview = document.getElementById('image-preview')
  formImage.addEventListener('change', () => {
    uploadFile(formImage.files[0])
  })
  function uploadFile(file) {
    if (!['image/jpg', 'image/png', 'image/gif'].includes(file.type)) {
      const message = document.getElementsByClassName('messages-01')[0].children[0]
      addMessage(message)
      formImage.value = ''
      return
    }
    var reader = new FileReader()
    reader.onload = function (e) {
      imagePreview.innerHTML = `<img src="${e.target.result}" alt="preview-image">`
    }
    reader.onerror = function (e) {
      alert('Error')
    }
    reader.readAsDataURL(file)
  }
})

'use strict'

document.addEventListener('DOMContentLoaded', function () {
  const contactUsForm = document.getElementById('form')
  contactUsForm.addEventListener('submit', formSend)
  const inputs = contactUsForm.getElementsByTagName('input')
  Array.from(inputs).forEach((input) => {
    input.addEventListener('input', function () {
      if (input.value != '') {
        input.classList.add('_active')
      } else input.classList.remove('_active')
    })
  })

  async function formSend(e) {
    e.preventDefault()

    let error = formValidate(contactUsForm)

    let formData = new FormData(contactUsForm)

    if (error === 0) {
      form.parentNode.classList.add('_sending')
      createRequest(formData)
    } else {
      const message = document.getElementsByClassName('messages-02')[0].children[0]
      addMessage(message)
    }
  }

  const baseURL = 'https://jsonplaceholder.typicode.com'
  async function createRequest(data) {
    let response = await fetch(`${baseURL}/posts`, {
      method: 'POST',
      body: data
    })

    if (response.ok) {
      let result = await response.json()
      alert(`Request was succesfully created with status code ${response.status}`)
      form.reset()
      form.parentNode.classList.remove('_sending')
      return result
    } else {
      form.parentNode.classList.remove('_sending')
      throw new Error(`${response.status}`)
    }
  }

  function addMessage(message) {
    message.classList.add('_active')
    setTimeout(function () {
      message.classList.remove('_active')
    }, 5000)
  }
})

function formValidate(form) {
  let error = 0
  let formRequired = form.querySelectorAll('._required')

  for (let i = 0; i < formRequired.length; i++) {
    const input = formRequired[i]
    formRemoveError(input)

    if (input.classList.contains('_email')) {
      if (emailTest(input)) {
        formAddError(input)
        error++
      }
    } else if (input.classList.contains('_phone')) {
      formatPhoneNumber(input)
      if (phoneTest(input)) {
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
    input.parentNode.classList.add('_error')
    input.classList.add('_error')
  }
}

function formRemoveError(input) {
  let inputs = input.parentElement.children
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i]
    input.classList.remove('_error')
    input.parentNode.classList.remove('_error')
  }
}

function emailTest(input) {
  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/
  return !emailReg.test(input.value)
}

function phoneTest(input) {
  const phoneReg = /^[+]{1}[0-9]{3} [0-9]{9}/
  return !phoneReg.test(input.value)
}

function formatPhoneNumber(input) {
  if (input.value.length > 1) {
    let value
    let array = input.value.toString().trim().split('')
    for (let i = 0; i < array.length; i++) {
      if (array[0] != '+') {
        array.unshift('+')
      } else if (array[4] != ' ') {
        array.splice(4, 0, ' ')
      }
      value = array.join('')
    }
    input.value = value
  }
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


