import React, {useState} from 'react'
import { registerUser } from '../service/api'
import "../css/Login.css"

export const Login = ({setactiveUser}) => {
  const [username, setUsername] = useState('')
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [loggeo, setLoggeo] = useState(true)

  const [errors, setErrors] = useState({})
  const [user, setUser] = useState({})

  function validateForm() {
    let temp = {
      username: "",
      correo: "",
      password: ""
    }

    let valido = true

    if (username === "") {
      temp.username = "Ingresa un username"
      valido = false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      temp.correo = "Ingresa un correo válido"
      valido = false
    }

    if (password === "") {
      temp.password = "Ingresa una contraseña"
      valido = false

    } else if (password.length < 6) {
      temp.password = "La contraseña debe tener al menos 6 caracteres"
      valido = false
    }
    
    setErrors(temp)

    return valido;
  }

  // Función para hacer POST de un nuevo usuario
  const newUser = async () => {
    const response = await registerUser({username, correo, password})
    setUser(response)

    sessionStorage.setItem("userId_local", response.id)
    setactiveUser(response)
  }
  
  const loginUser = async () => {
    const response = await loginUser({username, password})
    setUser(response)
    setactiveUser(response)
  }
  
  const submit = () => {
    if (!validateForm()) {
      console.log('Formulario inválido')
      return undefined
    }

    if (loggeo) {
      newUser()
      console.log('Formulario válido');
    } else {

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
          <div className="warnings"> { errors.username } </div>

          <label htmlFor="email" className={loggeo ? "enable" : "disable"}> Correo </label>
          <input 
            className={loggeo ? "enable" : "disable"}
            type="text" 
            id="email"
            placeholder='Escribe tu correo'
            onChange={ e => setCorreo(e.target.value) } />
          <div className={`warnings ${loggeo ? "enable" : "disable"}`} > { errors.correo } </div>

          <label htmlFor="password"> Contraseña </label>
          <input 
            type="password" 
            id="password"
            placeholder='Ingresa una contraseña'
            onChange={ e => setPassword(e.target.value )} />
          <div className="warnings"> { errors.password } </div>
        </div>
        <div className="login-forms__submit">
          <div onClick={ submit }> Ingresar </div>
        </div>
      </div>
    </div>
  )
}
