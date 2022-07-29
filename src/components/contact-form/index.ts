import BaseForm from '../base-form'
import debounce from '../debouncer'
import Message from '../message'

type Fields = {
  firstname: string
  lastname: string
  email: string
}

export default class ContactForm extends BaseForm {
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
      landingId: ContactForm.landingId,
      firstName: data.firstname,
      lastName: data.lastname,
      email: data.email,
      subject: 'MerchConnect custom print',
      message: `Customer ${data.firstname} ${data.lastname} requested the custom print. Please contact ${data.email} for details.`,
    }

    return await this.client.request(ContactForm.query, variables)
  }
}
