import { settings } from '../../settings'
import debounce from '../debouncer'
import Message from '../message'
import { GraphQLClient, gql } from 'graphql-request'

type EmailData = {
  name: string
  liveToDate: number
}

const REQUEST_SUPPORT = gql`
  mutation requestSupportV2(
    $landingId: ID!
    $firstName: String
    $lastName: String
    $email: String!
    $orderNumber: String
    $subject: String!
    $message: String!
  ) {
    requestSupportV2(
      landingId: $landingId
      firstName: $firstName
      lastName: $lastName
      email: $email
      orderNumber: $orderNumber
      subject: $subject
      message: $message
    )
  }
`

export default class BaseForm {
  element: HTMLElement
  loading: boolean
  messageInstance: Message
  debouncedOnSubmit
  debouncer: typeof debounce
  sendedEmails: EmailData[]
  liveTimeEmailInHours: number
  client: GraphQLClient

  static query: string = REQUEST_SUPPORT
  static landingId: number = settings.landingId

  constructor(form: HTMLElement, debouncer: typeof debounce, messageInstance: Message) {
    this.element = form
    this.debouncer = debouncer
    this.messageInstance = messageInstance
    this.debouncedOnSubmit = this.debouncer(this.onSubmitForm, 3000, this)
    this.loading = false

    this.initGQLClient()
    this.initLocalStorageData()
    this.addListenersOnSubmit()
  }

  initGQLClient() {
    const endpoint = `${settings.backendHost}/graphql`
    this.client = new GraphQLClient(endpoint)
  }

  getFields<Fields>() {
    const inputs = this.element.querySelectorAll('input')
    const textareas = this.element.querySelectorAll('textarea')
    const fields = {}

    inputs.forEach((input) => {
      // @ts-ignore
      fields[input.getAttribute('name')] = input.value
    })

    textareas.forEach((textarea) => {
      // @ts-ignore
      fields[textarea.getAttribute('name')] = textarea.value
    })

    return fields as Fields
  }

  addListenersOnSubmit() {
    this.element.addEventListener('submit', (event) => {
      event.preventDefault()
      this.loading = true
      this.debouncedOnSubmit()
    })
  }

  clearFields() {
    const inputs = this.element.querySelectorAll('input')
    const textareas = this.element.querySelectorAll('textarea')

    inputs.forEach((input) => {
      input.value = ''
    })

    textareas.forEach((textatea) => {
      textatea.value = ''
    })
  }

  onSubmitForm() {}

  initLocalStorageData() {
    const emails = localStorage.getItem('emails-started')
    if (!emails) {
      localStorage.setItem('emails-started', '[]')
      return
    }
    try {
      const parsedEmails = JSON.parse(emails)
      this.sendedEmails = parsedEmails
    } catch (error) {
      localStorage.setItem('emails-started', '[]')
    }
  }

  saveSendedMail(email: string) {
    const hourMs = 1000 * 60 * 60
    if (!this.hasBeenSendedEmail(email)) {
      this.sendedEmails.push({ name: email, liveToDate: Date.now() + hourMs * this.liveTimeEmailInHours })
      localStorage.setItem('emails-started', JSON.stringify(this.sendedEmails))
    }

    if (!this.isLiveEmail(email)) {
      this.sendedEmails = this.sendedEmails.filter((sendedEmail) => sendedEmail.name !== email)
      this.sendedEmails.push({ name: email, liveToDate: Date.now() + hourMs * this.liveTimeEmailInHours })
      localStorage.setItem('emails-started', JSON.stringify(this.sendedEmails))
    }
  }

  hasBeenSendedEmail(email: string): boolean {
    const sendedEmail = this.sendedEmails.find((sendedEmail) => sendedEmail.name === email)
    if (!sendedEmail) {
      return false
    }
    return true
  }

  isLiveEmail(email: string): boolean {
    const sendedEmail = this.sendedEmails.find((sendedEmail) => sendedEmail.name === email)
    if (!sendedEmail) {
      return false
    }
    if (Date.now() > sendedEmail.liveToDate) {
      return false
    }
    return true
  }
}
