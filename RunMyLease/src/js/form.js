'use strict'

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('popup-form')
  form.addEventListener('submit', formSend)

  async function formSend(e) {
    e.preventDefault()

    let error = formValidate(form)
    let formData = new FormData(form)
    formData.append('image', formImage.files[0])

    if (error === 0) {
      form.parentNode.classList.add('_sending')
      let response = await fetch('', {
        method: 'POST',
        body: formData
      })
      if (response.ok) {
        let result = await response.json()
        alert(result.message)
        imagePreview.innerHTML('')
        form.reset()
        form.parentNode.classList.remove('_sending')
      } else {
        alert('ошибка')
        form.parentNode.classList.remove('_sending')
      }
    } else {
      alert('заполните обязательные поля')
    }
  }

  function formValidate(form) {
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
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
  }

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
