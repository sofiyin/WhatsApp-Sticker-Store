import React from 'react'
import '../css/NavBar.css'

export const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo"></div>
            <div className="navbar-button">Inicio</div>
            <div className="navbar-button">Crear</div>
            <div className="navbar-search">
                <div className="navbar-search__icon"></div>
                <input type="text" className="navbar-search__input" placeholder="Buscar"/>
            </div>            
            <div className="navbar-carrito"></div>
            <div className="navbar-perfil"></div>            
        </nav>
    )
}
