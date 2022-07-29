import BaseForm from '../base-form'
import debounce from '../debouncer'
import Message from '../message'

type Fields = {
  firstname: string
  lastname: string
  company: string
  email: string
  phone: string
  message: string
}

export default class CallBackForm extends BaseForm {
  constructor(form: HTMLElement, debouncer: typeof debounce, messageInstance: Message) {
    super(form, debouncer, messageInstance)
    this.sendedEmails = []
    this.liveTimeEmailInHours = 2
  }

  validate(fields: Fields): boolean {
    if (fields.email === '') {
      this.loading = false
      this.messageInstance.showError('Please enter your Email')
      return false
    }

    if (this.hasBeenSendedEmail(fields.email) && this.isLiveEmail(fields.email)) {
      this.messageInstance.showSuccess('Your application has already been sent!')
      this.loading = false
      return false
    }

    if (fields.firstname === '') {
      this.loading = false
      this.messageInstance.showError('Please enter your First name')
      return false
    }

    if (fields.lastname === '') {
      this.loading = false
      this.messageInstance.showError('Please enter your Last name')
      return false
    }

    if (fields.company === '') {
      this.loading = false
      this.messageInstance.showError('Please enter your Company')
      return false
    }

    if (fields.phone === '') {
      this.loading = false
      this.messageInstance.showError('Please enter your Phone')
      return false
    }

    if (fields.message === '') {
      this.loading = false
      this.messageInstance.showError('Please enter Message')
      return false
    }

    return true
  }

  onSubmitForm() {
    const fields = this.getFields<Fields>()

    if (!this.validate(fields)) {
      return
    }

    this.send(fields)
      .then((data) => {
        this.messageInstance.showSuccess('Message sent')
        this.clearFields()
      })
      .catch((error) => {
        this.messageInstance.showError('Somethings went wrong')
      })
  }

  async send(data: Fields) {
    const variables = {
      landingId: CallBackForm.landingId,
      firstName: data.firstname,
      lastName: data.lastname,
      email: data.email,
      subject: 'MerchConnect request support',
      message: `
        Company: ${data.company}
        Phone number: ${data.phone}
        ${data.message}
      `,
    }

    return await this.client.request(CallBackForm.query, variables)
  }
}
