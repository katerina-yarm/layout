window.onload = function () {
  document.addEventListener('click', documentActions)

  function documentActions(e) {
    const targetElement = e.target
    //add products to cart
    if (targetElement.classList.contains('item-product__button')) {
      const productId = targetElement.closest('.item-product').dataset.pid
      addToCart(targetElement, productId)
      e.preventDefault()
    }
    //show cart list
    if (
      targetElement.classList.contains('bottom-footer__item-img') ||
      targetElement.classList.contains('icon__cart') ||
      targetElement.classList.contains('actions-header__quantity')
    ) {
      if (document.querySelector('.cart-list').children.length > 0) {
        document.querySelector('.cart-header').classList.add('_active')
      }
      e.preventDefault()
    } else if (
      !targetElement.closest('.cart-header') &&
      !targetElement.classList.contains('item-product__button')
    ) {
      document.querySelector('.cart-header').classList.remove('_active')
    }
    //delete position from cart list
    if (targetElement.classList.contains('cart-list__delete')) {
      const productId = targetElement.closest('.cart-list__item').dataset.cartPid
      updateCart(targetElement, productId, false)
      e.preventDefault()
    }
    //add position to cart list
    if (targetElement.classList.contains('cart-list__add')) {
      const productId = targetElement.closest('.cart-list__item').dataset.cartPid
      updateCart(targetElement, productId, true)
      e.preventDefault()
    }

    //for introduction button
    if (
      targetElement.classList.contains('introduction__close-button') &&
      targetElement.classList.contains('_active')
    ) {
      document.querySelector('.open-content').classList.add('_active')
    } else {
      document.querySelector('.open-content').classList.remove('_active')
    }

    //menu buttons
    if (targetElement.classList.contains('menu__link')) {
      window.location.href = './products.html'
      let file = ''
      if (targetElement.classList.contains('sets')) {
        file = 'json/sets.json'
      } else if (targetElement.classList.contains('pizza')) {
        file = 'json/pizza.json'
      } else if (targetElement.classList.contains('rolls')) {
        file = 'json/rolls.json'
      }

      getProducts(targetElement, file)
      e.preventDefault()
      getProducts(targetElement, file)
    }
  }
}

function removeClass(items, className) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    item.classList.remove(className)
  }
}

//add to cart
function addToCart(productButton, productId) {
  if (!productButton.classList.contains('_hold')) {
    productButton.classList.add('_hold')
    productButton.classList.add('_fly')

    const cart = document.querySelector('.icon__cart')
    const product = document.querySelector(`[data-pid="${productId}"]`)
    const productImage = product.querySelector('.item-product__image')

    const productImageFly = productImage.cloneNode(true)

    const productImageFlyWidth = productImage.offsetWidth
    const productImageFlyHeight = productImage.offsetHeight
    const productImageFlyTop = productImage.getBoundingClientRect().top
    const productImageFlyLeft = productImage.getBoundingClientRect().left

    productImageFly.setAttribute('class', '_fly-image')
    productImageFly.style.cssText = `
    left: ${productImageFlyLeft}px;
    top: ${productImageFlyTop}px;
    width: ${productImageFlyWidth}px;
    height: ${productImageFlyHeight}px;
    `

    document.body.appendChild(productImageFly)

    const cartFlyLeft = cart.getBoundingClientRect().left
    const cartFlyTop = cart.getBoundingClientRect().top

    productImageFly.style.cssText = `
    left: ${cartFlyLeft}px;
    top: ${cartFlyTop}px;
    width: 0px;
    height: 0px;
    opacity: 0;
    `

    productImageFly.addEventListener('transitionend', function () {
      if (productButton.classList.contains('_fly')) {
        productImageFly.remove()
        updateCart(productButton, productId)
        productButton.classList.remove('_fly')
      }
    })
  }
}

