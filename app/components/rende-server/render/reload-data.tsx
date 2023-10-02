'use client'

import { revalidatePathCustom } from '@/app/action-server/revalidate-server'

function ReloadData ({ reload }: { reload: string }): JSX.Element {
  return (
    <button
      type='button' className='border-blue-500 border-2 px-2 py-1 rounded-md bg-blue-500 hover:bg-blue-700' onClick={() => {
        revalidatePathCustom(reload)
      }}
    >Reload
    </button>
  )
}

export default ReloadData
