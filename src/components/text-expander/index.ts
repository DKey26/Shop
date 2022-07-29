export default class TextExpander {
  textElements: NodeListOf<HTMLElement>
  symbolWidthByPx: number
  maxChars: number

  constructor(textElements: NodeListOf<HTMLElement>) {
    this.textElements = textElements
    this.symbolWidthByPx = 7
    this.maxChars = 102

    this._init()
  }

  isMoreLinesThan(num: number, length: number, width: number) {
    const charsByLine = width / this.symbolWidthByPx
    const minWidthForCheck = 150

    return length / charsByLine > num && width > minWidthForCheck
  }

  _init() {
    this.textElements.forEach((element) => {
      const textLength = element.innerText.length
      const textElementWidth = element.clientWidth

      if (this.isMoreLinesThan(3, textLength, textElementWidth)) {
        const btn = this.getButtonMarkup()
        element.append(btn)
        element.dataset.isshow = 'false'

        btn.addEventListener('click', (event) => {
          const target = event.target as HTMLElement
          const wrapper = target.parentElement
          const isShow = wrapper.dataset.isshow

          JSON.parse(isShow) ? this.hide(wrapper, target) : this.show(wrapper, target)
        })
      }
    })
  }

  show(wrapper: HTMLElement, button: HTMLElement) {
    wrapper.classList.add('show')
    wrapper.dataset.isshow = 'true'
    button.innerText = 'less'
  }

  hide(wrapper: HTMLElement, button: HTMLElement) {
    wrapper.classList.remove('show')
    wrapper.dataset.isshow = 'false'
    button.innerText = 'read all'
  }

  getButtonMarkup() {
    const span = document.createElement('span')
    span.classList.add('description-item__btn')
    span.innerText = 'read all'
    return span
  }
}
