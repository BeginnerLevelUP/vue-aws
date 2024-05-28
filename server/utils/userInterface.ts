interface Uploads{
  fileName:string,
}

export default interface User {
  userName: string
  userEmail: string
  userPassword: string
  createdAt: number
  uploads?:Uploads[]
}

