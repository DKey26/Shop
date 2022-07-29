type MessageClasses = {
  success: string
  error: string
  opened: string
}

export default class Message {
  element: HTMLElement
  titleElement: HTMLElement
  closeButton: HTMLElement
  backgroundElement: HTMLElement
  classes: MessageClasses

  constructor(element: HTMLElement) {
    this.element = element
    this.titleElement = this.element.querySelector('.modal__title')
    this.closeButton = this.element.querySelector('.modal__close')
    this.backgroundElement = this.element.querySelector('.modal__background')

    this.classes = {
      success: 'modal--success',
      error: 'modal--error',
      opened: 'opened',
    }

    this._addListeners()
  }

  _addListeners() {
    this.closeButton.addEventListener('click', () => {
      this.close()
    })

    this.backgroundElement.addEventListener('click', () => {
      this.close()
    })
  }

  showError(message?: string) {
    this.element.classList.add(this.classes.opened)
    this.element.classList.add(this.classes.error)

    const defaultMessage = 'Something went wrong. Please try later...'
    message ? this.setTitle(message) : this.setTitle(defaultMessage)
  }

  showSuccess(message: string) {
    this.element.classList.add(this.classes.opened)
    this.element.classList.add(this.classes.success)

    const defaultMessage = 'Thanks for your application!'
    message ? this.setTitle(message) : this.setTitle(defaultMessage)
  }

  setTitle(message: string) {
    this.titleElement.innerHTML = message
  }

  close() {
    this.element.classList.remove(this.classes.opened)
    this.element.classList.remove(this.classes.error)
    this.element.classList.remove(this.classes.success)
  }
}
