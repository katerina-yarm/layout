//add <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
// core version + navigation, pagination modules:

//Build slider
/*let sliders = document.querySelectorAll('._swiper')
if (sliders) {
  for (let i = 0; i < sliders.length; i++) {
    let slider = sliders[i]
    if (!slider.classList.contains('swiper-bild')) {
      let slider_items = slider.children
      if (slider_items) {
        for (let i = 0; i < slider_items.length; i++) {
          let el = slider_items[i]
          el.classList.add('swiper-slide')
        }
      }
      let slider_content = slider.innerHTML
      let slider_wrapper = document.createElement('div')
      slider_wrapper.classList.add('swiper-wrapper')
      slider_wrapper.innerHTML = slider_content
      slider_wrapper.innerHTML = ''
      slider.appendChild(slider_wrapper)
      slider.classList.add('swiper-bild')

      if (slider.classList.contains('_swiper_scroll')) {
        let sliderScroll = document.createElement('div')
        sliderScroll.classList.add('swiper-scrollbar')
        slider.appendChild(sliderScroll)
      }
    }
    if (slider.classList.contains('_gallery')) {
      //slider.data('LightGalary').destroy(true)
    }
  }
  sliders_build_callback()
}

function sliders_build_callback(params) {}

let sliderScrollItems = document.querySelectorAll('._swiper_scroll')
if (sliderScrollItems.length > 0) {
  for (let i = 0; i < sliderScrollItems.length; i++) {
    const sliderScrollItem = sliderScrollItems[i]
    const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar')
    const sliderScroll = new Swiper(sliderScrollItem, {
      observer: true,
      observeParents: true,
      direction: 'vertical',
      slidesPerView: 'auto',
      freeMode: true,
      scrollbar: {
        el: sliderScrollBar,
        draggable: true,
        snapOnRelease: false
      },
      mousewheel: {
        releaseOnEdges: true
      }
    })
    sliderScroll.scrollbar.updateSize()
  }
}

function sliders_build_callback(params) {}*/

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
