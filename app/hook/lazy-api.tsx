type statusPromise = 'pending' | 'success' | 'error'

interface ResponseWrap<T> {
  read: () => never | any | T
}

export function fetchLazy<T> (promise: Promise<T>): ResponseWrap<T> {
  console.log('Wrapper')
  let status: statusPromise = 'pending'
  let response: any

  const suspense: any = promise.then(
    (res: any) => {
      status = 'success'
      response = res
    },
    (err: any) => {
      status = 'error'
      response = err
    }
  )

  const handler = {
    pending: () => {
      throw suspense
    },
    error: () => {
      throw response
    },
    success: () => response
  }

  const read = (): never | T => {
    const result = handler[status]()
    return result
  }

  return { read }
}
