
// async function Render ({ timer }: { timer: number }): JSX.Element {
//   return (
//     <>
//       <span className='border-2 text-lg'>Render</span>
//     </>
//   )
// }

import { FC } from 'react'

// interface ResolveData {
//   data: string
// }

const Render: FC<{ timer: number }> = async ({ timer }) => {
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: 'ok' })
    }, timer * 1000)
  })

  return (
    <>
      <span className='border-2 text-lg'>Render</span>
      {JSON.stringify(data)}
    </>
  )
}

export default Render
