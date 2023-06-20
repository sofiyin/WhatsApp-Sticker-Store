import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import "../css/Login.css"

export const Login = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggeo, setLoggeo] = useState(true)

  // Funciones para cambiar entre iniciar sesión y registrarse
  const logIn = () => {
    setLoggeo(true)
  }

  const signUp = () => {
    setLoggeo(false)
  }

  // Funciones para extraer los datos
  const escribirUsername = (e) => {
    setUsername(e.target.value)
  }

  const escribirEmail = (e) => {
    setEmail(e.target.value)
  }

  const escribirPassword = (e) => {
    setPassword(e.target.value)
  }

  const arr = [username, email, password, loggeo]
  console.log(arr)

  // Función para hacer POST de un nuevo usuario
  const newUser = async (arr) => {
    const data = {
      username: arr[0],
      email: arr[1],
      password: arr[2]
    }

    const result = await fetch('http://localhost:5000/personas', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })

    if (result.ok) {
      console.log('Usuario creado')
    } else {
      console.log('Error al crear el usuario')
    }
  }  

  return (
    <div className="login">
      <div className="login-forms">
        <div className="login-forms__title">
          <img src={process.env.PUBLIC_URL + 'assets/Logo_wss-t.png'} alt="Logo wss" />
          <h2>WhatsApp Sticker Store</h2>    
        </div>
        <div className="login-forms__buttons">
          <div onClick={logIn}>Iniciar Sesión</div>
          <div onClick={signUp}>Registrarse</div>
        </div>
        <div className="login-forms__inputs">
          <label htmlFor="username"> Nombre de usuario </label>
          <input 
            type="text" 
            name="username" 
            id="username" 
            placeholder='Escribe tu nombre de usuario'
            onChange={escribirUsername}/>
          <div className="username-warnings"></div>

          <label htmlFor="email" className={loggeo ? "enable" : "disable"}> Correo </label>
          <input 
            className={loggeo ? "enable" : "disable"}
            type="text" 
            name="email" 
            id="email"
            placeholder='Escribe tu correo'
            onChange={escribirEmail} />
          <div className="email-warnings"></div>

          <label htmlFor="password"> Contraseña </label>
          <input 
            type="text" 
            name="password" 
            id="password"
            placeholder='Ingresa una contraseña'
            onChange={escribirPassword} />
          <div className="password-warnings"></div>
        </div>
        <div className="login-forms__submit">
          {/*<Link to='/home'> Ingresar </Link>*/}
          <div onClick={ newUser }> Ingresar </div>
        </div>
      </div>
    </div>
  )
}
