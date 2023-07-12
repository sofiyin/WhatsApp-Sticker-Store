import React, {useState, useEffect} from 'react'
import { StickersInfo } from './StickersInfo'
import { NavBar } from './NavBar'
import { useParams } from 'react-router-dom'
import { fetchStickers } from '../service/api'
import '../css/Home.css'

const Sticker = ({url, name, mostrarSticker}) => {

  return (
      <img 
        src={url} 
        alt={name} 
        onClick={ mostrarSticker }  
      />
  )
}


export const Home = () => {
  const [showSticker, setshowSticker] = useState(false)
  const [stickers, setStickers] = useState([])
  const Params = useParams()

  console.log(stickers);

  const mostrarSticker = () => {
    setshowSticker(!showSticker)
  }

  useEffect (() => {
    return async () => {
      const response = await fetchStickers()
      setStickers(response)
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

          { stickers.map((sticker) => (
            <Sticker url={sticker.Foto} name={sticker.nombre} mostrarSticker={mostrarSticker} />
          ))}

        </div>
        { showSticker && <StickersInfo mostrarSticker={mostrarSticker}/> }
      </main>
    </>
  )
}
