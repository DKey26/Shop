export default class SelectScroll {
  element: HTMLElement
  isOpen = false
  constructor(element: HTMLElement) {
    this.element = element

    this._addEventListeners()
  }

  open() {
    this.element.classList.add('open')
    this.isOpen = true
  }

  close() {
    this.element.classList.remove('open')
    this.isOpen = false
  }

  _addEventListeners() {
    this.element.addEventListener('click', () => {
      this.isOpen ? this.close() : this.open()
    })
  }
}
