import React, { useState } from 'react'
import { NavBar } from './NavBar'
import { Link } from 'react-router-dom'
import '../css/Create.css'

export const Create = () => {

  const [tamTitulo, setTamTitulo] = useState(0)
  const [tamDescrip, setTamDescrip] = useState(0)

  const contarTitulo = (e) => {
    setTamTitulo(e.target.value.length)
  }

  const contarDescrip = (e) => {
    setTamDescrip(e.target.value.length)
  }

  return (
    <>
      <NavBar />
      <div className="create-container">
        <div className="create-mystickers">
          <div className="create-mystickers__title">Mis stickers</div>
          <div className="create-mystickers__gallery">
            <div className="create-mystickers__gallery-content">
              <img src="https://images.pexels.com/photos/3777622/pexels-photo-3777622.jpeg" alt="Michi_1" /> 
              <img src="https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Michi_2" />
              <img src="https://images.pexels.com/photos/2173872/pexels-photo-2173872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Michi_3" />
              <img src="https://images.pexels.com/photos/384555/pexels-photo-384555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Michi_4" />
              <img src="https://images.pexels.com/photos/2361952/pexels-photo-2361952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Michi_5" />
            </div>
          </div>
        </div>
        <div></div>
        <div className="create-sticker">
          <div className="create-sticker__title">Crear sticker</div>
          <div className="create-sticker__form">
            <label htmlFor="titulo_sticker">Titulo</label>
            <input 
              type="text"
              id="titulo_sticker"
              onChange={ contarTitulo }
              placeholder="Titulo de tu Sticker" />
            <div className="text-count"> {tamTitulo}/50 </div>

            <label htmlFor="descripcion_sticker">Descripción</label>
            <textarea 
              id = "description_sticker"
              onChange={ contarDescrip }
              placeholder="Descripcion de tu sticker" />
            <div className="text-count"> {tamDescrip}/200 </div>

            <label htmlFor="url_sticker">Sticker</label>
            <textarea 
              type="text"
              id="url_sticker"
              placeholder="Ingresa la url de tu sticker" />
            <div className="create-sticker__submit">
              <div> <Link to='/home'> Subir </Link> </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
