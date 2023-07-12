import { userId_local } from '../constants'

const BACKEND_URL = 'http://127.0.0.1:5001'

const userId = localStorage.getItem(userId_local)

export const fetchStickers = async () => {
	const response = await fetch(`${BACKEND_URL}/stickers`)

	if (!response.ok) {
		console.log('Error al obtener los stickers')
    return undefined;
  }

  return response.json();
}

export const registerUser = async (body) => {
	const response = await fetch(`${BACKEND_URL}/register-user`, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: { 'Content-Type': 'application/json' }
	})

	if (!response.ok) {
		console.log('Error al crear el usuario')
		return undefined
	}

	console.log(response)
	return response.json()
}

export const loginUser = async (body) => {
	const response = await fetch(`${BACKEND_URL}/login`, {
		method: 'GET',
		body: JSON.stringify(body),
		headers: { 'Content-Type': 'application/json' }
	})

	if (!response.ok) {
		console.log('Error al iniciar sesión')
		return undefined
	}

	console.log(response)
	return response.json()
}