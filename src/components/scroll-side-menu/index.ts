export default class ScrollSideMenu {
  element: HTMLElement
  private deltaY = 0
  private scrollY: number
  private isHovered: boolean
  private isMousePressed: boolean
  private properties: DOMRect

  constructor() {
    this.element = document.querySelector('.content__navigation') as HTMLElement
    this.scrollY = window.scrollY
    this.properties = this.element.getBoundingClientRect()
    this._addListeners()
  }

  _addListeners() {
    const html = document.querySelector('html')
    this.element.style.top = '100px'

    document.addEventListener('mousemove', (event) => {
      if (event.x < this.properties.left || event.x > this.properties.right) {
        this.isHovered = false
        return
      }

      if (event.y < this.properties.top || event.y > this.properties.bottom) {
        this.isHovered = false
        return
      }

      this.isHovered = true
    })

    document.addEventListener('mousedown', (event) => {
      this.isMousePressed = true
    })

    document.addEventListener('mouseup', (event) => {
      this.isMousePressed = false
    })

    document.addEventListener('scroll', (event) => {
      this.deltaY = window.scrollY - this.scrollY
      if (this.isHovered && !this.isMousePressed) {
        html.style.scrollBehavior = 'unset'
        this._move(this.deltaY)
      }
      this.scrollY = window.scrollY
    })
  }

  _move(delta: number) {
    const currentPos = Number(this.element.style.top.replace('px', ''))

    if (currentPos + this.properties.height + delta < window.innerHeight && delta > 0) {
      return
    }
    if (currentPos + delta > 100 && delta < 0) {
      return
    }

    this.element.style.top = `${currentPos - delta}px`

    window.scrollTo({
      top: this.scrollY,
    })
  }
}
