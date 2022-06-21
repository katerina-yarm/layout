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
