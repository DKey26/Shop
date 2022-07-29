import ScrollNavigation from '../scroll-navigation'

export default class CardShower {
  categoryItems: { [key: string]: HTMLElement }
  elements: { [key: string]: NodeListOf<HTMLElement> }
  buttons: { [key: string]: HTMLElement }
  isShowed: { [key: string]: boolean }
  scrollNavigation: ScrollNavigation
  showCount: number

  constructor(categoryItems: NodeListOf<HTMLElement>, scrollNavigation: ScrollNavigation) {
    this.categoryItems = {}
    this.scrollNavigation = scrollNavigation

    categoryItems.forEach((category) => {
      this.categoryItems[category.id] = category
    })

    this.showCount = 2

    if (window.innerWidth < 1100) {
      this.showCount = 1
    }

    this._init()
    this._addListeners()
  }

  _init() {
    this.elements = {}
    this.buttons = {}
    this.isShowed = {}

    Object.keys(this.categoryItems).forEach((id) => {
      this.elements[id] = this.categoryItems[id].querySelectorAll('.description-item')
      this.buttons[id] = this.categoryItems[id].querySelector('.category-item__show-btn')
      this.isShowed[id] = false
      this.hide(id)

      if (this.elements[id].length <= this.showCount) {
        this.buttons[id].style.display = 'none'
      }
    })
  }

  _addListeners() {
    Object.keys(this.buttons).forEach((id) => {
      this.buttons[id].addEventListener('click', (event) => {
        const sectionId = this._getParent(event.target as HTMLElement).id
        this.scrollNavigation.scrollTo(sectionId)
        this.isShowed[sectionId] ? this.hide(sectionId) : this.show(sectionId)
      })
    })
  }

  _getParent(element: HTMLElement) {
    return element.parentElement
  }

  show(id: string) {
    this.isShowed[id] = true
    this.buttons[id].innerText = 'Show less'
    this.elements[id].forEach((element) => {
      element.classList.remove('hidden')
    })
  }

  hide(id: string) {
    this.isShowed[id] = false
    this.buttons[id].innerText = 'Show more'
    this.elements[id].forEach((element, index) => {
      if (index >= this.showCount) {
        element.classList.add('hidden')
      }
    })
  }
}
