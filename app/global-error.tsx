'use client'

import { useRouter } from 'next/router'

function GlobalError ({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}): JSX.Element {
  const router = useRouter()

  return (
    <>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </>
  )
}

export default GlobalError
