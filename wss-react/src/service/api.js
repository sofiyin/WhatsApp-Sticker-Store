import { userId_local } from '../constants'

const BACKEND_URL = 'http://127.0.0.1:5001'

const userId = localStorage.getItem(userId_local)

// Stickers

export const fetchStickers = async () => {
	const response = await fetch(`${BACKEND_URL}/stickers`)

	if (!response.ok) {
		console.log('Error al obtener los stickers')
    return undefined;
  }

  return response.json();
}

export const postSticker = async (body) => {
	const response = await fetch(`${BACKEND_URL}/stickers-creador/${body.S_CREADOR_id}`, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: { 'Content-Type': 'application/json' }
	})

	if (!response.ok) {
		console.log('Error al crear el sticker')
		return undefined
	}

	return response.json()
}

export const stickerInfo = async (id) => {
	const response = await fetch(`${BACKEND_URL}/stickers/${id}`)

	if (!response.ok) {
		console.log('Error al obtener la información del sticker')
		return undefined
	}

	return response.json()
}

export const deleteSticker = async (id) => {
	const response = await fetch(`${BACKEND_URL}/stickers/${id}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' }
	})

	if (!response.ok) {
		console.log('Error al eliminar el sticker')
		return undefined
	}
}

// Login and Register

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

	return response.json()
}

export const loginUser = async (body) => {
	const response = await fetch(`${BACKEND_URL}/login`, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: { 'Content-Type': 'application/json' }
	})

	if (!response.ok) {
		console.log('Error al iniciar sesión')
		return undefined
	}

	return response.json()
}

// User Info

export const getUser = async (id) => {
	const response = await fetch(`${BACKEND_URL}/personas/${id}`)

	if (!response.ok) {
		console.log('Error al obtener el usuario')
		return undefined
	}

	return response.json()
}

export const userSticker = async (id) => {
	const response = await fetch(`${BACKEND_URL}/stickers-creador/${id}`)

	if (!response.ok) {
		console.log('Error al obtener los stickers del usuario')
		return undefined
	}

	return response.json()
}