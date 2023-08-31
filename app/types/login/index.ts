export interface LoginType {
  username: String
  password: String
}

export interface RegisterType {
  name?: String
  password: String
  lastname?: String
  username: String
}

export interface User {
  id: number
  surname: string
}
export interface TokenData {
  accessToken: string | null
  data: User | null
}
