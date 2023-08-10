import { Suspense } from 'react'
import ContainerDashboard from '../components/dashboard/container'
import Loading from './loading'

function DashboardPage (): JSX.Element {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <ContainerDashboard />
      </Suspense>
    </>
  )
}

export default DashboardPage
