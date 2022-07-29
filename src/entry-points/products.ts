import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import '~/assets/scss/products.scss'

import '~/_base/ts/sprites'

import { getDefaultSwiper } from '../components/default-swiper'
import NiceSelect from '../components/select'
import BrandShower from '../components/brand-shower'
import FixElementOnScroll, { FixClasses } from '../components/fix-on-scroll'
import ScrollNavigation, { HTMLElementByKey } from '../components/scroll-navigation'
import CardShower from '../components/card-shower'
import TextExpander from '../components/text-expander'
import MenuOpener from '../components/menu-opener'
import SelectScroll from '../components/select-scroll'

import ContactForm from '../components/contact-form'
import debounce from '../components/debouncer'
import Message from '../components/message'

document.addEventListener('DOMContentLoaded', function () {
  const swiperInstance = getDefaultSwiper()
  swiperInstance.autoplay.running = true
  swiperInstance.autoplay.start()
  const select = new NiceSelect(document.querySelector('select'), { searchable: false })

  const BrandShowerInstance = new BrandShower('.category-item', '.description-item', select)

  const classes: FixClasses = {
    fixed: 'scroll-fixed',
    showed: 'scroll-showed',
    hidden: 'scroll-hidden',
  }
  const headerElement = document.querySelector('.header') as HTMLElement
  const menuButtonElement = document.querySelector('.header__mobile-menu-button') as HTMLElement
  const menuOpenerInstance = new MenuOpener(headerElement, menuButtonElement)

  const offset = document.querySelector('.preview').clientHeight
  const fixElementOnScrollInstance = new FixElementOnScroll(offset, classes, menuOpenerInstance)

  const selectScrollElement = document.querySelector('.select-scroll') as HTMLElement
  const selectScrollInstance = new SelectScroll(selectScrollElement)

  const contentForLinks = document.querySelector('.products .container')
  const insertTarget = document.querySelector('.scroll-nav')

  getNavItemsWithKeyById()
  const navItems: HTMLElementByKey[] = getNavItemsWithKeyById() as HTMLElementByKey[]
  const sections = selectElementsByClass('category-item')
  const scrollNavigationInstance = new ScrollNavigation(navItems, sections)

  const cardShowerInstance = new CardShower(sections, scrollNavigationInstance)

  const itemTextElements = document.querySelectorAll('.description-item__property-text') as NodeListOf<HTMLElement>
  const textExpanderInstance = new TextExpander(itemTextElements)

  const modalWindowElement = document.querySelector('.modal') as HTMLElement
  const messageInstance = new Message(modalWindowElement)
  const callBackFormElement = document.querySelector('.contact-form form') as HTMLElement
  const callBackFormInstance = new ContactForm(callBackFormElement, debounce, messageInstance)
})

function selectElementsByClass(className: string) {
  return document.querySelectorAll(`.${className}`) as NodeListOf<HTMLElement>
}

function getNavItemsWithKeyById() {
  const resultNavLinks = {}
  const resultSelectLinks = {}

  const navLinks = document.querySelectorAll('.product-navigation__item') as NodeListOf<HTMLAnchorElement>
  const selectLinks = document.querySelectorAll('.select-scroll .option a') as NodeListOf<HTMLAnchorElement>

  Array.from(navLinks).forEach((link) => {
    // @ts-ignore
    resultNavLinks[link.hash.replace('#', '')] = link
  })

  Array.from(selectLinks).forEach((link) => {
    // @ts-ignore
    resultSelectLinks[link.hash.replace('#', '')] = link
  })

  return [resultNavLinks, resultSelectLinks] as HTMLElementByKey[]
}
