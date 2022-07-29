import '~/assets/scss/contact-us.scss'

import '~/_base/ts/sprites'

import MenuOpener from '../components/menu-opener'
import FixElementOnScroll, { FixClasses } from '../components/fix-on-scroll'

import CallBackForm from '../components/callback-form'
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
  const callBackFormElement = document.querySelector('.callback-form') as HTMLElement
  const callBackFormInstance = new CallBackForm(callBackFormElement, debounce, messageInstance)
})

function initMap(): void {
  // @ts-ignore
  const google = window.google
  // The location of Uluru
  const uluru = { lat: -25.344, lng: 131.036 }
  // The map, centered at Uluru
  const map = new google.maps.Map(document.querySelector('.google-map') as HTMLElement, {
    zoom: 4,
    center: uluru,
  })

  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  })
}

//@ts-ignore
window.initMap = initMap
