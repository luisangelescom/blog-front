'use server'

import { revalidatePath } from 'next/cache'

// unificar para solo mandar el path
export const actionRevalidatePosts = (): void => {
  revalidatePath('/')
}

export const actionRevalidateDashboard = (): void => {
  revalidatePath('/dashboard')
}

export const actionRevalidatePostId = (): void => {
  revalidatePath('/post/[id]')
}
