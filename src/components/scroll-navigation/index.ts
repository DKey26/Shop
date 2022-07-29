export type HTMLElementByKey = {
  [x: string]: HTMLAnchorElement
}

export default class ScrollNavigation {
  observerOptions: IntersectionObserverInit
  navItems: HTMLElementByKey[]
  sections: NodeListOf<HTMLElement>
  observer: IntersectionObserver
  scrollOffset = 200

  constructor(navItems: HTMLElementByKey[], sections: NodeListOf<HTMLElement>) {
    this.observerOptions = {
      root: null,
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0.01,
    }
    this.navItems = navItems
    this.sections = sections

    this.navItems.forEach((item) => {
      Object.values(item).forEach((link) => {
        link.addEventListener('click', (event) => {
          this.onLinkClick(event, link)
        })
      })
    })

    this.observer = new IntersectionObserver(this.observerCallback.bind(this), this.observerOptions)
    this.sections.forEach((section) => this.observer.observe(section))
  }

  onLinkClick(event: Event, link: HTMLAnchorElement) {
    event.preventDefault()
    const currentSection = document.getElementById(link.hash.replace('#', ''))
    const scroll = currentSection.getBoundingClientRect().top + window.scrollY

    window.scrollTo({
      top: scroll - this.scrollOffset,
    })
  }

  scrollTo(sectionId: string) {
    const currentSection = document.getElementById(sectionId)
    const scroll = currentSection.getBoundingClientRect().top + window.scrollY

    window.scrollTo({
      top: scroll - this.scrollOffset,
    })
  }

  observerCallback(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        const scrollTop = entry.boundingClientRect.top + window.scrollY
        const windowHalfHeight = window.innerHeight / 2

        const currentNavItems = this.navItems.map((item) => item[entry.target.id])

        currentNavItems.forEach((item) => {
          if (!!item) {
            item.classList.add('active')
          }
        })

        this.navItems.forEach((item) => {
          Object.values(item).forEach((link) => {
            if (!!link && !currentNavItems.includes(link)) {
              link.classList.remove('active')
            }
          })
        })
      }
    })
  }
}
