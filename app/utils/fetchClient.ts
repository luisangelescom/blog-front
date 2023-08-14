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
  console.log(fetcherCustom)
  const res = await fetcherCustom

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
