'use server'

import { cookies } from 'next/headers'

export const deleteCookie = (item: string): void => {
  cookies().delete(item)
}
