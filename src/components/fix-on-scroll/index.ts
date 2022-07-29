import MenuOpener from '../menu-opener'

export type FixClasses = {
  hidden: string
  fixed: string
  showed: string
}

export default class FixElementOnScroll {
  offsetTop: number
  fixedOffset: number
  showOffset: number
  currentYPos: number
  delta: number
  classes: FixClasses
  menuOpener: MenuOpener

  constructor(offsetTop: number, classes: FixClasses, menuOpener: MenuOpener) {
    this.offsetTop = offsetTop
    this.fixedOffset = offsetTop - 50
    this.showOffset = offsetTop + 50
    this.classes = classes
    this.menuOpener = menuOpener

    this.currentYPos = 0
    this.delta = 0

    this._init()
  }

  hide() {
    document.body.classList.add(this.classes.hidden)
  }

  fix() {
    document.body.classList.add(this.classes.fixed)
  }

  unfix() {
    document.body.classList.remove(this.classes.fixed)
    document.body.classList.remove(this.classes.showed)
  }

  show() {
    document.body.classList.add(this.classes.showed)
    document.body.classList.remove(this.classes.hidden)
  }

  _init() {
    this._addListeners()
  }

  _addListeners() {
    let lastYPos = 0

    document.addEventListener('scroll', (event) => {
      this.delta = window.scrollY - lastYPos
      lastYPos = window.scrollY
      this.currentYPos = window.scrollY

      this._calc()
    })
  }

  _canBeFixed() {
    return this.currentYPos > this.fixedOffset
  }

  _canBeShowed() {
    return this.currentYPos > this.showOffset
  }

  _calc() {
    this._canBeFixed() ? this.fix() : this.unfix()

    if (this._canBeShowed()) {
      if (this._isDownScroll()) {
        this.show()
      }

      if (this._isUpScroll() && !this.menuOpener.isOpened) {
        this.hide()
      }
    }
  }

  _isDownScroll(): boolean {
    return this.delta > 0
  }

  _isUpScroll(): boolean {
    return this.delta < -10
  }
}
