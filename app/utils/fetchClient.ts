const pathSensitive = ['/dashboard']

export const fetchSWR = async <T>(url: string): Promise<T> => {
  const res = await fetch(url)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    // error.info = await res.json()
    // error.status = res.status
    throw error
  }

  return await res.json()
}

export const fetchClient = async <T>(fetcherCustom: Promise<Response>): Promise<T> => {
  // await new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve('ok')
  //   }, 5000)
  // })
  try {
    const res = await fetcherCustom
    const { status } = res
    let message = 'Internal server error'
    let cause = {
      errors: { message: 'Internal server error' }
    }
    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (res.ok) {
      return await res.json()
    }

    if (status === 400) {
      message = 'Bad Request'
      cause = await res.json()
    }
    if (status === 401) {
      if (window !== null && window !== undefined) {
        console.log(window.location.pathname)
        if (pathSensitive.includes(window.location.pathname)) {
          window.location.replace('/login')
        }
      }
      message = 'Unauthorized'
      cause = await res.json()
    }

    if (status === 404) {
      message = 'Not Found'
      cause = await res.json()
    }

    throw new Error(message, {
      cause
    })
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message, { cause: error.cause })
    }
    throw new Error('Internal server error')
  }
}
