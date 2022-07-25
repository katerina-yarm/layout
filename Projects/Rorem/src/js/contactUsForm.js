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
