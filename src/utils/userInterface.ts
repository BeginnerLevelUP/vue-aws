interface Uploads {
  fileName: string
}

export interface User {
  userName: string
  userEmail: string
  userPassword: string
  createdAt: number
  uploads?: Uploads[]
}
