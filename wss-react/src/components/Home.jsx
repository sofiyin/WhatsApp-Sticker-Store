import React, {useState, useEffect} from 'react'
import { StickersInfo } from './StickersInfo'
import { NavBar } from './NavBar'
import { useParams } from 'react-router-dom'
import { fetchStickers } from '../service/api'
import '../css/Home.css'

const Sticker = ({id, url, name, mostrarSticker}) => {

  return (
    
    <img 
      id = {id}
      src = {url} 
      alt = {name} 
      onClick={ () => mostrarSticker(id) }  
    />

  )
}


export const Home = () => {
  const [showSticker, setshowSticker] = useState(false)
  const [stickers, setStickers] = useState([])
  const [idImagen, setIdImagen] = useState(0)
  const Params = useParams()

  const mostrarSticker = (id) => {
    setIdImagen(id)

    setshowSticker(!showSticker)
  }

  useEffect (() => {
    const callFetchStickers = async () => {
      const response = await fetchStickers()
      setStickers(response || [])
    }

    callFetchStickers()

    return () => {
    }

  }, []) 

  return (
    <>
      <NavBar />
      <main className="main">
        <div className="gallery">

          { stickers?.map((sticker) => (
            <Sticker 
              key = {sticker.idsticker} 
              id = {sticker.idsticker} 
              url = {sticker.Foto} 
              name = {sticker.nombre} 
              mostrarSticker={ mostrarSticker } />
          ))}

        </div>
        { showSticker && <StickersInfo mostrarSticker = { mostrarSticker } idImage = { idImagen } /> }
      </main>
    </>
  )
}
