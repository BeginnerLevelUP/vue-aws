type Response = {
  id: string
  username: string
  email?: string
  first_name?: string
  last_name?: string
}

const loginRest = async (username: string, secret: string): Promise<Response> => {
  const response = await fetch('https://api.chatengine.io/users/me/', {
    method: 'GET',
    headers: {
      'Project-ID': `${process.env.CHAT_ENGINE_PROJECT_ID}`,
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

const signupRest = async (
  username: string,
  secret: string,
  email: string,
): Promise<Response> => {
  const response = await fetch('https://api.chatengine.io/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Private-Key': `${process.env.CHAT_ENGINE_PROJECT_KEY}`
    },
    body: JSON.stringify({ username, secret, email })
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`)
  }

  return (await response.json()) as Response
}

export { loginRest, signupRest }
