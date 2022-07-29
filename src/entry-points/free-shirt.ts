import '~/assets/scss/free-shirt.scss'

import '~/_base/ts/sprites'

import MenuOpener from '../components/menu-opener'
import FixElementOnScroll, { FixClasses } from '../components/fix-on-scroll'

import FreeShirtForm from '../components/free-shirt-form'
import debounce from '../components/debouncer'
import Message from '../components/message'

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

  const modalWindowElement = document.querySelector('.modal') as HTMLElement
  const messageInstance = new Message(modalWindowElement)
  const freeShirtFormElement = document.querySelector('.free-shirt-form form') as HTMLElement
  const freeShirtFormInstance = new FreeShirtForm(freeShirtFormElement, debounce, messageInstance)
})
