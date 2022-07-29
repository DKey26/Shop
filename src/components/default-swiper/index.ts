import Swiper, { Navigation, Pagination, Autoplay } from 'swiper'

type Options = {
  container?: string
  slidesPerView?: number
  spaceBetween?: number
}

const defaultOptions: Options = {
  container: '.swiper-container',
  slidesPerView: 4,
  spaceBetween: 80,
}

function getFilledOptions(options: Options | undefined, defaultOptions: Options): Options {
  const result = { ...defaultOptions }
  if (options) {
    Object.keys(options).forEach((key) => {
      // @ts-ignore
      if (options[key]) {
        // @ts-ignore
        result[key] = options[key]
      }
    })
  }

  return result
}

function getDefaultSwiper(options?: Options): Swiper {
  const currentOptions = getFilledOptions(options, defaultOptions)
  const sliderSpeed = 3000

  const swiper = new Swiper(currentOptions.container, {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: currentOptions.slidesPerView,
    edgeSwipeDetection: true,
    loopPreventsSlide: false,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    speed: sliderSpeed,
    freeMode: true,
    loop: true,
    allowTouchMove: true,
    spaceBetween: currentOptions.spaceBetween,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    breakpoints: {
      320: {
        slidesPerView: currentOptions.slidesPerView > 1 ? currentOptions.slidesPerView - 3 : 1,
        spaceBetween: 80,
      },

      576: {
        slidesPerView: currentOptions.slidesPerView > 1 ? currentOptions.slidesPerView - 2 : 1,
        spaceBetween: 15,
      },

      767: {
        slidesPerView: currentOptions.slidesPerView > 1 ? currentOptions.slidesPerView - 1 : 1,
        spaceBetween: 15,
      },

      1367: {
        slidesPerView: currentOptions.slidesPerView,
        spaceBetween: 80,
      },
    },
  })

  return swiper
}

export { getDefaultSwiper }
