import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import '~/assets/scss/print-on-demand.scss'

import '~/_base/ts/sprites'

import { getDefaultSwiper } from '../components/default-swiper'
import { initCheckEmptyFields } from '../utils/check-empty'
import MenuOpener from '../components/menu-opener'
import FixElementOnScroll, { FixClasses } from '../components/fix-on-scroll'

import CallBackForm from '../components/callback-form'
import debounce from '../components/debouncer'
import Message from '../components/message'

document.addEventListener('DOMContentLoaded', function () {
  const swiperInstance = getDefaultSwiper({
    slidesPerView: 1,
  })
  swiperInstance.autoplay.running = true
  swiperInstance.autoplay.start()

  initCheckEmptyFields('.js-check-empty')

  const headerElement = document.querySelector('.header') as HTMLElement
  const menuButtonElement = document.querySelector('.header__mobile-menu-button') as HTMLElement
  const menuOpenerInstance = new MenuOpener(headerElement, menuButtonElement)

  const classes: FixClasses = {
    fixed: 'scroll-fixed',
    showed: 'scroll-showed',
    hidden: 'scroll-hidden',
  }
  const offset = document.querySelector('.preview').clientHeight
  const fixElementOnScrollInstance = new FixElementOnScroll(offset, classes, menuOpenerInstance)

  const modalWindowElement = document.querySelector('.modal') as HTMLElement
  const messageInstance = new Message(modalWindowElement)
  const callBackFormElement = document.querySelector('.callback-form') as HTMLElement
  const callBackFormInstance = new CallBackForm(callBackFormElement, debounce, messageInstance)
})
