import 'swiper/scss'
import '~/assets/scss/about-us.scss'

import '~/_base/ts/sprites'

import { brandSlider } from '../components/brand-slider'
import MenuOpener from '../components/menu-opener'
import FixElementOnScroll, { FixClasses } from '../components/fix-on-scroll'
import { reviewSlider } from '../components/review-slider'

import ContactForm from '../components/contact-form'
import debounce from '../components/debouncer'
import Message from '../components/message'

document.addEventListener('DOMContentLoaded', function () {
  brandSlider.autoplay.running = true
  brandSlider.autoplay.start()

  reviewSlider.autoplay.running = true
  reviewSlider.autoplay.start()

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
  const callBackFormElement = document.querySelector('.contact-form form') as HTMLElement
  const callBackFormInstance = new ContactForm(callBackFormElement, debounce, messageInstance)
})
