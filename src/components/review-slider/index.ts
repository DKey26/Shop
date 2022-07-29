import Swiper, { Autoplay } from 'swiper'

const reviewSlider = new Swiper('.reviews-slider .swiper-container', {
  modules: [Autoplay],
  slidesPerView: 3,
  speed: 3000,
  freeMode: true,
  loop: false,
  allowTouchMove: true,
  spaceBetween: 15,
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 80,
    },

    767: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
  },
})

export { reviewSlider }
