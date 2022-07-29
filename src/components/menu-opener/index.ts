export default class MenuOpener {
  header: HTMLElement
  button: HTMLElement
  isOpened: boolean

  constructor(header: HTMLElement, button: HTMLElement) {
    this.header = header
    this.button = button
    this.isOpened = false

    this._addListeners()
  }

  _addListeners() {
    this.button.addEventListener('click', this._onClickMenuButton.bind(this))
    window.addEventListener('resize', this._listenWindowWidth.bind(this))
  }

  _listenWindowWidth(event: Event) {
    if (window.innerWidth > 1024 && this.isOpened) {
      this._closeMenu()
    }
  }

  _onClickMenuButton() {
    this.isOpened ? this._closeMenu() : this._openMenu()
  }

  _openMenu() {
    this.header.classList.add('opened-menu')
    this.button.classList.add('active')
    this.isOpened = true
  }

  _closeMenu() {
    this.header.classList.remove('opened-menu')
    this.button.classList.remove('active')
    this.isOpened = false
  }
}
