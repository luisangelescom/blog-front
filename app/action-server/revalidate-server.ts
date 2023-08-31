'use server'

import { revalidatePath } from 'next/cache'

// unificar para solo mandar el path
export const revalidatePathCustom = (path: string): void => {
  revalidatePath(path)
}
