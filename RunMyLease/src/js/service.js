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
