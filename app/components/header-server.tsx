import { FC } from 'react'
import ItemsHeaders from './items-header'
import { getDataToken } from '../utils/fetcher'

const HeaderServer: FC = async () => {
  const data = getDataToken()

  return (
    <>
      <ItemsHeaders data={data !== null ? JSON.parse(data) : data} />
    </>
  )
}

export default HeaderServer
