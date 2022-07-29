import BaseForm from '../base-form'
import debounce from '../debouncer'
import Message from '../message'

type Fields = {
  name: string
  instagram: string
  email: string
  address: string
}

export default class FreeShirtForm extends BaseForm {
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

    if (fields.name === '') {
      this.loading = false
      this.messageInstance.showError('Please enter your name')
      return false
    }

    if (fields.instagram === '') {
      this.loading = false
      this.messageInstance.showError('Please enter your Instagram Handle')
      return false
    }

    if (fields.email === '') {
      this.loading = false
      this.messageInstance.showError('Please enter your Email')
      return false
    }

    if (fields.address === '') {
      this.loading = false
      this.messageInstance.showError('Please enter your Shipping Address')
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
      landingId: FreeShirtForm.landingId,
      firstName: data.name,
      lastName: '',
      email: data.email,
      subject: 'MerchConnect request Free Shirt',
      message: `
        Instagram Handle: ${data.instagram}
        Shipping Address: ${data.address}
      `,
    }

    return await this.client.request(FreeShirtForm.query, variables)
  }
}
