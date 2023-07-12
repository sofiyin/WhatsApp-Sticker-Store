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
    setshowSticker(!showSticker)

    setIdImagen(id)
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
          <img onClick={ mostrarSticker }
          src="https://images.pexels.com/photos/69932/tabby-cat-close-up-portrait-69932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="Michi_9" 
          />

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
