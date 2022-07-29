// utility functions
function triggerClick(el: HTMLElement) {
  const event = document.createEvent('MouseEvents')
  event.initEvent('click', true, false)
  el.dispatchEvent(event)
}

function triggerChange(el: HTMLElement) {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('change', true, false)
  el.dispatchEvent(event)
}

function triggerFocusIn(el: HTMLElement) {
  const event = document.createEvent('FocusEvent')
  event.initEvent('focusin', true, false)
  el.dispatchEvent(event)
}

function triggerFocusOut(el: HTMLElement) {
  const event = document.createEvent('FocusEvent')
  event.initEvent('focusout', true, false)
  el.dispatchEvent(event)
}

function attr(el: HTMLElement, key: string) {
  return el.getAttribute(key)
}

function data(el: HTMLElement, key: string) {
  return el.getAttribute('data-' + key)
}

function hasClass(el: HTMLElement, className: string) {
  if (el) return el.classList.contains(className)
  else return false
}

function addClass(el: HTMLElement, className: string) {
  if (el) return el.classList.add(className)
}

function removeClass(el: HTMLElement, className: string) {
  if (el) return el.classList.remove(className)
}

const defaultOptions = {
  // @ts-ignore
  data: null,
  searchable: false,
}

export type Option = {
  attributes: {
    disabled: boolean
    optgroup: boolean
    selected: boolean
  }
  data: {
    text: string
    value: string
  }
  element: HTMLElement
}

export type Callback = (option: Option) => void

export default class NiceSelect {
  el: HTMLElement
  config: any
  data: any
  options: any
  selectedOptions: any
  placeholder: string
  dropdown: any
  multiple: boolean
  disabled: boolean
  callback: Callback | undefined

  constructor(element: HTMLElement, options: any) {
    this.el = element
    this.config = Object.assign({}, defaultOptions, options || {})
    this.data = this.config.data
    this.selectedOptions = []
    this.placeholder = attr(this.el, 'placeholder') || this.config.placeholder || 'Select an option'

    this.dropdown = null
    this.multiple = Boolean(attr(this.el, 'multiple'))
    this.disabled = Boolean(attr(this.el, 'disabled'))

    this.create()
  }

  onSelect(callback: Callback) {
    this.callback = callback
  }

  create() {
    this.el.style.display = 'none'
    if (this.data) {
      this.processData(this.data)
    } else {
      this.extractData()
    }

    this.renderDropdown()
    this.bindEvent()
  }

  processData(data: any) {
    const options: any = []
    data.forEach((item: any) => {
      options.push({
        data: item,
        attributes: {
          selected: false,
          disabled: false,
          optgroup: item.value == 'optgroup',
        },
      })
    })
    this.options = options
  }

  extractData() {
    const options = this.el.querySelectorAll('option,optgroup')
    const data: any = []
    const allOptions: any = []
    const selectedOptions: any = []

    options.forEach((item: any) => {
      if (item.tagName == 'OPTGROUP') {
        var itemData: any = {
          text: item.label,
          value: 'optgroup',
        }
      } else {
        var itemData: any = {
          text: item.innerText,
          value: item.value,
        }
      }

      const attributes = {
        selected: item.getAttribute('selected') != null,
        disabled: item.getAttribute('disabled') != null,
        optgroup: item.tagName == 'OPTGROUP',
      }

      data.push(itemData)
      allOptions.push({ data: itemData, attributes: attributes })
    })

    this.data = data
    this.options = allOptions
    this.options.forEach(function (item: any) {
      if (item.attributes.selected) selectedOptions.push(item)
    })

    this.selectedOptions = selectedOptions
  }

  renderDropdown() {
    const classes = [
      'nice-select',
      attr(this.el, 'class') || '',
      this.disabled ? 'disabled' : '',
      this.multiple ? 'has-multiple' : '',
    ]

    const searchHtml = `<div class="nice-select-search-box">
  <input type="text" class="nice-select-search" placeholder="Search..."/>
  </div>`

    const html = `<div class="${classes.join(' ')}" tabindex="${this.disabled ? null : 0}">
    <span class="${this.multiple ? 'multiple-options' : 'current'}"></span>
    <div class="nice-select-dropdown">
    ${this.config.searchable ? searchHtml : ''}
    <ul class="list"></ul>
    </div></div>
  `

    this.el.insertAdjacentHTML('afterend', html)

    this.dropdown = this.el.nextElementSibling
    this._renderSelectedItems()
    this._renderItems()
  }

