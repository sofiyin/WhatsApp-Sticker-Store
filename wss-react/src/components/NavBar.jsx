import React from 'react'
import { Link } from 'react-router-dom'
import '../css/NavBar.css'

export const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={process.env.PUBLIC_URL + 'assets/Logo_wss-t.png'} alt="Logo wss" />
      </div>
      <div className="navbar-button"><Link to='/home'> Inicio </Link></div>
      <div className="navbar-button"><Link to='/create'> Crear </Link></div>
      <div className="navbar-search">
        <div className="navbar-search__icon"></div>
        <input type="text" className="navbar-search__input" placeholder="Buscar"/>
      </div>            
      <div className="navbar-carrito"></div>
      <div className="navbar-perfil"></div>            
    </nav>
  )
}
