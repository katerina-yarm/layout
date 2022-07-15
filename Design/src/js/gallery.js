const gallery = document.querySelector('.gallery__body')
if (gallery && !isMobile.any()) {
  const galleryItems = document.querySelector('.gallery__items')
  const galleryColumn = document.querySelectorAll('.gallery__column')
  const speed = 0.1
  let positionX = 0
  let coordXprocent = 0

  function setMouseGalleryStyle() {
    let galleryItemsWidth = 0
    galleryColumn.forEach((element) => {
      galleryItemsWidth += element.offsetWidth
    })
    const galleryDifferent = galleryItemsWidth - gallery.offsetWidth
    const distX = Math.floor(coordXprocent - positionX)

    positionX = positionX + distX * speed
    let position = (galleryDifferent / 200) * positionX

    galleryItems.style.cssText = `transform:translate3d(${-position}px,0,0)`

    if (Math.abs(distX) > 0) {
      requestAnimationFrame(setMouseGalleryStyle)
    } else {
      gallery.classList.remove('_init')
    }
  }
  gallery.addEventListener('mousemove', function (e) {
    const galleryWidth = gallery.offsetWidth
    const coordX = e.pageX - galleryWidth / 2
    coordXprocent = (coordX / galleryWidth) * 200
    if (!gallery.classList.contains('_init')) {
      requestAnimationFrame(setMouseGalleryStyle)
      gallery.classList.add('_init')
    }
  })
}
