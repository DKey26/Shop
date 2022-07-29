import NiceSelect, { Option, Callback } from '../select'

export default class BrandShower {
  cards: NodeListOf<HTMLElement>
  categories: NodeListOf<HTMLElement>
  select: NiceSelect
  defaultOptionName = 'All brands'
  hiddenClass = 'hidden'
  categoriesSelector: string
  cardsSelector: string
  filterCount: HTMLElement

  constructor(categoriesSelector: string, cardsSelector: string, select: NiceSelect) {
    this.categoriesSelector = categoriesSelector
    this.cardsSelector = cardsSelector
    this.categories = document.querySelectorAll(categoriesSelector)
    this.cards = document.querySelectorAll(cardsSelector)
    this.select = select
    this.filterCount = document.querySelector('.filter__count')

    this.select.onSelect(this.onSelect)
  }

  isEmptyCategory(category: HTMLElement): boolean {
    const cardsInCategory = category.querySelectorAll(this.cardsSelector)

    const isEmpty = !cardsInCategory?.length
    if (isEmpty) {
      return true
    }

    let countOfHiddenElements = 0
    cardsInCategory.forEach((card) => {
      if (card.classList.contains(this.hiddenClass)) {
        countOfHiddenElements++
      }
    })

    if (cardsInCategory.length <= countOfHiddenElements) {
      return true
    }

    return false
  }

  onSelect: Callback = (option: Option) => {
    const brand = option.data.value
    if (brand === this.defaultOptionName) {
      this.showAllBrands()
      this.hideEmptyCategories()
      this.countActiveItems()
      return
    }

    this.hideAllBrands()
    this.showBrand(brand)
    this.hideEmptyCategories()
    this.countActiveItems()
  }

  countActiveItems() {
    let counter = 0
    this.cards.forEach((card) => {
      if (!card.classList.contains(this.hiddenClass)) {
        counter++
      }
    })

    this.filterCount.innerHTML = `${counter} items`
  }

  hideEmptyCategories() {
    this.categories.forEach((category) => {
      category.classList.remove(this.hiddenClass)
      if (this.isEmptyCategory(category)) {
        category.classList.add(this.hiddenClass)
      }
    })
  }

  hideAllBrands() {
    this.cards.forEach((card) => {
      card.classList.add(this.hiddenClass)
    })
  }

  showAllBrands() {
    this.cards.forEach((card) => {
      card.classList.remove(this.hiddenClass)
    })
  }

  showBrand(brandName: string) {
    this.cards.forEach((card) => {
      if (card.dataset.brand === brandName) {
        card.classList.remove(this.hiddenClass)
      }
    })
  }
}
