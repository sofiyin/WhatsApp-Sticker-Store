import React, { useEffect, useState } from 'react'
import { getUser } from '../service/api'
import "../css/UserInfo.css"

export const UserInfo = () => {
  const userId = sessionStorage.getItem('userId_local')
  const [user, setUser] = useState({})

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await getUser(userId)
      setUser(response)
    }
    getUserInfo()

    return () => {
    }
  }, [])

  const cerrarSesion = () => {
    sessionStorage.removeItem('userId_local')
    window.location.href = '/'
  }

  return (
    <div className="main-user">
      <div>{user.username}</div>
      <div>{user.correo}</div>
      <hr />
      <div
        className='main-user__button'>
        Editar Perfil
      </div>
      <div 
        className='main-user__button'
        onClick={ cerrarSesion }> 
        Cerrar sesión
      </div>
      <hr />
      <div
        className='main-user__red'>
        Eliminar cuenta
      </div>
    </div>
  )
}
