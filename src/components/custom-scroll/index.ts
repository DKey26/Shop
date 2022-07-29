type MousePosition = {
  x: number
  y: number
}

export default class CustomScroll {
  element: HTMLElement
  private currentMousePos: MousePosition
  private onClickMousePos: MousePosition
  private isClicked = false
  private deltaY = 0
  private scrollTimeStart = 0

  constructor(element: HTMLElement) {
    this.element = element

    this._init()
    this._addListeners()
  }

  _init() {}

  _move() {
    if (this.isClicked) {
      window.scrollTo({
        top: window.scrollY + this.deltaY,
      })
    }

    window.requestAnimationFrame(this._move.bind(this))
  }

  _addListeners() {
    const html = document.querySelector('html')
    const body = document.querySelector('body')

    document.addEventListener('scroll', (event) => {
      this.element.style.top = `${(window.scrollY / (document.body.clientHeight - window.innerHeight + 175)) * 100}%`
    })

    window.requestAnimationFrame(this._move.bind(this))

    document.addEventListener('mousemove', (event) => {
      if (this.isClicked) {
        this.currentMousePos = {
          x: event.x,
          y: event.y,
        }

        this.deltaY = this.currentMousePos.y - this.onClickMousePos.y
      }
    })

    this.element.addEventListener('mousedown', (event) => {
      this.isClicked = true
      this.currentMousePos = {
        x: event.x,
        y: event.y,
      }

      this.onClickMousePos = {
        x: event.x,
        y: event.y,
      }

      body.classList.add('selecting-off')
      html.style.scrollBehavior = 'unset'
    })

    document.addEventListener('mouseup', (event) => {
      this.isClicked = false
      body.classList.remove('selecting-off')
      html.style.scrollBehavior = 'smooth'
    })
  }
}
