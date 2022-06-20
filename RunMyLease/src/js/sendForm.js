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
