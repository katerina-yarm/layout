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
