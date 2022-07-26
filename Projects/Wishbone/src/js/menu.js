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
    if (targetElement.classList.contains('projects__button')) {
      getProjects(targetElement)
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
async function getProjects(button) {
  if (!button.classList.contains('_hold')) {
    button.classList.add('_hold')
    const file = 'json/projects.json'
    let response = await fetch(file, { method: 'GET' })
    if (response.ok) {
      let result = await response.json()
      loadProjects(result)
      button.classList.remove('_hold')
      button.remove()
    } else {
      alert('Error')
    }
  }
}

function loadProjects(data) {
  const projectItems = document.querySelector('.projects__items')
  let html = ''
  data.projects.forEach((item) => {
    const projectId = item.id
    const projectUrl = item.url
    const projectImage = item.image
    const projectTitle = item.title
    const projectText = item.text

    html += `
    <article data-pid="${projectId}" class="projects__item item-projects">
        <a href="${projectUrl}" class="item-projects__image ibg">
          <img src="img/projects/${projectImage}" alt="project" />
        </a>
        <div class="item-projects__actions actions-projects">
          <div class="actions-projects__body">
            <div class="actions-projects__info">
              <h3 class="actions-projects__title">${projectTitle}</h3>
              <p class="actions-projects__text">${projectText}</p>
            </div>
            <a href="${projectUrl}" class="actions-projects__button btn">Read more</a>
          </div>
        </div>
      </article>`
  })
  projectItems.insertAdjacentHTML('beforeend', html)
  ibg()
}
