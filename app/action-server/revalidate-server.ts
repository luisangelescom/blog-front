'use server'

import { revalidatePath } from 'next/cache'

export const actionRevalidatePosts = (): void => {
  console.log('Revalidate Post')
  revalidatePath('/')
}

export const actionRevalidateDashboard = (): void => {
  console.log('Revalidate dashboard')
  revalidatePath('/dashboard')
}

export const actionRevalidatePostId = (): void => {
  console.log('Revalidate dashboard')
  revalidatePath('/post/[id]')
}
