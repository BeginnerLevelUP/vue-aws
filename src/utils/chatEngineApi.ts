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
      'Project-ID': 'a753e243-722c-40b5-8313-8edd7608ef8a',
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
      'Private-Key': '3e0d65b6-912b-41b1-ace8-35b2311f0bc0'
    },
    body: JSON.stringify({ username, secret, email,})
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`)
  }

  return (await response.json()) as Response
}

export { loginRest, signupRest }