  _renderSelectedItems() {
    if (this.multiple) {
      let selectedHtml = ''
      if (window.getComputedStyle(this.dropdown).width == 'auto' || this.selectedOptions.length < 2) {
        this.selectedOptions.forEach(function (item: any) {
          selectedHtml += `<span class="current">${item.data.text}</span>`
        })
        selectedHtml = selectedHtml == '' ? this.placeholder : selectedHtml
      } else {
        selectedHtml = this.selectedOptions.length + ' selected'
      }

      this.dropdown.querySelector('.multiple-options').innerHTML = selectedHtml
    } else {
      const html = this.selectedOptions.length > 0 ? this.selectedOptions[0].data.text : this.placeholder

      this.dropdown.querySelector('.current').innerHTML = html
    }
  }

  _renderItems() {
    const ul = this.dropdown.querySelector('ul')
    this.options.forEach((item: any) => {
      ul.appendChild(this._renderItem(item))
    })
  }

  _renderItem(option: any) {
    const el = document.createElement('li')
    el.innerHTML = option.data.text
    if (option.attributes.optgroup) {
      el.classList.add('optgroup')
    } else {
      el.setAttribute('data-value', option.data.value)
      const classList = [
        'option',
        option.attributes.selected ? 'selected' : null,
        option.attributes.disabled ? 'disabled' : null,
      ]

      el.addEventListener('click', this._onItemClicked.bind(this, option))
      el.classList.add(...classList)
    }

    option.element = el
    return el
  }

  update() {
    this.extractData()
    if (this.dropdown) {
      const open = hasClass(this.dropdown, 'open')
      this.dropdown.parentNode.removeChild(this.dropdown)
      this.create()

      if (open) {
        triggerClick(this.dropdown)
      }
    }
  }

  disable() {
    if (!this.disabled) {
      this.disabled = true
      addClass(this.dropdown, 'disabled')
    }
  }

  enable() {
    if (this.disabled) {
      this.disabled = false
      removeClass(this.dropdown, 'disabled')
    }
  }

  clear() {
    this.selectedOptions = []
    this._renderSelectedItems()
    this.updateSelectValue()
    triggerChange(this.el)
  }

  destroy() {
    if (this.dropdown) {
      this.dropdown.parentNode.removeChild(this.dropdown)
      this.el.style.display = ''
    }
  }

  bindEvent() {
    const $this = this
    this.dropdown.addEventListener('click', this._onClicked.bind(this))
    this.dropdown.addEventListener('keydown', this._onKeyPressed.bind(this))
    this.dropdown.addEventListener('focusin', triggerFocusIn.bind(this, this.el))
    this.dropdown.addEventListener('focusout', triggerFocusOut.bind(this, this.el))
    window.addEventListener('click', this._onClickedOutside.bind(this))

    if (this.config.searchable) {
      this._bindSearchEvent()
    }
  }

  _bindSearchEvent() {
    const searchBox = this.dropdown.querySelector('.nice-select-search')
    if (searchBox)
      searchBox.addEventListener('click', function (e: Event) {
        e.stopPropagation()
        return false
      })

    searchBox.addEventListener('input', this._onSearchChanged.bind(this))
  }

  _onClicked(e: Event) {
    if (this.multiple) {
      this.dropdown.classList.add('open')
    } else {
      this.dropdown.classList.toggle('open')
    }

    if (this.dropdown.classList.contains('open')) {
      const search = this.dropdown.querySelector('.nice-select-search')
      if (search) {
        search.value = ''
        search.focus()
      }

      let t = this.dropdown.querySelector('.focus')
      removeClass(t, 'focus')
      t = this.dropdown.querySelector('.selected')
      addClass(t, 'focus')
      this.dropdown.querySelectorAll('ul li').forEach(function (item: HTMLElement) {
        item.style.display = ''
      })
    } else {
      this.dropdown.focus()
    }
  }

