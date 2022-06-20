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
