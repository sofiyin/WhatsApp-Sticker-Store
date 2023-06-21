import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../css/Login.css"

const BACKEND_URL = 'http://localhost:5000'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [loggeo, setLoggeo] = useState(true)
  const navigate = useNavigate()

  const errors = {
    username: "",
    correo: "",
    password: ""
  }

  function validateForm() {
    if (username === "") {
      errors.username = "Ingresa un username";
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      errors.correo = "Ingresa un correo válido"
      return false
    }

    if (password === "") {
      errors.password = "Ingresa una contraseña"
      return false

    } else if (password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres"
      return false
    }
    
    return true;
  }

  const newUserTemp = () => {
    const valid = validateForm()
    console.log(valid)
  }

  // Función para hacer POST de un nuevo usuario
  const newUser = async () => {
    const data = {
      username,
      correo,
      password
    }

    console.log(data)

    const result = await fetch(`${BACKEND_URL}/personas`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })

    if (result.ok) {
      console.log('Usuario creado')
      navigate('/home')
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
          <div onClick={ () => setLoggeo(false) }>Iniciar Sesión</div>
          <div onClick={ () => setLoggeo(true) }>Registrarse</div>
        </div>
        <div className="login-forms__inputs">
          <label htmlFor="username"> Nombre de usuario </label>
          <input 
            type="text"  
            id="username"
            placeholder='Escribe tu nombre de usuario'
            onChange={ e => setUsername(e.target.value) }/>
          <div className="username-warnings"></div>

          <label htmlFor="email" className={loggeo ? "enable" : "disable"}> Correo </label>
          <input 
            className={loggeo ? "enable" : "disable"}
            type="text" 
            id="email"
            placeholder='Escribe tu correo'
            onChange={ e => setCorreo(e.target.value) } />
          <div className="email-warnings"></div>

          <label htmlFor="password"> Contraseña </label>
          <input 
            type="password" 
            id="password"
            placeholder='Ingresa una contraseña'
            onChange={ e => setPassword(e.target.value )} />
          <div className="password-warnings"></div>
        </div>
        <div className="login-forms__submit">
          <div onClick={ newUserTemp }> Ingresar </div>
        </div>
      </div>
    </div>
  )
}
