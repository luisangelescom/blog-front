import { fetchLazy } from '@/app/hook/lazy-api'

// const cache = new Map()
interface Data {
  id: number
  title: string
  completed: boolean
}

const getPromise = async (): Promise<Data[]> => {
  return await fetch('https://jsonplaceholder.typicode.com/todos', {
    cache: 'force-cache',
    next: { revalidate: 10 }
  }).then(async (r) => await r.json())
}

const wPromise = fetchLazy<Data[]>(getPromise())

function TestRender (): JSX.Element {
  const data: Data[] = wPromise.read()
  // console.log({ data })
  // const t = use(fetchData(`/${1}/albums`))
  // const [data, setData] = useState<Data[]>([])

  return (
    <>
      <span>TestRender</span>
      <div className='flex flex-col gap-3 px-10'>
        {data.map((d) => (
          <div key={d.id} className='border-2 flex justify-between items-center'>
            <span className='text-2xl'>{`${d.title}`}</span>
            <input type='checkbox' defaultChecked={d.completed} readOnly checked={d.completed} />
          </div>
        ))}
      </div>
      {data.length === 0 && <span>No se encontraron datos.</span>}
      {/* {t} */}
    </>
  )
}

export default TestRender
