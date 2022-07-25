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
