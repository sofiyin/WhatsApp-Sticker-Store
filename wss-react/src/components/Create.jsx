import React, { useEffect, useState } from 'react'
import { NavBar } from './NavBar'
import { userSticker, postSticker } from '../service/api'
import { useParams } from 'react-router-dom'
import '../css/Create.css'

const userId = sessionStorage.getItem('userId_local')

const Sticker = ({id, url, name}) => {
  return (
    <img 
      id = {id}
      src = {url} 
      alt = {name} 
    />
  )
}

export const Create = () => {
  const [tamTitulo, setTamTitulo] = useState(0)
  const [tamDescrip, setTamDescrip] = useState(0)
  const [stickers, setStickers] = useState([])
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [url, setUrl] = useState('')
  const Params = useParams()

  const handleTitulo = (e) => {
    setTamTitulo(e.target.value.length)
    setTitulo(e.target.value)
  }

  const handleDescripcion = (e) => {
    setTamDescrip(e.target.value.length)
    setDescripcion(e.target.value)
  }

  const handleUrl = (e) => {
    setUrl(e.target.value)
  }

  const uploadSticker = async () => {
    let body = {
      nombre: titulo,
      descripcion: descripcion,
      categoria: "",
      likes: 0,
      Foto: url,
      FechaSubida: new Date(),
      S_CREADOR_id: Params.id
    }

    postSticker(body)
    
    window.location.reload()
  }

  const userStickers = async () => {
    const response = await userSticker(Params.id)
    setStickers(response || [])
  }

  useEffect (() => {
    userStickers()
  } , [])

  return (
    <>
      <NavBar />
      <div className="create-container">
        <div className="create-mystickers">
          <div className="create-mystickers__title">Mis stickers</div>
          <div className="create-mystickers__gallery">
            <div className="create-mystickers__gallery-content">
              { 
                stickers?.map((sticker) => (
                  <Sticker 
                    key = {sticker.idsticker} 
                    id = {sticker.idsticker} 
                    url = {sticker.Foto} 
                    name = {sticker.nombre} 
                  />
              ))}
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
              onChange={ handleTitulo }
              placeholder="Titulo de tu Sticker" />
            <div className="text-count"> {tamTitulo}/50 </div>

            <label htmlFor="descripcion_sticker">Descripción</label>
            <textarea 
              id = "description_sticker"
              onChange={ handleDescripcion }
              placeholder="Descripcion de tu sticker" />
            <div className="text-count"> {tamDescrip}/200 </div>

            <label htmlFor="url_sticker">Sticker</label>
            <textarea 
              type="text"
              id="url_sticker"
              onChange={ handleUrl }
              placeholder="Ingresa la url de tu sticker" />
            <div className="create-sticker__submit">
              <div onClick={ uploadSticker }> Subir </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
