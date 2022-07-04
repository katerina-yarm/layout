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
  for (let i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector('img')) {
      ibg[i].style.backgroumdImage = `url(${ibg[i].querySelector('img').getAttribute('src')})`
    }
  }
}

const iconMenu = document.getElementsByClassName('icon-menu')[0]
const menuBody = document.getElementsByClassName('menu__body')[0]

iconMenu.addEventListener('click', addClass)

function addClass() {
  if (iconMenu.classList.contains('_active')) {
    iconMenu.classList.remove('_active')
    menuBody.classList.remove('_active')
  } else {
    iconMenu.classList.add('_active')
    menuBody.classList.add('_active')
  }
}

window.onload = function () {
  document.addEventListener('click', documentActions)

  function documentActions(e) {
    const targetElement = e.target
    if (window.innerWidth >= 768 && isMobile.any() != null) {
      if (targetElement.classList.contains('menu__link')) {
        if (document.querySelectorAll('.menu__item._hover').length > 0) {
          removeClass(document.querySelectorAll('.menu__item._hover'), '_hover')
        }
        targetElement.closest('.menu__item').classList.add('_hover')
      }
      if (
        !targetElement.closest('.menu__item') &&
        document.querySelectorAll('.menu__item._hover').length > 0
      ) {
        removeClass(document.querySelectorAll('.menu__item._hover'), '_hover')
      }
    }
    if (targetElement.classList.contains('search-form__icon')) {
      document.querySelector('.search-form').classList.add('_active')
    } else if (
      !targetElement.closest('.search-form') &&
      document.querySelector('.search-form._active')
    ) {
      document.querySelector('.search-form').classList.remove('_active')
    }
    //products button 'Show More'
    if (targetElement.classList.contains('products__button')) {
      getProducts(targetElement)
      e.preventDefault()
    }
    //add products to cart
    if (targetElement.classList.contains('actions-product__button')) {
      const productId = targetElement.closest('.item-product').dataset.pid
      addToCart(targetElement, productId)
      e.preventDefault()
    }
  }

  //header
  const headerElement = document.querySelector('.header')
  const callback = function (entries, observer) {
    if (entries[0].isIntersecting) {
      headerElement.classList.remove('_scroll')
    } else {
      headerElement.classList.add('_scroll')
    }
  }
  const headerObserver = new IntersectionObserver(callback)
  headerObserver.observe(headerElement)
}

function removeClass(items, className) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    item.classList.remove(className)
  }
}

//load more products
async function getProducts(button) {
  if (!button.classList.contains('_hold')) {
    button.classList.add('_hold')
    const file = 'json/products.json'
    let response = await fetch(file, { method: 'GET' })
    if (response.ok) {
      let result = await response.json()
      loadProducts(result)
      button.classList.remove('_hold')
      button.remove()
    } else {
      alert('Error')
    }
  }
}

function loadProducts(data) {
  const productsItems = document.querySelector('.products__items')
  let html = ''
  data.products.forEach((item) => {
    const productId = item.id
    const productUrl = item.url
    const productImage = item.image
    const productTitle = item.title
    const productText = item.text
    const productPrice = item.price
    const productOldPrice = item.priceOld
    const productShareUrl = item.shareUrl
    const productLikeUrl = item.likeUrl
    const productLabels = item.labels

    html += `<article data-pid="${productId}" class="products__item item-product">`
    if (productLabels) {
      html += `<div class="item-product__labels">`

      productLabels.forEach((label) => {
        html += `<div class="item-product__label item-product__label_${label.type}">${label.value}</div>`
      })
      html += `</div>`
    }

    html += `<a href="${productUrl}" class="item-product__image">
                <img src="img/products/${productImage}" alt="product" />
             </a>
    <div class="item-product__body">
      <div class="item-product__content">
        <h5 class="item-product__title">${productTitle}</h5>
        <p class="item-product__text">${productText}</p>
      </div>
      <div class="item-product__prices">
        <div class="item-product__price">${productPrice}</div>`

    if (productOldPrice) {
      html += `<div class="item-product__price item-product__price_old">${productOldPrice}</div>`
    }

    html += `</div>
      <div class="item-product__actions actions-product">
        <div class="actions-product__body">
          <a href="" class="actions-product__button btn btn_white">Add to cart</a>
          <div class="actions-product__links">
            <a href="${productShareUrl}" class="actions-product__link _icon-share">Share</a>
            <a href="${productLikeUrl}" class="actions-product__link _icon-favorite">Like</a>
          </div>
        </div>
      </div>
    </div>
  </article>`
  })
  productsItems.insertAdjacentHTML('beforeend', html)
}

//add to cart
function addToCart(productButton, productId) {
  if (!productButton.classList.contains('_hold')) {
    productButton.classList.add('_hold')
    productButton.classList.add('_fly')

    const cart = document.querySelector('.cart-header__icon')
    const product = document.querySelector(`[data-pid="${productId}"]`)
    const productImage = document.querySelector('.item-product__image')

    const productImageFly = productImage.cloneNode(true)

    const productImageFlyWidth = productImage.offsetWidth
    const productImageFlyHeight = productImage.offsetHeight
    const productImageFlyTop = productImage.getBoundingClientRect().top
    const productImageFlyLeft = productImage.getBoundingClientRect().left

    productImageFly.setA
  }
}

if (document.querySelector('.slider-main__body')) {
  new Swiper('.slider-main', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 32,
    watchOverFlow: true,
    speed: 800,
    loop: true,
    loopAdditionalSlides: 3,
    preloadImages: false,
    parallax: true,
    width: null,

    //Dotts
    pagination: {
      el: '.controls-slider-main__dotts',
      clickable: true
    },

    //Arrows
    navigation: {
      nextEl: '.slider-arrow_next',
      prevEl: '.slider-arrow_prev'
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
