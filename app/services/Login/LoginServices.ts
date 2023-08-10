import { UrlBackend } from '@/app/public-env'
import { LoginType, RegisterType } from '@/app/types/login'

export const loginService = async (data: LoginType): Promise<Response> => await fetch(`${UrlBackend}/login`, {
  method: 'POST',
  body: JSON.stringify({
    surname: data.username,
    password: data.password
  }),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export const registerUserService = async (data: RegisterType): Promise<Response> => await fetch(`${UrlBackend}/users`, {
  method: 'POST',
  body: JSON.stringify({
    name: data.name,
    lastname: data.lastname,
    surname: data.username,
    password: data.password
  }),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
