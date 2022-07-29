import '~/assets/scss/faq.scss'

import '~/_base/ts/sprites'

import MenuOpener from '../components/menu-opener'
import FixElementOnScroll, { FixClasses } from '../components/fix-on-scroll'

document.addEventListener('DOMContentLoaded', function () {
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
})
