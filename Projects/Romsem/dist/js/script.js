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

//функция проверяет является ли устройство мобильным, т.е. с тачскрином
//isMobile.any() != null true
var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i)
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i)
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i)
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i)
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i)
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    )
  }
}

//for ibg
function ibg() {
  let ibg = document.querySelectorAll('.ibg')
  for (var i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector('img')) {
      ibg[i].style.backgroundImage = `url('${ibg[i].querySelector('img').getAttribute('src')}')`
    }
  }
}

ibg()

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
    if (targetElement.classList.contains('link')) {
      const page = document.querySelector('.page')
      console.log(page)
      if (!page.classList.contains('menu-page')) {
        //page.innerHTML = ''
        page.classList.add('menu-page')
        let menuPage = `
        <section class="product-list">
          <div class="product-list__container">
            <h2 class="product-list__title">
            </h2>
            <div class="product-list__items">
            </div>
          </div>
        </section>`
        page.insertAdjacentHTML('afterbegin', menuPage)
      }

      const file = targetElement.dataset.file
      console.log(file)

      getProducts(targetElement, file)
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

if (document.querySelector('.main-slider__body')) {
  new Swiper('.main-slider__swiper', {
    slidesPerView: 'auto',
    //watchOverFlow: true,
    loop: true,

    //Dotts
    pagination: {
      el: '.controls-slider-main__dotts',
      clickable: true
    }
  })
}

if (document.querySelector('.products-slider__body')) {
  new Swiper('.products-slider__swiper', {
    observer: true,
    observeParents: true,
    slidesPerView: "auto", //slider will not add width to slide
    spaceBetween: 30,
    watchOverFlow: true,
    speed: 800,
    loop: true,
    loopAdditionalSlides: 5,
    preloadImages: false,
    parallax: true,
    centeredSlides: true,

    //Arrows
    navigation: {
      nextEl: '.products-slider .slider-arrow_next',
      prevEl: '.products-slider .slider-arrow_prev'
    }
  })
}

/*
для родителей спойлеров пишем атрибут data-spollers
для заголовков споллеров пишем фтрибут data-spoller

если нужно чтобы открывался только один споллер, а другой закрывался, 
то для родителя добавляем атрибут data-one-spollery

если нужно включать/выключать работу споллеров на разных размерах экранов, то
пишем параметры ширины и типа брейкпоинта для родителя
Например:
data-spollers="992,max" споллеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" споллеры будут работать только на экранах больше или равно 768px
*/

'use strict'

const spollersArray = document.querySelectorAll('[data-spollers]')
let _slideUp = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide')
    target.style.transitionProperty = 'height, margin, padding'
    target.style.transitionDuration = duration + 'ms'
    target.style.height = target.offsetHeight + 'px'
    target.offsetHeight
    target.style.overflow = 'hidden'
    target.style.height = 0
    target.style.paddingTop = 0
    target.style.paddingBottom = 0
    target.style.marginTop = 0
    target.style.marginBottom = 0
    window.setTimeout(() => {
      target.hidden = true
      target.style.removeProperty('height')
      target.style.removeProperty('padding-top')
      target.style.removeProperty('padding-bottom')
      target.style.removeProperty('margin-top')
      target.style.removeProperty('margin-bottom')
      target.style.removeProperty('overflow')
      target.style.removeProperty('transition-duration')
      target.style.removeProperty('transition-property')
      target.classList.remove('_slide')
    }, duration)
  }
}

let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration)
  } else {
    return _slideUp(target, duration)
  }
}

