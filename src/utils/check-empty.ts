function checkEmpty(element: HTMLInputElement | HTMLTextAreaElement) {
  if (element.value == '') {
    element.classList.remove('not-empty')
  } else {
    element.classList.add('not-empty')
  }
}

export function initCheckEmptyFields(className: string) {
  const checkEmptyInputs = document.querySelectorAll(`${className} input`) as NodeListOf<HTMLInputElement>
  const checkEmptyTextarea = document.querySelectorAll(`${className} textarea`) as NodeListOf<HTMLTextAreaElement>

  checkEmptyInputs.forEach((element) => {
    checkEmpty(element)
    element.addEventListener('blur', () => {
      checkEmpty(element)
    })
  })

  checkEmptyTextarea.forEach((element) => {
    checkEmpty(element)
    element.addEventListener('blur', () => {
      checkEmpty(element)
    })
  })
}
