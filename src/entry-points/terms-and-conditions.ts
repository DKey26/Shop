import '~/assets/scss/terms-and-conditions.scss'

import '~/_base/ts/sprites'

import scrollnav from 'scrollnav'

import MenuOpener from '../components/menu-opener'
import CustomScroll from '../components/custom-scroll'
import ScrollSideMenu from '../components/scroll-side-menu'
import FixElementOnScroll, { FixClasses } from '../components/fix-on-scroll'

document.addEventListener('DOMContentLoaded', function () {
  const insertTarget = document.querySelector('.content__nav-list')
  const content = document.querySelector('.typography')
  scrollnav.init(content, {
    insertTarget: insertTarget,
    insertLocation: 'append',
  })

  const scrollElement = document.querySelector('.content__scroll-bar span') as HTMLElement
  const customScrollInstance = new CustomScroll(scrollElement)

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

  const scrollSideMenuInstance = new ScrollSideMenu()
})
