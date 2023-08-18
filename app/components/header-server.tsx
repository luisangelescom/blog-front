import { FC } from 'react'
import ItemsHeaders from './items-header'
import { getDataToken } from '../utils/fetcher'

const HeaderServer: FC = async () => {
  const data = getDataToken()

  return (
    <div className='sticky top-0 bg-container z-10 drop-shadow-sm h-16 flex gap-8 items-center justify-end container mx-auto px-2 sm:px-0'>
      <ItemsHeaders data={data !== null ? JSON.parse(data) : data} />
    </div>
  )
}

export default HeaderServer