function updateCart(productButton, productId, productAdd = true) {
  const cart = document.querySelector('.cart-header')
  const cartIcon = document.querySelector('.icon__cart')
  const cartQuantity = cartIcon.querySelector('span')
  const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`)
  const cartList = document.querySelector('.cart-list')
  const cartBody = document.querySelector('.cart-header__body')
  const cartButton = document.querySelector('.cart-header__button')
  const cartHeader = document.querySelector('.cart-header__title')
  const cartListItem = document.querySelectorAll('.cart-list__item')
  const cartEmpty = document.querySelectorAll('.cart-header__empty')[0]

  if (productAdd) {
    if (cartQuantity) {
      cartQuantity.innerHTML = ++cartQuantity.innerHTML
    } else {
      cartIcon.insertAdjacentHTML('beforeend', `<span class="actions-header__quantity">1</span>`)
    }
    if (!cartProduct) {
      const product = document.querySelector(`[data-pid="${productId}"]`)
      const cartProductImage = product.querySelector('.item-product__image').innerHTML
      const cartProductTitle = product.querySelector('.item-product__title').innerHTML
      const cartProductPrice = product.querySelector('.item-product__price').innerHTML
      const cartProductContent = `
      <a href='' class='cart-list__image'>${cartProductImage}</a>
      <div class='cart-list__body'>
      <a href='' class='cart-list__title'>${cartProductTitle}</a>
      <div class='cart-list__info'>
      <div class='cart-list__position'>
      <a href='' class='cart-list__add _icon-add'></a>
      <div  class='cart-list__quantity'><span>1</span></div>
      <a href='' class='cart-list__delete _icon-remove'></a>
      </div>
      <div class='cart-list__price'>${cartProductPrice}</div>
      </div>
      </div>
      `
      const cartHeaderContent = `
      <div class="cart-header__title">Корзина</div>
      `
      const cartFooterContent = `
      <a type="button" href="" class="cart-header__button btn">Оформить заказ</a>
      `

      cartList.insertAdjacentHTML(
        'beforeend',
        `<li data-cart-pid='${productId}' class='cart-list__item'>${cartProductContent}</li>`
      )

      if (!cartHeader) {
        cartBody.insertAdjacentHTML('afterbegin', cartHeaderContent)
      }

      if (!cartButton) {
        cartBody.insertAdjacentHTML('beforeend', cartFooterContent)
      }
      console.log(cartEmpty)
      cartEmpty.classList.add('_remove')
    } else {
      const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span')
      const cartProductPrice = cartProduct.querySelector('.cart-list__price')
      const price =
        parseFloat(cartProductPrice.innerHTML) / parseFloat(cartProductQuantity.innerHTML)
      cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML
      cartProductPrice.innerHTML = `${price * parseFloat(cartProductQuantity.innerHTML)}$`
    }
    productButton.classList.remove('_hold')
  } else {
    const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span')
    const cartProductPrice = cartProduct.querySelector('.cart-list__price')
    const price = parseFloat(cartProductPrice.innerHTML) / parseFloat(cartProductQuantity.innerHTML)
    cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML
    cartProductPrice.innerHTML = `${price * parseFloat(cartProductQuantity.innerHTML)}$`
    if (parseInt(cartProductQuantity.innerHTML) <= 0) {
      cartProduct.remove()
      if (cartListItem.length <= 1) {
        cartButton.remove()
        cartHeader.remove()
        cartEmpty.classList.remove('_remove')
      }
    }

    const cartQuantityValue = --cartQuantity.innerHTML
    if (cartQuantityValue > 0) {
      cartQuantity.innerHTML = cartQuantityValue
    } else {
      cartQuantity.remove()
      /*cart.classList.remove('_active')*/
    }
  }
}

//load more products
async function getProducts(button, files) {
  if (!button.classList.contains('_hold')) {
    button.classList.add('_hold')
    const file = files
    let response = await fetch(file, { method: 'GET' })
    if (response.ok) {
      let result = await response.json()
      loadProducts(result)
      button.classList.remove('_hold')
    } else {
      alert('Error')
    }
  }
}

function loadProducts(data) {
  const productsItems = document.querySelector('.product-list__items')
  const productsTitle = document.querySelector('.product-list__title')
  let html = ''

  const title = data.title.title
  const icon = data.title.icon
  let blockTitle = `<img src="${icon}" class="product-list__icon" alt="product-list__icon" />
  ${title}`
  productsTitle.innerHTML = ''
  productsTitle.insertAdjacentHTML('afterbegin', blockTitle)

  productsItems.innerHTML = ''
  data.products.forEach((item) => {
    const productId = item.id
    const productImage = item.image
    const productTitle = item.title
    const productText = item.text
    const productPrice = item.price

    html += `<div data-pid=${productId} class="product-list__item item-product products">
        <div class="products__image item-product__image">
          <img src="img/products/${productImage}" alt="sets" />
        </div>
        <div class="">
          <div class="products__top">
            <h5 class="products__title item-product__title">${productTitle}</h5>
            <p class="products__description item-product__description">${productText}</p>
          </div>
          <div class="products__bottom">
            <p class="products__price item-product__price">${productPrice}$</p>
            <a href="" class="products__button item-product__button btn"> Хочу! </a>
          </div>
        </div>
      </div>`
  })
  productsItems.insertAdjacentHTML('beforeend', html)
}
