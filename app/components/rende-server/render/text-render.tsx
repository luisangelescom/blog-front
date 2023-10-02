// import { fetchLazy } from '@/app/hook/lazy-api'
// import { UrlFrontend } from '@/app/public-env'
import ReloadData from './reload-data'

// const cache = new Map()
interface Data {
  id: number
  title: string
  user?: { surname: string }
}

// const getPromise = async (): Promise<Data[]> => {
//   return await fetch(`${UrlFrontend}api/post`, {
//     cache: 'force-cache',
//     next: { revalidate: 5 }
//   }).then(async (r) => await r.json())
// }

// const wPromise = fetchLazy<Data[]>(getPromise())

function TestRender ({ data }: { data: Data[] }): JSX.Element {
  // const data: Data[] = wPromise.read()
  // console.log({ data })
  // const t = use(fetchData(`/${1}/albums`))
  // const [data, setData] = useState<Data[]>([])

  return (
    <>
      <span>TestRender</span>
      <div className='w-full flex py-5 justify-end items-center px-10'>
        <ReloadData reload='/post' />
      </div>
      <div className='flex flex-col gap-3 px-10'>
        {data.map((d) => (
          <div key={d.id} className='border-2 flex justify-between items-center'>
            <span className='text-2xl'>{`${d.title}`}</span>
            <span className='text-2xl'>{`${d.user?.surname ?? 'Anónimo'}`}</span>
          </div>
        ))}
      </div>
      {data.length === 0 && <span>No se encontraron datos.</span>}
      {/* {t} */}
    </>
  )
}

export default TestRender
