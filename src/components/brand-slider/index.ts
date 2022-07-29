import Swiper, { Autoplay } from 'swiper'

const brandSlider = new Swiper('.brand-slider .swiper-container', {
  modules: [Autoplay],
  slidesPerView: 6,
  speed: 3000,
  freeMode: true,
  loop: true,
  allowTouchMove: true,
  spaceBetween: 80,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 30,
    },

    480: {
      slidesPerView: 3,
      spaceBetween: 30,
    },

    992: {
      slidesPerView: 4,
      spaceBetween: 60,
    },

    1024: {
      slidesPerView: 6,
      spaceBetween: 80,
    },
  },
})

export { brandSlider }
