import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import "../css/Login.css"

export const Login = () => {
  const [username, setUsername] = useState('')

  const escribirUsr = (e) => {
    setUsername(e.target.value)
  }

  return (
    <div className="login">
      <div className="login-forms">
      <h1>{username}</h1>
        <div className="login-forms__title">
          <img src={process.env.PUBLIC_URL + 'assets/Logo_wss-t.png'} alt="Logo wss" />
          <h2>WhatsApp Sticker Store</h2>    
        </div>
        <div className="login-forms__buttons">
          <div>Iniciar Sesión</div>
          <div>Registrarse</div>
        </div>
        <div className="login-forms__inputs">
          <label htmlFor="username"> Nombre de usuario </label>
          <input 
            type="text" 
            name="username" 
            id="username" 
            placeholder='Escribe tu nombre de usuario'
            onChange={escribirUsr}/>
          <div className="username-warnings"></div>

          <label htmlFor="email"> Correo </label>
          <input 
            type="text" 
            name="email" 
            id="email"
            placeholder='Escribe tu correo' />
          <div className="email-warnings"></div>

          <label htmlFor="password"> Contraseña </label>
          <input 
            type="text" 
            name="password" 
            id="password"
            placeholder='Ingresa una contraseña' />
          <div className="password-warnings"></div>
        </div>
        <div className="login-forms__submit">
          <div> <Link to='/home'> Ingresar </Link> </div>
        </div>
      </div>
    </div>
  )
}
