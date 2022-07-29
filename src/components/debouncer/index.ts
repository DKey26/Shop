interface IReturnFunctionType<T, T2 extends any[]> {
  (...args: T2): T
}

interface IReturnDebouncedFunctionType<T, T2 extends any[]> {
  (...args: T2): Promise<T>
}

/**
 * Debouncer
 * @param fn Метод
 * @param delay Задержка в миллисекундах
 */
export default function debounce<T, T2 extends any[]>(
  fn: IReturnFunctionType<T, T2>,
  delay: number,
  context: any = this,
): IReturnDebouncedFunctionType<T, T2> {
  let timeoutID: any = null
  let timeout = false
  let breakTimeout = false

  /** Обернутый метод с задержкой в выполнении */
  return function debounced(...args: T2): Promise<T> {
    // Заходим только при повторном вызове внутри временного интервала
    if (timeout) {
      // Обнуляем интервал времени, если метод был вызван еще раз
      breakTimeout = true
      clearTimeout(timeoutID)

      // Выполняется лишь в последний раз, когда задержка по времени закончилась
      return new Promise((resolve) => {
        timeoutID = setTimeout(function lastApply() {
          timeout = false
          breakTimeout = false
          resolve(fn.apply(context, args))
        }, delay)
      })
    } else {
      // Блокируем моментальное выполнение метода, до истечения времени задержки
      timeout = true
      setTimeout(() => {
        if (!breakTimeout) {
          timeout = false
        }
      }, delay)

      // Выполняется лишь в первый раз
      return new Promise((resolve) => {
        resolve(fn.apply(context, args))
      })
    }
  }
}
