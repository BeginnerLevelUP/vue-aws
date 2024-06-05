
type Response = {
  id: string
  username: string
  email?: string
  first_name?: string
  last_name?: string
}
const projectKey=import.meta.env.VITE_CHAT_ENGINE_PROJECT_KEY||''
const projectId = import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID||''
const loginRest = async (username: string, secret: string): Promise<Response> => {
  const response = await fetch('https://api.chatengine.io/users/me/', {
    method: 'GET',
    headers: {
      'Project-ID': `${projectId}`,
      'User-Name': username,
      'User-Secret': secret
    },
    redirect: 'follow'
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`)
  }

  return (await response.json()) as Response
}

const signupRest = async (username: string, secret: string, email: string): Promise<Response> => {
  const response = await fetch('https://api.chatengine.io/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Private-Key': `${projectKey}`
    },
    body: JSON.stringify({ username, secret, email })
  })

  if (!response.ok) {
    console.log(response.text)
    throw new Error(`Error: ${response.status} ${response.statusText}`)

  }

  return (await response.json()) as Response
}

const updateAccount = async (
  username: string,
  secret: string,
  email: string,
  first_name: string,
  last_name: string,
): Promise<Response> => {
  const response = await fetch('https://api.chatengine.io/users/me/', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Project-ID': `${projectId}}`,
      'User-Name': username,
      'User-Secret': secret
    },
    body: JSON.stringify({ email, first_name, last_name,  })
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`)
  }

  return await response.json()
}

const uploadImage=async(file:File,username:string,secret:string)=>{
  const form = new FormData()
  form.append(
    'avatar',
    file
  )

  const options = {
    method: 'PATCH',
    headers: {
      'User-Name': username,
      'User-Secret': secret,
      'Project-ID': projectId
    },
    body:form
  }

  fetch('https://api.chatengine.io/users/me/', options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err))
}

const deleteAccount=()=>{}

export { loginRest, signupRest, updateAccount,deleteAccount,uploadImage }
