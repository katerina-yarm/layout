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
      targetElement.classList.contains('cart__image') ||
      targetElement.classList.contains('actions-header__icon') ||
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

    const cart = document.querySelector('.actions-header__icon')
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
  const cartIcon = cart.querySelector('.actions-header__icon')
  const cartQuantity = cartIcon.querySelector('span')
  const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`)
  const cartList = document.querySelector('.cart-list')
  const cartBody = document.querySelector('.cart-header__body')
  const cartButton = document.querySelector('.cart-header__button')
  const cartHeader = document.querySelector('.cart-header__title')
  const cartListItem = document.querySelectorAll('.cart-list__item')

  if (productAdd) {
    /*if (cartQuantity) {
      cartQuantity.innerHTML = ++cartQuantity.innerHTML
    } else {
      cartIcon.insertAdjacentHTML('beforeend', `<span class="actions-header__quantity"></span>`)
    }*/
    if (!cartProduct) {
      const cartHeaderContent = `
      <div class="cart-header__title">Корзина</div>
      `
      if (!cartHeader) {
        cartBody.insertAdjacentHTML('afterbegin', cartHeaderContent)
      }

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
      <div  class='cart-list__quantity'><span>10</span></div>
      <a href='' class='cart-list__delete _icon-remove'></a>
      </div>
      <div class='cart-list__price'>${cartProductPrice}</div>
      </div>
      </div>
      `
      cartList.insertAdjacentHTML(
        'beforeend',
        `<li data-cart-pid='${productId}' class='cart-list__item'>${cartProductContent}</li>`
      )

      const cartFooterContent = `
      <a type="button" href="" class="cart-header__button btn">Оформить заказ</a>
      `
      if (!cartButton) {
        cartBody.insertAdjacentHTML('beforeend', cartFooterContent)
      }
    } else {
      const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span')
      const cartProductPrice = cartProduct.querySelector('.cart-list__price')
      const price = parseFloat(cartProductPrice.innerHTML) / parseInt(cartProductQuantity.innerHTML)
      cartProductQuantity.innerHTML = 10 + parseInt(cartProductQuantity.innerHTML)
      cartProductPrice.innerHTML = price * parseInt(cartProductQuantity.innerHTML)
    }
    productButton.classList.remove('_hold')
  } else {
    const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span')
    const cartProductPrice = cartProduct.querySelector('.cart-list__price')
    const price = parseFloat(cartProductPrice.innerHTML) / parseInt(cartProductQuantity.innerHTML)
    cartProductQuantity.innerHTML = parseInt(cartProductQuantity.innerHTML) - 10
    cartProductPrice.innerHTML = price * parseInt(cartProductQuantity.innerHTML)
    if (parseInt(cartProductQuantity.innerHTML) <= 0) {
      cartProduct.remove()
      if (cartListItem.length <= 1) {
        cartButton.remove()
        cartHeader.remove()
      }
    }
    /*
    const cartQuantityValue = --cartQuantity.innerHTML
    if (cartQuantityValue > 0) {
      cartQuantity.innerHTML = cartQuantityValue
    } else {
      cartQuantity.remove()
      cart.classList.remove('_active')
    }*/
  }
}
