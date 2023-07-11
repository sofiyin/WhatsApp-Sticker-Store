import React, {useState} from 'react'
import "../css/Login.css"

const BACKEND_URL = 'http://localhost:5001'

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
    const data = {
      username,
      correo,
      password
    }

    const result = await fetch(`${BACKEND_URL}/register-user`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })

    if (result.ok) {
      console.log(result);
      return result.json()

    } else {
      console.log('Error al crear el usuario')
    }
  }

  const usuario = async () => {
    const result = await newUser()
    setUser(result)
    sessionStorage.setItem("token", result.id)
    setactiveUser(result)
  }
  
  const submit = () => {
    if (validateForm()) {
      usuario()
      console.log('Formulario válido');
    } else {
      console.log('Formulario inválido')
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
