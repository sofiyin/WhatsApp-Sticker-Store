import React, { useEffect, useState } from 'react'
import { UserInfo } from './UserInfo'
import { Link, useLocation  } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import '../css/NavBar.css'

export const NavBar = () => {
  const [showUserInfo, setshowUserInfo] = useState(false)
  const [activeButton, setActiveButton] = useState('inicio')
  const location = useLocation()
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    location.pathname === `/home/${token}` ? setActiveButton('inicio') : setActiveButton('crear')
  })

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={process.env.PUBLIC_URL + 'http://localhost:3000/assets/Logo_wss-t.png'} alt="Logo wss" />
      </div>
      <Link to={`/home/${token}`}><div
        className={`navbar-button ${activeButton === 'inicio' ? 'active' : ''}`}
        onClick={() => setActiveButton('inicio')} 
      > Inicio </div> </Link>
      <Link to={`/create/${token}`}><div 
        className={`navbar-button ${activeButton === 'crear' ? 'active' : ''}`}
        onClick={() => setActiveButton('crear')}
      > Crear </div></Link>
      <div className="navbar-search">
        <div className="navbar-search__icon"><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
        <input type="text" className="navbar-search__input" placeholder="Buscar"/>
      </div>            
      <div className="navbar-carrito"><FontAwesomeIcon icon={faCartShopping} /></div>
      <div 
        className="navbar-perfil"
        onClick={ () => setshowUserInfo(!showUserInfo) }
      ><FontAwesomeIcon icon={faUser} /></div>     
      { showUserInfo && <UserInfo /> }
    </nav>
  )
}
