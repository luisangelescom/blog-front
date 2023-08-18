import { FC } from 'react'
import ContainerDashboard from '../components/dashboard/container'
import { getPostUxWithCredential } from '../services/UX/postUx'
import { UserPostData } from '../types/user'

const DashboardPage: FC = async () => {
  const data = await getPostUxWithCredential<UserPostData>('users/posts/all')

  return (
    <ContainerDashboard posts={data} />
  )
}

export default DashboardPage