  _onItemClicked(option: any, e: Event) {
    const optionEl = e.target as HTMLElement

    if (!hasClass(optionEl, 'disabled')) {
      if (this.multiple) {
        if (hasClass(optionEl, 'selected')) {
          removeClass(optionEl, 'selected')
          this.selectedOptions.splice(
            this.selectedOptions.indexOf(option),
            1,
          )(
            this.el.querySelector('option[value="' + optionEl.dataset.value + '"]') as HTMLOptionElement,
          ).selected = false
        } else {
          if (this.callback) {
            this.callback(option)
          }
          addClass(optionEl, 'selected')
          this.selectedOptions.push(option)
        }
      } else {
        this.selectedOptions.forEach(function (item: any) {
          removeClass(item.element, 'selected')
        })

        if (this.callback) {
          this.callback(option)
        }
        addClass(optionEl, 'selected')
        this.selectedOptions = [option]
      }

      this._renderSelectedItems()
      this.updateSelectValue()
    }
  }

  updateSelectValue() {
    if (this.multiple) {
      const select = this.el
      this.selectedOptions.forEach(function (item: any) {
        const el = select.querySelector('option[value="' + item.data.value + '"]')
        if (el) {
          // @ts-ignore
          el.setAttribute('selected', true)
        }
      })
    } else if (this.selectedOptions.length > 0) {
      // @ts-ignore
      this.el.value = this.selectedOptions[0].data.value
    }
    triggerChange(this.el)
  }

  _onClickedOutside(e: Event) {
    if (!this.dropdown.contains(e.target)) {
      this.dropdown.classList.remove('open')
    }
  }

  _onKeyPressed(e: any) {
    // Keyboard events

    const focusedOption = this.dropdown.querySelector('.focus')

    const open = this.dropdown.classList.contains('open')

    // Space or Enter
    if (e.keyCode == 32 || e.keyCode == 13) {
      if (open) {
        triggerClick(focusedOption)
      } else {
        triggerClick(this.dropdown)
      }
    } else if (e.keyCode == 40) {
      // Down
      if (!open) {
        triggerClick(this.dropdown)
      } else {
        const next = this._findNext(focusedOption)
        if (next) {
          var t = this.dropdown.querySelector('.focus')
          removeClass(t, 'focus')
          addClass(next, 'focus')
        }
      }
      e.preventDefault()
    } else if (e.keyCode == 38) {
      // Up
      if (!open) {
        triggerClick(this.dropdown)
      } else {
        const prev = this._findPrev(focusedOption)
        if (prev) {
          var t = this.dropdown.querySelector('.focus')
          removeClass(t, 'focus')
          addClass(prev, 'focus')
        }
      }
      e.preventDefault()
    } else if (e.keyCode == 27 && open) {
      // Esc
      triggerClick(this.dropdown)
    }
    return false
  }

  _findNext(el: any) {
    if (el) {
      el = el.nextElementSibling
    } else {
      el = this.dropdown.querySelector('.list .option')
    }

    while (el) {
      if (!hasClass(el, 'disabled') && el.style.display != 'none') {
        return el
      }
      el = el.nextElementSibling
    }

    return null
  }

  _findPrev(el: any) {
    if (el) {
      el = el.previousElementSibling
    } else {
      el = this.dropdown.querySelector('.list .option:last-child')
    }

    while (el) {
      if (!hasClass(el, 'disabled') && el.style.display != 'none') {
        return el
      }
      el = el.previousElementSibling
    }

    return null
  }

  _onSearchChanged(e: any) {
    const open = this.dropdown.classList.contains('open')
    let text = e.target.value
    text = text.toLowerCase()

    if (text == '') {
      this.options.forEach(function (item: any) {
        item.element.style.display = ''
      })
    } else if (open) {
      const matchReg = new RegExp(text)
      this.options.forEach(function (item: any) {
        const optionText = item.data.text.toLowerCase()
        const matched = matchReg.test(optionText)
        item.element.style.display = matched ? '' : 'none'
      })
    }

    this.dropdown.querySelectorAll('.focus').forEach(function (item: any) {
      removeClass(item, 'focus')
    })

    const firstEl = this._findNext(null)
    addClass(firstEl, 'focus')
  }
}

export function bind(el: HTMLElement, options: any) {
  return new NiceSelect(el, options)
}