let _slideDown = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide')
    if (target.hidden) {
      target.hidden = false
    }
    let height = target.offsetHeight
    target.style.overflow = 'hidden'
    target.style.height = 0
    target.style.paddingTop = 0
    target.style.paddingBottom = 0
    target.style.marginTop = 0
    target.style.marginBottom = 0
    target.offsetHeight
    target.style.transitionProperty = 'height, margin, padding'
    target.style.transitionDuration = duration + 'ms'
    target.style.height = height + 'px'
    target.style.removeProperty('padding-top')
    target.style.removeProperty('padding-bottom')
    target.style.removeProperty('margin-top')
    target.style.removeProperty('margin-bottom')
    window.setTimeout(() => {
      target.hidden = false //true

      target.style.removeProperty('height')
      target.style.removeProperty('overflow')
      target.style.removeProperty('transition-duration')
      target.style.removeProperty('transition-property')
      target.classList.remove('_slide')
    }, duration)
  }
}

if (spollersArray.length > 0) {
  const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
    return !item.dataset.spollers.split(',')[0]
  })

  if (spollersRegular.length > 0) {
    initSpollers(spollersRegular)
  }

  const spollerMedia = Array.from(spollersArray).filter(function (item, index, self) {
    return item.dataset.spollers.split(',')[0]
  })

  if (spollerMedia.length > 0) {
    const breakpointsArray = []
    spollerMedia.forEach((item) => {
      const params = item.dataset.spollers
      const breakpoint = {}
      const paramsArray = params.split(',')
      breakpoint.value = paramsArray[0]
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max'
      breakpoint.item = item
      breakpointsArray.push(breakpoint)
    })

    let mediaQueries = breakpointsArray.map(function (item) {
      return `(${item.type}-width: ${item.value}px),${item.value},${item.type}`
    })
    mediaQueries = mediaQueries.filter(function (item, index, self) {
      return self.indexOf(item) === index
    })
    mediaQueries.forEach((breakpoint) => {
      const paramsArray = breakpoint.split(',')
      const mediaBreakpoint = paramsArray[1]
      const mediaType = paramsArray[2]
      const matchMedia = window.matchMedia(paramsArray[0])

      const spollersArray = breakpointsArray.filter(function (item) {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true
        }
      })

      matchMedia.addListener(function () {
        initSpollers(spollersArray, matchMedia)
      })
      initSpollers(spollersArray, matchMedia)
    })
  }

  function initSpollers(spollersArray, matchMedia = false) {
    spollersArray.forEach((spollersBlock) => {
      spollersBlock = matchMedia ? spollersBlock.item : spollersBlock
      if (matchMedia.matches || !matchMedia) {
        spollersBlock.classList.add('_init')
        initSpollerBody(spollersBlock)
        spollersBlock.addEventListener('click', setSpollerAction)
      } else {
        spollersBlock.classList.remove('_init')
        initSpollerBody(spollersBlock, false)
        spollersBlock.removeEventListener('click', setSpollerAction)
      }
    })
  }

  function initSpollerBody(spollersBlock, hideSpollerBody = true) {
    const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]')
    if (spollerTitles.length > 0) {
      spollerTitles.forEach((spollerTitle) => {
        if (hideSpollerBody) {
          spollerTitle.removeAttribute('tabindex')
          if (!spollerTitle.classList.contains('_active')) {
            spollerTitle.nextElementSibling.hidden = true
          }
        } else {
          spollerTitle.setAttribute('tabindex', '-1')
          spollerTitle.nextElementSibling.hidden = false
        }
      })
    }
  }

  function setSpollerAction(e) {
    const el = e.target
    if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
      const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]')
      const spollersBlock = spollerTitle.closest('[data-spollers]')
      const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false
      if (!spollersBlock.querySelectorAll('._slide').length) {
        if (oneSpoller && !spollerTitle.classList.contains('_active')) {
          hideSpollersBody(spollersBlock)
        }
        spollerTitle.classList.toggle('_active')
        _slideToggle(spollerTitle.nextElementSibling, 500)
      }
      e.preventDefault()
    }
  }

  function hideSpollersBody(spollersBlock) {
    const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active')
    if (spollerActiveTitle) {
      spollerActiveTitle.classList.remove('_active')
      _slideUp(spollerActiveTitle.nextElementSibling, 500)
    }
  }
}

